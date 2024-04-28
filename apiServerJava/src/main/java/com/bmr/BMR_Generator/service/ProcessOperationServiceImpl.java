package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dao.ProcessOperationDAO;
import com.bmr.BMR_Generator.dao.ProcessOperationRepository;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProcessOperationServiceImpl extends BaseService implements ProcessOperationService{
    private final ProcessOperationRepository processOperationRepository;
    private final ProcessOperationDAO processOperationDAO;
    
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
    public ProcessOperation saveUsingDAO (ProcessOperation processOperationReq){
        ProcessOperation processOperation = createProcessOperationFromRequest(processOperationReq);
        return processOperationDAO.save(processOperation);
    }
    
    private ProcessOperation createProcessOperationFromRequest(ProcessOperation processOperationReq) {
        // Set the ProcessOperation reference in TypicalActivity if provided
        if (processOperationReq.getTypicalActivity() != null) {
            processOperationReq.getTypicalActivity().setProcessOperation(processOperationReq);
        }
        
        // Set the ProcessOperation reference in MaterialIN if provided
        if (processOperationReq.getMaterialIN() != null) {
            processOperationReq.getMaterialIN().setProcessOperation(processOperationReq);
        }
        
        // Set the ProcessOperation reference in MaterialOUT if provided
        if (processOperationReq.getMaterialOUT() != null) {
            processOperationReq.getMaterialOUT().setProcessOperation(processOperationReq);
        }
        
        return processOperationReq;
    }
}
