package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.ParameterDTO;
import com.bmr.BMR_Generator.entity.Parameter;
import com.bmr.BMR_Generator.rest.response.NotFoundException;
import com.bmr.BMR_Generator.rest.response.Response;
import com.bmr.BMR_Generator.service.ParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ParameterRestController {
    private final ParameterService parameterService;
    
    @Autowired
    public ParameterRestController(ParameterService parameterService) {
        this.parameterService = parameterService;
    }
    
    @GetMapping("/parameters")
    public List<ParameterDTO> getAllParameters(){
        return parameterService.getAllParameters();
    }
    
    @PostMapping ("/parameter")
    public Response saveParameter(@RequestBody Parameter parameter){
        return parameterService.saveParameter(parameter);
    }
    
    @DeleteMapping ("/parameter/{name}")
    public Response deleteParameter(@PathVariable String name){
        if (name.isEmpty()){
            throw new NotFoundException("Name can not be empty");
        }
        return parameterService.deleteParameterByName(name);
    }
}
