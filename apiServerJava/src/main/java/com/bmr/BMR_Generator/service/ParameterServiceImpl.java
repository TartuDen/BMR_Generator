package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dao.EquipmentDAOImpl;
import com.bmr.BMR_Generator.dao.ParameterDAO;
import com.bmr.BMR_Generator.dto.ParameterDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.Parameter;
import com.bmr.BMR_Generator.rest.response.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParameterServiceImpl extends BaseService implements ParameterService {
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    private final ParameterDAO parameterDAO;
    
    @Autowired
    public ParameterServiceImpl(ParameterDAO parameterDAO) {
        this.parameterDAO = parameterDAO;
    }
    
    @Override
    public Response saveParameter(Parameter parameter) {
        try {
            parameterDAO.save(parameter);
            return generateResponse(200, "Parameter saved successfully");
        } catch (Exception e) {
            LOGGER.error("Failed to save equipment", e);
            return generateResponse(500, "Failed to save parameter: " + e.getMessage());
        }
    }
    
    @Override
    public Response deleteParameterByName(String name) {
        try {
            boolean result = parameterDAO.deleteByName(name);
            return result ?
                    generateResponse(200, "Parameter deleted successfully")
                    : generateResponse(400, "Parameter was not deleted");
        } catch (Exception e) {
            LOGGER.error("Failed to save equipment", e);
            return generateResponse(500, "Failed to delete parameter: " + e.getMessage());
        }
    }
    
    @Override
    public List<ParameterDTO> getAllParameters() {
        return this.parameterDAO.getParameters();
    }
}
