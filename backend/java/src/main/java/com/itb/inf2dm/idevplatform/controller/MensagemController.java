package com.itb.inf2dm.idevplatform.controller;

import com.itb.inf2dm.idevplatform.model.entity.Mensagem;
import com.itb.inf2dm.idevplatform.model.services.MensagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mensagem")
public class MensagemController {
    
    @Autowired
    private MensagemService mensagemService;
    
    @PostMapping
    public ResponseEntity<Mensagem> criarMensagem(@RequestBody Mensagem mensagem) {
        Mensagem novaMensagem = mensagemService.save(mensagem);
        return ResponseEntity.ok(novaMensagem);
    }
    
    @GetMapping
    public ResponseEntity<String> info() {
        return ResponseEntity.ok("Endpoint de mensagens funcionando");
    }
    
    @GetMapping("/recebidas/{destinatarioId}")
    public ResponseEntity<List<Mensagem>> getMensagensRecebidas(@PathVariable Long destinatarioId) {
        List<Mensagem> mensagens = mensagemService.findByDestinatarioId(destinatarioId);
        return ResponseEntity.ok(mensagens);
    }
    
    @GetMapping("/enviadas/{remetenteId}")
    public ResponseEntity<List<Mensagem>> getMensagensEnviadas(@PathVariable Long remetenteId) {
        List<Mensagem> mensagens = mensagemService.findByRemetenteId(remetenteId);
        return ResponseEntity.ok(mensagens);
    }
}