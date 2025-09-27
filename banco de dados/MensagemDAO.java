package com.idev.dao;

import com.idev.database.DatabaseConnection;
import com.idev.model.Mensagem;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO (Data Access Object) para operações com mensagens
 */
public class MensagemDAO {
    
    /**
     * Insere uma nova mensagem
     */
    public boolean inserir(Mensagem mensagem) {
        String sql = "INSERT INTO mensagens (conversa_id, remetente_id, conteudo) VALUES (?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setInt(1, mensagem.getConversaId());
            stmt.setInt(2, mensagem.getRemetenteId());
            stmt.setString(3, mensagem.getConteudo());
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                ResultSet rs = stmt.getGeneratedKeys();
                if (rs.next()) {
                    mensagem.setId(rs.getInt(1));
                }
                
                // Atualizar data da última mensagem na conversa
                atualizarUltimaMensagemConversa(mensagem.getConversaId());
                
                return true;
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao inserir mensagem: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Lista mensagens de uma conversa
     */
    public List<Mensagem> listarPorConversa(int conversaId) {
        String sql = "SELECT m.*, u.nome as remetente_nome " +
                    "FROM mensagens m " +
                    "JOIN usuarios u ON m.remetente_id = u.id " +
                    "WHERE m.conversa_id = ? " +
                    "ORDER BY m.data_envio ASC";
        
        List<Mensagem> mensagens = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, conversaId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                mensagens.add(mapearMensagem(rs));
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar mensagens: " + e.getMessage());
        }
        
        return mensagens;
    }
    
    /**
     * Marca mensagens como lidas
     */
    public boolean marcarComoLidas(int conversaId, int usuarioId) {
        String sql = "UPDATE mensagens SET lida = true WHERE conversa_id = ? AND remetente_id != ? AND lida = false";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, conversaId);
            stmt.setInt(2, usuarioId);
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            System.err.println("Erro ao marcar mensagens como lidas: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Conta mensagens não lidas de um usuário
     */
    public int contarMensagensNaoLidas(int usuarioId) {
        String sql = "SELECT COUNT(*) FROM mensagens m " +
                    "JOIN conversas c ON m.conversa_id = c.id " +
                    "WHERE (c.usuario1_id = ? OR c.usuario2_id = ?) " +
                    "AND m.remetente_id != ? AND m.lida = false";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, usuarioId);
            stmt.setInt(2, usuarioId);
            stmt.setInt(3, usuarioId);
            
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return rs.getInt(1);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao contar mensagens não lidas: " + e.getMessage());
        }
        
        return 0;
    }
    
    /**
     * Busca ou cria uma conversa entre dois usuários
     */
    public int buscarOuCriarConversa(int usuario1Id, int usuario2Id, Integer projetoId) {
        // Primeiro tenta buscar conversa existente
        String sqlBuscar = "SELECT id FROM conversas WHERE " +
                          "((usuario1_id = ? AND usuario2_id = ?) OR (usuario1_id = ? AND usuario2_id = ?)) " +
                          "AND (projeto_id = ? OR (projeto_id IS NULL AND ? IS NULL))";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sqlBuscar)) {
            
            stmt.setInt(1, usuario1Id);
            stmt.setInt(2, usuario2Id);
            stmt.setInt(3, usuario2Id);
            stmt.setInt(4, usuario1Id);
            stmt.setObject(5, projetoId);
            stmt.setObject(6, projetoId);
            
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return rs.getInt("id");
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar conversa: " + e.getMessage());
        }
        
        // Se não encontrou, cria nova conversa
        String sqlCriar = "INSERT INTO conversas (usuario1_id, usuario2_id, projeto_id) VALUES (?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sqlCriar, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setInt(1, usuario1Id);
            stmt.setInt(2, usuario2Id);
            stmt.setObject(3, projetoId);
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                ResultSet rs = stmt.getGeneratedKeys();
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao criar conversa: " + e.getMessage());
        }
        
        return -1;
    }
    
    /**
     * Lista conversas de um usuário
     */
    public List<Object[]> listarConversasUsuario(int usuarioId) {
        String sql = "SELECT c.id, " +
                    "CASE WHEN c.usuario1_id = ? THEN u2.nome ELSE u1.nome END as outro_usuario_nome, " +
                    "CASE WHEN c.usuario1_id = ? THEN u2.foto_perfil ELSE u1.foto_perfil END as outro_usuario_foto, " +
                    "CASE WHEN c.usuario1_id = ? THEN u2.id ELSE u1.id END as outro_usuario_id, " +
                    "(SELECT conteudo FROM mensagens WHERE conversa_id = c.id ORDER BY data_envio DESC LIMIT 1) as ultima_mensagem, " +
                    "(SELECT COUNT(*) FROM mensagens WHERE conversa_id = c.id AND remetente_id != ? AND lida = false) as nao_lidas, " +
                    "c.data_ultima_mensagem " +
                    "FROM conversas c " +
                    "JOIN usuarios u1 ON c.usuario1_id = u1.id " +
                    "JOIN usuarios u2 ON c.usuario2_id = u2.id " +
                    "WHERE c.usuario1_id = ? OR c.usuario2_id = ? " +
                    "ORDER BY c.data_ultima_mensagem DESC";
        
        List<Object[]> conversas = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, usuarioId);
            stmt.setInt(2, usuarioId);
            stmt.setInt(3, usuarioId);
            stmt.setInt(4, usuarioId);
            stmt.setInt(5, usuarioId);
            stmt.setInt(6, usuarioId);
            
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                Object[] conversa = {
                    rs.getInt("id"),
                    rs.getString("outro_usuario_nome"),
                    rs.getString("outro_usuario_foto"),
                    rs.getInt("outro_usuario_id"),
                    rs.getString("ultima_mensagem"),
                    rs.getInt("nao_lidas"),
                    rs.getTimestamp("data_ultima_mensagem")
                };
                conversas.add(conversa);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar conversas do usuário: " + e.getMessage());
        }
        
        return conversas;
    }
    
    /**
     * Atualiza a data da última mensagem na conversa
     */
    private void atualizarUltimaMensagemConversa(int conversaId) {
        String sql = "UPDATE conversas SET data_ultima_mensagem = CURRENT_TIMESTAMP WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, conversaId);
            stmt.executeUpdate();
            
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar última mensagem da conversa: " + e.getMessage());
        }
    }
    
    /**
     * Mapeia ResultSet para objeto Mensagem
     */
    private Mensagem mapearMensagem(ResultSet rs) throws SQLException {
        Mensagem mensagem = new Mensagem();
        mensagem.setId(rs.getInt("id"));
        mensagem.setConversaId(rs.getInt("conversa_id"));
        mensagem.setRemetenteId(rs.getInt("remetente_id"));
        mensagem.setConteudo(rs.getString("conteudo"));
        mensagem.setLida(rs.getBoolean("lida"));
        mensagem.setDataEnvio(rs.getTimestamp("data_envio").toLocalDateTime());
        
        return mensagem;
    }
}