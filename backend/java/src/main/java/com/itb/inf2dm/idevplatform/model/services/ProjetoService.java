package com.itb.inf2dm.idevplatform.model.services;

import com.itb.inf2dm.idevplatform.model.entity.Projeto;
import com.itb.inf2dm.idevplatform.model.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    public List<Projeto> findAll() {
        return projetoRepository.findAll();
    }

    public Projeto save(Projeto projeto) {
        projeto.setCodStatus(true);
        return projetoRepository.save(projeto);
    }

    public Projeto findById(Long id) {
        return projetoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado com o id: " + id));
    }

    public List<Projeto> findProjetosAbertos() {
        return projetoRepository.findProjetosAbertos();
    }

    public List<Projeto> findByEmpresaId(Long empresaId) {
        return projetoRepository.findByEmpresaId(empresaId);
    }

    public List<Projeto> findByProfissionalId(Long profissionalId) {
        return projetoRepository.findByProfissionalId(profissionalId);
    }

    public Projeto update(Long id, Projeto projeto) {
        Projeto projetoExistente = findById(id);
        projetoExistente.setTitulo(projeto.getTitulo());
        projetoExistente.setDescricao(projeto.getDescricao());
        projetoExistente.setOrcamentoMin(projeto.getOrcamentoMin());
        projetoExistente.setOrcamentoMax(projeto.getOrcamentoMax());
        projetoExistente.setStatus(projeto.getStatus());

        projetoExistente.setProfissionalId(projeto.getProfissionalId());
        return projetoRepository.save(projetoExistente);
    }



    public Projeto removerProfissional(Long projetoId) {
        Projeto projeto = findById(projetoId);
        projeto.setProfissionalId(null);
        projeto.setStatus("ABERTO");
        return projetoRepository.save(projeto);
    }

    public void delete(Long id) {
        Projeto projeto = findById(id);
        projeto.setCodStatus(false);
        projetoRepository.save(projeto);
    }
}