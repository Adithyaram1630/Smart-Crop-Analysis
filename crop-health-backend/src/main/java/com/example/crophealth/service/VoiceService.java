package com.example.crophealth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class VoiceService {

    @Value("${tts.api.key:NONE}")
    private String ttsKey;

    public String convertTextToSpeech(String text, String languageCode) {
        String voiceName = "en-US-Standard-C";
        if ("te-IN".equals(languageCode)) {
            voiceName = "te-IN-Standard-A";
        } else if ("hi-IN".equals(languageCode)) {
            voiceName = "hi-IN-Standard-A";
        }

        if ("NONE".equals(ttsKey)) {
            return "data:audio/mp3;base64,...(demo placeholder for " + voiceName + ")";
        }
        
        return "Voice synthesis initialized for: " + text;
    }
}
