package com.itb.inf2dm.pizzariad.model.repository;

import com.itb.inf2dm.pizzariad.model.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    
    @Query("SELECT r FROM Request r WHERE r.usuarioId = ?1 AND r.codStatus = true ORDER BY r.dataEnvio DESC")
    List<Request> findByUsuarioId(Long usuarioId);
    
    @Query("SELECT COUNT(r) FROM Request r WHERE r.codStatus = true")
    Long countActiveRequests();
}