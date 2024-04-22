package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.entity.Equipment;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class EquipmentDAOImpl implements EquipmentDAO{
    
    private final EntityManager entityManager;
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    @Autowired
    public EquipmentDAOImpl(EntityManager entityManager) {
            this.entityManager = entityManager;
        }
    
    @Override
    @Transactional
    public boolean save(Equipment equipment) {
        try {
            entityManager.persist(equipment);
            return true;
        } catch (Exception e) {
            LOGGER.error("Error occurred while saving equipment", e);
            return false;
        }
    }
    
    @Override
    @Transactional
    public boolean update(Equipment equipment) {
        try {
            entityManager.merge(equipment);
            return true;
        } catch (Exception e) {
            LOGGER.error("Error occurred while updating equipment", e);
            return false;
        }
    }
    
    @Override
    public List<Equipment> findAllEquipment() {
        TypedQuery<Equipment> findAllQuery = entityManager.createQuery("FROM Equipment", Equipment.class);
        return findAllQuery.getResultList();
    }
    
}
