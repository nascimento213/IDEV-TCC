USE MASTER 
IF EXISTS(SELECT * FROM SYS.databases WHERE NAME = 'bd_IDev_Platform')
DROP DATABASE bd_IDev_Platform
GO

CREATE DATABASE bd_IDev_Platform
GO

USE bd_IDev_Platform
GO

-- Tabela de usuários
CREATE TABLE USUARIO(
    ID INT IDENTITY(1001, 1) PRIMARY KEY,
    NOME VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL UNIQUE,
    SENHA VARCHAR(255) NOT NULL,
    TIPO VARCHAR(20) NOT NULL, -- 'profissional' ou 'empresa'
    TELEFONE VARCHAR(15) NULL,
    FOTO_PERFIL VARCHAR(255) NULL,
    BIO TEXT NULL,
    GITHUB_URL VARCHAR(255) NULL,
    COD_STATUS BIT DEFAULT 1 -- 1=ativo, 0=inativo (soft delete)
)
GO

-- Tabela de projetos
CREATE TABLE PROJETO(
    ID INT IDENTITY PRIMARY KEY,
    TITULO VARCHAR(200) NOT NULL,
    DESCRICAO TEXT NOT NULL,
    EMPRESA_ID INT NOT NULL,
    PROFISSIONAL_ID INT NULL,
    ORCAMENTO_MIN DECIMAL(10,2) NULL,
    ORCAMENTO_MAX DECIMAL(10,2) NULL,
    STATUS VARCHAR(20) DEFAULT 'ABERTO',
    COD_STATUS BIT DEFAULT 1, -- 1=ativo, 0=inativo (soft delete)
    
    FOREIGN KEY (EMPRESA_ID) REFERENCES USUARIO(ID),
    FOREIGN KEY (PROFISSIONAL_ID) REFERENCES USUARIO(ID)
)
GO

-- Tabela de requests
CREATE TABLE REQUEST(
    ID BIGINT IDENTITY PRIMARY KEY,
    USUARIO_ID INT NOT NULL,
    CATEGORIA VARCHAR(20) NOT NULL,
    MENSAGEM TEXT NOT NULL,
    PRIORIDADE VARCHAR(10) NULL,
    ANEXO VARCHAR(500) NULL,
    DATA_ENVIO DATETIME DEFAULT GETDATE(),
    COD_STATUS BIT DEFAULT 1,
    
    FOREIGN KEY (USUARIO_ID) REFERENCES USUARIO(ID)
)
GO

-- Inserir usuários
INSERT INTO USUARIO VALUES ('Samuel Nascimento', 'samuel@email.com', 'senha123', 'profissional', '(11) 99999-9999', '/assets/gato-de-terno-suit-cat.png', 'Desenvolvedor Full Stack especializado em React e Node.js', 'https://github.com/samuel', 1)
GO
INSERT INTO USUARIO VALUES ('Carlos Mendes', 'carlos@email.com', 'senha123', 'profissional', '(21) 88888-8888', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Engenheiro DevOps especializado em AWS e Docker', 'https://github.com/carlos', 1)
GO
INSERT INTO USUARIO VALUES ('TechStart Ltda', 'ana@techstart.com', 'senha123', 'empresa', '(11) 55555-5555', NULL, NULL, NULL, 1)
GO
INSERT INTO USUARIO VALUES ('Inovação Digital SA', 'joao@inovacao.com', 'senha123', 'empresa', '(21) 44444-4444', NULL, NULL, NULL, 1)
GO

-- Inserir projetos
INSERT INTO PROJETO VALUES ('EcoMarket - Marketplace Sustentável', 'Plataforma de e-commerce focada em produtos ecológicos', 1003, NULL, 25000.00, 35000.00, 'ABERTO', 1)
GO
INSERT INTO PROJETO VALUES ('FoodieConnect - App de Delivery', 'Aplicativo mobile que conecta chefs locais com clientes', 1004, NULL, 18000.00, 22000.00, 'ABERTO', 1)
GO
INSERT INTO PROJETO VALUES ('MindSpace - Plataforma de Bem-estar', 'Sistema web para agendamento de terapias online', 1003, 1001, 30000.00, 40000.00, 'EM_ANDAMENTO', 1)
GO

-- Inserir requests
INSERT INTO REQUEST VALUES (1001, 'sugestao', 'Gostaria de sugerir melhorias na interface do dashboard profissional', 'media', NULL, GETDATE(), 1)
GO
INSERT INTO REQUEST VALUES (1003, 'reclamacao', 'Encontrei um bug no sistema de cadastro de projetos', 'alta', 'https://exemplo.com/screenshot.png', GETDATE(), 1)
GO
INSERT INTO REQUEST VALUES (1004, 'sugestao', 'Seria interessante ter notificações por email', 'baixa', NULL, GETDATE(), 1)
GO
INSERT INTO REQUEST VALUES (1002, 'reclamacao', 'O sistema está lento para carregar os projetos', 'media', NULL, GETDATE(), 1)
GO