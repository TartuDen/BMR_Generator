package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.BrApiServerException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public boolean sortAndTidyingOpNumber(String projectName, String tp, String version) {
        try {
            String jpqlGetID = "SELECT id FROM ProcessOperation e WHERE e.projectName = :projectName AND e.tp = :tp AND e.version = :version ORDER BY opNumber ASC";
            Query selectQuery = entityManager.createQuery(jpqlGetID);
            selectQuery.setParameter("projectName", projectName);
            selectQuery.setParameter("tp", tp);
            selectQuery.setParameter("version", version);
            List<?> ids = selectQuery.getResultList();
            int counter = 0;
            int newOpNumber = 1;
            for (Object id : ids) {
                Long entityId = (Long) id;
                String jpqlUpdate = "UPDATE ProcessOperation SET opNumber = :newOpNumber WHERE id = :id";
                Query updateQuery = entityManager.createQuery(jpqlUpdate);
                updateQuery.setParameter("newOpNumber", newOpNumber++);
                updateQuery.setParameter("id", entityId);
                counter += updateQuery.executeUpdate();
            }
            return counter > 0;
        } catch (Exception e) {
            throw new BrApiServerException(e);
        }
    }
    
    @Override
    @Transactional
    public ProcessOperationDTO save(ProcessOperation processOperation) {
        if (processOperation.getOpNumber() == 0) {
            Integer maxOpNumber = getMaxOpNumber(processOperation);
            processOperation.setOpNumber(maxOpNumber + 1);
        }
        
        return new ProcessOperationDTO(entityManager.merge(processOperation));
    }
    
    private Integer getMaxOpNumber(ProcessOperation processOperation) {
        String jpqlGetMaxOpNumber = "SELECT MAX(e.opNumber) FROM ProcessOperation e " +
                "WHERE e.projectName = :projectName AND e.tp = :tp AND e.version = :version";
        
        Query query = entityManager.createQuery(jpqlGetMaxOpNumber);
        query.setParameter("projectName", processOperation.getProjectName());
        query.setParameter("tp", processOperation.getTp());
        query.setParameter("version", processOperation.getVersion());
        return (int) query.getSingleResult();
    }
    
    @Override
    public ProcessOperationDTO findByProjectNameAndOpNumber(String projectName, String opNumber, String version) {
        String jpql = "SELECT e FROM ProcessOperation e WHERE e.projectName = :projectName AND e.opNumber = :opNumber AND e.version = :version";
        TypedQuery<ProcessOperation> query = entityManager.createQuery(jpql, ProcessOperation.class);
        query.setParameter("projectName", projectName);
        query.setParameter("opNumber", opNumber);
        query.setParameter("version", version);
        return new ProcessOperationDTO(query.getSingleResult());
    }
    
    @Override
    public List<ProcessOperationDTO> findByProjectNameAndTpAndVersion(String projectName, String tp, String version) {
        String jpql = "SELECT e FROM ProcessOperation e WHERE e.projectName = :projectName AND e.tp = :tp AND e.version = :version";
        TypedQuery<ProcessOperation> query = entityManager.createQuery(jpql, ProcessOperation.class);
        query.setParameter("projectName", projectName);
        query.setParameter("tp", tp);
        query.setParameter("version", version);
        return query.getResultStream().map(ProcessOperationDTO::new)
                .collect(Collectors.toList());
        
    }
    
    @Override
    public List<ProcessOperationDTO> findByProjectName(String projectName) {
        String jpql = "SELECT e FROM ProcessOperation e WHERE e.projectName = :projectName";
        TypedQuery<ProcessOperation> query = entityManager.createQuery(jpql, ProcessOperation.class);
        query.setParameter("projectName", projectName);
        return query.getResultStream().map(ProcessOperationDTO::new)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ProcessOperationDTO> findByProjectNameAndVersion(String projectName, String version) {
        String jpql = "SELECT e FROM ProcessOperation e WHERE e.projectName = :projectName AND e.version = :version";
        TypedQuery<ProcessOperation> query = entityManager.createQuery(jpql, ProcessOperation.class);
        query.setParameter("projectName", projectName);
        query.setParameter("version", version);
        return query.getResultStream().map(ProcessOperationDTO::new)
                .collect(Collectors.toList());
    }
    
    @Override
    public ProcessOperation getByProjectNameTpAndOpNumber(String projectName, String tp, String opNumber, String version) {
        String jpql = "SELECT e FROM ProcessOperation e WHERE e.projectName = :projectName AND e.tp = :tp AND e.opNumber = :opNumber AND e.version = :version";
        TypedQuery<ProcessOperation> query = entityManager.createQuery(jpql, ProcessOperation.class);
        query.setParameter("projectName", projectName);
        query.setParameter("tp", tp);
        query.setParameter("opNumber", opNumber);
        query.setParameter("version", version);
        return query.getSingleResult();
    }
    
    @Override
    @Transactional
    public boolean deleteByProjectNameAndOpNumber(String projectName, String tp, String opNumber, String version) {
        try {
            entityManager.remove(getByProjectNameTpAndOpNumber(projectName, tp, opNumber, version));
            return true;
        } catch (Exception e) {
            var errMsg = "Error occurred while deleting ProcessOperation - " + projectName + " / ";
            LOGGER.error(errMsg + opNumber, e);
            throw new BrApiServerException(errMsg);
        }
    }
    
    @Override
    @Transactional
    public boolean deleteByProjectNameAndVersion(String projectName, String tp, String version) {
        try {
            
            getByProjectNameAndTpAndVersion(projectName, tp, version).forEach(record -> entityManager.remove(record));
            return true;
        } catch (Exception e) {
            var errMsg = "Error occurred while deleting ProcessOperation - " + projectName + " / ";
            LOGGER.error(errMsg + projectName + tp + version, e);
            throw new BrApiServerException(errMsg);
        }
    }
    
    @Transactional
    public List<ProcessOperation> getByProjectNameAndTpAndVersion(String projectName, String tp, String version) {
        String jpql = "SELECT e FROM ProcessOperation e WHERE e.projectName = :projectName AND e.tp = :tp AND e.version = :version";
        TypedQuery<ProcessOperation> query = entityManager.createQuery(jpql, ProcessOperation.class);
        query.setParameter("projectName", projectName);
        query.setParameter("tp", tp);
        query.setParameter("version", version);
        return query.getResultStream()
                .collect(Collectors.toList());
        
    }
    
    @Override
    public List<String> getListOfProjects(String projectName) {
        return null;
    }
    
}
