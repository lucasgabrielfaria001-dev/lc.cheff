# FutShop - Loja Virtual de Futebol

Projeto completo de e-commerce especializado em artigos de futebol.

## 📁 Estrutura do Projeto

```
futshop/
├── backend/               # API Node.js + Express
├── frontend/              # React + Redux
├── documentação/          # Documentação técnica
├── docker-compose.yml     # Orquestração de containers
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Com Docker

```bash
# Instalar dependências
docker-compose build

# Iniciar serviços
docker-compose up
```

**URLs:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/v1
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Sem Docker

#### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

## 📋 Documentação

Toda a documentação técnica do projeto está em `documentação/`:

- [Visão Geral](./documentação/01-VISAO_GERAL.md)
- [Requisitos Funcionais](./documentação/02-REQUISITOS_FUNCIONAIS.md)
- [Requisitos Não Funcionais](./documentação/03-REQUISITOS_NAO_FUNCIONAIS.md)
- [Arquitetura](./documentação/04-ARQUITETURA.md)
- [Banco de Dados](./documentação/05-BANCO_DE_DADOS.md)
- [APIs REST](./documentação/06-APIS.md)
- [Fluxos de Processo](./documentação/07-FLUXOS_DE_PROCESSO.md)
- [Casos de Uso](./documentação/08-CASOS_DE_USO.md)

## 🛠️ Tecnologias

| Componente | Tecnologia |
|-----------|-----------|
| **Frontend** | React 18, Redux, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Banco de Dados** | PostgreSQL |
| **Cache** | Redis |
| **Containerização** | Docker, Docker Compose |

## 📝 Variáveis de Ambiente

Copiar `.env.example` para `.env` e preencher:

### Backend (.env)
```
DB_HOST=localhost
DB_NAME=futshop
JWT_SECRET=sua-chave-secreta
STRIPE_SECRET_KEY=sua-chave-stripe
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000/v1
REACT_APP_STRIPE_PUBLIC_KEY=sua-chave-publica-stripe
```

## 🎯 Próximos Passos

- [ ] Criar tabelas no banco de dados
- [ ] Implementar checkout completo
- [ ] Integração com Stripe
- [ ] Testes unitários
- [ ] Testes E2E
- [ ] CI/CD pipeline
- [ ] Deploy em produção

## 👥 Equipe

FutShop Team

## 📄 Licença

MIT
