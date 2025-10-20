package com.itb.inf2dm.idevplatform.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "MENSAGEM")
public class Mensagem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "remetente_id", nullable = false)
    private Long remetenteId;
    
    @Column(name = "destinatario_id", nullable = false)
    private Long destinatarioId;
    
    @Column(name = "assunto")
    private String assunto;
    
    @Column(name = "mensagem", nullable = false, columnDefinition = "TEXT")
    private String mensagem;
    
    @Column(name = "anexo")
    private String anexo;
    
    @Column(name = "data_envio")
    private LocalDateTime dataEnvio;
    
    @Column(name = "lida")
    private Boolean lida = false;
    
    @Column(name = "cod_status")
    private Boolean codStatus = true;
    
    // Constructors
    public Mensagem() {
        this.dataEnvio = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getRemetenteId() { return remetenteId; }
    public void setRemetenteId(Long remetenteId) { this.remetenteId = remetenteId; }
    
    public Long getDestinatarioId() { return destinatarioId; }
    public void setDestinatarioId(Long destinatarioId) { this.destinatarioId = destinatarioId; }
    
    public String getAssunto() { return assunto; }
    public void setAssunto(String assunto) { this.assunto = assunto; }
    
    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
    
    public String getAnexo() { return anexo; }
    public void setAnexo(String anexo) { this.anexo = anexo; }
    
    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }
    
    public Boolean getLida() { return lida; }
    public void setLida(Boolean lida) { this.lida = lida; }
    
    public Boolean getCodStatus() { return codStatus; }
    public void setCodStatus(Boolean codStatus) { this.codStatus = codStatus; }
}