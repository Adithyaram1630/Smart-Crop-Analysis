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
        if ("NONE".equals(apiKey) || apiKey.startsWith("YOUR_")) {
            WeatherData mockData = WeatherData.builder()
                .timestamp(LocalDateTime.now())
                .temperature(28.5 + (Math.random() * 4 - 2))
                .humidity(65.0 + (Math.random() * 10 - 5))
                .rainfall(Math.random() > 0.8 ? 1.5 : 0.0)
                .forecast("Partly Cloudy")
                .city(city)
                .build();
            return weatherDataRepository.save(mockData);
        }

        try {
            // Set timeouts for RestTemplate
            org.springframework.http.client.SimpleClientHttpRequestFactory factory = new org.springframework.http.client.SimpleClientHttpRequestFactory();
            factory.setConnectTimeout(5000);
            factory.setReadTimeout(5000);
            RestTemplate timeoutRestTemplate = new RestTemplate(factory);

            String url = String.format("%s?q=%s&appid=%s&units=metric", apiUrl, city, apiKey);
            @SuppressWarnings("unchecked")
            Map<String, Object> response = timeoutRestTemplate.getForObject(url, Map.class);
            
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
                    .city(city)
                    .build();
                return weatherDataRepository.save(data);
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch live weather: " + e.getMessage());
        }
        return null;
    }

    public WeatherData getLatestWeather() {
        return getLatestWeather("Hyderabad");
    }

    public WeatherData getLatestWeather(String city) {
        List<WeatherData> lastSeven = weatherDataRepository.findTop7ByOrderByTimestampDesc();
        WeatherData latest = lastSeven.stream().findFirst().orElse(null);
        
        // If data is missing or older than 30 mins, fetch new data
        if (latest == null || latest.getTimestamp().isBefore(LocalDateTime.now().minusMinutes(30))) {
            return fetchAndStoreWeather(city);
        }
        return latest;
    }
}
