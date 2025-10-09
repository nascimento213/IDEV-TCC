package com.itb.inf2dm.idevplatform.controller;

import com.itb.inf2dm.idevplatform.model.entity.Request;
import com.itb.inf2dm.idevplatform.model.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/request")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping
    public ResponseEntity<Request> criarRequest(@RequestBody Request request) {
        Request novoRequest = requestService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoRequest);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Request>> listarRequestsDoUsuario(@PathVariable Long usuarioId) {
        List<Request> requests = requestService.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping
    public ResponseEntity<List<Request>> listarTodosRequests() {
        return ResponseEntity.ok(requestService.findAll());
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> contarRequests() {
        Long count = requestService.countActiveRequests();
        return ResponseEntity.ok(Map.of("count", count));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletarRequest(@PathVariable Long id) {
        try {
            requestService.delete(id);
            return ResponseEntity.ok(Map.of("message", "Request excluído com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                Map.of("error", "Request não encontrado")
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarRequestPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(requestService.findById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                Map.of("error", "Request não encontrado")
            );
        }
    }
}