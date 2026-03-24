package com.example.crophealth.service;

import com.example.crophealth.model.WeatherData;
import com.example.crophealth.repository.WeatherDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;

@Service
public class WeatherService {

    @Autowired
    private WeatherDataRepository weatherDataRepository;

    @Value("${weather.api.key:NONE}")
    private String apiKey;

    @Value("${weather.api.url:https://api.openweathermap.org/data/2.5/weather}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public WeatherData fetchAndStoreWeather(String city) {
        if ("NONE".equals(apiKey)) {
            WeatherData mockData = WeatherData.builder()
                .timestamp(LocalDateTime.now())
                .temperature(28.5)
                .humidity(65.0)
                .rainfall(0.0)
                .forecast("Clear")
                .build();
            return weatherDataRepository.save(mockData);
        }

        String url = String.format("%s?q=%s&appid=%s&units=metric", apiUrl, city, apiKey);
        @SuppressWarnings("unchecked")
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        
        if (response != null && response.containsKey("main")) {
            @SuppressWarnings("unchecked")
            Map<String, Object> main = (Map<String, Object>) response.get("main");
            
            Double temp = main.get("temp") != null ? Double.parseDouble(main.get("temp").toString()) : 0.0;
            Double humidity = main.get("humidity") != null ? Double.parseDouble(main.get("humidity").toString()) : 0.0;
            
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> weatherList = (List<Map<String, Object>>) response.get("weather");
            String forecast = "Clear";
            if (weatherList != null && !weatherList.isEmpty()) {
                forecast = (String) weatherList.get(0).get("main");
            }

            WeatherData data = WeatherData.builder()
                .timestamp(LocalDateTime.now())
                .temperature(temp)
                .humidity(humidity)
                .rainfall(response.containsKey("rain") ? 1.0 : 0.0)
                .forecast(forecast)
                .build();
            return weatherDataRepository.save(data);
        }
        return null;
    }

    public WeatherData getLatestWeather() {
        return weatherDataRepository.findTop7ByOrderByTimestampDesc().stream().findFirst().orElse(null);
    }
}
