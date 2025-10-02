# Backend IDev Platform

Backend Java Spring Boot para a plataforma IDev - marketplace de profissionais de TI.

## 🚀 Como executar

### 1. Banco de dados
```sql
-- Execute o arquivo: back/sql/bd_IDev_Platform.sql
-- No SQL Server Management Studio ou similar
```

### 2. Configurar aplicação
```bash
# Editar: src/main/resources/application.properties
# Ajustar credenciais do banco se necessário
```

### 3. Executar backend
```bash
cd back/backend
./mvnw spring-boot:run
# Ou no Windows: mvnw.cmd spring-boot:run
```

### 4. Testar API
```
GET http://localhost:8080/api/v1/usuario/profissionais
GET http://localhost:8080/api/v1/projeto/abertos
```

## 📋 Endpoints principais

### Usuários
- `POST /api/v1/usuario/login` - Login
- `POST /api/v1/usuario/cadastro` - Cadastro
- `GET /api/v1/usuario/profissionais` - Listar profissionais
- `GET /api/v1/usuario/{id}` - Buscar usuário

### Projetos
- `GET /api/v1/projeto/abertos` - Projetos em aberto
- `POST /api/v1/projeto` - Criar projeto
- `GET /api/v1/projeto/cliente/{id}` - Projetos do cliente

### Mensagens
- `POST /api/v1/mensagem` - Enviar mensagem
- `GET /api/v1/mensagem/conversa/{user1}/{user2}` - Buscar conversa

## 🔧 Integração com React

```javascript
// No React, usar: src/services/api.js
import { api } from '../services/api';

// Login
const usuario = await api.login(email, senha);

// Listar projetos
const projetos = await api.listarProjetosAbertos();

// Enviar mensagem
await api.enviarMensagem({
  usuario1Id: 1001,
  usuario2Id: 1003,
  remetenteId: 1001,
  conteudo: "Olá!"
});
```

## 📊 Estrutura

```
backend/
├── src/main/java/com/itb/inf2dm/pizzariad/
│   ├── config/          # Configurações (CORS)
│   ├── controller/      # Controllers REST
│   ├── model/
│   │   ├── entity/      # Entidades JPA
│   │   ├── repository/  # Repositórios
│   │   └── services/    # Serviços de negócio
│   └── IDevApplication.java
└── src/main/resources/
    └── application.properties
```

## ✅ Funcionalidades implementadas

- ✅ Sistema de usuários (cliente/profissional)
- ✅ CRUD de projetos
- ✅ Sistema de chat/mensagens
- ✅ API REST completa
- ✅ CORS configurado para React
- ✅ Banco SQL Server integrado