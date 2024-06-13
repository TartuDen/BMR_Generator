package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.UserDTO;
import com.bmr.BMR_Generator.entity.user.User;
import com.bmr.BMR_Generator.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserRestController {
    private final UserService userService;
    
    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping("/user")
    public ResponseEntity<?> saveUser (@RequestBody User user){
        return ResponseEntity.ok(userService.saveUser(user));
    }
    
    @DeleteMapping("/user/{name}")
    public ResponseEntity<?> deleteUser (@PathVariable String name){
        return ResponseEntity.ok(userService.deleteUserByName(name));
    }
    
    @GetMapping("/user/{name}")
    public UserDTO get (@PathVariable String name){
        return userService.getUserDTObyName(name);
    }
}
