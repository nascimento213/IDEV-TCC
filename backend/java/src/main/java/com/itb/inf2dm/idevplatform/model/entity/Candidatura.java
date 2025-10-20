package com.itb.inf2dm.idevplatform.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "CANDIDATURA")
public class Candidatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "PROJETO_ID", nullable = false)
    private Long projetoId;
    
    @Column(name = "PROFISSIONAL_ID", nullable = false)
    private Long profissionalId;
    
    @Column(name = "DATA_CANDIDATURA")
    private LocalDateTime dataCandidatura = LocalDateTime.now();
    
    @Column(length = 20)
    private String status = "PENDENTE";
    
    @Column(name = "COD_STATUS")
    private boolean codStatus = true;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getProjetoId() { return projetoId; }
    public void setProjetoId(Long projetoId) { this.projetoId = projetoId; }
    
    public Long getProfissionalId() { return profissionalId; }
    public void setProfissionalId(Long profissionalId) { this.profissionalId = profissionalId; }
    
    public LocalDateTime getDataCandidatura() { return dataCandidatura; }
    public void setDataCandidatura(LocalDateTime dataCandidatura) { this.dataCandidatura = dataCandidatura; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public boolean isCodStatus() { return codStatus; }
    public void setCodStatus(boolean codStatus) { this.codStatus = codStatus; }
}