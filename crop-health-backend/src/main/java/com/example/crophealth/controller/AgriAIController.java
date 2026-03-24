package com.example.crophealth.controller;

import com.example.crophealth.model.*;
import com.example.crophealth.repository.*;
import com.example.crophealth.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") 
public class AgriAIController {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private MarketPriceService marketPriceService;

    @Autowired
    private AgriAIService aiService;

    @Autowired
    private VoiceService voiceService;

    @Autowired
    private ScanRepository scanRepository;

    @GetMapping("/scans")
    public List<Scan> getAllScans() {
        return scanRepository.findAllByOrderByIdDesc();
    }

    @PostMapping("/scans")
    public Scan saveScan(@RequestBody Scan scan) {
        return scanRepository.save(scan);
    }

    @DeleteMapping("/scans")
    public void deleteAllScans() {
        scanRepository.deleteAll();
    }

    @GetMapping("/weather")
    public WeatherData getLatestWeather() {
        return weatherService.getLatestWeather();
    }

    @GetMapping("/market-prices")
    public MarketPrice getMarketPrice(@RequestParam(defaultValue = "Rice") String crop, @RequestParam(defaultValue = "Hyderabad") String location) {
        return marketPriceService.fetchMarketPrice(crop, location);
    }

    @GetMapping("/disease-alerts")
    public List<String> getDiseaseAlerts(@RequestParam(defaultValue = "Rice") String crop) {
        WeatherData latest = weatherService.getLatestWeather();
        return aiService.generateDiseaseAlerts(crop, latest);
    }

    @GetMapping("/tips")
    public String getFarmingTips(@RequestParam(defaultValue = "Rice") String crop) {
        WeatherData latest = weatherService.getLatestWeather();
        return aiService.generateFarmerAdvice(crop, latest);
    }

    @GetMapping("/notifications")
    public List<Notification> getNotifications(@RequestParam(defaultValue = "en-US") String lang) {
        return aiService.generateNotifications(lang);
    }

    @PostMapping(value = "/analyze", produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> analyzeCrop(@RequestBody Map<String, String> body) {
        String cropType = body.getOrDefault("cropType", "Rice");
        String imageUrl = body.get("imageUrl"); // Get Base64 image
        
        Map<String, Object> scanResult = aiService.analyzeImage(imageUrl, cropType);
        
        if (scanResult.containsKey("error")) {
            return ResponseEntity.badRequest().body(scanResult);
        }

        // Return the clean JSON string from Gemini directly as the response body
        return ResponseEntity.ok(scanResult.get("raw_ai_data"));
    }

    @PostMapping("/voice")
    public Map<String, String> getVoiceAdvice(@RequestBody Map<String, String> body) {
        String text = body.get("text");
        String lang = body.getOrDefault("lang", "en-US");
        String base64Audio = voiceService.convertTextToSpeech(text, lang);
        return Map.of("audio", base64Audio);
    }
}
