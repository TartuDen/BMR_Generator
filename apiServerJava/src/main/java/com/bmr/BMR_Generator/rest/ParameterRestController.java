package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.ParameterDTO;
import com.bmr.BMR_Generator.entity.Parameter;
import com.bmr.BMR_Generator.rest.response.NotAllowedRequestParameters;
import com.bmr.BMR_Generator.rest.response.Response;
import com.bmr.BMR_Generator.service.ParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<ParameterDTO>> getAllParameters(){
        return ResponseEntity.ok(parameterService.getAllParameters());
    }
    
    @PostMapping ("/parameter")
    public ResponseEntity<?> saveParameter(@RequestBody Parameter parameter){
        return ResponseEntity.ok(parameterService.saveParameter(parameter));
    }
    
    @DeleteMapping ("/parameter/{name}")
    public ResponseEntity<?> deleteParameter(@PathVariable String name){
        if (name.isEmpty()){
            throw new NotAllowedRequestParameters("Name can not be empty");
        }
        return ResponseEntity.ok(parameterService.deleteParameterByName(name));
    }
}
