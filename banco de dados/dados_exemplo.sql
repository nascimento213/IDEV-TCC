-- Dados de exemplo para a plataforma IDev
-- Execute após criar o schema principal

-- Inserir usuários de exemplo
INSERT INTO usuarios (nome, email, senha, tipo, telefone, localizacao, foto_perfil, bio, github_url, disponibilidade) VALUES
('Samuel Nascimento', 'samuel@email.com', 'senha123', 'profissional', '(11) 99999-9999', 'São Paulo, SP', '/assets/gato-de-terno-suit-cat.png', 'Desenvolvedor Full Stack com 3 anos de experiência em projetos web modernos. Especializado em React, Node.js e arquiteturas escaláveis.', 'https://github.com/samuel', 'disponivel'),
('Carlos Mendes', 'carlos.mendes@email.com', 'senha123', 'profissional', '(21) 88888-8888', 'Rio de Janeiro, RJ', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Engenheiro de DevOps especializado em AWS, Docker e Kubernetes. Experiência em arquitetura de sistemas e automação de infraestrutura.', 'https://github.com/carlos', 'disponivel'),
('Mariana Costa', 'mariana.costa@email.com', 'senha123', 'profissional', '(31) 77777-7777', 'Belo Horizonte, MG', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'Designer UI/UX especializada em criar experiências digitais incríveis. Trabalho com Figma, Adobe XD e tenho conhecimento em User Research.', 'https://github.com/mariana', 'disponivel'),
('Pedro Rocha', 'pedro.rocha@email.com', 'senha123', 'profissional', '(51) 66666-6666', 'Porto Alegre, RS', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Engenheiro de Qualidade focado em testes automatizados. Experiência com Selenium, Jest e metodologias ágeis de desenvolvimento.', 'https://github.com/pedro', 'disponivel'),
('Ana Silva', 'ana.silva@email.com', 'senha123', 'cliente', '(11) 55555-5555', 'São Paulo, SP', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 'Empreendedora digital em busca de soluções tecnológicas inovadoras para meu negócio.', NULL, 'disponivel'),
('João Santos', 'joao.santos@email.com', 'senha123', 'cliente', '(21) 44444-4444', 'Rio de Janeiro, RJ', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face', 'Gestor de TI procurando profissionais qualificados para projetos corporativos.', NULL, 'disponivel');

-- Inserir skills dos usuários
INSERT INTO usuario_skills (usuario_id, skill_id, nivel) VALUES
-- Samuel (React, Node.js, JavaScript, TypeScript, MongoDB)
(1, 1, 'avancado'), (1, 2, 'avancado'), (1, 3, 'expert'), (1, 4, 'avancado'),
-- Carlos (AWS, Docker, Kubernetes, Jenkins)
(2, 13, 'expert'), (2, 14, 'avancado'), (2, 15, 'avancado'), (2, 16, 'intermediario'),
-- Mariana (Figma, Adobe XD, Photoshop, Sketch)
(3, 21, 'expert'), (3, 22, 'avancado'), (3, 23, 'avancado'), (3, 24, 'intermediario'),
-- Pedro (Selenium, Jest, Cypress, JUnit)
(4, 17, 'expert'), (4, 18, 'avancado'), (4, 19, 'avancado'), (4, 20, 'intermediario');

-- Inserir projetos de exemplo
INSERT INTO projetos (titulo, descricao, cliente_id, categoria_id, orcamento_min, orcamento_max, prazo_dias, status, imagem_url) VALUES
('EcoMarket - Marketplace Sustentável', 'Plataforma de e-commerce focada em produtos ecológicos e sustentáveis com sistema de pontuação verde', 5, 1, 25000.00, 35000.00, 60, 'aberto', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop'),
('FoodieConnect - App de Delivery', 'Aplicativo mobile que conecta chefs locais com clientes, incluindo sistema de avaliação e chat em tempo real', 6, 2, 18000.00, 22000.00, 45, 'aberto', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop'),
('MindSpace - Plataforma de Bem-estar', 'Sistema web para agendamento de terapias online com videochamadas integradas e acompanhamento de progresso', 5, 1, 30000.00, 40000.00, 90, 'em_andamento', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop'),
('SmartHome Dashboard', 'Interface web para controle de dispositivos IoT residenciais com automação inteligente e análise de consumo', 6, 1, 20000.00, 28000.00, 75, 'aberto', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop'),
('EduTech - Plataforma de Ensino', 'Sistema completo de gestão educacional com aulas ao vivo, gamificação e acompanhamento de desempenho', 5, 1, 45000.00, 60000.00, 120, 'concluido', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop'),
('CryptoTracker Pro', 'Dashboard avançado para análise de criptomoedas com gráficos em tempo real e alertas personalizados', 6, 1, 15000.00, 25000.00, 30, 'aberto', 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop');

-- Atribuir profissional ao projeto em andamento
UPDATE projetos SET profissional_id = 1 WHERE id = 3;

-- Inserir skills necessárias para os projetos
INSERT INTO projeto_skills (projeto_id, skill_id, obrigatoria) VALUES
-- EcoMarket
(1, 1, true), (1, 2, true), (1, 3, true), -- React, Node.js, JavaScript
-- FoodieConnect
(2, 9, true), (2, 2, false), -- React Native, Node.js
-- MindSpace
(3, 6, true), (3, 13, false), -- Vue.js, AWS
-- SmartHome
(4, 7, true), (4, 14, false), -- Angular, Docker
-- EduTech
(5, 1, true), (5, 2, true), (5, 14, false), -- React, Node.js, Docker
-- CryptoTracker
(6, 1, true), (6, 4, true); -- React, TypeScript

-- Inserir propostas de exemplo
INSERT INTO propostas (projeto_id, profissional_id, valor, prazo_dias, descricao, status) VALUES
(1, 1, 30000.00, 55, 'Proposta para desenvolvimento do EcoMarket com React e Node.js. Experiência comprovada em e-commerce.', 'pendente'),
(2, 1, 20000.00, 40, 'Desenvolvimento do app FoodieConnect. Posso adaptar para React Native.', 'pendente'),
(4, 2, 24000.00, 70, 'SmartHome Dashboard com foco em DevOps e infraestrutura robusta.', 'pendente');

-- Inserir conversas de exemplo
INSERT INTO conversas (usuario1_id, usuario2_id, projeto_id) VALUES
(5, 1, 1), -- Ana e Samuel sobre EcoMarket
(6, 1, 2), -- João e Samuel sobre FoodieConnect
(5, 3, NULL); -- Ana e Mariana - conversa geral

-- Inserir mensagens de exemplo
INSERT INTO mensagens (conversa_id, remetente_id, conteudo, lida) VALUES
-- Conversa Ana e Samuel sobre EcoMarket
(1, 5, 'Oi! Vi seu perfil e gostaria de conversar sobre o projeto EcoMarket.', true),
(1, 1, 'Olá Ana! Claro, vamos conversar. Vi que é um e-commerce sustentável, muito interessante!', true),
(1, 5, 'Exato! Preciso de alguém experiente em React para o frontend. Você tem experiência com e-commerce?', true),
(1, 1, 'Sim, tenho bastante experiência com React e já desenvolvi algumas plataformas de e-commerce. Podemos agendar uma call?', false),

-- Conversa João e Samuel sobre FoodieConnect
(2, 6, 'Samuel, vi sua proposta para o FoodieConnect. Gostei do seu perfil!', true),
(2, 1, 'Obrigado João! É um projeto muito interessante. Tenho experiência com apps de delivery.', true),
(2, 6, 'Perfeito! Quando podemos começar a discutir os detalhes?', false),

-- Conversa Ana e Mariana
(3, 5, 'Oi Mariana! Preciso de ajuda com o design de uma nova plataforma.', true),
(3, 3, 'Oi Ana! Claro, adoro trabalhar em projetos novos. Me conta mais sobre a ideia!', false);

-- Inserir avaliações de exemplo
INSERT INTO avaliacoes (projeto_id, avaliador_id, avaliado_id, nota, comentario) VALUES
(5, 5, 1, 5, 'Excelente trabalho! Samuel entregou tudo no prazo e com qualidade excepcional.'),
(5, 1, 5, 4, 'Ana foi uma cliente muito colaborativa e sempre disponível para feedbacks.');

-- Inserir agendamentos de exemplo
INSERT INTO agendamentos (projeto_id, cliente_id, profissional_id, data_agendamento, duracao_minutos, titulo, descricao, status) VALUES
(3, 5, 1, '2024-01-15 14:00:00', 60, 'Reunião de Alinhamento - MindSpace', 'Discussão sobre requisitos e cronograma do projeto', 'agendado'),
(1, 5, 1, '2024-01-16 10:00:00', 90, 'Apresentação da Proposta - EcoMarket', 'Apresentação detalhada da solução proposta', 'agendado');

-- Inserir notificações de exemplo
INSERT INTO notificacoes (usuario_id, tipo, titulo, descricao, url) VALUES
(1, 'proposta', 'Nova proposta de projeto', 'Você recebeu uma nova proposta para o projeto EcoMarket', '/projetos/1'),
(1, 'mensagem', 'Nova mensagem', 'Ana Silva enviou uma nova mensagem', '/chat/1'),
(5, 'proposta', 'Proposta recebida', 'Samuel Nascimento enviou uma proposta para seu projeto', '/projetos/1'),
(6, 'mensagem', 'Nova mensagem', 'Samuel Nascimento respondeu sua mensagem', '/chat/2'),
(3, 'mensagem', 'Nova mensagem', 'Ana Silva enviou uma mensagem', '/chat/3');