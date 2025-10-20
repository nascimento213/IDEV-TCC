package com.itb.inf2dm.idevplatform.model.services;

import com.itb.inf2dm.idevplatform.model.entity.Usuario;
import com.itb.inf2dm.idevplatform.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> findAll() {
        return usuarioRepository.findAllAtivos();
    }

    public Usuario save(Usuario usuario) {
        usuario.setCodStatus(true);
        return usuarioRepository.save(usuario);
    }

    public Usuario findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + id));
        if (!usuario.isCodStatus()) {
            throw new RuntimeException("Usuário inativo com o id: " + id);
        }
        return usuario;
    }
    
    public Usuario findByIdIncludeInactive(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + id));
    }

    public Usuario login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha)
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));
    }

    public List<Usuario> findProfissionais() {
        return usuarioRepository.findProfissionais();
    }
    
    public List<Usuario> findEmpresas() {
        return usuarioRepository.findEmpresas();
    }

    public Usuario update(Long id, Usuario usuario) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setNome(usuario.getNome());
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setTipo(usuario.getTipo());
        usuarioExistente.setTelefone(usuario.getTelefone());
        if (usuario.getFotoPerfil() != null) usuarioExistente.setFotoPerfil(usuario.getFotoPerfil());
        if (usuario.getBio() != null) usuarioExistente.setBio(usuario.getBio());
        if (usuario.getGithubUrl() != null) usuarioExistente.setGithubUrl(usuario.getGithubUrl());
        return usuarioRepository.save(usuarioExistente);
    }

    public boolean emailExists(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }

    public void delete(Long id) {
        Usuario usuario = findById(id);
        usuario.setCodStatus(false);
        usuarioRepository.save(usuario);
    }

    public void reativar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + id));
        usuario.setCodStatus(true);
        usuarioRepository.save(usuario);
    }
}