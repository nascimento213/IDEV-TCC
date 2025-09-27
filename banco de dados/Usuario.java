package com.idev.model;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Classe modelo para representar um usuário do sistema
 */
public class Usuario {
    private int id;
    private String nome;
    private String email;
    private String senha;
    private TipoUsuario tipo;
    private String telefone;
    private String localizacao;
    private String fotoPerfil;
    private String bio;
    private String githubUrl;
    private Disponibilidade disponibilidade;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
    private List<Skill> skills;
    
    public enum TipoUsuario {
        CLIENTE, PROFISSIONAL
    }
    
    public enum Disponibilidade {
        DISPONIVEL, OCUPADO, INDISPONIVEL
    }
    
    // Construtores
    public Usuario() {}
    
    public Usuario(String nome, String email, String senha, TipoUsuario tipo) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.disponibilidade = Disponibilidade.DISPONIVEL;
        this.dataCriacao = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
    }
    
    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    
    public TipoUsuario getTipo() { return tipo; }
    public void setTipo(TipoUsuario tipo) { this.tipo = tipo; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }
    
    public String getFotoPerfil() { return fotoPerfil; }
    public void setFotoPerfil(String fotoPerfil) { this.fotoPerfil = fotoPerfil; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    
    public Disponibilidade getDisponibilidade() { return disponibilidade; }
    public void setDisponibilidade(Disponibilidade disponibilidade) { this.disponibilidade = disponibilidade; }
    
    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
    
    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) { this.dataAtualizacao = dataAtualizacao; }
    
    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }
    
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", tipo=" + tipo +
                ", disponibilidade=" + disponibilidade +
                '}';
    }
}