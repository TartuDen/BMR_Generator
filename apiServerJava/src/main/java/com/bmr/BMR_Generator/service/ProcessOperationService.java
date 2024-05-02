package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.Response;

import java.util.List;

public interface ProcessOperationService {
    ProcessOperation save (ProcessOperation processOperation);
    ProcessOperationDTO saveUsingDAO (ProcessOperation processOperationReq);
    
    ProcessOperationDTO findByProjectNameAndOpNumber(String projectName, String opNumber);
    Response deleteByProjectNameAndOpNumber (String projectName, String opNumber);
    
    List<ProcessOperationDTO> findByProjectNameAndTp(String projectName, String tp);
    List<ProcessOperationDTO> findByProjectName (String projectName);

}
