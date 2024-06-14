package com.bmr.BMR_Generator.entity.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "authorities")
@NoArgsConstructor
@RequiredArgsConstructor
@Data
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Getter(AccessLevel.NONE)
    private User user;
    
    @Column(length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    @NonNull
    private UserRole role;
}
