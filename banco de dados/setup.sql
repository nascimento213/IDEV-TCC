-- Script completo para configurar o banco de dados IDev
-- Execute este arquivo no MySQL para criar tudo

-- 1. Criar banco de dados
DROP DATABASE IF EXISTS idev_platform;
CREATE DATABASE idev_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE idev_platform;

-- 2. Criar usuário específico (opcional)
-- CREATE USER 'idev_user'@'localhost' IDENTIFIED BY 'idev_password';
-- GRANT ALL PRIVILEGES ON idev_platform.* TO 'idev_user'@'localhost';
-- FLUSH PRIVILEGES;

-- 3. Criar todas as tabelas
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'profissional') NOT NULL,
    telefone VARCHAR(20),
    localizacao VARCHAR(100),
    foto_perfil VARCHAR(255),
    bio TEXT,
    github_url VARCHAR(255),
    disponibilidade ENUM('disponivel', 'ocupado', 'indisponivel') DEFAULT 'disponivel',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    icone VARCHAR(100)
);

CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE usuario_skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    skill_id INT NOT NULL,
    nivel ENUM('iniciante', 'intermediario', 'avancado', 'expert') DEFAULT 'intermediario',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_skill (usuario_id, skill_id)
);

CREATE TABLE projetos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    cliente_id INT NOT NULL,
    profissional_id INT,
    categoria_id INT,
    orcamento_min DECIMAL(10,2),
    orcamento_max DECIMAL(10,2),
    prazo_dias INT,
    status ENUM('aberto', 'em_andamento', 'concluido', 'cancelado') DEFAULT 'aberto',
    imagem_url VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP NULL,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
    FOREIGN KEY (profissional_id) REFERENCES usuarios(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE conversas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario1_id INT NOT NULL,
    usuario2_id INT NOT NULL,
    projeto_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_mensagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario1_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario2_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE SET NULL
);

CREATE TABLE mensagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversa_id INT NOT NULL,
    remetente_id INT NOT NULL,
    conteudo TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversa_id) REFERENCES conversas(id) ON DELETE CASCADE,
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE avaliacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    projeto_id INT NOT NULL,
    avaliador_id INT NOT NULL,
    avaliado_id INT NOT NULL,
    nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id),
    FOREIGN KEY (avaliador_id) REFERENCES usuarios(id),
    FOREIGN KEY (avaliado_id) REFERENCES usuarios(id)
);

-- 4. Inserir dados iniciais
INSERT INTO categorias (nome, descricao, icone) VALUES
('Desenvolvimento Web', 'Desenvolvimento de sites e aplicações web', 'web-icon'),
('Mobile', 'Desenvolvimento de aplicativos móveis', 'mobile-icon'),
('DevOps', 'Infraestrutura e automação', 'devops-icon'),
('Testes', 'Testes de software e qualidade', 'test-icon'),
('UI/UX Design', 'Design de interfaces e experiência do usuário', 'design-icon');

INSERT INTO skills (nome, categoria_id) VALUES
('React', 1), ('Node.js', 1), ('JavaScript', 1), ('TypeScript', 1),
('HTML/CSS', 1), ('Vue.js', 1), ('Angular', 1), ('PHP', 1),
('React Native', 2), ('Flutter', 2), ('Swift', 2), ('Kotlin', 2),
('AWS', 3), ('Docker', 3), ('Kubernetes', 3), ('Jenkins', 3),
('Selenium', 4), ('Jest', 4), ('Cypress', 4), ('JUnit', 4),
('Figma', 5), ('Adobe XD', 5), ('Photoshop', 5), ('Sketch', 5);

-- 5. Inserir usuários de exemplo
INSERT INTO usuarios (nome, email, senha, tipo, telefone, localizacao, bio, disponibilidade) VALUES
('Samuel Nascimento', 'samuel@email.com', 'senha123', 'profissional', '(11) 99999-9999', 'São Paulo, SP', 'Desenvolvedor Full Stack especializado em React e Node.js', 'disponivel'),
('Carlos Mendes', 'carlos@email.com', 'senha123', 'profissional', '(21) 88888-8888', 'Rio de Janeiro, RJ', 'Engenheiro DevOps especializado em AWS e Docker', 'disponivel'),
('Ana Silva', 'ana@email.com', 'senha123', 'cliente', '(11) 77777-7777', 'São Paulo, SP', 'Empreendedora digital', 'disponivel'),
('João Santos', 'joao@email.com', 'senha123', 'cliente', '(21) 66666-6666', 'Rio de Janeiro, RJ', 'Gestor de TI', 'disponivel');

-- 6. Inserir projetos de exemplo
INSERT INTO projetos (titulo, descricao, cliente_id, categoria_id, orcamento_min, orcamento_max, prazo_dias, status) VALUES
('E-commerce Sustentável', 'Plataforma de vendas online focada em produtos ecológicos', 3, 1, 25000.00, 35000.00, 60, 'aberto'),
('App de Delivery', 'Aplicativo mobile para delivery de comida', 4, 2, 18000.00, 22000.00, 45, 'aberto'),
('Dashboard Analytics', 'Sistema de análise de dados em tempo real', 3, 1, 30000.00, 40000.00, 90, 'aberto');

-- 7. Criar índices para performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo);
CREATE INDEX idx_projetos_status ON projetos(status);
CREATE INDEX idx_mensagens_conversa ON mensagens(conversa_id);

-- 8. Verificar se tudo foi criado
SELECT 'Banco criado com sucesso!' as status;
SELECT COUNT(*) as total_usuarios FROM usuarios;
SELECT COUNT(*) as total_projetos FROM projetos;
SELECT COUNT(*) as total_categorias FROM categorias;
SELECT COUNT(*) as total_skills FROM skills;