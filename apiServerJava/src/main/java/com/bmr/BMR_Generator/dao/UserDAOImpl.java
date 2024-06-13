package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.UserDTO;
import com.bmr.BMR_Generator.entity.user.User;
import com.bmr.BMR_Generator.rest.response.BrApiServerException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class UserDAOImpl implements UserDAO{
    private static final Logger LOGGER = LogManager.getLogger(UserDAOImpl.class);
    private final EntityManager entityManager;
    
    @Autowired
    public UserDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    @Override
    @Transactional
    public void save(User user) {
        try {
            entityManager.persist(user);
        } catch (Exception e) {
            LOGGER.error("Error occurred while saving User", e);
        }
        
    }
    
    @Override
    @Transactional
    public boolean deleteByName(String name) {
        try {
            User foundUser = findUserByName(name);
            entityManager.remove(foundUser);
          
            return true;
        } catch (Exception e) {
            LOGGER.error("Error occurred while deleting User - " + name, e);
            return false;
        }
    }
    
    @Override
    @Transactional
    public void update(User user, String name) {
        try {
            if (deleteByName(name)){
                throw new BrApiServerException("User not found");
            };
            save(user);
        } catch (Exception e) {
            LOGGER.error("Error occurred while updating User - " + name, e);
        }
    
    }
    
    @Override
    public User findUserByName(String username) {
        User foundUser = entityManager.find(User.class, username);
        if (foundUser == null) {
            throw new BrApiServerException("User not found");
        }
        return foundUser;
    }
    
    @Override
    public List<UserDTO> getAllUsers() {
        TypedQuery<User> findAllQuery = entityManager.createQuery("FROM User", User.class);
        
        return findAllQuery.getResultList().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }
}
