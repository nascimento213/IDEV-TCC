package com.idev.dao;

import com.idev.database.DatabaseConnection;
import com.idev.model.Projeto;
import com.idev.model.Projeto.StatusProjeto;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO (Data Access Object) para operações com projetos
 */
public class ProjetoDAO {
    
    /**
     * Insere um novo projeto no banco de dados
     */
    public boolean inserir(Projeto projeto) {
        String sql = "INSERT INTO projetos (titulo, descricao, cliente_id, categoria_id, orcamento_min, orcamento_max, prazo_dias, imagem_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, projeto.getTitulo());
            stmt.setString(2, projeto.getDescricao());
            stmt.setInt(3, projeto.getClienteId());
            stmt.setInt(4, projeto.getCategoriaId());
            stmt.setBigDecimal(5, projeto.getOrcamentoMin());
            stmt.setBigDecimal(6, projeto.getOrcamentoMax());
            stmt.setObject(7, projeto.getPrazoDias());
            stmt.setString(8, projeto.getImagemUrl());
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                ResultSet rs = stmt.getGeneratedKeys();
                if (rs.next()) {
                    projeto.setId(rs.getInt(1));
                }
                return true;
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao inserir projeto: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Lista todos os projetos em aberto
     */
    public List<Projeto> listarProjetos() {
        String sql = "SELECT p.*, u.nome as cliente_nome, c.nome as categoria_nome " +
                    "FROM projetos p " +
                    "JOIN usuarios u ON p.cliente_id = u.id " +
                    "JOIN categorias c ON p.categoria_id = c.id " +
                    "ORDER BY p.data_criacao DESC";
        
        List<Projeto> projetos = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                projetos.add(mapearProjeto(rs));
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar projetos: " + e.getMessage());
        }
        
        return projetos;
    }
    
    /**
     * Lista projetos por status
     */
    public List<Projeto> listarPorStatus(StatusProjeto status) {
        String sql = "SELECT p.*, u.nome as cliente_nome, c.nome as categoria_nome " +
                    "FROM projetos p " +
                    "JOIN usuarios u ON p.cliente_id = u.id " +
                    "JOIN categorias c ON p.categoria_id = c.id " +
                    "WHERE p.status = ? " +
                    "ORDER BY p.data_criacao DESC";
        
        List<Projeto> projetos = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, status.name().toLowerCase());
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                projetos.add(mapearProjeto(rs));
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar projetos por status: " + e.getMessage());
        }
        
        return projetos;
    }
    
    /**
     * Lista projetos de um cliente específico
     */
    public List<Projeto> listarPorCliente(int clienteId) {
        String sql = "SELECT p.*, u.nome as cliente_nome, c.nome as categoria_nome " +
                    "FROM projetos p " +
                    "JOIN usuarios u ON p.cliente_id = u.id " +
                    "JOIN categorias c ON p.categoria_id = c.id " +
                    "WHERE p.cliente_id = ? " +
                    "ORDER BY p.data_criacao DESC";
        
        List<Projeto> projetos = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, clienteId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                projetos.add(mapearProjeto(rs));
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar projetos do cliente: " + e.getMessage());
        }
        
        return projetos;
    }
    
    /**
     * Lista projetos de um profissional específico
     */
    public List<Projeto> listarPorProfissional(int profissionalId) {
        String sql = "SELECT p.*, u.nome as cliente_nome, c.nome as categoria_nome " +
                    "FROM projetos p " +
                    "JOIN usuarios u ON p.cliente_id = u.id " +
                    "JOIN categorias c ON p.categoria_id = c.id " +
                    "WHERE p.profissional_id = ? " +
                    "ORDER BY p.data_criacao DESC";
        
        List<Projeto> projetos = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, profissionalId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                projetos.add(mapearProjeto(rs));
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar projetos do profissional: " + e.getMessage());
        }
        
        return projetos;
    }
    
    /**
     * Busca projeto por ID
     */
    public Projeto buscarPorId(int id) {
        String sql = "SELECT p.*, u.nome as cliente_nome, c.nome as categoria_nome " +
                    "FROM projetos p " +
                    "JOIN usuarios u ON p.cliente_id = u.id " +
                    "JOIN categorias c ON p.categoria_id = c.id " +
                    "WHERE p.id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapearProjeto(rs);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar projeto por ID: " + e.getMessage());
        }
        
        return null;
    }
    
    /**
     * Atualiza status do projeto
     */
    public boolean atualizarStatus(int projetoId, StatusProjeto status) {
        String sql = "UPDATE projetos SET status = ? WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, status.name().toLowerCase());
            stmt.setInt(2, projetoId);
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar status do projeto: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Atribui profissional ao projeto
     */
    public boolean atribuirProfissional(int projetoId, int profissionalId) {
        String sql = "UPDATE projetos SET profissional_id = ?, status = 'em_andamento' WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, profissionalId);
            stmt.setInt(2, projetoId);
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            System.err.println("Erro ao atribuir profissional ao projeto: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Mapeia ResultSet para objeto Projeto
     */
    private Projeto mapearProjeto(ResultSet rs) throws SQLException {
        Projeto projeto = new Projeto();
        projeto.setId(rs.getInt("id"));
        projeto.setTitulo(rs.getString("titulo"));
        projeto.setDescricao(rs.getString("descricao"));
        projeto.setClienteId(rs.getInt("cliente_id"));
        projeto.setProfissionalId(rs.getObject("profissional_id", Integer.class));
        projeto.setCategoriaId(rs.getInt("categoria_id"));
        projeto.setOrcamentoMin(rs.getBigDecimal("orcamento_min"));
        projeto.setOrcamentoMax(rs.getBigDecimal("orcamento_max"));
        projeto.setPrazoDias(rs.getObject("prazo_dias", Integer.class));
        projeto.setStatus(StatusProjeto.valueOf(rs.getString("status").toUpperCase()));
        projeto.setImagemUrl(rs.getString("imagem_url"));
        projeto.setDataCriacao(rs.getTimestamp("data_criacao").toLocalDateTime());
        
        Timestamp dataConclusao = rs.getTimestamp("data_conclusao");
        if (dataConclusao != null) {
            projeto.setDataConclusao(dataConclusao.toLocalDateTime());
        }
        
        return projeto;
    }
}