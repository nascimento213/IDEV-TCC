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

-- Tabela de requests (comunicação pós-projeto)
CREATE TABLE REQUEST(
    ID BIGINT IDENTITY PRIMARY KEY,
    REMETENTE_ID INT NOT NULL, -- Quem envia
    DESTINATARIO_ID INT NOT NULL, -- Quem recebe
    PROJETO_ID INT NOT NULL, -- Projeto obrigatório (comunicação pós-projeto)
    CATEGORIA VARCHAR(20) NOT NULL, -- reclamacao, sugestao, elogio
    MENSAGEM TEXT NOT NULL,
    ANEXO VARCHAR(500) NULL, -- Link ou imagem
    DATA_ENVIO DATETIME DEFAULT GETDATE(),
    COD_STATUS BIT DEFAULT 1,
    
    FOREIGN KEY (REMETENTE_ID) REFERENCES USUARIO(ID),
    FOREIGN KEY (DESTINATARIO_ID) REFERENCES USUARIO(ID),
    FOREIGN KEY (PROJETO_ID) REFERENCES PROJETO(ID)
)
GO
-- Tabela de mensagens 
CREATE TABLE MENSAGEM (
    id INT IDENTITY(1,1) PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    assunto VARCHAR(255),
    mensagem TEXT NOT NULL,
    anexo VARCHAR(500),
    data_envio DATETIME DEFAULT GETDATE(),
    lida BIT DEFAULT 0,
    cod_status BIT DEFAULT 1,
    FOREIGN KEY (remetente_id) REFERENCES USUARIO(id),
    FOREIGN KEY (destinatario_id) REFERENCES USUARIO(id)
)
GO

-- Tabela de candidaturas
CREATE TABLE CANDIDATURA (
    id INT IDENTITY(1,1) PRIMARY KEY,
    projeto_id INT NOT NULL,
    profissional_id INT NOT NULL,
    data_candidatura DATETIME DEFAULT GETDATE(),
    status VARCHAR(20) DEFAULT 'PENDENTE', -- PENDENTE, ACEITA, REJEITADA
    cod_status BIT DEFAULT 1,
    FOREIGN KEY (projeto_id) REFERENCES PROJETO(id),
    FOREIGN KEY (profissional_id) REFERENCES USUARIO(id)
)
GO

-- Inserir usuários
INSERT INTO USUARIO VALUES ('Samuel Nascimento', 'samuel@email.com', 'senha123', 'profissional', '(11) 99999-9999', '/assets/gato-de-terno-suit-cat.png', 'Desenvolvedor Full Stack especializado em React e Node.js', 'https://github.com/samuel', 1)
GO
INSERT INTO USUARIO VALUES ('Carlos Mendes', 'carlos@email.com', 'senha123', 'profissional', '(21) 88888-8888', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Engenheiro DevOps especializado em AWS e Docker', 'https://github.com/carlos', 1)
GO
INSERT INTO USUARIO VALUES ('Ana TechStart', 'ana@techstart.com', 'senha123', 'empresa', '(11) 55555-5555', NULL, NULL, NULL, 1)
GO
INSERT INTO USUARIO VALUES ('Inovação Digital SA', 'joao@inovacao.com', 'senha123', 'empresa', '(21) 44444-4444', NULL, NULL, NULL, 1)
GO

-- Inserir projetos (removidos para que empresas vejam apenas projetos que criaram)
-- INSERT INTO PROJETO VALUES ('EcoMarket - Marketplace Sustentável', 'Plataforma de e-commerce focada em produtos ecológicos', 1003, NULL, 25000.00, 35000.00, 'ABERTO', 1)
-- INSERT INTO PROJETO VALUES ('FoodieConnect - App de Delivery', 'Aplicativo mobile que conecta chefs locais com clientes', 1004, NULL, 18000.00, 22000.00, 'ABERTO', 1)
-- INSERT INTO PROJETO VALUES ('MindSpace - Plataforma de Bem-estar', 'Sistema web para agendamento de terapias online', 1003, 1001, 30000.00, 40000.00, 'EM_ANDAMENTO', 1)

-- Inserir requests (comunicação pós-projeto)
INSERT INTO REQUEST VALUES (1003, 1001, 3, 'reclamacao', 'O prazo não foi cumprido conforme acordado. Esperava entrega em 30 dias.', 'https://exemplo.com/cronograma.png', GETDATE(), 1)
GO
INSERT INTO REQUEST VALUES (1001, 1003, 3, 'sugestao', 'Sugiro melhorar a comunicação durante o projeto. Podemos usar Slack na próxima.', NULL, GETDATE(), 1)
GO
INSERT INTO REQUEST VALUES (1003, 1002, 1, 'elogio', 'Excelente trabalho! Superou as expectativas. Recomendo para outros projetos.', NULL, GETDATE(), 1)
GO


-- Selects
SELECT * FROM USUARIO
SELECT * FROM PROJETO
SELECT * FROM REQUEST
SELECT * FROM MENSAGEM

-- Drop
DROP TABLE USUARIO
DROP TABLE PROJETO
DROP TABLE REQUEST

TRUNCATE TABLE MENSAGEM