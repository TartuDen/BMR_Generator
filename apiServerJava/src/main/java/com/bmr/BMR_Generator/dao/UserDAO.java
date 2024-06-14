package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.UserDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.user.User;

import java.util.List;

public interface UserDAO {
    void save (User user);
    boolean deleteByName (String name);
    boolean update(User user);
    User findUserByName (String name);
    List<UserDTO> getAllUsers();
    boolean removeRoleFormUserByName (String role, String name);
    boolean addRoleToUserByName (String role, String name);
}
