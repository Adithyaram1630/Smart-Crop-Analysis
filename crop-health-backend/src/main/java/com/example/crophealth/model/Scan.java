package com.example.crophealth.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "scans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Scan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String crop;
    private String disease;
    private String severity;
    private String status;
    private String date;
    private Integer confidence;
    
    @Column(columnDefinition = "TEXT")
    private String image;

    @ElementCollection
    private List<String> organicTreatments;

    @ElementCollection
    private List<String> pesticideUsage;

    @Column(columnDefinition = "TEXT")
    private String summary;
}
