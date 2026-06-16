# Casos de Uso - Loja Virtual de Futebol

## CU-001: Novo Usuário Registra-se

| Atributo | Descrição |
|----------|-----------|
| ID | CU-001 |
| Ator Primário | Novo Usuário |
| Atores Secundários | Sistema de Email |
| Pré-condições | Usuário não possui conta |
| Pós-condições | Conta criada e verificada |

### Fluxo Principal
1. Usuário acessa página de registro
2. Preenche formulário (email, nome, senha, CPF)
3. Clica em "Registrar"
4. Sistema valida dados
5. Sistema cria conta
6. Sistema envia e-mail de confirmação
7. Usuário recebe e-mail
8. Usuário clica no link de confirmação
9. Conta ativada
10. Usuário redirecionado para homepage

### Fluxos Alternativos

#### A1: E-mail já registrado
- 4a. Sistema detecta e-mail duplicado
- 4b. Sistema exibe mensagem de erro
- 4c. Usuário fornece outro e-mail
- Retorna ao passo 3

#### A2: Senha fraca
- 4a. Sistema valida força da senha
- 4b. Sistema exibe requisitos de senha
- 4c. Usuário cria nova senha
- Retorna ao passo 3

#### A3: CPF inválido
- 4a. Sistema valida CPF
- 4b. Sistema exibe erro
- 4c. Usuário fornece CPF correto
- Retorna ao passo 3

---

## CU-002: Usuário Faz Login

| Atributo | Descrição |
|----------|-----------|
| ID | CU-002 |
| Ator Primário | Usuário Registrado |
| Pré-condições | Usuário possui conta ativa |
| Pós-condições | Usuário autenticado e em sessão |

### Fluxo Principal
1. Usuário acessa página de login
2. Preenche email e senha
3. Clica em "Entrar"
4. Sistema valida credenciais
5. Sistema gera token JWT
6. Sistema redireciona para homepage
7. Usuário visualiza catálogo autenticado

### Fluxos Alternativos

#### A1: Credenciais inválidas
- 4a. Sistema não encontra usuário ou senha incorreta
- 4b. Sistema exibe mensagem genérica de erro
- 4c. Usuário tenta novamente
- Retorna ao passo 2

#### A2: Conta não ativada
- 4a. Sistema detecta e-mail não confirmado
- 4b. Sistema oferece reenvio de e-mail
- 4c. Usuário ativa conta via e-mail
- 4d. Usuário faz login novamente
- Retorna ao passo 3

---

## CU-003: Usuário Busca Produtos

| Atributo | Descrição |
|----------|-----------|
| ID | CU-003 |
| Ator Primário | Usuário (autenticado ou não) |
| Pré-condições | Sistema com produtos cadastrados |
| Pós-condições | Lista de produtos encontrada |

### Fluxo Principal
1. Usuário acessa página de catálogo
2. Visualiza produtos em destaque
3. Opta por pesquisar (termo de busca ou filtros)
4. Seleciona categoria (ex: Vestuário)
5. Seleciona faixa de preço (ex: R$100-R$200)
6. Seleciona time (ex: Flamengo)
7. Clica em "Filtrar"
8. Sistema retorna produtos filtrados
9. Usuário visualiza resultados com imagem, nome, preço, avaliação

### Fluxos Alternativos

#### A1: Sem resultados
- 8a. Sistema não encontra produtos
- 8b. Sistema sugere buscas alternativas
- 8c. Usuário ajusta filtros
- Retorna ao passo 7

#### A2: Busca por texto
- 3a. Usuário digita termo de busca
- 3b. Sistema sugere autocomplete
- 3c. Usuário seleciona sugestão ou pressiona Enter
- Retorna ao passo 8

---

## CU-004: Usuário Visualiza Detalhes do Produto

| Atributo | Descrição |
|----------|-----------|
| ID | CU-004 |
| Ator Primário | Usuário |
| Pré-condições | Produto visualizável |
| Pós-condições | Página de detalhes carregada |

### Fluxo Principal
1. Usuário clica em um produto
2. Sistema carrega página de detalhes
3. Exibe:
   - Imagens do produto (carrossel)
   - Nome e descrição completa
   - Preço e disponibilidade
   - Avaliações e comentários
   - Opções de tamanho/cor
   - Botões "Adicionar ao Carrinho" e "Adicionar à Wishlist"
4. Usuário pode visualizar todas as informações
5. Usuário pode rolar para ver avaliações

### Fluxos Alternativos

#### A1: Produto fora de estoque
- 3a. Sistema exibe "Fora de Estoque"
- 3b. Botão "Adicionar ao Carrinho" desabilitado
- 3c. Opção "Notificar quando disponível" oferecida

---

## CU-005: Usuário Adiciona Produto ao Carrinho

