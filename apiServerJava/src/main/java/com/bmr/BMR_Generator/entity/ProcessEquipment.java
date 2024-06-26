package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "processequipment")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProcessEquipment {
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
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "processoperation_id", referencedColumnName = "id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private ProcessOperation processOperation;
    
    @ManyToOne
    @JoinColumn(name = "typicalactivity_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private TypicalActivity typicalactivity;
}
