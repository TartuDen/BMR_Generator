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
    @Transactional
    public ProcessOperationDTO saveUsingDAO (ProcessOperation processOperationReq){
        ProcessOperation processOperation = createProcessOperationFromRequest(processOperationReq);
        return processOperationDAO.save(processOperation);
    }
    
    @Override
    public ProcessOperationDTO findByProjectNameAndOpNumber(String projectName, String opNumber) {
        return processOperationDAO.findByProjectNameAndOpNumber(projectName, opNumber);
    }
    
    @Override
    public Response deleteByProjectNameAndOpNumber(String projectName, String opNumber) {
        try {
            boolean result = processOperationDAO.deleteByProjectNameAndOpNumber(projectName, opNumber);
            return result ?
                    generateResponse(200, "ProcessOperation deleted successfully")
                    : generateResponse(400, "ProcessOperation was not deleted");
        } catch (Exception e) {
            LOGGER.error("Failed to delete ProcessOperation", e);
            return generateResponse(500, "Failed to delete ProcessOperation: " + e.getMessage());
            
        }
    }
    
    private ProcessOperation createProcessOperationFromRequest (ProcessOperation processOperationReq){
        var processOperation = new ProcessOperation(
                processOperationReq.getProjectName(),
                processOperationReq.getTp(),
                processOperationReq.getOpNumber()
        );
        addTypicalActivity(processOperationReq,processOperation);
        addProcessEquipments(processOperationReq,processOperation);
        addMaterialIN(processOperationReq,processOperation);
        addMaterialOUT(processOperationReq,processOperation);
        addMainEquipment(processOperationReq,processOperation);
        
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
    
    private void addMaterialOUT(ProcessOperation processOperationReq, ProcessOperation processOperation) {
        if (processOperationReq.getMaterialIN() != null) {
            var materialOUT = processOperationReq.getMaterialOUT();
            materialOUT.setProcessOperationOUT(processOperation);
            processOperation.setMaterialIN(materialOUT);
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
