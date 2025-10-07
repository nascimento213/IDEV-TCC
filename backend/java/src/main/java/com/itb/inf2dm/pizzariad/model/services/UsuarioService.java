package com.itb.inf2dm.pizzariad.model.services;

import com.itb.inf2dm.pizzariad.model.entity.Usuario;
import com.itb.inf2dm.pizzariad.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario save(Usuario usuario) {
        usuario.setCodStatus(true);
        return usuarioRepository.save(usuario);
    }

    public Usuario findById(Long id) {
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

    public Usuario update(Long id, Usuario usuario) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setNome(usuario.getNome());
        usuarioExistente.setTelefone(usuario.getTelefone());
        usuarioExistente.setLocalizacao(usuario.getLocalizacao());
        usuarioExistente.setFotoPerfil(usuario.getFotoPerfil());
        usuarioExistente.setBio(usuario.getBio());
        usuarioExistente.setGithubUrl(usuario.getGithubUrl());
        usuarioExistente.setDisponibilidade(usuario.getDisponibilidade());
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
}