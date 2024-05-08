package com.bmr.BMR_Generator.dto;


import com.bmr.BMR_Generator.entity.ProcessInitialInfo;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProcessInitialInfoDTO {
    @NonNull
    private String projectName;
    
    @NonNull
    private String tp;
    
    @NonNull
    private String version;
    
    private List<ProjectEquipmentDTO> equipmentSet;
    private List<ProjectReagentDTO> reagentSet;
    
    public ProcessInitialInfoDTO(ProcessInitialInfo processInitialInfo) {
        this.projectName = processInitialInfo.getProjectName();
        this.tp = processInitialInfo.getTp();
        this.version = processInitialInfo.getVersion();
        this.equipmentSet = processInitialInfo.getEquipmentSet().stream()
                .map(ProjectEquipmentDTO::new)
                .collect(Collectors.toList());
        this.reagentSet = processInitialInfo.getReagentSet().stream()
                .map(ProjectReagentDTO::new)
                .collect(Collectors.toList());
    }
}
