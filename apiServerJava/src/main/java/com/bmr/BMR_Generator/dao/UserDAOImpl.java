package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.UserDTO;
import com.bmr.BMR_Generator.entity.user.Authority;
import com.bmr.BMR_Generator.entity.user.User;
import com.bmr.BMR_Generator.entity.user.UserRole;
import com.bmr.BMR_Generator.rest.response.BrApiServerException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
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
    public boolean update(User user) {
        try {
            entityManager.merge(user);
            return true;
        } catch (Exception e) {
            LOGGER.error("Error occurred while updating User - " + user.getUsername(), e);
            return false;
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
    
    @Override
    @Transactional
    public boolean removeRoleFormUserByName(String role, String name) {
        try {
            UserRole userRole = UserRole.valueOf(role);
            User user = findUserByName(name);
            if (user != null) {
                Iterator<Authority> iterator = user.getAuthorities().iterator();
                while (iterator.hasNext()) {
                    Authority authority = iterator.next();
                    if (authority.getRole() == userRole) {
                        iterator.remove();
                        entityManager.remove(authority);
                        break;
                    }
                }
                entityManager.merge(user);
                return true;
            } else {
                LOGGER.error("User not found: " + name);
                return false;
            }
        } catch (IllegalArgumentException e) {
            LOGGER.error("Invalid role: " + role, e);
            return false;
        } catch (Exception e) {
            LOGGER.error("Error occurred while removing role from User - " + name, e);
            return false;
        }
    }
    
    @Override
    @Transactional
    public boolean addRoleToUserByName(String role, String name) {
        try {
            UserRole userRole = UserRole.valueOf(role);
            User user = findUserByName(name);
            if (user != null) {
                Authority authority = new Authority(userRole);
                authority.setUser(user);
                user.addAuthority(authority);
                
                entityManager.merge(user);
                return true;
            } else {
                LOGGER.error("User not found: " + name);
                return false;
            }
        } catch (IllegalArgumentException e) {
            LOGGER.error("Invalid role: " + role, e);
            return false;
        } catch (Exception e) {
            LOGGER.error("Error occurred while adding role to the User - " + name, e);
            return false;
        }
    }
}

