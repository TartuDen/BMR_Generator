package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.Response;
import com.bmr.BMR_Generator.service.ProcessOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class ProcessOperationRestController {
    
    private final ProcessOperationService processOperationService;
    
    @Autowired
    public ProcessOperationRestController(ProcessOperationService processOperationService) {
        this.processOperationService = processOperationService;
    }
    
    @GetMapping("/processdata/projects")
    public ResponseEntity<Set<String>> findDistinctProjectNames() {
        Set<String> distinctProjectNames = processOperationService.findDistinctProjectNames();
        return ResponseEntity.ok(distinctProjectNames);
    }
    
    @GetMapping("/processdata/projects/{projectName}/tp")
    public ResponseEntity<Set<String>> findDistinctTPsForProjectName(@PathVariable String projectName) {
        Set<String> distinctTPs = processOperationService.findDistinctTPsForProjectName(projectName);
        return ResponseEntity.ok(distinctTPs);
    }
    
    @GetMapping("/processdata/projects/{projectName}/tp/{tp}/versions")
    public ResponseEntity<Set<String>> findDistinctVersionsForProjectNameAndTp(
            @PathVariable String projectName,
            @PathVariable String tp) {
        Set<String> distinctVersions = processOperationService.findDistinctVersionsForProjectNameAndTp(projectName, tp);
        return ResponseEntity.ok(distinctVersions);
    }
    
    @GetMapping("/processdata/projects/{projectName}/tp/{tp}/versions/{version}/opnumbers")
    public ResponseEntity<Set<String>> findDistinctOperationNumberForProject(
            @PathVariable String projectName,
            @PathVariable String tp,
            @PathVariable String version) {
        long distinctOperationNumbers = processOperationService.countDistinctOperationNumberForProject(projectName, tp, version);
        System.out.println(distinctOperationNumbers);
        return ResponseEntity.ok(distinctOperationNumbers);
        
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
