package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "processoperation")
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
    
    @Column(name = "opnumber", unique = true, nullable = false)
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
    
}