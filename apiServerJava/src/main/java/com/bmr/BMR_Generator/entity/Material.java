package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "material")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "name")
    @NonNull
    private String name;
    
    @Column(name = "whcode")
    @NonNull
    private String WHcode;
    
    @Column(name = "mass")
    private Double mass;
    
    @Column(name = "min_mass")
    private Double minMass;
    
    @Column(name = "max_mass")
    private Double maxMass;
    
    @Column(name = "volume")
    private Double volume;
    
    @Column(name = "additionalinfo")
    private String additionalInfo;
}
