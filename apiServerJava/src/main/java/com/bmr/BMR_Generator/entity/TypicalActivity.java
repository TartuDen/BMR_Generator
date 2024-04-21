package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

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
    
    @Column(name = "operationtype")
    @NonNull
    private String operationType;
    
    @Column(name = "content")
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
    private Integer initialTempSet;
    
    @Column(name = "processtemp")
    private Integer processTemp;
    
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
    private Integer vpumpTorrProcess;
    
    @Column(name = "vpumptorrmin")
    private Double vpumpTorrMin;
    
    @Column(name = "vpumptorrmax")
    private Double vpumpTorrMax;
    
    @OneToMany(mappedBy = "typicalActivity", cascade = CascadeType.ALL)
    private List<AdditionalEquipment> additionalEquipment;
    
    public void addAdditionalEquipment (AdditionalEquipment additionalEquipment) {
        if (this.additionalEquipment == null) {
            this.additionalEquipment = new ArrayList<>();
        }
        this.additionalEquipment.add(additionalEquipment);
        additionalEquipment.setTypicalActivity(this);
    }
}
