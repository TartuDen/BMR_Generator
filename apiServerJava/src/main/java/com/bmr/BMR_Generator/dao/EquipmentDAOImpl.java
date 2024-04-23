package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.EquipmentInfoDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutInfoDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutOperationsDTO;
import com.bmr.BMR_Generator.dto.OperationsDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.EquipmentInfo;
import com.bmr.BMR_Generator.entity.Operation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class EquipmentDAOImpl implements EquipmentDAO{
    
    private final EntityManager entityManager;
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    @Autowired
    public EquipmentDAOImpl(EntityManager entityManager) {
            this.entityManager = entityManager;
        }
    
    @Override
    @Transactional
    public boolean save(Equipment equipment) {
        try {
            entityManager.persist(equipment);
            return true;
        } catch (Exception e) {
            LOGGER.error("Error occurred while saving equipment", e);
            return false;
        }
    }
    
    @Override
    @Transactional
    public boolean update(Equipment equipment) {
        try {
            entityManager.merge(equipment);
            return true;
        } catch (Exception e) {
            LOGGER.error("Error occurred while updating equipment", e);
            return false;
        }
    }
    
    @Override
    public List<Equipment> findAllEquipment() {
        TypedQuery<Equipment> findAllQuery = entityManager.createQuery("FROM Equipment", Equipment.class);
        return findAllQuery.getResultList();
    }
    
    @Override
    public List<EquipmentWithoutOperationsDTO> findAllEquipmentExcludeOperations() {
        TypedQuery<Equipment> findAllQuery = entityManager.createQuery("FROM Equipment", Equipment.class);
        var equipmentFull = findAllQuery.getResultList();
        return equipmentFull.stream()
                .map(this::mapToEquipmentWithoutOperationsDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<EquipmentWithoutInfoDTO> findAllEquipmentExcludeInfo() {
        TypedQuery<Equipment> findAllQuery = entityManager.createQuery("FROM Equipment", Equipment.class);
        var equipmentFull = findAllQuery.getResultList();
        return equipmentFull.stream()
                .map(this::mapToEquipmentWithoutInfoDTO)
                .collect(Collectors.toList());
    }
    
    private EquipmentWithoutInfoDTO mapToEquipmentWithoutInfoDTO(Equipment equipment) {
        EquipmentWithoutInfoDTO dto = new EquipmentWithoutInfoDTO();
        dto.setId(equipment.getId());
        dto.setName(equipment.getName());
        dto.setOperations(mapToEquipmentOperationDTOList(equipment.getOperations()));
        return dto;
    }
    
    private List<OperationsDTO> mapToEquipmentOperationDTOList(List<Operation> operations) {
        return operations.stream()
                .map(this::mapToOperationDTO)
                .collect(Collectors.toList());
    }
    
    private OperationsDTO mapToOperationDTO(Operation operation) {
        var dto = new OperationsDTO();
        dto.setId(operation.getId());
        dto.setOperationType(operation.getOperationType());
        dto.setContent(operation.getContent());
        dto.setOther(operation.getOther());
        
        return dto;
    }
    
    private EquipmentWithoutOperationsDTO mapToEquipmentWithoutOperationsDTO(Equipment equipment) {
        EquipmentWithoutOperationsDTO dto = new EquipmentWithoutOperationsDTO();
        dto.setId(equipment.getId());
        dto.setName(equipment.getName());
        dto.setEquipmentInfo(mapToEquipmentInfoDTOList(equipment.getEquipmentInfo()));
        return dto;
    }
    
    private List<EquipmentInfoDTO> mapToEquipmentInfoDTOList(List<EquipmentInfo> equipmentInfoList) {
        return equipmentInfoList.stream()
                .map(this::mapToEquipmentInfoDTO)
                .collect(Collectors.toList());
    }
    
    private EquipmentInfoDTO mapToEquipmentInfoDTO(EquipmentInfo equipmentInfo) {
        var dto = new EquipmentInfoDTO();
        dto.setId(equipmentInfo.getId());
        dto.setCode(equipmentInfo.getCode());
        dto.setDescription(equipmentInfo.getDescription());
        return dto;
    }
    
}
