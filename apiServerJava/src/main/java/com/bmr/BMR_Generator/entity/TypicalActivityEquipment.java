package com.bmr.BMR_Generator.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "typicalactivity_equipment")
@Data
@NoArgsConstructor
public class TypicalActivityEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @ManyToOne
    @JoinColumn(name = "typicalactivity_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private TypicalActivity typicalActivity;
    
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Equipment equipment;
}
