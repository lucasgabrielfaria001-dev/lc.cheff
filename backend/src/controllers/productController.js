const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Listar todos os produtos com filtros
exports.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, team, minPrice, maxPrice, search, sort = 'name' } = req.query;
    
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM products WHERE active = true';
    const params = [];

    if (category) {
      query += ' AND category = $' + (params.length + 1);
      params.push(category);
    }

    if (team) {
      query += ' AND team = $' + (params.length + 1);
      params.push(team);
    }

    if (minPrice) {
      query += ' AND price >= $' + (params.length + 1);
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND price <= $' + (params.length + 1);
      params.push(maxPrice);
    }

    if (search) {
      query += ' AND name ILIKE $' + (params.length + 1);
      params.push(`%${search}%`);
    }

    // Ordenação
    const validSorts = ['name', 'price', 'created_at'];
    if (validSorts.includes(sort)) {
      query += ` ORDER BY ${sort}`;
    } else {
      query += ' ORDER BY name';
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    // Contar total de produtos
    let countQuery = 'SELECT COUNT(*) AS count FROM products WHERE active = true';
    const countParams = [];

    if (category) {
      countQuery += ' AND category = $' + (countParams.length + 1);
      countParams.push(category);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0]?.count || 0, 10);

    res.json({
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

// Obter detalhes de um produto
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM products WHERE id = $1 AND active = true', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Buscar avaliações
    const reviewsResult = await pool.query(
      `SELECT r.*, u.name as user_name FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.product_id = $1 
       ORDER BY r.created_at DESC 
       LIMIT 10`,
      [id]
    );

    res.json({
      ...result.rows[0],
      reviews: reviewsResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
};

// Criar novo produto (admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, team, image_url, sku } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO products (id, name, description, price, stock, category, team, image_url, sku) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [id, name, description, price, stock, category, team, image_url, sku]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};
