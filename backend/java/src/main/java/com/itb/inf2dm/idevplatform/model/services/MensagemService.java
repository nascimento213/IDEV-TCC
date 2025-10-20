package com.itb.inf2dm.idevplatform.model.services;

import com.itb.inf2dm.idevplatform.model.entity.Mensagem;
import com.itb.inf2dm.idevplatform.model.repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensagemService {
    
    @Autowired
    private MensagemRepository mensagemRepository;
    
    public Mensagem save(Mensagem mensagem) {
        return mensagemRepository.save(mensagem);
    }
    
    public List<Mensagem> findByDestinatarioId(Long destinatarioId) {
        return mensagemRepository.findByDestinatarioId(destinatarioId);
    }
    
    public List<Mensagem> findByRemetenteId(Long remetenteId) {
        return mensagemRepository.findByRemetenteId(remetenteId);
    }
}