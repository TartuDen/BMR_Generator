package com.bmr.BMR_Generator.rest;

import com.bmr.BMR_Generator.entity.ReceivedData;
import com.bmr.BMR_Generator.service.ReceivedDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DataReceiverController {
    private final ReceivedDataService receivedDataService;
    
    @Autowired
    public DataReceiverController(ReceivedDataService receivedDataService) {
        this.receivedDataService = receivedDataService;
    }
    
    @PostMapping("/receive-data")
    public ResponseEntity<String> receiveData(@RequestBody Map<String, String> data) {
        System.out.println(data);
        try {
            // Create a new ReceivedData entity and populate it with received data
            ReceivedData receivedData = new ReceivedData();
            receivedData.setLatitude(data.get("Latitude:"));
            receivedData.setLongitude(data.get("Longitude:"));
            receivedData.setClickedProjects(data.get("ClickedProject:"));
            receivedData.setTimestamp(data.get("Data:"));
            
            System.out.println(receivedData);
            
            // Save the data to the database
            receivedDataService.saveReceivedData(receivedData);
            
            // Respond to the client
            return ResponseEntity.ok("Data received and saved successfully");
        } catch (Exception e) {
            // Handle any errors that occur during processing
            return ResponseEntity.status(500).body("Error processing data: " + e.getMessage());
        }
    }
}
