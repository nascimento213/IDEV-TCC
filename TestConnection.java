import java.sql.*;

public class TestConnection {
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=bd_IDev_Platform;integratedSecurity=true;encrypt=false";
        
        try {
            Connection conn = DriverManager.getConnection(url);
            System.out.println("Conexão bem-sucedida!");
            
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT COUNT(*) as total FROM USUARIO");
            
            if (rs.next()) {
                System.out.println("Total de usuários: " + rs.getInt("total"));
            }
            
            conn.close();
        } catch (Exception e) {
            System.out.println("Erro na conexão: " + e.getMessage());
            e.printStackTrace();
        }
    }
}