# Fluxos de Processo - Loja Virtual de Futebol

## 1. Fluxo de Cadastro e Autenticação

### Entrada
- Dados do novo usuário (email, nome, senha, CPF)

### Processamento
1. Validar se e-mail já existe no banco de dados
2. Validar força da senha (mínimo 8 caracteres)
3. Criptografar senha com bcrypt
4. Salvar usuário no banco de dados
5. Gerar token JWT
6. Enviar e-mail de confirmação

### Saída
- Usuário criado com sucesso
- Token JWT para autenticação
- E-mail de confirmação enviado

### Exceções
| Exceção | Tratamento |
|---------|-----------|
| E-mail já existe | Retornar erro 400 |
| Senha fraca | Solicitar senha mais forte |
| Erro de BD | Retornar erro 500 |
| Falha no envio de email | Registrar log e continuar |

---

## 2. Fluxo de Compra

### Entrada
- Usuário autenticado
- Produtos no carrinho
- Endereço de entrega
- Forma de pagamento

### Processamento
1. Validar itens do carrinho (verificar estoque)
2. Calcular subtotal e frete
3. Aplicar cupons/descontos (se houver)
4. Calcular total
5. Criar pedido em status "PENDING"
6. Processar pagamento via gateway
7. Se aprovado:
   - Atualizar status para "CONFIRMED"
   - Reduzir estoque dos produtos
   - Gerar número de rastreamento
   - Enviar e-mail de confirmação
8. Se rejeitado:
   - Atualizar status para "FAILED"
   - Manter itens no carrinho
   - Enviar e-mail de falha

### Saída
- Pedido criado com número único
- Confirmação por e-mail
- Código de rastreamento

### Exceções
| Exceção | Tratamento |
|---------|-----------|
| Produto fora de estoque | Avisar usuário e remover do carrinho |
| Pagamento recusado | Permitir nova tentativa ou outro método |
| Endereço inválido | Solicitar confirmação |
| Servidor de pagamento indisponível | Filar para processar depois |

---

## 3. Fluxo de Entrega

### Entrada
- Pedido confirmado com endereço

### Processamento
1. Registrar pedido no sistema de logística
2. Atualizar status para "SHIPPED"
3. Enviar código de rastreamento por e-mail
4. Acompanhar rastreamento
5. Quando entregue:
   - Atualizar status para "DELIVERED"
   - Enviar notificação ao cliente
   - Permitir avaliação do produto

### Saída
- Pedido entregue
- Cliente recebe notificação

### Exceções
| Exceção | Tratamento |
|---------|-----------|
| Endereço incorreto | Contatar cliente para confirmar |
| Entrega não efetuada | Tentar novo agendamento |
| Produto danificado | Oferecer reembolso ou reenvio |

---

## 4. Fluxo de Avaliação e Comentários

### Entrada
- Usuário que comprou o produto
- Nota (1-5 estrelas)
- Comentário (opcional)

### Processamento
1. Validar se usuário comprou o produto
2. Verificar se não avaliou antes
3. Salvar avaliação no banco de dados
4. Moderar comentário (se houver)
5. Calcular nova média de avaliações
6. Publicar avaliação no catálogo

### Saída
- Avaliação publicada
- Média de produto atualizada

### Exceções
| Exceção | Tratamento |
|---------|-----------|
| Usuário não comprou | Rejeitar avaliação |
| Comentário inapropriado | Rejeitar ou editar |
| Linguagem ofensiva | Avisar usuário |

---

## 5. Fluxo de Busca e Filtros

### Entrada
- Termo de busca
- Filtros (categoria, preço, time)

### Processamento
1. Validar entrada
2. Executar query no Elasticsearch
3. Aplicar filtros
4. Ordenar resultados
5. Paginar resultados (20 itens por página)
6. Incluir metadados (rating, disponibilidade)

### Saída
- Lista de produtos encontrados
- Informações de paginação
- Facetas para filtro adicional

### Exceções
| Exceção | Tratamento |
|---------|-----------|
| Nenhum resultado | Retornar lista vazia com sugestões |
| Timeout | Retornar resultados parciais |
| Termo inválido | Ignorar e buscar termos válidos |

---

## 6. Fluxo de Devolução

### Entrada
- Pedido entregue
- Motivo da devolução
- Fotos do produto (opcional)

### Processamento
1. Validar se está dentro do prazo (até 30 dias)
2. Verificar condições de devolução
3. Criar ticket de devolução
4. Gerar etiqueta de envio
5. Coordenar coleta
6. Receber e inspecionar produto
7. Aprovar devolução
8. Processar reembolso

### Saída
- Devolução processada
- Reembolso efetivado
- Notificação ao cliente

### Exceções
| Exceção | Tratamento |
|---------|-----------|
| Produto fora do prazo | Recusar devolução |
| Produto danificado | Rejeitar reembolso |
| Cliente disputa | Escalar para suporte |

---

## 7. Fluxo de Notificação

### Entrada
- Evento do sistema (pedido, promoção, novo produto)

### Processamento
1. Identificar tipo de evento
2. Selecionar template de notificação
3. Verificar preferências do usuário
4. Preparar conteúdo personalizado
5. Enviar via email/SMS/push
6. Registrar log de envio
7. Monitorar taxa de abertura

### Saída
- Notificação enviada
- Log de rastreamento

### Exceções
| Exceção | Tratamento |
|---------|-----------|
| Usuário não autorizou | Ignorar |
| Falha no envio | Retry em 5 minutos (máx 3 tentativas) |
| Email inválido | Marcar como inválido |
