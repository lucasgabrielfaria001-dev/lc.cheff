# APIs - Loja Virtual de Futebol

## Base URL
```
https://api.futshop.com/v1
```

## 1. Auth Service

### POST /auth/register
Registrar novo usuário

**Parâmetros:**
```json
{
  "email": "usuario@example.com",
  "name": "João Silva",
  "password": "senha123456",
  "cpf": "12345678900"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-user-id",
  "email": "usuario@example.com",
  "name": "João Silva",
  "token": "eyJhbGc...",
  "message": "Usuário registrado com sucesso"
}
```

**Códigos de Retorno:**
| Código | Descrição |
|--------|-----------|
| 201 | Usuário criado |
| 400 | E-mail já existe |
| 422 | Dados inválidos |

---

### POST /auth/login
Fazer login

**Parâmetros:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123456"
}
```

**Resposta (200):**
```json
{
  "id": "uuid-user-id",
  "email": "usuario@example.com",
  "name": "João Silva",
  "token": "eyJhbGc...",
  "expiresIn": 86400
}
```

---

## 2. Product Service

### GET /products
Listar todos os produtos

**Parâmetros Query:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| page | INT | Número da página (padrão: 1) |
| limit | INT | Itens por página (padrão: 20, máx: 100) |
| category | STRING | Filtrar por categoria |
| team | STRING | Filtrar por time |
| minPrice | DECIMAL | Preço mínimo |
| maxPrice | DECIMAL | Preço máximo |
| search | STRING | Busca por nome |
| sort | STRING | Ordenação (price, name, created_at) |

**Resposta (200):**
```json
{
  "data": [
    {
      "id": "uuid-product-id",
      "name": "Camiseta Flamengo 2024",
      "price": 129.90,
      "category": "Vestuário",
      "team": "Flamengo",
      "stock": 50,
      "image_url": "https://...",
      "rating": 4.5,
      "reviews_count": 24
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 450,
    "pages": 23
  }
}
```

---

### GET /products/:id
Obter detalhes de um produto

**Resposta (200):**
```json
{
  "id": "uuid-product-id",
  "name": "Camiseta Flamengo 2024",
  "description": "Camiseta oficial...",
  "price": 129.90,
  "category": "Vestuário",
  "team": "Flamengo",
  "stock": 50,
  "sku": "FLAMENGO-2024-P",
  "image_url": "https://...",
  "images": ["https://..."],
  "rating": 4.5,
  "reviews": [
    {
      "id": "uuid-review",
      "user": "João Silva",
      "rating": 5,
      "comment": "Excelente qualidade!",
      "created_at": "2024-01-15"
    }
  ]
}
```

---

## 3. Cart Service

### POST /cart
Adicionar produto ao carrinho

**Parâmetros:**
```json
{
  "product_id": "uuid-product-id",
  "quantity": 2
}
```

**Resposta (201):**
```json
{
  "id": "uuid-cart-id",
  "items": [
    {
      "product_id": "uuid-product-id",
      "quantity": 2,
      "price": 129.90,
      "subtotal": 259.80
    }
  ],
  "total": 259.80,
  "item_count": 1
}
```

---

### GET /cart
Obter carrinho do usuário

**Resposta (200):**
```json
{
  "id": "uuid-cart-id",
  "items": [
    {
      "product_id": "uuid-product-id",
      "name": "Camiseta Flamengo",
      "quantity": 2,
      "price": 129.90,
      "subtotal": 259.80
    }
  ],
  "subtotal": 259.80,
  "shipping": 15.00,
  "total": 274.80
}
```

---

## 4. Order Service

### POST /orders
Criar novo pedido

**Parâmetros:**
```json
{
  "shipping_address": "Rua das Flores, 123...",
  "payment_method": "credit_card",
  "installments": 3
}
```

**Resposta (201):**
```json
{
  "id": "uuid-order-id",
  "order_number": "PED-2024-001234",
  "status": "PENDING",
  "total_price": 274.80,
  "items": [...],
  "created_at": "2024-01-16T10:30:00Z"
}
```

---

### GET /orders
Listar pedidos do usuário

**Resposta (200):**
```json
{
  "data": [
    {
      "id": "uuid-order-id",
      "order_number": "PED-2024-001234",
      "status": "DELIVERED",
      "total_price": 274.80,
      "created_at": "2024-01-16",
      "updated_at": "2024-01-20"
    }
  ],
  "pagination": {...}
}
```

---

## 5. Review Service

### POST /products/:id/reviews
Criar avaliação

**Parâmetros:**
```json
{
  "rating": 5,
  "comment": "Produto excelente!"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-review-id",
  "product_id": "uuid-product-id",
  "rating": 5,
  "comment": "Produto excelente!",
  "created_at": "2024-01-16"
}
```

---

## Headers Comuns

```
Authorization: Bearer {token}
Content-Type: application/json
X-API-Version: v1
```

## Códigos de Retorno Padrão

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Não autorizado |
| 404 | Não encontrado |
| 422 | Dados inválidos |
| 500 | Erro interno do servidor |
