package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;

import java.util.List;

public interface ProcessOperationDAO {
    
    ProcessOperationDTO save (ProcessOperation processOperation);
    
    ProcessOperationDTO findByProjectNameAndOpNumber (String projectName, String opNumber);
    List<ProcessOperationDTO> findByProjectNameAndTp (String projectName, String tp);
    List<ProcessOperationDTO> findByProjectName (String projectName);
    ProcessOperation getByProjectNameAndOpNumber (String projectName, String opNumber);
    boolean deleteByProjectNameAndOpNumber (String projectName, String opNumber);
    
}
