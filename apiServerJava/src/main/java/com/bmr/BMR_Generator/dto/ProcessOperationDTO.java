package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.ProcessOperation;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProcessOperationDTO {
    
    @NonNull
    private String projectName;
    
    @NonNull
    private String tp;
    
    @NonNull
    private Integer opNumber;
    
    @NonNull
    private String version;
    
    private ProcessEquipmentDTO mainEquipment;
    
    private TypicalActivityDTO typicalActivity;
    
    private MaterialDTO materialIN;
    
    private MaterialDTO materialOUT;
    
    private MaterialDTO startingMaterial;
    private MaterialDTO product;
    
    public ProcessOperationDTO(ProcessOperation processOperation) {
        this.projectName = processOperation.getProjectName();
        this.tp = processOperation.getTp();
        this.opNumber = processOperation.getOpNumber();
        
        this.version = processOperation.getVersion().isBlank() ? "initial" : processOperation.getVersion();
        
        if (processOperation.getMainEquipment() != null) {
            this.mainEquipment = new ProcessEquipmentDTO(processOperation.getMainEquipment());
        }
        
        if (processOperation.getTypicalActivity() != null) {
            this.typicalActivity = new TypicalActivityDTO(processOperation.getTypicalActivity());
        }
        
        if (processOperation.getMaterialIN() != null) {
            this.materialIN = new MaterialDTO(processOperation.getMaterialIN());
        }
        
        if (processOperation.getMaterialOUT() != null) {
            this.materialOUT = new MaterialDTO(processOperation.getMaterialOUT());
        }
        
        if (processOperation.getStartingMaterial() != null) {
            this.startingMaterial = new MaterialDTO(processOperation.getStartingMaterial());
        }
        
        if (processOperation.getProduct() != null) {
            this.product = new MaterialDTO(processOperation.getProduct());
        }
    }
}
