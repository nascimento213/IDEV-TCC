package com.itb.inf2dm.idevplatform.model.repository;

import com.itb.inf2dm.idevplatform.model.entity.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {
    
    @Query("SELECT c FROM Candidatura c WHERE c.projetoId = ?1 AND c.codStatus = true ORDER BY c.dataCandidatura DESC")
    List<Candidatura> findByProjetoId(Long projetoId);
    
    @Query("SELECT c FROM Candidatura c WHERE c.profissionalId = ?1 AND c.codStatus = true ORDER BY c.dataCandidatura DESC")
    List<Candidatura> findByProfissionalId(Long profissionalId);
    
    @Query("SELECT c FROM Candidatura c WHERE c.projetoId = ?1 AND c.profissionalId = ?2 AND c.codStatus = true")
    Candidatura findByProjetoIdAndProfissionalId(Long projetoId, Long profissionalId);
}