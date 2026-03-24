package com.example.crophealth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CropHealthBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CropHealthBackendApplication.class, args);
	}

}
