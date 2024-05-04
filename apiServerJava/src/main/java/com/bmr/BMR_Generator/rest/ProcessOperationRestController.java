package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.Response;
import com.bmr.BMR_Generator.service.ProcessOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    
    @GetMapping("/processoperationNum/{projectName}/{opNumber}/{version}")
    public ResponseEntity<ProcessOperationDTO> findByProjectNameAndOpNumber(
            @PathVariable String projectName,
            @PathVariable String opNumber,
            @PathVariable String version) {
        return ResponseEntity.ok(processOperationService.findByProjectNameAndOpNumber(projectName, opNumber, version));
    }
    @GetMapping("/processoperation/{projectName}")
    public ResponseEntity<List<ProcessOperationDTO>> findByProjectName(@PathVariable String projectName) {
        return ResponseEntity.ok(processOperationService.findByProjectName(projectName));
    }
    
    @GetMapping("/processoperation/{projectName}/{version}")
    public ResponseEntity<List<ProcessOperationDTO>> findByProjectName(@PathVariable String projectName, @PathVariable String version) {
        return ResponseEntity.ok(processOperationService.findByProjectNameAndVersion(projectName, version));
    }
    
    @GetMapping("/processoperation/{projectName}/{tp}/{version}")
    public ResponseEntity<List<ProcessOperationDTO>> findByProjectNameAndTpNumber(
            @PathVariable String projectName,
            @PathVariable String tp,
            @PathVariable String version) {
        return ResponseEntity.ok(processOperationService.findByProjectNameAndTp(projectName, tp, version));
    }
    
    @DeleteMapping("/processoperation/{projectName}/{tp}/{opNumber}/{version}")
    public ResponseEntity<?> deleteByProjectNameAndOpNumber(
            @PathVariable String projectName,
            @PathVariable String tp,
            @PathVariable String opNumber,
            @PathVariable String version) {
        return ResponseEntity.ok(processOperationService.deleteByProjectNameAndOpNumber(projectName, tp, opNumber, version));
    }
}
