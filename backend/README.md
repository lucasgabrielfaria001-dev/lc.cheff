# FutShop Backend

## 📋 Descrição

Backend da loja virtual de futebol FutShop, desenvolvido com Node.js, Express e PostgreSQL.

## 🚀 Instalação

```bash
npm install
```

## 📝 Configuração

1. Copiar `.env.example` para `.env`
2. Preencher variáveis de ambiente

```bash
cp .env.example .env
```

## 🔨 Scripts

```bash
# Desenvolvimento com nodemon
npm run dev

# Produção
npm start

# Testes
npm test

# Migrations
npm run migrate
```

## 📁 Estrutura

```
backend/
├── src/
│   ├── config/          # Configurações (DB, Redis, etc)
│   ├── controllers/     # Lógica de negócio
│   ├── routes/          # Definição de rotas
│   ├── middleware/      # Middlewares (auth, etc)
│   ├── models/          # Modelos de dados
│   └── server.js        # Arquivo principal
├── package.json
├── .env.example
└── README.md
```

## 🔌 Endpoints

### Auth
- `POST /v1/auth/register` - Registrar usuário
- `POST /v1/auth/login` - Fazer login

### Produtos
- `GET /v1/products` - Listar produtos
- `GET /v1/products/:id` - Detalhes do produto
- `POST /v1/products` - Criar produto (admin)

## 🛠️ Tecnologias

- Express.js
- PostgreSQL
- Redis
- JWT
- Bcrypt

## 📦 Dependências Principais

- express
- pg (PostgreSQL)
- jsonwebtoken
- bcryptjs
- redis
- stripe
- cors
- helmet

## 🧪 Testes

```bash
npm test
```

## 🚨 Tratamento de Erros

Todos os endpoints retornam formato JSON:

```json
{
  "error": "Descrição do erro"
}
```

## 🔐 Segurança

- ✅ Autenticação JWT
- ✅ Senha com bcrypt
- ✅ CORS habilitado
- ✅ Helmet para headers seguros
