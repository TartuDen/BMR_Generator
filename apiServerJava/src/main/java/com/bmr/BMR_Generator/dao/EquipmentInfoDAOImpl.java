package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.entity.EquipmentInfo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EquipmentInfoDAOImpl implements EquipmentInfoDAO{
    private static final Logger LOGGER = LogManager.getLogger(EquipmentInfoDAO.class);
    private final EntityManager entityManager;
    @Autowired
    public EquipmentInfoDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    @Override
    public EquipmentInfo getEquipmentInfoByCode(String code) {
        String jpql = "SELECT e FROM EquipmentInfo e WHERE e.code = :code";
        TypedQuery<EquipmentInfo> query = entityManager.createQuery(jpql, EquipmentInfo.class);
        query.setParameter("code", code);
        return query.getSingleResult(); // Equipment Name is UNIQUE, set by Equipment ENTITY
    }
}
