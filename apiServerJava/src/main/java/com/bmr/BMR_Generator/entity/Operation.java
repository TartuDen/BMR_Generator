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
    
    @Column(name = "operation_type")
    @NonNull
    private String operationType;
    
    @Column(name = "content")
    @NonNull
    private String content;
    
    @Column(name = "other")
    private String other;
    
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private Equipment equipment;
}
