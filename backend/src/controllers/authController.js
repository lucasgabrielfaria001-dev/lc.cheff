const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { email, name, password, cpf } = req.body;

    // Validações
    if (!email || !name || !password || !cpf) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    if (password.length < 8) {
      return res.status(422).json({ error: 'Senha deve ter no mínimo 8 caracteres' });
    }

    // Verificar se email já existe
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'E-mail já registrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    // Inserir usuário
    const result = await pool.query(
      'INSERT INTO users (id, email, name, password, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name',
      [id, email, name, hashedPassword, cpf]
    );

    // Gerar token
    const token = jwt.sign(
      { id: result.rows[0].id, email: result.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: result.rows[0],
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    // Buscar usuário
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = result.rows[0];

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
