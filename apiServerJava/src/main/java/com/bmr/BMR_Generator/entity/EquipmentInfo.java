package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "equipment_info")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class EquipmentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "code")
    @NonNull
    private String code;
    
    @Column(name = "description")
    @NonNull
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private Equipment equipment;
}
