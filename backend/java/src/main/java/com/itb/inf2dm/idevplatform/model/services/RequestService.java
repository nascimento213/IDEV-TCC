package com.itb.inf2dm.idevplatform.model.services;

import com.itb.inf2dm.idevplatform.model.entity.Request;
import com.itb.inf2dm.idevplatform.model.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public Request save(Request request) {
        request.setCodStatus(true);
        request.setDataEnvio(LocalDateTime.now());
        return requestRepository.save(request);
    }

    public List<Request> findByUsuarioId(Long usuarioId) {
        return requestRepository.findByUsuarioId(usuarioId);
    }
    
    public List<Request> findByRemetenteId(Long remetenteId) {
        return requestRepository.findByRemetenteId(remetenteId);
    }
    
    public List<Request> findByDestinatarioId(Long destinatarioId) {
        return requestRepository.findByDestinatarioId(destinatarioId);
    }

    public List<Request> findAll() {
        return requestRepository.findAll();
    }

    public Request findById(Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request não encontrado com o id: " + id));
    }

    public void delete(Long id) {
        Request request = findById(id);
        request.setCodStatus(false);
        requestRepository.save(request);
    }

    public Long countActiveRequests() {
        return requestRepository.countActiveRequests();
    }
}