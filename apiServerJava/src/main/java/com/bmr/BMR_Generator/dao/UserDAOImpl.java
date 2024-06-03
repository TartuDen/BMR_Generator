package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.UserDTO;
import com.bmr.BMR_Generator.entity.user.User;
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
            int deletedCount = entityManager.createQuery("DELETE FROM User WHERE username = :name")
                    .setParameter("name", name)
                    .executeUpdate();
            
            return deletedCount > 0;
        } catch (Exception e) {
            LOGGER.error("Error occurred while deleting User - " + name, e);
            return false;
        }
    }
    
    @Override
    public void update(User user, String name) {
    
    }
    
    @Override
    public UserDTO findUserByName(String username) {
        return new UserDTO(entityManager.find(User.class, username));
    }
    
    @Override
    public List<UserDTO> getAllUsers() {
        TypedQuery<User> findAllQuery = entityManager.createQuery("FROM User", User.class);
        
        return findAllQuery.getResultList().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }
}
