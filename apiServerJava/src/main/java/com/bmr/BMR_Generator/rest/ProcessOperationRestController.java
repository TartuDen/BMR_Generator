package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.service.ProcessOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProcessOperationRestController {
    
    private final ProcessOperationService processOperationService;
    
    @Autowired
    public ProcessOperationRestController(ProcessOperationService processOperationService) {
        this.processOperationService = processOperationService;
    }
    
    @PostMapping("/processoperation")
    public ProcessOperation saveUsingRepository (@RequestBody ProcessOperation processOperation){
        System.out.println(processOperation);
        return processOperationService.saveUsingDAO(processOperation);
    }
}
