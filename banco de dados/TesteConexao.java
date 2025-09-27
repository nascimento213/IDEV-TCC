package com.idev.test;

import com.idev.dao.UsuarioDAO;
import com.idev.model.Usuario;
import com.idev.model.Usuario.TipoUsuario;

public class TesteConexao {
    public static void main(String[] args) {
        // Teste de conexão e inserção
        Usuario usuario = new Usuario("Teste User", "teste@email.com", "123456", TipoUsuario.CLIENTE);
        
        UsuarioDAO dao = new UsuarioDAO();
        
        if (dao.inserir(usuario)) {
            System.out.println("✅ Banco funcionando! Usuário inserido com ID: " + usuario.getId());
        } else {
            System.out.println("❌ Erro na conexão com o banco");
        }
        
        // Teste de busca
        Usuario encontrado = dao.buscarPorEmailSenha("teste@email.com", "123456");
        if (encontrado != null) {
            System.out.println("✅ Busca funcionando! Usuário: " + encontrado.getNome());
        }
    }
}