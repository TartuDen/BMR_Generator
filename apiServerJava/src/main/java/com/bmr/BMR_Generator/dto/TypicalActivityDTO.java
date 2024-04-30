package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.TypicalActivity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class TypicalActivityDTO {
    
    private String activityType;
    
    private String content;
    
    private String other;
    
    private Integer durationMin;
    
    private Integer durationMax;
    
    private Double targetTempMin;
    
    private Double targetTempMax;
    
    private Double initialTempSet;
    
    private Double finaltempset;
    
    private Double processTemp;
    
    private Double rpmMin;
    
    private Double rpmMax;
    
    private Double flowMin;
    
    private Double flowMax;
    
    private Double ppumpSetMin;
    
    private Double ppumpSetMax;
    
    private Double vpumpTorrProcess;
    
    private Double vpumpTorrMin;
    
    private Double vpumpTorrMax;
    
    private List<ProcessEquipmentDTO> processEquipments = new ArrayList<>();
    
    public TypicalActivityDTO(TypicalActivity typicalActivity) {
        this.activityType = typicalActivity.getActivityType();
        this.content = typicalActivity.getContent();
        this.other = typicalActivity.getOther();
        this.durationMin = typicalActivity.getDurationMin();
        this.durationMax = typicalActivity.getDurationMax();
        this.targetTempMin = typicalActivity.getTargetTempMin();
        this.targetTempMax = typicalActivity.getTargetTempMax();
        this.initialTempSet = typicalActivity.getInitialTempSet();
        this.finaltempset = typicalActivity.getFinaltempset();
        this.processTemp = typicalActivity.getProcessTemp();
        this.rpmMin = typicalActivity.getRpmMin();
        this.rpmMax = typicalActivity.getRpmMax();
        this.flowMin = typicalActivity.getFlowMin();
        this.flowMax = typicalActivity.getFlowMax();
        this.ppumpSetMin = typicalActivity.getPpumpSetMin();
        this.ppumpSetMax = typicalActivity.getPpumpSetMax();
        this.vpumpTorrProcess = typicalActivity.getVpumpTorrProcess();
        this.vpumpTorrMin = typicalActivity.getVpumpTorrMin();
        this.vpumpTorrMax = typicalActivity.getVpumpTorrMax();
        
        this.processEquipments = typicalActivity.getProcessEquipments()
                .stream()
                .map(ProcessEquipmentDTO::new)
                .collect(Collectors.toList());
    }
}
