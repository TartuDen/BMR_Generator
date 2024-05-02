package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.Response;
import com.bmr.BMR_Generator.service.ProcessOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProcessOperationRestController {
    
    private final ProcessOperationService processOperationService;
    
    @Autowired
    public ProcessOperationRestController(ProcessOperationService processOperationService) {
        this.processOperationService = processOperationService;
    }
    
    @PostMapping("/processoperation")
    public ResponseEntity<ProcessOperationDTO> saveUsingRepository(@RequestBody ProcessOperation processOperation) {
        return ResponseEntity.ok(processOperationService.saveUsingDAO(processOperation));
    }
    
    @GetMapping("/processoperation/{projectName}/{opNumber}")
    public ResponseEntity<ProcessOperationDTO> findByProjectNameAndOpNumber(@PathVariable String projectName,@PathVariable String opNumber) {
        return ResponseEntity.ok(processOperationService.findByProjectNameAndOpNumber(projectName, opNumber));
    }
    
    @DeleteMapping("/processoperation/{projectName}/{opNumber}")
    public ResponseEntity<?> deleteByProjectNameAndOpNumber(@PathVariable String projectName, @PathVariable String opNumber) {
        return ResponseEntity.ok(processOperationService.deleteByProjectNameAndOpNumber(projectName, opNumber));
    }
}
