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

	public static void main(String[] args) {
		SpringApplication.run(BmrGeneratorApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(EquipmentDAO equipmentDAO){
		return  args -> {
//			// Test equipment saving to the DB
//			if (createEquipment(equipmentDAO)){
//				System.out.println("Saved OK!");
//			} else {
//				System.out.println("Error during equipment saving");
//			};
//
//			// Test: Get All equipment form the DB
//			equipmentDAO.findAllEquipment().forEach(System.out::println);
		};
	}
	
	private boolean createEquipment(EquipmentDAO equipmentDAO) {
		var equipmentTest1 = new Equipment(
				"reactor"
		);
		var operationTest1 = new Operation(
				"prepare_of_reactor",
				"Reactor preparation: The reactor {reactor} and thermostat are checked to be ready for work."
		);
		var equipmentInfo = new EquipmentInfo(
				"002-10",
				"30L glass"
		);
		equipmentTest1.addOperation(operationTest1);
		equipmentTest1.addEquipmentInfo(equipmentInfo);

		return equipmentDAO.save(equipmentTest1);
	}
}
