package com.itb.inf2dm.pizzariad.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "REQUEST")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "USUARIO_ID", nullable = false)
    private Long usuarioId;
    
    @Column(length = 20, nullable = false)
    private String categoria;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String mensagem;
    
    @Column(length = 10)
    private String prioridade;
    
    @Column(length = 500)
    private String anexo;
    
    @Column(name = "DATA_ENVIO", nullable = false)
    private LocalDateTime dataEnvio = LocalDateTime.now();
    
    @Column(name = "COD_STATUS")
    private boolean codStatus = true;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    
    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
    
    public String getPrioridade() { return prioridade; }
    public void setPrioridade(String prioridade) { this.prioridade = prioridade; }
    
    public String getAnexo() { return anexo; }
    public void setAnexo(String anexo) { this.anexo = anexo; }
    
    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }
    
    public boolean isCodStatus() { return codStatus; }
    public void setCodStatus(boolean codStatus) { this.codStatus = codStatus; }
}