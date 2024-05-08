package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.ProjectReagent;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProjectReagentDTO {
    @NonNull
    private String tableID;
    
    @NonNull
    private String name;
    
    public ProjectReagentDTO(ProjectReagent projectReagent) {
        this.tableID = projectReagent.getTableID();
        this.name = projectReagent.getName();
    }
}
