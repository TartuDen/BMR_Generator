package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.entity.ProcessOperation;

public interface ProcessOperationService {
    ProcessOperation save (ProcessOperation processOperation);
    ProcessOperation saveUsingDAO (ProcessOperation processOperationReq);

}
