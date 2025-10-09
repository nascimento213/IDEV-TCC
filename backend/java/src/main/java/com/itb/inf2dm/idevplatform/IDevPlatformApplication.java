package com.itb.inf2dm.idevplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IDevPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(IDevPlatformApplication.class, args);
		System.out.println("IDev Platform API rodando na porta 8080");
	}

}