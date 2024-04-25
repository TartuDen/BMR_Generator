package com.bmr.BMR_Generator;

import com.bmr.BMR_Generator.dao.EquipmentDAO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.EquipmentInfo;
import com.bmr.BMR_Generator.entity.Operation;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BmrGeneratorApplication {
	
	// TODO: ADD validation Layer
	// TODO: POST NOT worked with ID
	// TODO: PATCH based on ID

	public static void main(String[] args) {
		SpringApplication.run(BmrGeneratorApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(EquipmentDAO equipmentDAO){
		return  args -> {
		};
	}
}
