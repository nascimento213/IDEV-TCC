package com.itb.inf2dm.idevplatform.controller;

import com.itb.inf2dm.idevplatform.model.entity.Candidatura;
import com.itb.inf2dm.idevplatform.model.services.CandidaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/candidatura")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidaturaController {

    @Autowired
    private CandidaturaService candidaturaService;

    @PostMapping
    public ResponseEntity<Object> criarCandidatura(@RequestBody Candidatura candidatura) {
        try {
            Candidatura novaCandidatura = candidaturaService.save(candidatura);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaCandidatura);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                Map.of("message", e.getMessage())
            );
        }
    }

    @GetMapping("/projeto/{projetoId}")
    public ResponseEntity<List<Candidatura>> listarCandidaturasPorProjeto(@PathVariable Long projetoId) {
        return ResponseEntity.ok(candidaturaService.findByProjetoId(projetoId));
    }

    @PutMapping("/{id}/aceitar")
    public ResponseEntity<Candidatura> aceitarCandidatura(@PathVariable Long id) {
        try {
            Candidatura candidatura = candidaturaService.aceitarCandidatura(id);
            return ResponseEntity.ok(candidatura);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/negar")
    public ResponseEntity<Candidatura> negarCandidatura(@PathVariable Long id) {
        try {
            Candidatura candidatura = candidaturaService.negarCandidatura(id);
            return ResponseEntity.ok(candidatura);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCandidatura(@PathVariable Long id) {
        try {
            candidaturaService.excluirCandidatura(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}