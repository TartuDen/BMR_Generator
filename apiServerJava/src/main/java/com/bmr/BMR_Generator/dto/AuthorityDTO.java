package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.user.Authority;
import com.bmr.BMR_Generator.entity.user.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class AuthorityDTO {
    @NonNull
    private UserRole role;
    
    public AuthorityDTO (Authority authority){
        this.role = authority.getRole();
    }
}
