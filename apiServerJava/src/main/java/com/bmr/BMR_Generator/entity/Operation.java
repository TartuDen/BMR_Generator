package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "operation")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "operationType")
    @NonNull
    private String operationType;
    
    @Column(name = "content")
    @NonNull
    private String content;
    
    @Column(name = "other")
    private String other;
    
    // Define the relationship to LabGlassware
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Equipment equipment;
}
