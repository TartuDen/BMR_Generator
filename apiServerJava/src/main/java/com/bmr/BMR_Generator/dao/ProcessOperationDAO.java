package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;

public interface ProcessOperationDAO {
    
    ProcessOperationDTO save (ProcessOperation processOperation);
    
    ProcessOperationDTO findByProjectNameAndOpNumber (String projectName, String opNumber);
    ProcessOperation getByProjectNameAndOpNumber (String projectName, String opNumber);
    boolean deleteByProjectNameAndOpNumber (String projectName, String opNumber);
    
}
