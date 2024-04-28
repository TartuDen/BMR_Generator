package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.entity.ProcessOperation;
import jakarta.persistence.EntityManager;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProcessOperationDAOImpl implements ProcessOperationDAO{
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    private final EntityManager entityManager;
    
    @Autowired
    public ProcessOperationDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    @Override
    public ProcessOperation save(ProcessOperation processOperation) {
        return entityManager.merge(processOperation);
    }
}
