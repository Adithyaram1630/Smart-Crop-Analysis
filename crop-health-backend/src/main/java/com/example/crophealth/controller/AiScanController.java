package com.example.crophealth.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analyze")
@CrossOrigin(origins = "http://localhost:3000")
public class AiScanController {

    private final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

    @org.springframework.beans.factory.annotation.Value("${gemini.api.key}")
    private String apiKey;

    @PostMapping
    public ResponseEntity<?> analyzeImage(@RequestBody Map<String, String> body) {

        String base64Image = body.get("image");
        String cropType = body.getOrDefault("cropType", "Unknown Crop");

        if (base64Image == null || !base64Image.contains(",")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or missing image data"));
        }

        // Extract mime type and the actual base64 string
        String[] parts = base64Image.split(",");
        String mimeType = parts[0].substring(parts[0].indexOf(":") + 1, parts[0].indexOf(";"));
        String pureBase64 = parts[1];

        String promptText = "You are an expert agronomist. Analyze this " + cropType
                + " leaf. Identify what disease is present, if any. " +
                "Provide necessary information like precautions. FIRST AND FOREMOST importantly, suggest precise ORGANIC METHODS to reduce the disease, and THEN suggest chemical fertilizers. "
                +
                "Respond ONLY with a valid JSON object matching exactly this schema, with no markdown formatting or backticks: "
                +
                "{\"disease\":\"disease name\", \"severity\":\"High\"|\"Medium\"|\"Low\"|\"Healthy\", \"status\":\"alert\"|\"warning\"|\"healthy\", \"confidence\":95, \"recommendations\":[\"Organic: xyz\", \"Fertilizer: abc\"]}";

        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Construct Gemini API JSON body
            Map<String, Object> inlineData = new HashMap<>();
            inlineData.put("mime_type", mimeType);
            inlineData.put("data", pureBase64);

            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", promptText);

            Map<String, Object> imagePart = new HashMap<>();
            imagePart.put("inline_data", inlineData);

            List<Object> partsList = new ArrayList<>();
            partsList.add(textPart);
            partsList.add(imagePart);

            Map<String, Object> contentInfo = new HashMap<>();
            contentInfo.put("parts", partsList);

            List<Object> contentsList = new ArrayList<>();
            contentsList.add(contentInfo);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", contentsList);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(GEMINI_API_URL + apiKey, entity, Map.class);

            // Extract the generated text from Gemini response
            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, Object>> resParts = (List<Map<String, Object>>) content.get("parts");
            String generatedText = (String) resParts.get(0).get("text");

            // Clean up potentially returned markdown backticks like ```json ... ```
            String cleanJson = generatedText.replaceAll("^```json", "").replaceAll("```$", "").trim();

            return ResponseEntity.ok(cleanJson);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "AI Analysis failed: " + e.getMessage()));
        }
    }
}
