package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "equipment")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "name", unique = true)
    @NotBlank
    @NonNull
    private String name;
    
    @OneToMany(
            mappedBy = "equipment",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<EquipmentInfo> equipmentInfo = new ArrayList<>();
    
 
    @OneToMany(
            mappedBy = "equipment",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<Operation> operations = new ArrayList<>();
    
    public void addOperation (Operation operation) {
        this.operations.add(operation);
        operation.setEquipment(this);
    }
    
    public void addEquipmentInfo (EquipmentInfo equipmentInfo) {
        this.equipmentInfo.add(equipmentInfo);
        equipmentInfo.setEquipment(this);
    }
}
