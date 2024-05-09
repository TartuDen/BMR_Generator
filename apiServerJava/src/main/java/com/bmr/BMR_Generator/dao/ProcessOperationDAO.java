package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;

import java.util.List;

public interface ProcessOperationDAO {
    
    ProcessOperationDTO save (ProcessOperation processOperation);
    
    boolean sortAndTidyingOpNumber (String projectName, String tp, String version);
    
    ProcessOperationDTO findByProjectNameAndOpNumber (String projectName, String opNumber, String version);
    List<ProcessOperationDTO> findByProjectNameAndTpAndVersion(String projectName, String tp, String version);
    List<ProcessOperationDTO> findByProjectName (String projectName);
    List<ProcessOperationDTO> findByProjectNameAndVersion (String projectName, String version);
    ProcessOperation getByProjectNameTpAndOpNumber(String projectName, String tp, String opNumber, String version);
    boolean deleteByProjectNameAndOpNumber (String projectName, String tp, String opNumber, String version);
    
    List<String> getListOfProjects (String projectName);
}
