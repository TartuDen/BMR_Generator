package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dto.ParameterDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.Parameter;
import com.bmr.BMR_Generator.rest.response.Response;

import java.util.List;

public interface ParameterService {
    Response saveParameter(Parameter parameter);
    Response deleteParameterByName(String name);
    
    List<ParameterDTO> getAllParameters();
}
