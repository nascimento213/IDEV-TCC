package com.idev.controller;

import com.idev.dao.UsuarioDAO;
import com.idev.model.Usuario;
import com.idev.model.Usuario.TipoUsuario;
import com.google.gson.Gson;

import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

@WebServlet("/api/usuarios/*")
public class UsuarioController extends HttpServlet {
    private UsuarioDAO usuarioDAO = new UsuarioDAO();
    private Gson gson = new Gson();
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        
        String pathInfo = req.getPathInfo();
        
        if ("/login".equals(pathInfo)) {
            // Login
            LoginRequest loginReq = gson.fromJson(req.getReader(), LoginRequest.class);
            Usuario usuario = usuarioDAO.buscarPorEmailSenha(loginReq.email, loginReq.senha);
            
            if (usuario != null) {
                resp.getWriter().write(gson.toJson(usuario));
            } else {
                resp.setStatus(401);
                resp.getWriter().write("{\"error\":\"Credenciais inválidas\"}");
            }
            
        } else if ("/cadastro".equals(pathInfo)) {
            // Cadastro
            CadastroRequest cadReq = gson.fromJson(req.getReader(), CadastroRequest.class);
            
            if (usuarioDAO.emailExiste(cadReq.email)) {
                resp.setStatus(400);
                resp.getWriter().write("{\"error\":\"Email já existe\"}");
                return;
            }
            
            Usuario usuario = new Usuario(cadReq.nome, cadReq.email, cadReq.senha, 
                                        TipoUsuario.valueOf(cadReq.tipo.toUpperCase()));
            
            if (usuarioDAO.inserir(usuario)) {
                resp.getWriter().write(gson.toJson(usuario));
            } else {
                resp.setStatus(500);
                resp.getWriter().write("{\"error\":\"Erro ao criar usuário\"}");
            }
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        
        String pathInfo = req.getPathInfo();
        
        if ("/profissionais".equals(pathInfo)) {
            resp.getWriter().write(gson.toJson(usuarioDAO.listarProfissionais()));
        }
    }
    
    // Classes auxiliares
    static class LoginRequest {
        String email, senha;
    }
    
    static class CadastroRequest {
        String nome, email, senha, tipo;
    }
}