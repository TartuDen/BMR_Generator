package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "additional_equipment")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class AdditionalEquipment {
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
}
