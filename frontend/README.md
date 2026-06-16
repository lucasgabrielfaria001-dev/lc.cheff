# FutShop Frontend

## 📋 Descrição

Frontend da loja virtual de futebol FutShop, desenvolvido com React, Redux e Tailwind CSS.

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
# Desenvolvimento
npm start

# Build para produção
npm build

# Testes
npm test
```

## 📁 Estrutura

```
frontend/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── redux/           # Estado global (Redux)
│   ├── services/        # Serviços (API calls)
│   ├── App.jsx          # Componente raiz
│   ├── index.js         # Entrada da aplicação
│   └── index.css        # Estilos globais
├── package.json
├── .env.example
└── README.md
```

## 🔌 Páginas

- **ProductList** - Catálogo de produtos
- **ProductDetail** - Detalhes do produto
- **Login** - Autenticação
- **Cart** - Carrinho de compras
- **Checkout** - Finalização de compra

## 🛠️ Tecnologias

- React 18
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios

## 🎨 Temas

- Cores: Vermelho (#DC2626), Branco
- Design: Mobile first, Responsive

## 📦 Dependências Principais

- react
- react-dom
- react-router-dom
- redux
- react-redux
- @reduxjs/toolkit
- axios
- tailwindcss
- react-icons
