package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ParameterDTO;
import com.bmr.BMR_Generator.entity.Parameter;
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
public class ParameterDAOImpl implements ParameterDAO{
    private final EntityManager entityManager;
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    @Autowired
    public ParameterDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    @Override
    @Transactional
    public boolean save(Parameter parameter) {
        try {
            entityManager.persist(parameter);
            return true;
        } catch (Exception e) {
            LOGGER.error("Error occurred while saving parameter", e);
            return false;
        }
    }
    
    @Override
    @Transactional
    public boolean deleteByName(String name) {
        try {
            int deletedCount = entityManager.createQuery("DELETE FROM Parameter WHERE name = :name")
                    .setParameter("name", name)
                    .executeUpdate();
            
            return deletedCount > 0;
        } catch (Exception e) {
            LOGGER.error("Error occurred while deleting parameter - " + name, e);
            return false;
        }
    }
    
    @Override
    public List<ParameterDTO> getParameters() {
        var parametersList = entityManager
                .createQuery("FROM Parameter", Parameter.class)
                .getResultList();
        
        return parametersList.stream()
                .map(ParameterDTO::new)
                .collect(Collectors.toList());
    }
}
