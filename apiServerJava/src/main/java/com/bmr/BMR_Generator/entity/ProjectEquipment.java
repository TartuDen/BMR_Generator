package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projectequipment")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProjectEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "code", nullable = false)
    @NonNull
    private String code;
    
    @Column(name = "name", nullable = false)
    @NonNull
    private String name;
    
    @ManyToOne
    @JoinColumn(name = "processinitialinfo_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private ProcessInitialInfo processinitialinfo;
}
