package com.itb.inf2dm.pizzariad.model.repository;

import com.itb.inf2dm.pizzariad.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmailAndSenha(String email, String senha);
    
    Optional<Usuario> findByEmail(String email);
    
    @Query("SELECT u FROM Usuario u WHERE u.tipo = 'profissional' AND u.codStatus = true")
    List<Usuario> findProfissionais();
}