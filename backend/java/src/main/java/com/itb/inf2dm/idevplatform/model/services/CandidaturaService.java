package com.itb.inf2dm.idevplatform.model.services;

import com.itb.inf2dm.idevplatform.model.entity.Candidatura;
import com.itb.inf2dm.idevplatform.model.entity.Projeto;
import com.itb.inf2dm.idevplatform.model.repository.CandidaturaRepository;
import com.itb.inf2dm.idevplatform.model.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CandidaturaService {

    @Autowired
    private CandidaturaRepository candidaturaRepository;
    
    @Autowired
    private ProjetoRepository projetoRepository;

    public Candidatura save(Candidatura candidatura) {
        // Verificar se já existe candidatura
        Candidatura existente = candidaturaRepository.findByProjetoIdAndProfissionalId(
            candidatura.getProjetoId(), candidatura.getProfissionalId());
        
        if (existente != null) {
            throw new RuntimeException("Você já se candidatou para este projeto");
        }
        
        return candidaturaRepository.save(candidatura);
    }

    public List<Candidatura> findByProjetoId(Long projetoId) {
        return candidaturaRepository.findByProjetoId(projetoId);
    }

    public List<Candidatura> findByProfissionalId(Long profissionalId) {
        return candidaturaRepository.findByProfissionalId(profissionalId);
    }

    public Candidatura aceitarCandidatura(Long candidaturaId) {
        Candidatura candidatura = candidaturaRepository.findById(candidaturaId)
            .orElseThrow(() -> new RuntimeException("Candidatura não encontrada"));
        
        // Aceitar candidatura
        candidatura.setStatus("ACEITA");
        candidaturaRepository.save(candidatura);
        
        // Atualizar projeto: associar profissional e mudar status
        Projeto projeto = projetoRepository.findById(candidatura.getProjetoId())
            .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
        
        projeto.setProfissionalId(candidatura.getProfissionalId());
        projeto.setStatus("EM_ANDAMENTO");
        projetoRepository.save(projeto);
        
        // Rejeitar todas as outras candidaturas do mesmo projeto
        List<Candidatura> outrasCandidaturas = candidaturaRepository.findByProjetoId(candidatura.getProjetoId());
        for (Candidatura outra : outrasCandidaturas) {
            if (!outra.getId().equals(candidaturaId) && "PENDENTE".equals(outra.getStatus())) {
                outra.setStatus("REJEITADA");
                candidaturaRepository.save(outra);
            }
        }
        
        return candidatura;
    }

    public Candidatura negarCandidatura(Long candidaturaId) {
        Candidatura candidatura = candidaturaRepository.findById(candidaturaId)
            .orElseThrow(() -> new RuntimeException("Candidatura não encontrada"));
        
        candidatura.setStatus("REJEITADA");
        return candidaturaRepository.save(candidatura);
    }
    
    public void excluirCandidatura(Long candidaturaId) {
        Candidatura candidatura = candidaturaRepository.findById(candidaturaId)
            .orElseThrow(() -> new RuntimeException("Candidatura não encontrada"));
        
        candidatura.setCodStatus(false);
        candidaturaRepository.save(candidatura);
    }
}