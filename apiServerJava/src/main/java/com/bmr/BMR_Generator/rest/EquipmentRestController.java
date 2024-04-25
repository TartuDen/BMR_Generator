package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.dto.EquipmentDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutInfoDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutOperationsDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.rest.response.NotFoundException;
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
    
    
    @PostMapping ("/equipment")
    public Response saveEquipment(@RequestBody Equipment equipment){
        return equipmentService.saveEquipment(equipment);
    }
    
    @GetMapping("/main_table_equipment_full")
    public List<Equipment> getAllEquipment(){
        return equipmentService.getAllEquipment();
    }
    @GetMapping("/main_table_equipment")
    public List<EquipmentWithoutOperationsDTO> getAllEquipmentExcludeOperations(){
        return equipmentService.getAllEquipmentExcludeOperations();
    }
    
    @GetMapping("/activity_type")
    public List<EquipmentWithoutInfoDTO> getAllEquipmentExcludeInfo(){
        return equipmentService.getAllEquipmentExcludeInfo();
    }
    
    @PatchMapping ("/equipment/{id}")
    public Response updateEquipment(@PathVariable("id") long id, @RequestBody Equipment equipment) {
        if (id == 0) {
            throw new NotFoundException("ID cannot be empty");
        } else {
            EquipmentDTO existingEquipment = equipmentService.getEquipmentByID(id);
            if (existingEquipment == null) {
                throw new NotFoundException("LabGlassware not found");
            }
        }
        
        return equipmentService.updateEquipment(id, equipment);
    }
    
    @GetMapping("/equipment/{id}")
    public EquipmentDTO getEquipmentByID(@PathVariable("id") long id){
        return equipmentService.getEquipmentByID(id);
    }
}
