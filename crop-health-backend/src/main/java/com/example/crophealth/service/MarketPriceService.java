package com.example.crophealth.service;

import com.example.crophealth.model.MarketPrice;
import com.example.crophealth.repository.MarketPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class MarketPriceService {

    @Autowired
    private MarketPriceRepository marketPriceRepository;

    @Value("${gov.api.key:NONE}")
    private String apiKey;

    public MarketPrice fetchMarketPrice(String crop, String location) {
        if ("NONE".equals(apiKey)) {
            MarketPrice mock = MarketPrice.builder()
                .crop(crop)
                .price(4500.0 + (Math.random() * 500))
                .market(location)
                .date(LocalDateTime.now())
                .build();
            return marketPriceRepository.save(mock);
        }
        return null;
    }

    public Optional<MarketPrice> getLatestPrice(String crop) {
        return marketPriceRepository.findFirstByCropOrderByDateDesc(crop);
    }
}
