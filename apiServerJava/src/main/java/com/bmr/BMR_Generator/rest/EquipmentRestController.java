package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.EquipmentDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutInfoDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutOperationsDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.EquipmentInfo;
import com.bmr.BMR_Generator.rest.response.BrApiServerException;
import com.bmr.BMR_Generator.rest.response.NotAllowedRequestParameters;
import com.bmr.BMR_Generator.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bmr.BMR_Generator.service.EquipmentService;

import java.util.List;

@RestController
public class EquipmentRestController {
    private final EquipmentService equipmentService;
    
    @Autowired
    public EquipmentRestController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }
    
    
    @PostMapping("/equipment")
    public Response saveEquipment(@RequestBody Equipment equipment) {
        if (equipment.getId() != 0) {
            throw new NotAllowedRequestParameters("ID not allowed in save request");
        }
        return equipmentService.saveEquipment(equipment);
    }
    
    @DeleteMapping("/equipment/{name}")
    public Response deleteEquipment(@PathVariable String name) {
        if (name.isEmpty()) {
            throw new NotAllowedRequestParameters("Name can not be empty");
        }
        return equipmentService.deleteEquipmentByName(name);
    }
    
    @GetMapping("/equipment/{name}")
    public EquipmentDTO getEquipmentByName(@PathVariable String name) {
        if (name.isEmpty()) {
            throw new NotAllowedRequestParameters("Name cannot be empty");
        } else {
            EquipmentDTO existingEquipment = equipmentService.getEquipmentByName(name);
            if (existingEquipment == null) {
                throw new BrApiServerException("Equipment with name - " + name + " not found");
            }
            return existingEquipment;
        }
    }
    
    @GetMapping("/main_table_equipment_full")
    public List<Equipment> getAllEquipment() {
        return equipmentService.getAllEquipment();
    }
    
    @GetMapping("/main_table_equipment")
    public List<EquipmentWithoutOperationsDTO> getAllEquipmentExcludeOperations() {
        return equipmentService.getAllEquipmentExcludeOperations();
    }
    
    @GetMapping("/activity_type")
    public List<EquipmentWithoutInfoDTO> getAllEquipmentExcludeInfo() {
        return equipmentService.getAllEquipmentExcludeInfo();
    }
    
    @DeleteMapping("/equipmentInfo/{name}/{code}")
    public Response updateEquipmentByNameAndCode(
            @PathVariable("name") String name,
            @PathVariable("code") String code) {
        if (name.isEmpty() || code.isEmpty()) {
            throw new NotAllowedRequestParameters("Name and Code cannot be empty");
        }
        return equipmentService.deleteEquipmentInfoFromEquipmentByName(name, code);
    }
    
    @PatchMapping("/equipmentInfo/{name}")
    public Response addEquipmentInfo(
            @PathVariable("name") String name,
            @RequestBody EquipmentInfo equipmentInfo) {
        if (name.isEmpty()) {
            throw new NotAllowedRequestParameters("Name cannot be empty");
        }
        return equipmentService.addEquipmentInfoToEquipmentByName(name, equipmentInfo);
    }
    
    @PatchMapping("/equipment/{id}")
    public Response updateEquipment(@PathVariable("id") long id, @RequestBody Equipment equipment) {
        if (id == 0) {
            throw new NotAllowedRequestParameters("ID cannot be empty");
        } else {
            EquipmentDTO existingEquipment = equipmentService.getEquipmentByID(id);
            if (existingEquipment == null) {
                throw new BrApiServerException("LabGlassware not found");
            }
        }
        
        return equipmentService.updateEquipment(id, equipment);
    }
    
    @GetMapping("/equipmentid/{id}")
    public EquipmentDTO getEquipmentByID(@PathVariable("id") long id) {
        if (id == 0) {
            throw new NotAllowedRequestParameters("ID cannot be empty");
        } else {
            EquipmentDTO existingEquipment = equipmentService.getEquipmentByID(id);
            if (existingEquipment == null) {
                throw new BrApiServerException("LabGlassware not found");
            }
            return existingEquipment;
        }
    }
}
