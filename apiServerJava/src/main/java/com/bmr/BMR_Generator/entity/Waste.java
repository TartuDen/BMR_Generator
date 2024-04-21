package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "waste")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Waste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "type")
    @NonNull
    private String type;
    
    @Column(name = "code")
    @NonNull
    private String code;
    
    @Column(name = "mass")
    private Double mass;
    
    @Column(name = "volume")
    private Double volume;
    
    @Column(name = "additionalinfo")
    private String additionalInfo;
}
