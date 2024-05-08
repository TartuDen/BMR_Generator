package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.ProcessInitialInfoDTO;
import com.bmr.BMR_Generator.entity.ProcessInitialInfo;

public interface ProcessInitialInfoDAO {
    ProcessInitialInfoDTO save (ProcessInitialInfo processInitialInfo);
    boolean deleteByNameTpVersion (String projectName, String tp, String version);
    ProcessInitialInfoDTO findByNameTpVersion (String projectName, String tp, String version);
}
