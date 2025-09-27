-- Schema do Banco de Dados - IDev Platform
-- Sistema de marketplace para profissionais de TI

-- Tabela de usuários (clientes e profissionais)
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

-- Tabela de categorias de serviços
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    icone VARCHAR(100)
);

-- Tabela de skills/tecnologias
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela de relacionamento usuário-skills
CREATE TABLE usuario_skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    skill_id INT NOT NULL,
    nivel ENUM('iniciante', 'intermediario', 'avancado', 'expert') DEFAULT 'intermediario',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_skill (usuario_id, skill_id)
);

-- Tabela de projetos
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

-- Tabela de skills necessárias para projetos
CREATE TABLE projeto_skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    projeto_id INT NOT NULL,
    skill_id INT NOT NULL,
    obrigatoria BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- Tabela de propostas
CREATE TABLE propostas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    projeto_id INT NOT NULL,
    profissional_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    prazo_dias INT NOT NULL,
    descricao TEXT,
    status ENUM('pendente', 'aceita', 'rejeitada') DEFAULT 'pendente',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
    FOREIGN KEY (profissional_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de conversas/chats
CREATE TABLE conversas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario1_id INT NOT NULL,
    usuario2_id INT NOT NULL,
    projeto_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_mensagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario1_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario2_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE SET NULL,
    UNIQUE KEY unique_conversation (usuario1_id, usuario2_id, projeto_id)
);

-- Tabela de mensagens
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

-- Tabela de avaliações
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
    FOREIGN KEY (avaliado_id) REFERENCES usuarios(id),
    UNIQUE KEY unique_project_evaluation (projeto_id, avaliador_id, avaliado_id)
);

-- Tabela de agendamentos
CREATE TABLE agendamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    projeto_id INT NOT NULL,
    cliente_id INT NOT NULL,
    profissional_id INT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    duracao_minutos INT DEFAULT 60,
    titulo VARCHAR(200),
    descricao TEXT,
    status ENUM('agendado', 'concluido', 'cancelado') DEFAULT 'agendado',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id),
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
    FOREIGN KEY (profissional_id) REFERENCES usuarios(id)
);

-- Tabela de notificações
CREATE TABLE notificacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo ENUM('proposta', 'mensagem', 'avaliacao', 'projeto', 'agendamento') NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    lida BOOLEAN DEFAULT FALSE,
    url VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para otimização
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo);
CREATE INDEX idx_projetos_status ON projetos(status);
CREATE INDEX idx_projetos_cliente ON projetos(cliente_id);
CREATE INDEX idx_mensagens_conversa ON mensagens(conversa_id);
CREATE INDEX idx_mensagens_data ON mensagens(data_envio);
CREATE INDEX idx_avaliacoes_avaliado ON avaliacoes(avaliado_id);
CREATE INDEX idx_notificacoes_usuario ON notificacoes(usuario_id, lida);

-- Inserção de dados iniciais
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