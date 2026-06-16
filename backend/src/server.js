require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const pool = require('./config/database');

// Rotas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Rotas
app.use('/v1/auth', authRoutes);
app.use('/v1/products', productRoutes);

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento global de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Testar conexão com banco de dados
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('✅ Banco de dados conectado');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor FutShop rodando na porta ${PORT}`);
  console.log(`📝 API disponível em http://localhost:${PORT}/v1`);
});
