package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.Material;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class MaterialDTO {
    
    @NonNull
    private String name;
    
    @NonNull
    private String WHcode;
    
    private Double mass;
    
    private Double minMass;
    
    private Double maxMass;
    
    private Double volume;
    
    private String additionalInfo;
    
    public MaterialDTO(Material material) {
        this.name = material.getName();
        this.WHcode = material.getWHcode();
        this.mass = material.getMass();
        this.minMass = material.getMinMass();
        this.maxMass = material.getMaxMass();
        this.volume = material.getVolume();
        this.additionalInfo = material.getAdditionalInfo();
    }
    
    
}
