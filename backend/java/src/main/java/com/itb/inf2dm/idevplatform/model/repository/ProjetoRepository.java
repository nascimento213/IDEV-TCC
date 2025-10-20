package com.itb.inf2dm.idevplatform.model.repository;

import com.itb.inf2dm.idevplatform.model.entity.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    
    @Query("SELECT p FROM Projeto p WHERE p.status = 'ABERTO' AND p.profissionalId IS NULL AND p.codStatus = true ORDER BY p.id DESC")
    List<Projeto> findProjetosAbertos();
    
    @Query("SELECT p FROM Projeto p WHERE p.empresaId = ?1 AND p.codStatus = true ORDER BY p.id DESC")
    List<Projeto> findByEmpresaId(Long empresaId);
    
    @Query("SELECT p FROM Projeto p WHERE p.profissionalId = ?1 AND p.codStatus = true ORDER BY p.id DESC")
    List<Projeto> findByProfissionalId(Long profissionalId);
}