# Solução para o Erro 500 - Conexão com Banco de Dados

## Problema Identificado
O erro 500 que você está enfrentando é causado por um problema de **autenticação integrada do Windows** com o SQL Server. O erro específico é:

```
Esse driver não está configurado para autenticação integrada
Não é possível carregar a autenticação DLL mssql-jdbc_auth-12.10.0.x64
```

## Soluções Possíveis

### Solução 1: Usar Autenticação SQL Server (RECOMENDADA)

1. **Habilitar Autenticação Mista no SQL Server:**
   - Abra o SQL Server Management Studio (SSMS)
   - Conecte-se ao servidor
   - Clique com botão direito no servidor → Properties
   - Vá em Security → Server authentication
   - Selecione "SQL Server and Windows Authentication mode"
   - Reinicie o serviço do SQL Server

2. **Configurar usuário sa:**
   ```sql
   -- Execute no SSMS
   ALTER LOGIN sa ENABLE;
   ALTER LOGIN sa WITH PASSWORD = '@ITB123456';
   ```

3. **Atualizar application.properties:**
   ```properties
   # SQL Server - Autenticação SQL
   spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=bd_IDev_Platform;encrypt=false;trustServerCertificate=true
   spring.datasource.username=sa
   spring.datasource.password=@ITB123456
   spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
   spring.jpa.database-platform=org.hibernate.dialect.SQLServerDialect
   spring.jpa.hibernate.ddl-auto=none
   spring.jpa.show-sql=true
   ```

### Solução 2: Usar H2 Temporariamente (PARA DESENVOLVIMENTO)

Se você quiser testar rapidamente, pode usar H2:

```properties
# H2 - Banco em memória para desenvolvimento
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.h2.console.enabled=true
```

### Solução 3: Executar o Servidor

Para executar o servidor Spring Boot, você tem algumas opções:

1. **Usando Maven (se instalado):**
   ```bash
   cd backend/java
   mvn spring-boot:run
   ```

2. **Usando o wrapper (se funcionar):**
   ```bash
   cd backend/java
   ./mvnw spring-boot:run
   ```

3. **Usando IDE:**
   - Abra o projeto no IntelliJ IDEA ou Eclipse
   - Execute a classe `IDevPlatformApplication.java`

## Endpoints Corretos

Depois que o servidor estiver rodando, os endpoints corretos são:

- `GET http://localhost:8080/api/v1/usuario` - Lista todos os usuários
- `GET http://localhost:8080/api/v1/usuario/1001` - Busca usuário por ID (IDs começam em 1001)
- `POST http://localhost:8080/api/v1/usuario/login` - Login
- `POST http://localhost:8080/api/v1/usuario/cadastro` - Cadastro

## Nota Importante

O erro `:8080/api/v1/usuario:1` que você mencionou está incorreto. O correto seria:
- `/api/v1/usuario/1` (mas o ID 1 não existe)
- `/api/v1/usuario/1001` (este ID existe no banco)

Os IDs no seu banco começam em 1001 devido à configuração `IDENTITY(1001, 1)` no SQL.