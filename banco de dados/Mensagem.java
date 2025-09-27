package com.idev.model;

import java.time.LocalDateTime;

/**
 * Classe modelo para representar uma mensagem do chat
 */
public class Mensagem {
    private int id;
    private int conversaId;
    private int remetenteId;
    private String conteudo;
    private boolean lida;
    private LocalDateTime dataEnvio;
    private Usuario remetente;
    
    // Construtores
    public Mensagem() {}
    
    public Mensagem(int conversaId, int remetenteId, String conteudo) {
        this.conversaId = conversaId;
        this.remetenteId = remetenteId;
        this.conteudo = conteudo;
        this.lida = false;
        this.dataEnvio = LocalDateTime.now();
    }
    
    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public int getConversaId() { return conversaId; }
    public void setConversaId(int conversaId) { this.conversaId = conversaId; }
    
    public int getRemetenteId() { return remetenteId; }
    public void setRemetenteId(int remetenteId) { this.remetenteId = remetenteId; }
    
    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }
    
    public boolean isLida() { return lida; }
    public void setLida(boolean lida) { this.lida = lida; }
    
    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }
    
    public Usuario getRemetente() { return remetente; }
    public void setRemetente(Usuario remetente) { this.remetente = remetente; }
    
    @Override
    public String toString() {
        return "Mensagem{" +
                "id=" + id +
                ", conversaId=" + conversaId +
                ", remetenteId=" + remetenteId +
                ", conteudo='" + conteudo + '\'' +
                ", lida=" + lida +
                ", dataEnvio=" + dataEnvio +
                '}';
    }
}