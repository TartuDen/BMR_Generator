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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> saveEquipment(@RequestBody Equipment equipment) {
        if (equipment.getId() != 0) {
            throw new NotAllowedRequestParameters("ID not allowed in save request");
        }
        return ResponseEntity.ok(equipmentService.saveEquipment(equipment));
    }
    
    @DeleteMapping("/equipment/{name}")
    public ResponseEntity<?> deleteEquipment(@PathVariable String name) {
        if (name.isEmpty()) {
            throw new NotAllowedRequestParameters("Name can not be empty");
        }
        return ResponseEntity.ok(equipmentService.deleteEquipmentByName(name));
    }
    
    @GetMapping("/equipment/{name}")
    public ResponseEntity<?> getEquipmentByName(@PathVariable String name) {
        if (name.isEmpty()) {
            throw new NotAllowedRequestParameters("Name cannot be empty");
        } else {
            EquipmentDTO existingEquipment = equipmentService.getEquipmentByName(name);
            if (existingEquipment == null) {
                throw new BrApiServerException("Equipment with name - " + name + " not found");
            }
            return ResponseEntity.status(HttpStatus.OK).body(existingEquipment);
        }
    }
    
    @GetMapping("/main_table_equipment_full")
    public ResponseEntity<List<Equipment>> getAllEquipment() {
        return ResponseEntity.ok(equipmentService.getAllEquipment());
    }
    
    @GetMapping("/main_table_equipment")
    public ResponseEntity<List<EquipmentWithoutOperationsDTO>> getAllEquipmentExcludeOperations() {
        return ResponseEntity.ok(equipmentService.getAllEquipmentExcludeOperations());
    }
    
    @GetMapping("/activity_type")
    public ResponseEntity<List<EquipmentWithoutInfoDTO>> getAllEquipmentExcludeInfo() {
        return ResponseEntity.ok(equipmentService.getAllEquipmentExcludeInfo());
    }
    
    @DeleteMapping("/equipmentInfo/{name}/{code}")
    public ResponseEntity<?> updateEquipmentByNameAndCode(
            @PathVariable("name") String name,
            @PathVariable("code") String code) {
        if (name.isEmpty() || code.isEmpty()) {
            throw new NotAllowedRequestParameters("Name and Code cannot be empty");
        }
        var response = equipmentService.deleteEquipmentInfoFromEquipmentByName(name, code);
        return ResponseEntity.ok(response);
    }
    
    @PatchMapping("/equipmentInfo/{name}")
    public ResponseEntity<?> addEquipmentInfo(
            @PathVariable("name") String name,
            @RequestBody EquipmentInfo equipmentInfo) {
        if (name.isEmpty()) {
            throw new NotAllowedRequestParameters("Name cannot be empty");
        }
        return ResponseEntity.ok(equipmentService.addEquipmentInfoToEquipmentByName(name, equipmentInfo));
    }
    
    @PatchMapping("/equipment/{id}")
    public ResponseEntity<?> updateEquipment(@PathVariable("id") long id, @RequestBody Equipment equipment) {
        if (id == 0) {
            throw new NotAllowedRequestParameters("ID cannot be empty");
        } else {
            EquipmentDTO existingEquipment = equipmentService.getEquipmentByID(id);
            if (existingEquipment == null) {
                throw new BrApiServerException("LabGlassware not found");
            }
        }
        
        return ResponseEntity.ok(equipmentService.updateEquipment(id, equipment));
    }
    
    @GetMapping("/equipmentid/{id}")
    public ResponseEntity<EquipmentDTO> getEquipmentByID(@PathVariable("id") long id) {
        if (id == 0) {
            throw new NotAllowedRequestParameters("ID cannot be empty");
        } else {
            EquipmentDTO existingEquipment = equipmentService.getEquipmentByID(id);
            if (existingEquipment == null) {
                throw new BrApiServerException("LabGlassware not found");
            }
            return ResponseEntity.ok(existingEquipment);
        }
    }
}
