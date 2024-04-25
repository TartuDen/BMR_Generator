package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dao.EquipmentDAO;
import com.bmr.BMR_Generator.dao.EquipmentDAOImpl;
import com.bmr.BMR_Generator.dto.EquipmentDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutInfoDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutOperationsDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.rest.response.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EquipmentServiceImpl extends BaseService implements EquipmentService {

    private final EquipmentDAO equipmentDAO;
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    
    @Autowired
    public EquipmentServiceImpl(EquipmentDAO equipmentDAO) {
        this.equipmentDAO = equipmentDAO;
    }
    
    
    @Override
    public Response saveEquipment(Equipment equipmentReq) {
        try {
            Equipment equipment = createEquipmentFromRequest(equipmentReq);
            equipmentDAO.save(equipment);
            return generateResponse(200, "Equipment saved successfully");
        } catch (Exception e) {
            LOGGER.error("Failed to save equipment", e);
            return generateResponse(500, "Failed to save equipment: " + e.getMessage());
        }
    }
    
    private Equipment createEquipmentFromRequest(Equipment equipmentReq) {
        Equipment equipment = new Equipment(equipmentReq.getName());
        equipment.setEquipmentInfo(
                equipmentReq.getEquipmentInfo().stream()
                        .peek(equipmentInfo -> equipmentInfo.setEquipment(equipment))
                        .collect(Collectors.toList())
        );
        equipment.setOperations(
                equipmentReq.getOperations().stream()
                        .peek(operation -> operation.setEquipment(equipment))
                        .collect(Collectors.toList())
        );
        return equipment;
    }
    
    @Override
    public List<Equipment> getAllEquipment() {
        return equipmentDAO.findAllEquipment();
    }
    
    // TODO: NOT WORKED PROPERLY
    @Override
    public Response updateEquipment(long id, Equipment equipmentReq) {
        try {
            Equipment equipment = createEquipmentFromRequest(equipmentReq);
            equipmentDAO.update(equipment, id);
            return generateResponse(200, "Equipment update successfully");
        } catch (Exception e) {
            LOGGER.error("Failed to save equipment", e);
            return generateResponse(500, "Failed to update equipment: " + e.getMessage());
        }
    }
    
    @Override
    public List<EquipmentWithoutOperationsDTO> getAllEquipmentExcludeOperations() {
        return equipmentDAO.findAllEquipmentExcludeOperations();
    }
    
    @Override
    public List<EquipmentWithoutInfoDTO> getAllEquipmentExcludeInfo() {
        return equipmentDAO.findAllEquipmentExcludeInfo();
    }
    
    @Override
    public EquipmentDTO getEquipmentByID(long id) {
        return equipmentDAO.findEquipmentByID(id);
    }
}
