package com.example.crophealth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.logging.Logger;

@Component
public class WeatherScheduler {

    private static final Logger logger = Logger.getLogger(WeatherScheduler.class.getName());

    @Autowired
    private WeatherService weatherService;

    // Run every 3 hours: 1000ms * 60 * 60 * 3 = 10800000ms
    @Scheduled(fixedRate = 10800000)
    public void scheduleWeatherUpdate() {
        logger.info("Executing periodic weather update...");
        // For production, location could be stored per farmer, 
        // we'll fetch default for primary location here.
        weatherService.fetchAndStoreWeather("Hyderabad");
        logger.info("Weather update completed successfully.");
    }
}
