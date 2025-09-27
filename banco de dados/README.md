# Banco de Dados - IDev Platform

Este diretório contém toda a implementação do banco de dados para a plataforma IDev, um marketplace para profissionais de TI.

## Estrutura do Banco de Dados

### Arquivos SQL
- **`schema.sql`** - Schema completo do banco de dados com todas as tabelas, índices e dados iniciais
- **`dados_exemplo.sql`** - Dados de exemplo para popular o banco durante desenvolvimento/testes

### Classes Java

#### Conexão
- **`DatabaseConnection.java`** - Classe responsável pela conexão com o banco MySQL

#### Modelos (Entities)
- **`Usuario.java`** - Modelo para usuários (clientes e profissionais)
- **`Projeto.java`** - Modelo para projetos
- **`Mensagem.java`** - Modelo para mensagens do chat
- **`Skill.java`** - Modelo para skills/tecnologias
- **`Categoria.java`** - Modelo para categorias de serviços

#### DAOs (Data Access Objects)
- **`UsuarioDAO.java`** - Operações CRUD para usuários
- **`ProjetoDAO.java`** - Operações CRUD para projetos
- **`MensagemDAO.java`** - Operações CRUD para mensagens e chat

## Principais Entidades

### Usuários
- Suporte para dois tipos: `cliente` e `profissional`
- Perfis completos com skills, localização, disponibilidade
- Sistema de autenticação

### Projetos
- Criados por clientes
- Podem ser atribuídos a profissionais
- Status: aberto, em_andamento, concluido, cancelado
- Orçamento e prazo flexíveis

### Sistema de Chat
- Conversas entre usuários
- Mensagens em tempo real
- Controle de mensagens lidas/não lidas
- Associação opcional com projetos

### Skills e Categorias
- Sistema hierárquico de categorias
- Skills associadas a categorias
- Níveis de proficiência para usuários

### Avaliações
- Sistema de feedback entre clientes e profissionais
- Notas de 1 a 5 estrelas
- Comentários opcionais

## Como Usar

### 1. Configuração do Banco
```sql
-- Criar banco de dados
CREATE DATABASE idev_platform;
USE idev_platform;

-- Executar schema
SOURCE schema.sql;

-- Inserir dados de exemplo (opcional)
SOURCE dados_exemplo.sql;
```

### 2. Configuração da Conexão Java
Edite o arquivo `DatabaseConnection.java` com suas credenciais:
```java
private static final String URL = "jdbc:mysql://localhost:3306/idev_platform";
private static final String USERNAME = "seu_usuario";
private static final String PASSWORD = "sua_senha";
```

### 3. Dependências Maven
Adicione ao seu `pom.xml`:
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

## Exemplos de Uso

### Criar um usuário
```java
Usuario usuario = new Usuario("João Silva", "joao@email.com", "senha123", TipoUsuario.PROFISSIONAL);
usuario.setLocalizacao("São Paulo, SP");
usuario.setBio("Desenvolvedor Full Stack");

UsuarioDAO dao = new UsuarioDAO();
boolean sucesso = dao.inserir(usuario);
```

### Buscar projetos
```java
ProjetoDAO projetoDAO = new ProjetoDAO();
List<Projeto> projetos = projetoDAO.listarPorStatus(StatusProjeto.ABERTO);
```

### Enviar mensagem
```java
MensagemDAO mensagemDAO = new MensagemDAO();
int conversaId = mensagemDAO.buscarOuCriarConversa(usuario1Id, usuario2Id, null);

Mensagem mensagem = new Mensagem(conversaId, remetenteId, "Olá! Como vai?");
mensagemDAO.inserir(mensagem);
```

## Funcionalidades Implementadas

✅ **Sistema de Usuários**
- Cadastro e autenticação
- Perfis de cliente e profissional
- Gerenciamento de skills

✅ **Gestão de Projetos**
- Criação e listagem de projetos
- Sistema de propostas
- Controle de status

✅ **Sistema de Chat**
- Conversas entre usuários
- Mensagens em tempo real
- Histórico de conversas

✅ **Avaliações e Feedback**
- Sistema de notas
- Comentários e reviews

✅ **Notificações**
- Alertas para usuários
- Diferentes tipos de notificação

## Otimizações

- Índices em campos frequentemente consultados
- Relacionamentos com chaves estrangeiras
- Constraints para integridade dos dados
- Timestamps automáticos para auditoria

## Segurança

- Senhas devem ser hasheadas antes do armazenamento
- Validação de dados de entrada
- Controle de acesso baseado em tipos de usuário
- Logs de auditoria através dos timestamps