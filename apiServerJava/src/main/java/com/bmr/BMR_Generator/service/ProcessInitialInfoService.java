package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dto.ProcessInitialInfoDTO;
import com.bmr.BMR_Generator.entity.ProcessInitialInfo;
import com.bmr.BMR_Generator.rest.response.Response;

public interface ProcessInitialInfoService {
    Response save(ProcessInitialInfo processInitialInfo);
    Response deleteByNameTpVersion(String projectName, String tp, String version);
    ProcessInitialInfoDTO findByNameTpVersion(String projectName, String tp, String version);
}
