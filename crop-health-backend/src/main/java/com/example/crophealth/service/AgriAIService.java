package com.example.crophealth.service;

import com.example.crophealth.model.Notification;
import com.example.crophealth.model.WeatherData;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AgriAIService {

    public Map<String, Object> analyzeImage(String base64Image, String cropType) {
        Map<String, Object> result = new HashMap<>();

        if (base64Image == null || base64Image.length() < 100) {
            result.put("error", "INVALID_DATA");
            result.put("message", "No image data detected. Please upload a clear plant-related photo.");
            return result;
        }

        // Randomly simulate different plant parts for the demo
        double rand = Math.random();
        String partAffected = rand > 0.7 ? "Soil/Roots" : rand > 0.4 ? "Leaves" : "Fruits/Branches";
        boolean isHealthy = Math.random() > 0.6;

        if (isHealthy) {
            result.put("disease", "Healthy Plant Sample");
            result.put("severity", "Healthy");
            result.put("status", "healthy");
            result.put("confidence", 99);
            result.put("organic_treatments", List.of("✅ No treatment needed", "🌿 Regular watering only"));
            result.put("pesticide_usage", List.of("🚫 Not required"));
            result.put("summary", "• PART: " + partAffected + "\n• STATUS: No active threats\n• RISK: Low\n• ADVICE: Everything looks excellent.");
        } else {
            String foundIssue = partAffected.equals("Soil/Roots") ? "Nutrient Deficiency" : 
                             partAffected.equals("Leaves") ? "Fungal Outbreak" : "Insect Infestation";

            result.put("disease", foundIssue);
            result.put("severity", "Medium");
            result.put("status", "warning");
            result.put("confidence", 91);
            result.put("organic_treatments", List.of("🌿 Apply organic compost powder", "🍃 Use Neem-based solutions"));
            result.put("pesticide_usage", List.of("🧪 Consider generic bio-pesticides"));
            result.put("summary", "• PART: " + partAffected + "\n• ISSUE: " + foundIssue + "\n• IMPACT: Potential 10% yield reduction\n• URGENCY: Moderate (Act within 48h)");
        }

        return result;
    }

    public List<String> generateDiseaseAlerts(String crop, WeatherData weather) {
        return List.of("🚩 Plant Monitoring: Current soil moisture is optimal for " + crop);
    }

    public String generateFarmerAdvice(String crop, WeatherData weather) {
        return "Expert Insight: Check the underside of the leaves for small white spots.";
    }

    public List<Notification> generateNotifications(String crop) {
        Notification n = new Notification();
        n.setId(1L);
        n.setMessage("System: Plant health monitoring service is running in real-time.");
        return List.of(n);
    }
}
