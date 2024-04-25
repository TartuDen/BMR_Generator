package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ParameterDTO;
import com.bmr.BMR_Generator.entity.Parameter;

import java.util.List;

public interface ParameterDAO {
    boolean save(Parameter parameter);
    boolean deleteByName (String name);
    
    List<ParameterDTO> getParameters();
}
