package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "typicalactivity")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class TypicalActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "activitytype")
    @NonNull
    private String activityType;
    
    @Column(name = "content", length = 1000)
    private String content;
    
    @Column(name = "other")
    private String other;
    
    @Column(name = "durationmin")
    private Integer durationMin;
    
    @Column(name = "durationmax")
    private Integer durationMax;
    
    @Column(name = "targettempmin")
    private Double targetTempMin;
    
    @Column(name = "targettempmax")
    private Double targetTempMax;
    
    @Column(name = "initialtempset")
    private Double initialTempSet;
    
    @Column(name = "finaltempset")
    private Double finaltempset;
    
    @Column(name = "processtemp")
    private Double processTemp;
    
    @Column(name = "rpmmin")
    private Double rpmMin;
    
    @Column(name = "rpmmax")
    private Double rpmMax;
    
    @Column(name = "flowmin")
    private Double flowMin;
    
    @Column(name = "flowmax")
    private Double flowMax;
    
    @Column(name = "ppumpsetmin")
    private Double ppumpSetMin;
    
    @Column(name = "ppumpsetmax")
    private Double ppumpSetMax;
    
    @Column(name = "vpumptorrprocess")
    private Double vpumpTorrProcess;
    
    @Column(name = "vpumptorrmin")
    private Double vpumpTorrMin;
    
    @Column(name = "vpumptorrmax")
    private Double vpumpTorrMax;
    
    @OneToOne(mappedBy = "typicalActivity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private ProcessOperation processOperation;
    
    @OneToMany(
            mappedBy = "typicalactivity",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<ProcessEquipment> processEquipments = new ArrayList<>();
}
