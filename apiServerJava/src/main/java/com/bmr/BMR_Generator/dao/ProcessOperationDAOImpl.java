package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.BrApiServerException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ProcessOperationDAOImpl implements ProcessOperationDAO {
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    private final EntityManager entityManager;
    
    @Autowired
    public ProcessOperationDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    @Override
    @Transactional
    public ProcessOperationDTO save(ProcessOperation processOperation) {
        return new ProcessOperationDTO(entityManager.merge(processOperation));
    }
    
    @Override
    public ProcessOperationDTO findByProjectNameAndOpNumber(String projectName, String opNumber) {
        String jpql = "SELECT e FROM ProcessOperation e WHERE e.projectName = :projectName AND e.opNumber = :opNumber";
        TypedQuery<ProcessOperation> query = entityManager.createQuery(jpql, ProcessOperation.class);
        query.setParameter("projectName", projectName);
        query.setParameter("opNumber", opNumber);
        return new ProcessOperationDTO(query.getSingleResult());
    }
    
    @Override
    public ProcessOperation getByProjectNameAndOpNumber(String projectName, String opNumber) {
        String jpql = "SELECT e FROM ProcessOperation e WHERE e.projectName = :projectName AND e.opNumber = :opNumber";
        TypedQuery<ProcessOperation> query = entityManager.createQuery(jpql, ProcessOperation.class);
        query.setParameter("projectName", projectName);
        query.setParameter("opNumber", opNumber);
        return query.getSingleResult();
    }
    
    @Override
    @Transactional
    public boolean deleteByProjectNameAndOpNumber(String projectName, String opNumber) {
        try {
            entityManager.remove(getByProjectNameAndOpNumber(projectName, opNumber));
            return true;
        } catch (Exception e) {
            var errMsg = "Error occurred while deleting ProcessOperation - " + projectName + " / ";
            LOGGER.error(errMsg + opNumber, e);
            throw new BrApiServerException(errMsg);
        }
    }
    
}
