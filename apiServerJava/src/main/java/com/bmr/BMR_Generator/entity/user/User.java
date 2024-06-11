package com.bmr.BMR_Generator.entity.user;

import com.bmr.BMR_Generator.entity.EquipmentInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@RequiredArgsConstructor
@Data
public class User {
    @Id
    @Column(length = 50, unique = true)
    @NotBlank
    @NonNull
    private String username;
    
    @Column(nullable = false)
    private boolean enabled = true;
    
    @Column(length = 50, nullable = false, unique = true)
    @NotBlank
    @NonNull
    private String email;
    
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Authority> authorities = new ArrayList<>();
    
    public void addAuthority (Authority authority) {
        this.authorities.add(authority);
        authority.setUser(this);
    }
}