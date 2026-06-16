# 🚀 Guia de Instalação e Execução - FutShop

## ⚙️ Pré-requisitos

Você precisa instalar:

### 1. Node.js (inclui npm)
- **Download**: https://nodejs.org/
- **Versão recomendada**: 18+ LTS
- **Instale normalmente e reinicie o terminal**

Verificar instalação:
```powershell
node --version
npm --version
```

### 2. Docker Desktop (Opcional - para usar docker-compose)
- **Download**: https://www.docker.com/products/docker-desktop/
- **Para Windows**: Requer Hyper-V ou WSL2

Verificar instalação:
```powershell
docker --version
docker-compose --version
```

---

## 📝 Opção 1: Executar SEM Docker (Recomendado para começar)

### Backend

```powershell
# Entrar na pasta
cd backend

# Copiar .env
cp .env.example .env

# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev
```

**Resultado esperado:**
```
🚀 Servidor FutShop rodando na porta 3000
📝 API disponível em http://localhost:3000/v1
```

### Frontend (em outro terminal)

```powershell
# Entrar na pasta
cd frontend

# Copiar .env
cp .env.example .env

# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm start
```

**Resultado esperado:**
- Abre automaticamente em http://localhost:3000
- Hot reload habilitado

---

## 🐳 Opção 2: Executar COM Docker

Após instalar Docker Desktop:

```powershell
# Entrar na pasta do projeto
cd c:\Users\aluno\OneDrive\Documentos\lc.chef\lc.cheff

# Build das imagens
docker-compose build

# Iniciar serviços
docker-compose up

# Em outro terminal, parar os serviços
docker-compose down
```

**URLs disponíveis:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/v1
- PostgreSQL: localhost:5432
- Redis: localhost:6379

---

## ❌ Possíveis Problemas

### "npm not found"
- Node.js não instalado ou não está no PATH
- **Solução**: Instale Node.js de https://nodejs.org/
- Reinicie o terminal ou VSCode depois

### "Porta 3000 já em uso"
- Outro programa está usando a porta
- **Solução**: `npm run dev -- --port 3001`

### "PostgreSQL connection refused"
- Banco de dados não está rodando
- **Solução**: Se usar Docker, certifique-se que postgresql iniciou
- Verifique: `docker ps`

### "CORS error"
- Frontend e backend em portas diferentes
- **Solução**: Já configurado no arquivo `.env`

---

## 📋 Checklist de Execução

### Primeiro Start (SEM Docker)

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] Criar `.env` no backend (copiar de `.env.example`)
- [ ] `npm install` no backend
- [ ] `npm run dev` no backend (porta 3000)
- [ ] Criar `.env` no frontend (copiar de `.env.example`)
- [ ] `npm install` no frontend
- [ ] `npm start` no frontend (porta 3000)
- [ ] Acessar http://localhost:3000
- [ ] Testar função de busca de produtos

### Com Docker

- [ ] Docker Desktop instalado
- [ ] `docker-compose build` (primeira vez demora)
- [ ] `docker-compose up`
- [ ] Aguardar ~30 segundos para containers iniciarem
- [ ] Verificar `docker ps` (deve listar 4 containers)
- [ ] Acessar http://localhost:3001

---

## 🧪 Testando a API

### Health Check
```powershell
curl http://localhost:3000/v1/health
```

### Registrar usuário
```powershell
$body = @{
    email = "teste@example.com"
    name = "João Silva"
    password = "senha123456"
    cpf = "12345678900"
} | ConvertTo-Json

curl -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body `
  http://localhost:3000/v1/auth/register
```

### Listar produtos
```powershell
curl http://localhost:3000/v1/products
```

---

## 📂 Estrutura de Pastas

```
c:\Users\aluno\OneDrive\Documentos\lc.chef\lc.cheff\
├── backend/              ← npm install + npm run dev
├── frontend/             ← npm install + npm start
├── documentação/         ← Documentação técnica
└── docker-compose.yml    ← Para usar com Docker
```

---

## 🎯 Próximos Passos

1. **Instale Node.js** de https://nodejs.org/
2. **Escolha uma opção**:
   - Opção 1: Execução local (mais simples)
   - Opção 2: Docker (mais profissional)
3. **Siga os passos acima**
4. **Acesse http://localhost:3000**

---

## 💡 Dicas Úteis

- **Limpar cache npm**: `npm cache clean --force`
- **Reinstalar dependências**: `rm -r node_modules && npm install`
- **Ver porta em uso**: `netstat -ano | findstr :3000`
- **Matar processo na porta**: `taskkill /PID <PID> /F`

---

## 📞 Suporte

Se tiver dúvidas:
1. Verifique se Node.js está instalado: `node --version`
2. Verifique a pasta do projeto
3. Leia a documentação em `documentação/README.md`

Bom desenvolvimento! 🚀
