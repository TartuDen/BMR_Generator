package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dao.ReceivedDataRepository;
import com.bmr.BMR_Generator.entity.ReceivedData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReceivedDataService {
    private final ReceivedDataRepository receivedDataRepository;
    
    @Autowired
    public ReceivedDataService(ReceivedDataRepository receivedDataRepository) {
        this.receivedDataRepository = receivedDataRepository;
    }
    
    public ReceivedData saveReceivedData(ReceivedData receivedData) {
        return receivedDataRepository.save(receivedData);
    }
}
