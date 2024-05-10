package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/*
ALTER TABLE processoperation
ADD CONSTRAINT unique_version_opNumber UNIQUE (version, opNumber);
 */
@Entity
@Table(name = "processoperation", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"version", "opNumber"})
})
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProcessOperation {
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
    
    @Column(name = "opnumber", nullable = false)
    @NonNull
    private Integer opNumber;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "main_equipment_id", referencedColumnName = "id")
    private ProcessEquipment mainEquipment;

    @OneToOne(mappedBy = "processOperation", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private TypicalActivity typicalActivity;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "input_material_id", referencedColumnName = "id")
    private Material materialIN;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "output_material_id", referencedColumnName = "id")
    private Material materialOUT;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "starting_material_id", referencedColumnName = "id")
    private Material startingMaterial;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_material_id", referencedColumnName = "id")
    private Material product;
    
}