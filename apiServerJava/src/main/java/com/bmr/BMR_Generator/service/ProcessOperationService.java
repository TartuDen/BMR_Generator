package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.Response;

import java.util.List;
import java.util.Set;

public interface ProcessOperationService {
    ProcessOperation save (ProcessOperation processOperation);
    Set<String> findDistinctProjectNames();
    Set<String> findDistinctTPsForProjectName(String projectName);
    Set<String> findDistinctVersionsForProjectNameAndTp(String projectName, String tp);
    Set<String> countDistinctOperationNumberForProject (String projectName, String tp, String version);
    Response sortAndTidyingOpNumber (String projectName, String tp, String version);
    
    ProcessOperationDTO saveUsingDAO (ProcessOperation processOperationReq);
    
    ProcessOperationDTO findByProjectNameAndOpNumber(String projectName, String opNumber, String version);
    Response deleteByProjectNameAndOpNumber (String projectName, String tp, String opNumber, String version);
    Response deleteByProjectNameAndVersion (String projectName, String tp, String version);
    
    List<ProcessOperationDTO> findByProjectNameAndTp(String projectName, String tp, String version);
    List<ProcessOperationDTO> findByProjectName (String projectName);
    List<ProcessOperationDTO> findByProjectNameAndVersion (String projectName, String version);
    
    

}
