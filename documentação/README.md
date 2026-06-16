# FutShop - Índice de Documentação

## Documentação do Projeto: Loja Virtual de Futebol

Bem-vindo à documentação completa do **FutShop**, uma plataforma de e-commerce especializada em artigos de futebol.

---

## 📑 Índice de Documentos

### 1. **Visão Geral do Projeto**
📄 [01-VISAO_GERAL.md](./01-VISAO_GERAL.md)
- Nome e objetivo do sistema
- Público-alvo
- Escopo do projeto
- Categorias de produtos
- Diferenciais do produto

### 2. **Requisitos Funcionais**
📄 [02-REQUISITOS_FUNCIONAIS.md](./02-REQUISITOS_FUNCIONAIS.md)
- Cadastro e autenticação
- Catálogo de produtos
- Busca e filtros
- Carrinho de compras
- Checkout e pagamento
- Avaliações e wishlist

### 3. **Requisitos Não Funcionais**
📄 [03-REQUISITOS_NAO_FUNCIONAIS.md](./03-REQUISITOS_NAO_FUNCIONAIS.md)
- Segurança (SSL, LGPD, PCI DSS)
- Performance (tempo de resposta, cache)
- Disponibilidade (uptime 99.9%)
- Escalabilidade
- Usabilidade
- Manutenibilidade

### 4. **Arquitetura do Sistema**
📄 [04-ARQUITETURA.md](./04-ARQUITETURA.md)
- Diagrama de arquitetura (3 camadas)
- Componentes principais
- Tecnologias utilizadas
- Integrações externas
- Fluxo de comunicação
- Segurança da arquitetura

### 5. **Banco de Dados**
📄 [05-BANCO_DE_DADOS.md](./05-BANCO_DE_DADOS.md)
- Diagrama ER (Entidade-Relacionamento)
- Tabelas principais:
  - Users
  - Products
  - Orders
  - Order_Items
  - Reviews
  - Wishlist
  - Payments
- Índices otimizados
- Relacionamentos entre entidades

### 6. **APIs REST**
📄 [06-APIS.md](./06-APIS.md)
- Auth Service (login, registro)
- Product Service (listagem, detalhes)
- Cart Service (gerenciamento)
- Order Service (criação, histórico)
- Review Service (avaliações)
- Formato JSON
- Códigos de retorno

### 7. **Fluxos de Processo**
📄 [07-FLUXOS_DE_PROCESSO.md](./07-FLUXOS_DE_PROCESSO.md)
1. Cadastro e Autenticação
2. Fluxo de Compra
3. Entrega e Rastreamento
4. Avaliações
5. Busca e Filtros
6. Devoluções
7. Notificações

### 8. **Casos de Uso**
📄 [08-CASOS_DE_USO.md](./08-CASOS_DE_USO.md)
1. CU-001: Novo Usuário Registra-se
2. CU-002: Usuário Faz Login
3. CU-003: Usuário Busca Produtos
4. CU-004: Visualiza Detalhes do Produto
5. CU-005: Adiciona ao Carrinho
6. CU-006: Realiza Checkout
7. CU-007: Avalia Produto
8. CU-008: Rastreia Pedido
9. CU-009: Solicita Devolução
10. CU-010: Admin Gerencia Produtos

---

## 🚀 Tecnologias

| Componente | Tecnologia |
|-----------|-----------|
| **Frontend** | React 18+ |
| **Backend** | Node.js (Express) |
| **Banco de Dados** | PostgreSQL |
| **Cache** | Redis |
| **Busca** | Elasticsearch |
| **Containerização** | Docker |
| **Orquestração** | Kubernetes |

---

## 📋 Fluxo de Compra (Resumido)

```
Cadastro → Login → Busca Produtos → Detalhes → Carrinho → Checkout → Pagamento → Confirmação → Entrega → Avaliação
```

---

## 🔐 Segurança

- ✅ Autenticação JWT
- ✅ Criptografia SSL/TLS
- ✅ Conformidade LGPD
- ✅ Conformidade PCI DSS
- ✅ Backup diário

---

## 📊 Estatísticas Alvo

| Métrica | Alvo |
|---------|------|
| Usuários Simultâneos | 10.000 |
| Taxa de Transferência | 1.000 req/s |
| Uptime | 99.9% |
| Tempo de Resposta | < 2s |
| Cobertura de Testes | > 80% |

---

## 👥 Público-alvo

- Torcedores de futebol
- Atletas amadores e profissionais
- Colecionadores de memorabilia
- Consumidores em geral

---

## 📞 Suporte

Para dúvidas sobre a documentação, consulte os documentos específicos ou entre em contato com o time de desenvolvimento.

---

**Versão**: 1.0  
**Data**: 2024-01-16  
**Status**: Ativo
