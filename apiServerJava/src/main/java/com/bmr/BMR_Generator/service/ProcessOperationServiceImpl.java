package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dao.EquipmentDAOImpl;
import com.bmr.BMR_Generator.dao.ProcessOperationDAO;
import com.bmr.BMR_Generator.dao.ProcessOperationRepository;
import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProcessOperationServiceImpl extends BaseService implements ProcessOperationService{
    private final ProcessOperationRepository processOperationRepository;
    private final ProcessOperationDAO processOperationDAO;
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    
    @Autowired
    public ProcessOperationServiceImpl(ProcessOperationRepository processOperationRepository, ProcessOperationDAO processOperationDAO) {
        this.processOperationRepository = processOperationRepository;
        this.processOperationDAO = processOperationDAO;
    }
    
    @Override
    @Transactional
    public ProcessOperation save (ProcessOperation processOperationReq){
      ProcessOperation processOperation = createProcessOperationFromRequest(processOperationReq);
        return processOperationRepository.save(processOperation);
    }
    
    @Override
    public Set<String> findDistinctProjectNames() {
        return processOperationRepository.findDistinctProjectNames();
    }
    
    @Override
    public Set<String> findDistinctTPsForProjectName(String projectName) {
        return processOperationRepository.findDistinctTPsForProjectName(projectName);
    }
    
    @Override
    public Set<String> findDistinctVersionsForProjectNameAndTp(String projectName, String tp) {
        return processOperationRepository.findDistinctVersionsForProjectNameAndTp(projectName, tp);
    }
    
    @Override
    public Set<String> countDistinctOperationNumberForProject(String projectName, String tp, String version) {
        long opCount = processOperationRepository.countDistinctOperationNumberForProject(projectName, tp, version);
        Set<String> result = new HashSet<>();
        for (long i = 1; i <= opCount; i++) {
            result.add(String.valueOf(i));
        }
        return result;
    }
    
    @Override
    @Transactional
    public Response sortAndTidyingOpNumber(String projectName, String tp, String version) {
        try {
            boolean result = processOperationDAO.sortAndTidyingOpNumber(projectName, tp, version);
            return result ?
                    generateResponse(200, "ProcessOperation tidied successfully")
                    : generateResponse(400, "ProcessOperation error with sorting");
        } catch (Exception e) {
            LOGGER.error("Failed to sort ProcessOperation", e);
            return generateResponse(500, "Failed to sort ProcessOperation: " + e.getMessage());
        }
    }
    
    
    @Override
    @Transactional
    public ProcessOperationDTO saveUsingDAO (ProcessOperation processOperationReq){
        ProcessOperation processOperation = createProcessOperationFromRequest(processOperationReq);
        return processOperationDAO.save(processOperation);
    }
    
    @Override
    public ProcessOperationDTO findByProjectNameAndOpNumber(String projectName, String opNumber, String version) {
        return processOperationDAO.findByProjectNameAndOpNumber(projectName, opNumber, version);
    }
    
    @Override
    public Response deleteByProjectNameAndOpNumber(String projectName, String tp, String opNumber, String version) {
        try {
            boolean result = processOperationDAO.deleteByProjectNameAndOpNumber(projectName, tp, opNumber, version);
            return result ?
                    generateResponse(200, "ProcessOperation deleted successfully")
                    : generateResponse(400, "ProcessOperation was not deleted");
        } catch (Exception e) {
            LOGGER.error("Failed to delete ProcessOperation", e);
            return generateResponse(500, "Failed to delete ProcessOperation: " + e.getMessage());
            
        }
    }
    
    @Override
    public Response deleteByProjectNameAndVersion(String projectName, String tp, String version) {
        try {
            boolean result = processOperationDAO.deleteByProjectNameAndVersion(projectName, tp, version);
            return result ?
                    generateResponse(200, "ProcessOperation deleted successfully")
                    : generateResponse(400, "ProcessOperation was not deleted");
        } catch (Exception e) {
            LOGGER.error("Failed to delete ProcessOperation", e);
            return generateResponse(500, "Failed to delete ProcessOperation: " + e.getMessage());
            
        }
    }
    
    @Override
    public List<ProcessOperationDTO> findByProjectNameAndTp(String projectName, String tp, String version) {
        return processOperationDAO.findByProjectNameAndTpAndVersion(projectName, tp, version);
    }
    
    @Override
    public List<ProcessOperationDTO> findByProjectName(String projectName) {
        return processOperationDAO.findByProjectName(projectName);
    }
    
    @Override
    public List<ProcessOperationDTO> findByProjectNameAndVersion(String projectName, String version) {
        return processOperationDAO.findByProjectNameAndVersion(projectName, version);
    }
    
    private ProcessOperation createProcessOperationFromRequest (ProcessOperation processOperationReq){
        var processOperation = new ProcessOperation(
                processOperationReq.getProjectName(),
                processOperationReq.getTp(),
                processOperationReq.getVersion(),
                processOperationReq.getOpNumber()
        );
        addTypicalActivity(processOperationReq,processOperation);
        addProcessEquipments(processOperationReq,processOperation);
        addMaterialIN(processOperationReq,processOperation);
        addMaterialOUT(processOperationReq,processOperation);
        addMainEquipment(processOperationReq,processOperation);
        addStartingMaterial(processOperationReq,processOperation);
        addProduct(processOperationReq,processOperation);
        
        return processOperation;
    }
    
    private void addMainEquipment(ProcessOperation processOperationReq, ProcessOperation processOperation) {
        if (processOperationReq.getMainEquipment() != null) {
            var mainEquipment = processOperationReq.getMainEquipment();
            mainEquipment.setProcessOperation(processOperation);
            processOperation.setMainEquipment(mainEquipment);
        }
    }
    
    private void addMaterialIN(ProcessOperation processOperationReq, ProcessOperation processOperation) {
        if (processOperationReq.getMaterialIN() != null) {
            var materialIN = processOperationReq.getMaterialIN();
            materialIN.setProcessOperationIN(processOperation);
            processOperation.setMaterialIN(materialIN);
        }
    }
    
    private void addStartingMaterial(ProcessOperation processOperationReq, ProcessOperation processOperation) {
        if (processOperationReq.getStartingMaterial() != null) {
            var startingMaterial = processOperationReq.getStartingMaterial();
            startingMaterial.setProcessOperationStarting(processOperation);
            processOperation.setStartingMaterial(startingMaterial);
        }
    }
    
    private void addProduct(ProcessOperation processOperationReq, ProcessOperation processOperation) {
        if (processOperationReq.getProduct() != null) {
            var product = processOperationReq.getProduct();
            product.setProcessOperationProduct(processOperation);
            processOperation.setProduct(product);
        }
    }
    
    private void addMaterialOUT(ProcessOperation processOperationReq, ProcessOperation processOperation) {
        if (processOperationReq.getMaterialOUT() != null) {
            var materialOUT = processOperationReq.getMaterialOUT();
            materialOUT.setProcessOperationOUT(processOperation);
            processOperation.setMaterialOUT(materialOUT);
        }
    }
    
    private void addTypicalActivity(ProcessOperation processOperationReq, ProcessOperation processOperation) {
        if (processOperationReq.getTypicalActivity() != null) {
            var typicalActivity = processOperationReq.getTypicalActivity();
            typicalActivity.setProcessOperation(processOperation);
            processOperation.setTypicalActivity(typicalActivity);
        }
    }
    
    private void addProcessEquipments (ProcessOperation processOperationReq, ProcessOperation processOperation){
        if (processOperationReq.getTypicalActivity() != null
                && !processOperationReq.getTypicalActivity().getProcessEquipments().isEmpty()){
            processOperation.getTypicalActivity().setProcessEquipments(
            processOperationReq.getTypicalActivity().getProcessEquipments().stream()
                    .peek(processEquipment -> processEquipment.setTypicalactivity(processOperationReq.getTypicalActivity()))
                    .collect(Collectors.toList()));
        }
    }
}
