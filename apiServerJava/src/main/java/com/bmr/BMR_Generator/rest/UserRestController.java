package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.UserDTO;
import com.bmr.BMR_Generator.entity.user.User;
import com.bmr.BMR_Generator.rest.response.Response;
import com.bmr.BMR_Generator.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserRestController {
    private final UserService userService;
    
    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping
    public ResponseEntity<Response> saveUser (@RequestBody User userFromRequest){
        Response response = userService.saveUser(userFromRequest);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @DeleteMapping("/{username}")
    public ResponseEntity<Response> deleteUser (@PathVariable String username){
        Response response = userService.deleteUserByName(username);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username) {
        UserDTO userDTO = userService.getUserDTObyName(username);
        return ResponseEntity.ok(userDTO);
    }
    
    @PutMapping
    public ResponseEntity<Response> updateUser(@RequestBody User user) {
        Response response = userService.updateUser(user);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @DeleteMapping("/{username}/roles/{role}")
    public ResponseEntity<Response> removeRole(@PathVariable String username, @PathVariable String role) {
        Response response = userService.removeRole(role, username);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @PatchMapping("/{username}/roles/{role}")
    public ResponseEntity<Response> addRole(@PathVariable String username, @PathVariable String role) {
        Response response = userService.addRole(role, username);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
