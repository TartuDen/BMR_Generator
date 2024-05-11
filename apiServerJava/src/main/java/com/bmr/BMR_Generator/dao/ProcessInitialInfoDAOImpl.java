package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ProcessInitialInfoDTO;
import com.bmr.BMR_Generator.entity.ProcessInitialInfo;
import com.bmr.BMR_Generator.rest.response.BrApiServerException;
import jakarta.persistence.EntityManager;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ProcessInitialInfoDAOImpl implements ProcessInitialInfoDAO{
    
    private static final Logger LOGGER = LogManager.getLogger(ProcessInitialInfoDAOImpl.class);
    private final EntityManager entityManager;
    
    @Autowired
    public ProcessInitialInfoDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    @Override
    @Transactional
    public ProcessInitialInfoDTO save(ProcessInitialInfo processInitialInfo) {
        try{
            ProcessInitialInfo savedEntity = entityManager.merge(processInitialInfo);
            return new ProcessInitialInfoDTO(savedEntity);
        } catch (Exception e) {
            throw new BrApiServerException("Error with saving processInitialInfo", e);
        }
    }
    
    @Override
    @Transactional
    public boolean deleteByNameTpVersion(String projectName, String tp, String version) {
        String jpql = "SELECT e FROM ProcessInitialInfo e WHERE e.projectName = :projectName AND e.tp = :tp AND e.version = :version";
        ProcessInitialInfo processInitialInfo = entityManager.createQuery(jpql, ProcessInitialInfo.class)
                .setParameter("projectName", projectName)
                .setParameter("tp", tp)
                .setParameter("version", version)
                .getSingleResult();
        entityManager.remove(processInitialInfo);
        return true;
    }
    
    @Override
    @Transactional(readOnly = true)
    public ProcessInitialInfoDTO findByNameTpVersion(String projectName, String tp, String version) {
        String jpql = "SELECT e FROM ProcessInitialInfo e WHERE e.projectName = :projectName AND e.tp = :tp AND e.version = :version";
        ProcessInitialInfo processInitialInfo = entityManager.createQuery(jpql, ProcessInitialInfo.class)
                .setParameter("projectName", projectName)
                .setParameter("tp", tp)
                .setParameter("version", version)
                .getSingleResult();
        
        return new ProcessInitialInfoDTO(processInitialInfo);
    }
}
