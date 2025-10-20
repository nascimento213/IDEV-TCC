package com.itb.inf2dm.idevplatform.controller;

import com.itb.inf2dm.idevplatform.model.entity.Projeto;
import com.itb.inf2dm.idevplatform.model.services.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/projeto")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjetoController {

    @Autowired
    private ProjetoService projetoService;

    @GetMapping
    public ResponseEntity<List<Projeto>> listarTodosProjetos() {
        return ResponseEntity.ok(projetoService.findAll());
    }

    @GetMapping("/abertos")
    public ResponseEntity<List<Projeto>> listarProjetosAbertos() {
        return ResponseEntity.ok(projetoService.findProjetosAbertos());
    }

    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<List<Projeto>> listarProjetosPorEmpresa(@PathVariable Long empresaId) {
        return ResponseEntity.ok(projetoService.findByEmpresaId(empresaId));
    }

    @GetMapping("/profissional/{profissionalId}")
    public ResponseEntity<List<Projeto>> listarProjetosPorProfissional(@PathVariable Long profissionalId) {
        return ResponseEntity.ok(projetoService.findByProfissionalId(profissionalId));
    }

    @PostMapping
    public ResponseEntity<Projeto> salvarProjeto(@RequestBody Projeto projeto) {
        Projeto novoProjeto = projetoService.save(projeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProjeto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> listarProjetoPorId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(projetoService.findById(Long.parseLong(id)));
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
                    "message", "Projeto não encontrado com o id: " + id
                )
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarProjeto(@PathVariable String id, @RequestBody Projeto projeto) {
        try {
            return ResponseEntity.ok(projetoService.update(Long.parseLong(id), projeto));
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
                    "message", "Projeto não encontrado com o id: " + id
                )
            );
        }
    }



    @PutMapping("/{id}/remover-profissional")
    public ResponseEntity<Projeto> removerProfissional(@PathVariable String id) {
        try {
            Projeto projeto = projetoService.removerProfissional(Long.parseLong(id));
            return ResponseEntity.ok(projeto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarProjetoPorId(@PathVariable String id) {
        try {
            projetoService.delete(Long.parseLong(id));
            return ResponseEntity.ok().body(
                Map.of(
                    "status", 200,
                    "message", "Projeto excluído com sucesso!"
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
                    "message", "Projeto não encontrado com o id: " + id
                )
            );
        }
    }
}