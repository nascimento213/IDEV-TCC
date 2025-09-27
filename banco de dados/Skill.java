package com.idev.model;

/**
 * Classe modelo para representar uma skill/tecnologia
 */
public class Skill {
    private int id;
    private String nome;
    private int categoriaId;
    private Categoria categoria;
    
    public enum NivelSkill {
        INICIANTE, INTERMEDIARIO, AVANCADO, EXPERT
    }
    
    // Construtores
    public Skill() {}
    
    public Skill(String nome, int categoriaId) {
        this.nome = nome;
        this.categoriaId = categoriaId;
    }
    
    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public int getCategoriaId() { return categoriaId; }
    public void setCategoriaId(int categoriaId) { this.categoriaId = categoriaId; }
    
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    
    @Override
    public String toString() {
        return "Skill{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", categoriaId=" + categoriaId +
                '}';
    }
}