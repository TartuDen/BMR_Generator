package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.entity.ReceivedData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceivedDataRepository extends JpaRepository<ReceivedData, Long> {
}
