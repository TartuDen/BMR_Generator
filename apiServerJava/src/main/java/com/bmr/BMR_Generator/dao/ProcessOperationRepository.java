package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.entity.ProcessOperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;


public interface ProcessOperationRepository extends JpaRepository<ProcessOperation, Long> {
    @Query("SELECT DISTINCT e.projectName FROM ProcessOperation e")
    Set<String> findDistinctProjectNames();
    
    @Query("SELECT DISTINCT e.tp FROM ProcessOperation e WHERE e.projectName = :projectName")
    Set<String> findDistinctTPsForProjectName(String projectName);
    
    @Query("SELECT DISTINCT e.version FROM ProcessOperation e WHERE e.projectName = :projectName AND e.tp = :tp")
    Set<String> findDistinctVersionsForProjectNameAndTp(String projectName, String tp);
    
    
    @Query("SELECT COUNT(DISTINCT e.opNumber) FROM ProcessOperation e WHERE e.projectName = :projectName AND  e.tp = :tp AND e.version = :version")
    Long countDistinctOperationNumberForProject(@Param("projectName") String projectName, @Param("tp") String tp, @Param("version") String version);
    
    
}
