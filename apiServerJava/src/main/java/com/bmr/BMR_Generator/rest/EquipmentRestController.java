package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.rest.response.EquipmentResponse;
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
    public EquipmentResponse saveEquipment(@RequestBody Equipment equipment){
        return equipmentService.saveEquipment(equipment);
    }
    
    @GetMapping("/main_table_equipment")
    public List<Equipment> getAllEquipment(){
        return equipmentService.getAllEquipment();
    }
    
    @PutMapping("/equipment/{id}")
    public EquipmentResponse updateEquipment(@PathVariable("id") long id, @RequestBody Equipment equipment) {
        return equipmentService.updateEquipment(id, equipment);
    }
}
