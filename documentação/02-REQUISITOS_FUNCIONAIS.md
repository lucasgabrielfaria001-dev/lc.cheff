# Requisitos Funcionais - Loja Virtual de Futebol

## RF-001: Cadastro de Usuário

| Campo | Descrição |
|-------|-----------|
| Código | RF-001 |
| Descrição | Permitir que novos usuários se cadastrem na plataforma |
| Regra de Negócio | Cada e-mail deve ser único no sistema |
| Critério de Aceitação | Usuário recebe e-mail de confirmação após cadastro |

## RF-002: Autenticação de Usuário

| Campo | Descrição |
|-------|-----------|
| Código | RF-002 |
| Descrição | Validar credenciais de login (e-mail e senha) |
| Regra de Negócio | Senha deve ter no mínimo 8 caracteres |
| Critério de Aceitação | Usuário acessa sua conta após autenticação bem-sucedida |

## RF-003: Catálogo de Produtos

| Campo | Descrição |
|-------|-----------|
| Código | RF-003 |
| Descrição | Exibir todos os produtos disponíveis com filtros |
| Regra de Negócio | Produtos devem ser categorizados por tipo |
| Critério de Aceitação | Usuário consegue visualizar 50+ produtos com imagens e descrições |

## RF-004: Busca e Filtros

| Campo | Descrição |
|-------|-----------|
| Código | RF-004 |
| Descrição | Permitir busca por nome, categoria, preço e time |
| Regra de Negócio | Busca deve retornar resultados em menos de 2 segundos |
| Critério de Aceitação | Resultados filtrados aparecem em tempo real |

## RF-005: Detalhes do Produto

| Campo | Descrição |
|-------|-----------|
| Código | RF-005 |
| Descrição | Exibir informações detalhadas de cada produto |
| Regra de Negócio | Incluir preço, estoque, descrição, avaliações e imagens |
| Critério de Aceitação | Página carrega com todas as informações em menos de 1 segundo |

## RF-006: Carrinho de Compras

| Campo | Descrição |
|-------|-----------|
| Código | RF-006 |
| Descrição | Permitir adicionar, remover e atualizar quantidade de itens |
| Regra de Negócio | Carrinho salvo por até 30 dias |
| Critério de Aceitação | Usuário consegue gerenciar itens do carrinho |

## RF-007: Checkout

| Campo | Descrição |
|-------|-----------|
| Código | RF-007 |
| Descrição | Processar pedido com endereço e forma de pagamento |
| Regra de Negócio | Endereço obrigatório; parcela máxima de 12x |
| Critério de Aceitação | Pedido confirmado com número de rastreamento |

## RF-008: Sistema de Pagamento

| Campo | Descrição |
|-------|-----------|
| Código | RF-008 |
| Descrição | Integrar gateway de pagamento (cartão, PIX, boleto) |
| Regra de Negócio | Transações criptografadas com SSL |
| Critério de Aceitação | Pagamento processado em menos de 5 segundos |

## RF-009: Pedidos

| Campo | Descrição |
|-------|-----------|
| Código | RF-009 |
| Descrição | Permitir visualizar histórico de pedidos |
| Regra de Negócio | Histórico armazenado por 5 anos |
| Critério de Aceitação | Usuário acessa pedidos passados com detalhes |

## RF-010: Avaliações e Comentários

| Campo | Descrição |
|-------|-----------|
| Código | RF-010 |
| Descrição | Permitir avaliar produtos com nota 1-5 e comentário |
| Regra de Negócio | Avaliação visível somente após confirmação de compra |
| Critério de Aceitação | Avaliação publicada após moderação |

## RF-011: Wishlist

| Campo | Descrição |
|-------|-----------|
| Código | RF-011 |
| Descrição | Salvar produtos para comprar depois |
| Regra de Negócio | Wishlist sincronizada entre dispositivos |
| Critério de Aceitação | Usuário consegue gerenciar lista de desejos |

## RF-012: Notificações

| Campo | Descrição |
|-------|-----------|
| Código | RF-012 |
| Descrição | Enviar notificações de pedido, promoções e novos produtos |
| Regra de Negócio | Usuário pode controlar preferências de notificação |
| Critério de Aceitação | Notificação entregue em menos de 1 minuto |
