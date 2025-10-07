package com.itb.inf2dm.pizzariad.model.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "PROJETO")
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 200, nullable = false)
    private String titulo;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String descricao;
    
    @Column(name = "CLIENTE_ID", nullable = false)
    private Long clienteId;
    
    @Column(name = "PROFISSIONAL_ID")
    private Long profissionalId;
    
    @Column(name = "ORCAMENTO_MIN", columnDefinition = "DECIMAL(10,2)")
    private BigDecimal orcamentoMin;
    
    @Column(name = "ORCAMENTO_MAX", columnDefinition = "DECIMAL(10,2)")
    private BigDecimal orcamentoMax;
    
    @Column(length = 20)
    private String status = "ABERTO";
    
    @Column(name = "IMAGEM_URL", length = 255)
    private String imagemUrl;
    
    @Column(name = "COD_STATUS")
    private boolean codStatus = true;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }
    
    public Long getProfissionalId() { return profissionalId; }
    public void setProfissionalId(Long profissionalId) { this.profissionalId = profissionalId; }
    
    public BigDecimal getOrcamentoMin() { return orcamentoMin; }
    public void setOrcamentoMin(BigDecimal orcamentoMin) { this.orcamentoMin = orcamentoMin; }
    
    public BigDecimal getOrcamentoMax() { return orcamentoMax; }
    public void setOrcamentoMax(BigDecimal orcamentoMax) { this.orcamentoMax = orcamentoMax; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
    
    public boolean isCodStatus() { return codStatus; }
    public void setCodStatus(boolean codStatus) { this.codStatus = codStatus; }
}