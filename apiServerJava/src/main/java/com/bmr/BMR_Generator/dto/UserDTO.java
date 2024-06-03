package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.user.Authority;
import com.bmr.BMR_Generator.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class UserDTO {
    @NotBlank
    private String username;
    private boolean enabled = true;
    @NotBlank
    private String email;
    
    private List<AuthorityDTO> authoritiesDTO = new ArrayList<>();
    
    public UserDTO (User user){
        this.username = user.getUsername();
        this.enabled = user.isEnabled();
        this.email = user.getEmail();
        
        if (!user.getAuthorities().isEmpty()){
            user.getAuthorities().stream()
                    .map(AuthorityDTO::new)
                    .forEach(this::addAuthorities);
        }
    }
    
    private void addAuthorities(AuthorityDTO authorityDTO) {
        this.authoritiesDTO.add(authorityDTO);
    }
}
