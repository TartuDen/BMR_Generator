package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dao.EquipmentDAO;
import com.bmr.BMR_Generator.dao.EquipmentDAOImpl;
import com.bmr.BMR_Generator.dao.UserDAO;
import com.bmr.BMR_Generator.dto.UserDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.user.User;
import com.bmr.BMR_Generator.rest.response.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl extends BaseService implements UserService{
    private final UserDAO userDAO;
    private static final Logger LOGGER = LogManager.getLogger(UserServiceImpl.class);
    
    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
    
    private User getUserByName (String name){
        return userDAO.findUserByName(name);
    }
    
    @Override
    public UserDTO getUserDTObyName(String name) {
        return new UserDTO(getUserByName(name));
    }
    
    @Override
    public Response saveUser(User userRequest) {
        try {
            User user = createUserFromRequest(userRequest);
            userDAO.save(user);
            return generateResponse(200, "User saved successfully");
        } catch (Exception e) {
            LOGGER.error("Failed to save equipment", e);
            return generateResponse(500, "Failed to save User: " + e.getMessage());
        }
    }
    
    private User createUserFromRequest(User userRequest) {
        User user = new User(userRequest.getUsername(), userRequest.getEmail());
        user.setEnabled(userRequest.isEnabled());
        addRoles(userRequest, user);
        return user;
    }
    
    private void addRoles(User userRequest, User user) {
        user.setAuthorities(userRequest.getAuthorities()
                .stream().peek(authority -> authority.setUser(user))
                .collect(Collectors.toList()));
    }
    
    @Override
    public Response deleteUserByName(String name) {
        try {
            boolean result = userDAO.deleteByName(name);
            return result ?
                    generateResponse(200, "User deleted successfully")
                    : generateResponse(400, "User was not deleted");
        } catch (Exception e) {
            LOGGER.error("Failed to delete user", e);
            return generateResponse(500, "Failed to delete User: " + e.getMessage());
        }
    }
    
    @Override
    public Response updateUser(User userFormRequest) {
        try {
            User user = createUserFromRequest(userFormRequest);
            userDAO.update(user);
            return generateResponse(200, "User updated successfully");
        } catch (Exception e) {
            LOGGER.error("Failed to save equipment", e);
            return generateResponse(500, "Failed to update User: " + e.getMessage());
        }
    }
    
    @Override
    public List<UserDTO> getAllUsers() {
        return null;
    }
}
