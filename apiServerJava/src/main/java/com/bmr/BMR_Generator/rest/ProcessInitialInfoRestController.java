package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.ProcessInitialInfoDTO;
import com.bmr.BMR_Generator.entity.ProcessInitialInfo;
import com.bmr.BMR_Generator.service.ProcessInitialInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProcessInitialInfoRestController {
    private final ProcessInitialInfoService processInitialInfoService;
    
    @Autowired
    public ProcessInitialInfoRestController(ProcessInitialInfoService processInitialInfoService) {
        this.processInitialInfoService = processInitialInfoService;
    }
    
    @GetMapping("/processInitialInfo/{projectName}/{tp}/{version}")
    public ResponseEntity<ProcessInitialInfoDTO> getProcessInitialInfo(
            @PathVariable("projectName") String projectName,
            @PathVariable("tp") String tp,
            @PathVariable("version") String version){
        var response = processInitialInfoService.findByNameTpVersion(projectName, tp, version);
        
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/processInitialInfo/{projectName}/{tp}/{version}")
    public ResponseEntity<?> deleteProcessInitialInfo(
            @PathVariable("projectName") String projectName,
            @PathVariable("tp") String tp,
            @PathVariable("version") String version){
        var response = processInitialInfoService.deleteByNameTpVersion(projectName, tp, version);
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/processInitialInfo")
    public ResponseEntity<?> saveProcessInitialInfo(@RequestBody ProcessInitialInfo processInitialInfo){
        var response = processInitialInfoService.save(processInitialInfo);
        return ResponseEntity.ok(response);
    }
}
