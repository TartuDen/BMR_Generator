package com.bmr.BMR_Generator.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "received_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceivedData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String latitude;
    private String longitude;
    private String clickedProjects;
    private String timestamp;
}