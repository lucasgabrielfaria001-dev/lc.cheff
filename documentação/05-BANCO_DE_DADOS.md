# Banco de Dados - Loja Virtual de Futebol

## Diagrama ER (Entidade-Relacionamento)

```
┌────────────────┐
│     Users      │
├────────────────┤
│ id (PK)        │
│ email (UNIQUE) │
│ name           │
│ password       │
│ created_at     │
└────────────────┘
        │
        │ 1:N
        │
    ┌───┴────┬─────────┐
    │         │         │
    │         │         │
┌─────────┐  ┌──────────┐  ┌────────────┐
│ Wishlist │  │  Reviews │  │   Orders   │
├─────────┤  ├──────────┤  ├────────────┤
│ id (PK) │  │ id (PK)  │  │ id (PK)    │
│user_id  │  │user_id   │  │user_id     │
│product_ │  │product_id│  │order_date  │
│ id      │  │rating    │  │total_price │
│added_at │  │comment   │  │status      │
└─────────┘  │created_at│  │created_at  │
             └──────────┘  └────────────┘
                │                │
                │ N:1            │ 1:N
                │                │
             ┌────────────┐   ┌─────────────┐
             │ Products   │   │Order_Items  │
             ├────────────┤   ├─────────────┤
             │ id (PK)    │   │ id (PK)     │
             │ name       │   │order_id     │
             │price       │   │product_id   │
             │category    │   │quantity     │
             │stock       │   │price        │
             │team        │   └─────────────┘
             │description │
             │image_url   │
             │created_at  │
             └────────────┘
```

## 1. Tabela: Users

| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| id | UUID | PK | Identificador único |
| email | VARCHAR(255) | UNIQUE, NOT NULL | E-mail do usuário |
| name | VARCHAR(255) | NOT NULL | Nome completo |
| password | VARCHAR(255) | NOT NULL | Senha criptografada (bcrypt) |
| phone | VARCHAR(20) | | Telefone |
| cpf | VARCHAR(11) | UNIQUE | CPF do usuário |
| active | BOOLEAN | DEFAULT TRUE | Status da conta |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de criação |
| updated_at | TIMESTAMP | DEFAULT NOW() | Data de atualização |

## 2. Tabela: Products

| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| id | UUID | PK | Identificador único |
| name | VARCHAR(255) | NOT NULL | Nome do produto |
| description | TEXT | | Descrição detalhada |
| price | DECIMAL(10,2) | NOT NULL | Preço em reais |
| stock | INT | DEFAULT 0 | Quantidade em estoque |
| category | VARCHAR(50) | NOT NULL | Categoria (vestuário, calçados, etc) |
| team | VARCHAR(100) | | Time de futebol associado |
| image_url | VARCHAR(500) | | URL da imagem principal |
| sku | VARCHAR(50) | UNIQUE | Código do produto |
| active | BOOLEAN | DEFAULT TRUE | Produto ativo |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de criação |
| updated_at | TIMESTAMP | DEFAULT NOW() | Data de atualização |

## 3. Tabela: Orders

| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| id | UUID | PK | Identificador único |
| user_id | UUID | FK → Users | Referência ao usuário |
| order_number | VARCHAR(20) | UNIQUE | Número do pedido |
| total_price | DECIMAL(10,2) | NOT NULL | Valor total |
| status | VARCHAR(50) | DEFAULT 'PENDING' | Situação do pedido |
| shipping_address | TEXT | NOT NULL | Endereço de entrega |
| shipping_cost | DECIMAL(10,2) | DEFAULT 0 | Frete |
| tracking_number | VARCHAR(50) | | Código de rastreamento |
| payment_method | VARCHAR(50) | | Forma de pagamento |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de criação |
| updated_at | TIMESTAMP | DEFAULT NOW() | Data de atualização |

## 4. Tabela: Order_Items

| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| id | UUID | PK | Identificador único |
| order_id | UUID | FK → Orders | Referência ao pedido |
| product_id | UUID | FK → Products | Referência ao produto |
| quantity | INT | NOT NULL | Quantidade comprada |
| price | DECIMAL(10,2) | NOT NULL | Preço unitário no momento da compra |
| subtotal | DECIMAL(10,2) | NOT NULL | Quantidade x Preço |

## 5. Tabela: Reviews

| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| id | UUID | PK | Identificador único |
| product_id | UUID | FK → Products | Referência ao produto |
| user_id | UUID | FK → Users | Referência ao usuário |
| rating | INT | CHECK (1-5) | Nota de 1 a 5 |
| comment | TEXT | | Comentário da avaliação |
| verified_purchase | BOOLEAN | DEFAULT FALSE | Compra verificada |
| helpful_count | INT | DEFAULT 0 | Quantidade de curtidas |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de criação |
| updated_at | TIMESTAMP | DEFAULT NOW() | Data de atualização |

## 6. Tabela: Wishlist

| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| id | UUID | PK | Identificador único |
| user_id | UUID | FK → Users | Referência ao usuário |
| product_id | UUID | FK → Products | Referência ao produto |
| added_at | TIMESTAMP | DEFAULT NOW() | Data de adição |

## 7. Tabela: Payments

| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| id | UUID | PK | Identificador único |
| order_id | UUID | FK → Orders | Referência ao pedido |
| amount | DECIMAL(10,2) | NOT NULL | Valor pago |
| status | VARCHAR(50) | | Status do pagamento |
| method | VARCHAR(50) | | Método de pagamento |
| transaction_id | VARCHAR(100) | | ID da transação no gateway |
| created_at | TIMESTAMP | DEFAULT NOW() | Data de criação |

## Índices

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
```

## Relacionamentos

| Origem | Destino | Tipo | Descrição |
|--------|---------|------|-----------|
| Users | Orders | 1:N | Um usuário tem múltiplos pedidos |
| Users | Reviews | 1:N | Um usuário faz múltiplas avaliações |
| Users | Wishlist | 1:N | Um usuário tem múltiplos itens em wishlist |
| Products | Reviews | 1:N | Um produto tem múltiplas avaliações |
| Products | Wishlist | 1:N | Um produto está em múltiplas wishlists |
| Orders | Order_Items | 1:N | Um pedido tem múltiplos itens |
| Orders | Payments | 1:N | Um pedido pode ter múltiplos pagamentos |
| Products | Order_Items | 1:N | Um produto pode estar em múltiplos pedidos |
