package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.Response;

public interface ProcessOperationService {
    ProcessOperation save (ProcessOperation processOperation);
    ProcessOperationDTO saveUsingDAO (ProcessOperation processOperationReq);
    
    ProcessOperationDTO findByProjectNameAndOpNumber(String projectName, String opNumber);
    Response deleteByProjectNameAndOpNumber (String projectName, String opNumber);

}
