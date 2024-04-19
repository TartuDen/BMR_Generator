package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

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
    
    @Column(name = "name")
    @NonNull
    private String name;
    
    @Column(name = "code")
    @NonNull
    private String code;
    
    @Column(name = "description")
    @NonNull
    private String description;
    
    @OneToMany(
            mappedBy = "equipment",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<Operation> operations;
    
    public void addOperation (Operation operation) {
        if (operations == null) {
            operations = new ArrayList<>();
        }
        this.operations.add(operation);
        operation.setEquipment(this);
    }
}
