package com.example.crophealth.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        // Simple bypass logic for development
        Map<String, Object> response = new HashMap<>();
        Map<String, String> user = new HashMap<>();
        user.put("name", "Ravi Kumar");
        user.put("email", email);

        response.put("token", "agri-ai-dev-token-" + System.currentTimeMillis());
        response.put("user", user);
        
        return response;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, Object> body) {
        return Map.of(
            "message", "Registration successful",
            "token", "agri-ai-dev-token-" + System.currentTimeMillis()
        );
    }
}
