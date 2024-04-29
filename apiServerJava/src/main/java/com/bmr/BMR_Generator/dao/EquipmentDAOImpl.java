package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.*;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.EquipmentInfo;
import com.bmr.BMR_Generator.entity.Operation;
import com.bmr.BMR_Generator.rest.response.BrApiServerException;
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
public class EquipmentDAOImpl implements EquipmentDAO {
    
    private static final Logger LOGGER = LogManager.getLogger(EquipmentDAOImpl.class);
    private final EntityManager entityManager;
    
    @Autowired
    public EquipmentDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    @Override
    @Transactional
    public void save(Equipment equipment) {
        try {
            entityManager.persist(equipment);
        } catch (Exception e) {
            LOGGER.error("Error occurred while saving equipment", e);
        }
    }
    
    // TODO check entityManager.merge
    @Override
    @Transactional
    public void update(Equipment equipment, long id) {
        equipment.setId(id);
        try {
            entityManager.merge(equipment);
        } catch (Exception e) {
            LOGGER.error("Error occurred while updating equipment", e);
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
    
    @Override
    public EquipmentDTO findEquipmentByID(long id) {
        Equipment equipment = entityManager.find(Equipment.class, id);
        return new EquipmentDTO(equipment);
    }
    
    @Override
    public EquipmentDTO findEquipmentByName(String name) {
        return new EquipmentDTO(getEquipmentByName(name));
    }
    
    @Override
    public long getEquipmentIDbyName(String name) {
        return getEquipmentByName(name).getId();
    }
    
    private Equipment getEquipmentByName(String name) {
        String jpql = "SELECT e FROM Equipment e WHERE e.name = :name";
        TypedQuery<Equipment> query = entityManager.createQuery(jpql, Equipment.class);
        query.setParameter("name", name);
        return query.getSingleResult(); // Equipment Name is UNIQUE, set by Equipment ENTITY
    }
    
    @Override
    @Transactional
    public boolean deleteByName(String name) {
        try {
            entityManager.remove(getEquipmentByName(name));
            return true;
        } catch (Exception e) {
            LOGGER.error("Error occurred while deleting Equipment - " + name, e);
            throw new BrApiServerException("An unexpected error occurred (deleteByName) on removing - " + name);
        }
    }
    
    private EquipmentWithoutInfoDTO mapToEquipmentWithoutInfoDTO(Equipment equipment) {
        EquipmentWithoutInfoDTO dto = new EquipmentWithoutInfoDTO();
        dto.setName(equipment.getName());
        dto.setOperations(mapToEquipmentOperationDTOList(equipment.getOperations()));
        return dto;
    }
    
    private EquipmentDTO mapToEquipmentDTO(Equipment equipment) {
        return new EquipmentDTO(equipment);
    }
    
    private List<OperationDTO> mapToEquipmentOperationDTOList(List<Operation> operations) {
        return operations.stream()
                .map(this::mapToOperationDTO)
                .collect(Collectors.toList());
    }
    
    private EquipmentWithoutOperationsDTO mapToEquipmentWithoutOperationsDTO(Equipment equipment) {
        EquipmentWithoutOperationsDTO dto = new EquipmentWithoutOperationsDTO();
        dto.setName(equipment.getName());
        dto.setEquipmentInfo(mapToEquipmentInfoDTOList(equipment.getEquipmentInfo()));
        return dto;
    }
    
    private List<EquipmentInfoDTO> mapToEquipmentInfoDTOList(List<EquipmentInfo> equipmentInfoList) {
        return equipmentInfoList.stream()
                .map(this::mapToEquipmentInfoDTO)
                .collect(Collectors.toList());
    }
    
    private OperationDTO mapToOperationDTO(Operation operation) {
        return new OperationDTO(operation);
    }
    
    private EquipmentInfoDTO mapToEquipmentInfoDTO(EquipmentInfo equipmentInfo) {
        return new EquipmentInfoDTO(equipmentInfo);
    }
    
}
