package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dto.UserDTO;
import com.bmr.BMR_Generator.entity.user.User;
import com.bmr.BMR_Generator.rest.response.Response;

import java.util.List;

public interface UserService {
    UserDTO getUserDTObyName (String name);
    Response saveUser (User userFormRequest);
    Response deleteUserByName (String name);
    Response updateUserByName (String name);
    List<UserDTO> getAllUsers();
}
