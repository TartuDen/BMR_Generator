package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dao.ProcessInitialInfoDAO;
import com.bmr.BMR_Generator.dto.ProcessInitialInfoDTO;
import com.bmr.BMR_Generator.entity.ProcessInitialInfo;
import com.bmr.BMR_Generator.rest.response.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ProcessInitialInfoServiceImpl extends BaseService implements ProcessInitialInfoService {
    private final ProcessInitialInfoDAO processInitialInfoDAO;
    private static final Logger LOGGER = LogManager.getLogger(ProcessInitialInfoDAO.class);
    
    @Autowired
    public ProcessInitialInfoServiceImpl(ProcessInitialInfoDAO processInitialInfoDAO) {
        this.processInitialInfoDAO = processInitialInfoDAO;
    }
    
    @Override
    public Response save(ProcessInitialInfo processInitialInfoReq) {
        try {
            ProcessInitialInfo processInitialInfo = createProcessInitialInfoFromRequest(processInitialInfoReq);
            processInitialInfoDAO.save(processInitialInfo);
            return generateResponse(200, "ProcessInitialInfo saved successfully");
        } catch (Exception e) {
            LOGGER.error("Failed to save ProcessInitialInfo", e);
            return generateResponse(500, "Failed to save ProcessInitialInfo: " + e.getMessage());
        }
    }
    
    private ProcessInitialInfo createProcessInitialInfoFromRequest(ProcessInitialInfo processInitialInfoReq) {
        ProcessInitialInfo processInitialInfo = new ProcessInitialInfo(
                processInitialInfoReq.getProjectName(),
                processInitialInfoReq.getTp(),
                processInitialInfoReq.getVersion());
        
        addEquipmentSet(processInitialInfoReq, processInitialInfo);
        addReagentSet(processInitialInfoReq, processInitialInfo);
        
        return processInitialInfo;
    }
    
    private void addEquipmentSet(ProcessInitialInfo processInitialInfoReq, ProcessInitialInfo processInitialInfo) {
        processInitialInfo.setEquipmentSet(
                processInitialInfoReq.getEquipmentSet().stream()
                        .peek(projectEquipment -> projectEquipment.setProcessinitialinfo(processInitialInfo))
                        .collect(Collectors.toList())
        );
    }
    
    private void addReagentSet(ProcessInitialInfo processInitialInfoReq, ProcessInitialInfo processInitialInfo) {
        processInitialInfo.setReagentSet(
                processInitialInfoReq.getReagentSet().stream()
                        .peek(projectReagent -> projectReagent.setProcessinitialinfo(processInitialInfo))
                        .collect(Collectors.toList())
        );
    }
    
    @Override
    public Response deleteByNameTpVersion(String projectName, String tp, String version) {
        try {
            boolean result = processInitialInfoDAO.deleteByNameTpVersion(projectName, tp, version);
            return result ?
                    generateResponse(200, "processInitialInfo deleted successfully")
                    : generateResponse(400, "processInitialInfo was not deleted");
        } catch (Exception e) {
            LOGGER.error("processInitialInfo to delete equipment", e);
            return generateResponse(500, "Failed to delete processInitialInfo: " + e.getMessage());
        }
    }
    
    @Override
    public ProcessInitialInfoDTO findByNameTpVersion(String projectName, String tp, String version) {
       return processInitialInfoDAO.findByNameTpVersion(projectName, tp, version);
    }
}
