package com.itb.inf2dm.idevplatform.controller;

import com.itb.inf2dm.idevplatform.model.entity.Usuario;
import com.itb.inf2dm.idevplatform.model.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodosUsuarios() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/profissionais")
    public ResponseEntity<List<Usuario>> listarProfissionais() {
        return ResponseEntity.ok(usuarioService.findProfissionais());
    }
    
    @GetMapping("/empresas")
    public ResponseEntity<List<Usuario>> listarEmpresas() {
        return ResponseEntity.ok(usuarioService.findEmpresas());
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String senha = loginData.get("senha");
            Usuario usuario = usuarioService.login(email, senha);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(
                Map.of(
                    "status", 401,
                    "error", "Unauthorized",
                    "message", "Credenciais inválidas"
                )
            );
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Object> cadastro(@RequestBody Usuario usuario) {
        try {
            if (usuarioService.emailExists(usuario.getEmail())) {
                return ResponseEntity.badRequest().body(
                    Map.of(
                        "status", 400,
                        "error", "Bad Request",
                        "message", "Email já cadastrado"
                    )
                );
            }
            Usuario novoUsuario = usuarioService.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                Map.of(
                    "status", 500,
                    "error", "Internal Server Error",
                    "message", "Erro ao cadastrar usuário"
                )
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> listarUsuarioPorId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(usuarioService.findById(Long.parseLong(id)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "status", 400,
                    "error", "Bad Request",
                    "message", "O id informado não é válido: " + id
                )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                Map.of(
                    "status", 404,
                    "error", "Not Found",
                    "message", "Usuário não encontrado com o id: " + id
                )
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
        try {
            return ResponseEntity.ok(usuarioService.update(Long.parseLong(id), usuario));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "status", 400,
                    "error", "Bad Request",
                    "message", "O id informado não é válido: " + id
                )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                Map.of(
                    "status", 404,
                    "error", "Not Found",
                    "message", "Usuário não encontrado com o id: " + id
                )
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarUsuarioPorId(@PathVariable String id) {
        try {
            usuarioService.delete(Long.parseLong(id));
            return ResponseEntity.ok().body(
                Map.of(
                    "status", 200,
                    "message", "Usuário excluído com sucesso!"
                )
            );
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "status", 400,
                    "error", "Bad Request",
                    "message", "O id informado não é válido: " + id
                )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                Map.of(
                    "status", 404,
                    "error", "Not Found",
                    "message", "Usuário não encontrado com o id: " + id
                )
            );
        }
    }
}