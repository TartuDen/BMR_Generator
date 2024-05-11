package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projectreagent")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProjectReagent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "tableid", nullable = false)
    @NonNull
    private String tableID;
    
    @Column(name = "name", nullable = false)
    @NonNull
    private String name;
    
    @Column(name = "mass", nullable = false)
    @NonNull
    private Double mass;
    
    @ManyToOne
    @JoinColumn(name = "processinitialinfo_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private ProcessInitialInfo processinitialinfo;
}
