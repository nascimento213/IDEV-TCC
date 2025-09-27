package com.idev.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Classe modelo para representar um projeto
 */
public class Projeto {
    private int id;
    private String titulo;
    private String descricao;
    private int clienteId;
    private Integer profissionalId;
    private int categoriaId;
    private BigDecimal orcamentoMin;
    private BigDecimal orcamentoMax;
    private Integer prazoDias;
    private StatusProjeto status;
    private String imagemUrl;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataConclusao;
    private List<Skill> skillsNecessarias;
    private Usuario cliente;
    private Usuario profissional;
    private Categoria categoria;
    
    public enum StatusProjeto {
        ABERTO, EM_ANDAMENTO, CONCLUIDO, CANCELADO
    }
    
    // Construtores
    public Projeto() {}
    
    public Projeto(String titulo, String descricao, int clienteId, int categoriaId) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.clienteId = clienteId;
        this.categoriaId = categoriaId;
        this.status = StatusProjeto.ABERTO;
        this.dataCriacao = LocalDateTime.now();
    }
    
    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public int getClienteId() { return clienteId; }
    public void setClienteId(int clienteId) { this.clienteId = clienteId; }
    
    public Integer getProfissionalId() { return profissionalId; }
    public void setProfissionalId(Integer profissionalId) { this.profissionalId = profissionalId; }
    
    public int getCategoriaId() { return categoriaId; }
    public void setCategoriaId(int categoriaId) { this.categoriaId = categoriaId; }
    
    public BigDecimal getOrcamentoMin() { return orcamentoMin; }
    public void setOrcamentoMin(BigDecimal orcamentoMin) { this.orcamentoMin = orcamentoMin; }
    
    public BigDecimal getOrcamentoMax() { return orcamentoMax; }
    public void setOrcamentoMax(BigDecimal orcamentoMax) { this.orcamentoMax = orcamentoMax; }
    
    public Integer getPrazoDias() { return prazoDias; }
    public void setPrazoDias(Integer prazoDias) { this.prazoDias = prazoDias; }
    
    public StatusProjeto getStatus() { return status; }
    public void setStatus(StatusProjeto status) { this.status = status; }
    
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
    
    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
    
    public LocalDateTime getDataConclusao() { return dataConclusao; }
    public void setDataConclusao(LocalDateTime dataConclusao) { this.dataConclusao = dataConclusao; }
    
    public List<Skill> getSkillsNecessarias() { return skillsNecessarias; }
    public void setSkillsNecessarias(List<Skill> skillsNecessarias) { this.skillsNecessarias = skillsNecessarias; }
    
    public Usuario getCliente() { return cliente; }
    public void setCliente(Usuario cliente) { this.cliente = cliente; }
    
    public Usuario getProfissional() { return profissional; }
    public void setProfissional(Usuario profissional) { this.profissional = profissional; }
    
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    
    @Override
    public String toString() {
        return "Projeto{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", status=" + status +
                ", orcamentoMin=" + orcamentoMin +
                ", orcamentoMax=" + orcamentoMax +
                '}';
    }
}