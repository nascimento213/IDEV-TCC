package com.itb.inf2dm.pizzariad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PizzariadApplication {

	public static void main(String[] args) {
		SpringApplication.run(PizzariadApplication.class, args);
		System.out.println("API rodando na porta 8080");
	}

}
