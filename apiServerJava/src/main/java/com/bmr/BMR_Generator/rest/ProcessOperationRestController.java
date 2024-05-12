package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.ProcessOperationDTO;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.rest.response.BrApiServerException;
import com.bmr.BMR_Generator.rest.response.GlobalExceptionHandler;
import com.bmr.BMR_Generator.rest.response.NotAllowedRequestParameters;
import com.bmr.BMR_Generator.rest.response.Response;
import com.bmr.BMR_Generator.service.ProcessOperationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @CrossOrigin
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
    
    @PatchMapping("/processdata/{projectName}/{tp}/{version}")
    public ResponseEntity<?> sortAndTidyingOpNumber(
            @PathVariable String projectName,
            @PathVariable String tp,
            @PathVariable String version) {
        return ResponseEntity.ok(processOperationService.sortAndTidyingOpNumber(projectName, tp, version));
    }
    
    
    @GetMapping("/processdata/projects/{projectName}/tp/{tp}/versions/{version}/opnumbers")
    public ResponseEntity<Set<String>> findDistinctOperationNumberForProject(
            @PathVariable String projectName,
            @PathVariable String tp,
            @PathVariable String version) {
        Set<String> distinctOperationNumbers = processOperationService.countDistinctOperationNumberForProject(projectName, tp, version);
        return ResponseEntity.ok(distinctOperationNumbers);
    }
    
    /**
     * Saves the provided {@link ProcessOperation}.
     * If the {@code opNumber} of the {@link ProcessOperation} is 0, it assigns a new sequential value based on the maximum {@code opNumber} found in the database.
     * <p>
     * This method delegates the actual saving operation to the service layer.
     * If an error occurs during the saving process, it is handled by the global exception handler {@link GlobalExceptionHandler}.
     *
     * @param processOperation The {@link ProcessOperation} entity to be saved.
     * @return A {@link ProcessOperationDTO} representing the saved {@link ProcessOperation}.
     * @throws BrApiServerException        If an error occurs during the saving process.
     * @throws NotAllowedRequestParameters} If the request parameters are not allowed.
     */
    @Operation(description = "Saves the provided ProcessOperation entity. If the opNumber is 0, assigns a new sequential value based on the maximum opNumber found in the database. Delegates to the service layer for processing.",
            responses = {
                    @ApiResponse(responseCode = "200",
                            description = "Successful operation",
                            content = @Content(schema = @Schema(implementation = ProcessOperationDTO.class))),
                    @ApiResponse(responseCode = "404",
                            description = "Saved ProcessOperation not found or other resource not found.",
                            content = @Content(schema = @Schema(implementation = Response.class))),
                    @ApiResponse(responseCode = "406",
                            description = "Not Acceptable. ProcessOperation with given parameters already exists.",
                            content = @Content(schema = @Schema(implementation = Response.class))),
                    @ApiResponse(responseCode = "400",
                            description = "Bad request. Invalid parameters or other validation errors.",
                            content = @Content(schema = @Schema(implementation = Response.class)))
            }
    )
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
    
    @DeleteMapping("/processoperation/{projectName}/{tp}/{version}")
    public ResponseEntity<?> deleteByProjectNameAndOpNumberAndVersion(
            @PathVariable String projectName,
            @PathVariable String tp,
            @PathVariable String version) {
        return ResponseEntity.ok(processOperationService.deleteByProjectNameAndVersion(projectName, tp, version));
    }
}
