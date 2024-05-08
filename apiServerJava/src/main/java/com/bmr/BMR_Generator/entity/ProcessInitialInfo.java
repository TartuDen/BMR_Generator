package com.bmr.BMR_Generator.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "processinitialinfo", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"projectname", "tp", "version"})
})
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProcessInitialInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "projectname", nullable = false)
    @NonNull
    private String projectName;
    
    @Column(name = "tp", nullable = false)
    @NonNull
    private String tp;
    
    @Column(name = "version", nullable = false)
    @NonNull
    private String version;
    
    @OneToMany(
            mappedBy = "processinitialinfo",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<ProjectEquipment> equipmentSet = new ArrayList<>();
    
    @OneToMany(
            mappedBy = "processinitialinfo",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<ProjectReagent> reagentSet = new ArrayList<>();
    
    public void addEquipment(ProjectEquipment processEquipment) {
        this.getEquipmentSet().add(processEquipment);
        processEquipment.setProcessinitialinfo(this);
    }
}
