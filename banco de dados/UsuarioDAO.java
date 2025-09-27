package com.idev.dao;

import com.idev.database.DatabaseConnection;
import com.idev.model.Usuario;
import com.idev.model.Usuario.TipoUsuario;
import com.idev.model.Usuario.Disponibilidade;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO (Data Access Object) para operações com usuários
 */
public class UsuarioDAO {
    
    /**
     * Insere um novo usuário no banco de dados
     */
    public boolean inserir(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nome, email, senha, tipo, telefone, localizacao, foto_perfil, bio, github_url, disponibilidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, usuario.getNome());
            stmt.setString(2, usuario.getEmail());
            stmt.setString(3, usuario.getSenha());
            stmt.setString(4, usuario.getTipo().name().toLowerCase());
            stmt.setString(5, usuario.getTelefone());
            stmt.setString(6, usuario.getLocalizacao());
            stmt.setString(7, usuario.getFotoPerfil());
            stmt.setString(8, usuario.getBio());
            stmt.setString(9, usuario.getGithubUrl());
            stmt.setString(10, usuario.getDisponibilidade().name().toLowerCase());
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                ResultSet rs = stmt.getGeneratedKeys();
                if (rs.next()) {
                    usuario.setId(rs.getInt(1));
                }
                return true;
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao inserir usuário: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Busca usuário por email e senha (login)
     */
    public Usuario buscarPorEmailSenha(String email, String senha) {
        String sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, email);
            stmt.setString(2, senha);
            
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapearUsuario(rs);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar usuário: " + e.getMessage());
        }
        
        return null;
    }
    
    /**
     * Busca usuário por ID
     */
    public Usuario buscarPorId(int id) {
        String sql = "SELECT * FROM usuarios WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapearUsuario(rs);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar usuário por ID: " + e.getMessage());
        }
        
        return null;
    }
    
    /**
     * Lista todos os profissionais
     */
    public List<Usuario> listarProfissionais() {
        String sql = "SELECT * FROM usuarios WHERE tipo = 'profissional' ORDER BY nome";
        List<Usuario> profissionais = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                profissionais.add(mapearUsuario(rs));
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar profissionais: " + e.getMessage());
        }
        
        return profissionais;
    }
    
    /**
     * Atualiza dados do usuário
     */
    public boolean atualizar(Usuario usuario) {
        String sql = "UPDATE usuarios SET nome = ?, telefone = ?, localizacao = ?, foto_perfil = ?, bio = ?, github_url = ?, disponibilidade = ? WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, usuario.getNome());
            stmt.setString(2, usuario.getTelefone());
            stmt.setString(3, usuario.getLocalizacao());
            stmt.setString(4, usuario.getFotoPerfil());
            stmt.setString(5, usuario.getBio());
            stmt.setString(6, usuario.getGithubUrl());
            stmt.setString(7, usuario.getDisponibilidade().name().toLowerCase());
            stmt.setInt(8, usuario.getId());
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar usuário: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Verifica se email já existe
     */
    public boolean emailExiste(String email) {
        String sql = "SELECT COUNT(*) FROM usuarios WHERE email = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao verificar email: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Mapeia ResultSet para objeto Usuario
     */
    private Usuario mapearUsuario(ResultSet rs) throws SQLException {
        Usuario usuario = new Usuario();
        usuario.setId(rs.getInt("id"));
        usuario.setNome(rs.getString("nome"));
        usuario.setEmail(rs.getString("email"));
        usuario.setSenha(rs.getString("senha"));
        usuario.setTipo(TipoUsuario.valueOf(rs.getString("tipo").toUpperCase()));
        usuario.setTelefone(rs.getString("telefone"));
        usuario.setLocalizacao(rs.getString("localizacao"));
        usuario.setFotoPerfil(rs.getString("foto_perfil"));
        usuario.setBio(rs.getString("bio"));
        usuario.setGithubUrl(rs.getString("github_url"));
        
        String disponibilidade = rs.getString("disponibilidade");
        if (disponibilidade != null) {
            usuario.setDisponibilidade(Disponibilidade.valueOf(disponibilidade.toUpperCase()));
        }
        
        usuario.setDataCriacao(rs.getTimestamp("data_criacao").toLocalDateTime());
        usuario.setDataAtualizacao(rs.getTimestamp("data_atualizacao").toLocalDateTime());
        
        return usuario;
    }
}