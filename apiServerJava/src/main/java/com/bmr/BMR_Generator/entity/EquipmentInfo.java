package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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
    
    @Column(name = "code", unique = true)
    @NotBlank
    private String code;
    
    @Column(name = "description", length = 1500)
    @NonNull
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private Equipment equipment;
}
