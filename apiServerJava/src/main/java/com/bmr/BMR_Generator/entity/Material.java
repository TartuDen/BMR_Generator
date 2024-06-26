package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

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
    
    @Column(name = "name", nullable = false)
    @NotBlank
    private String name;
    
    @Column(name = "whcode", nullable = false)
    @NonNull
    private String WHcode;
    
    @Column(name = "mass")
    private Double mass;
    
    @Column(name = "minmass")
    private Double minMass;
    
    @Column(name = "maxmass")
    private Double maxMass;
    
    @Column(name = "volume")
    private Double volume;
    
    @Column(name = "additionalinfo")
    private String additionalInfo;
    
    @OneToOne
    @JoinColumn(name = "processoperation_in_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private ProcessOperation processOperationIN;
    
    @OneToOne
    @JoinColumn(name = "processoperation_out_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private ProcessOperation processOperationOUT;
    
    @OneToOne
    @JoinColumn(name = "processoperation_product")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private ProcessOperation processOperationProduct;
    
    @OneToOne
    @JoinColumn(name = "processoperation_starting")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private ProcessOperation processOperationStarting;
}