| Atributo | Descrição |
|----------|-----------|
| ID | CU-005 |
| Ator Primário | Usuário |
| Pré-condições | Usuário visualiza produto; produto em estoque |
| Pós-condições | Produto adicionado ao carrinho |

### Fluxo Principal
1. Usuário está na página do produto
2. Seleciona tamanho/cor (se houver)
3. Define quantidade
4. Clica em "Adicionar ao Carrinho"
5. Sistema adiciona item ao carrinho
6. Sistema exibe confirmação (toast/modal)
7. Carrinho é atualizado (ícone no header)

### Fluxos Alternativos

#### A1: Quantidade inválida
- 3a. Usuário tenta quantidade maior que estoque
- 3b. Sistema exibe alerta
- 3c. Limita quantidade ao máximo disponível

---

## CU-006: Usuário Realiza Checkout

| Atributo | Descrição |
|----------|-----------|
| ID | CU-006 |
| Ator Primário | Usuário Autenticado |
| Pré-condições | Itens no carrinho; usuário autenticado |
| Pós-condições | Pedido criado; pagamento processado |

### Fluxo Principal
1. Usuário clica em "Ir para Checkout"
2. Sistema exibe carrinho com resumo
3. Usuário confirma endereço de entrega
4. Usuário seleciona forma de pagamento
5. Se cartão: seleciona número de parcelas
6. Se PIX: recebe código QR
7. Se boleto: recebe dados
8. Usuário confirma compra
9. Sistema processa pagamento
10. Pagamento aprovado
11. Sistema cria pedido com status CONFIRMED
12. Reduz estoque dos produtos
13. Envia e-mail de confirmação
14. Exibe página de sucesso com número do pedido

### Fluxos Alternativos

#### A1: Pagamento recusado
- 9a. Gateway rejeita transação
- 9b. Sistema exibe motivo da recusa
- 9c. Usuário oferecido opções:
  - Tentar outro cartão
  - Selecionar outro método
  - Salvar para depois
- Retorna ao passo 3 ou 14 (com status PENDING)

#### A2: Endereço inválido
- 3a. Sistema valida endereço
- 3b. Se inválido, exibe aviso
- 3c. Usuário confirma ou corrige
- Retorna ao passo 4

---

## CU-007: Usuário Avalia Produto

| Atributo | Descrição |
|----------|-----------|
| ID | CU-007 |
| Ator Primário | Usuário que Comprou o Produto |
| Pré-condições | Usuário autenticado; pedido entregue |
| Pós-condições | Avaliação publicada |

### Fluxo Principal
1. Usuário acessa histórico de pedidos
2. Clica em "Avaliar Produtos"
3. Seleciona estrelas (1-5)
4. Digita comentário (opcional)
5. Clica em "Enviar Avaliação"
6. Sistema salva avaliação
7. Sistema modifica comentário
8. Avaliação publicada após aprovação
9. Média de produto atualizada

---

## CU-008: Usuário Rastreia Pedido

| Atributo | Descrição |
|----------|-----------|
| ID | CU-008 |
| Ator Primário | Usuário |
| Pré-condições | Pedido confirmado |
| Pós-condições | Status do pedido visualizado |

### Fluxo Principal
1. Usuário acessa "Meus Pedidos"
2. Seleciona pedido
3. Sistema exibe status (CONFIRMED, SHIPPED, DELIVERED)
4. Se SHIPPED: exibe código de rastreamento
5. Usuário clica para ver detalhes da logística
6. Direcionado para site da transportadora

---

## CU-009: Usuário Solicita Devolução

| Atributo | Descrição |
|----------|-----------|
| ID | CU-009 |
| Ator Primário | Usuário com Pedido Entregue |
| Pré-condições | Pedido entregue; dentro de 30 dias |
| Pós-condições | Solicitação de devolução criada |

### Fluxo Principal
1. Usuário acessa "Meus Pedidos"
2. Seleciona pedido
3. Clica em "Solicitar Devolução"
4. Seleciona produto(s)
5. Escolhe motivo da devolução
6. Opcionalmente: insere fotos do produto
7. Clica em "Solicitar"
8. Sistema gera número de devolução
9. Sistema gera etiqueta de envio
10. Envia e-mail com instruções

---

## CU-010: Administrador Gerencia Produtos

| Atributo | Descrição |
|----------|-----------|
| ID | CU-010 |
| Ator Primário | Administrador |
| Pré-condições | Administrador autenticado |
| Pós-condições | Produto adicionado/modificado/removido |

### Fluxo Principal
1. Admin acessa painel administrativo
2. Seleciona "Produtos"
3. Opta por:
   - Adicionar novo: preenche formulário e salva
   - Editar: seleciona produto, altera dados, salva
   - Remover: confirma exclusão
4. Sistema atualiza catálogo

