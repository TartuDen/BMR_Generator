# BMR_Generator API Server

## Overview
This API server facilitates the creation of batch records for production in GMP pharmaceutical manufacturing.

It serves as the backend component written in Java, responsible for interacting with the database and handling backend logic.

## Running the Application
To run the application using Gradle, follow these steps:

1. Ensure you have Java and Gradle installed on your system.
2. Open a terminal or command prompt.
3. Navigate to the root directory of your project.
4. Run the following command:
```
./gradlew bootRun
```

## Swagger Documentation
Swagger documentation for this API can be found at [http://localhost:8085/swagger-ui/index.html](http://localhost:8085/swagger-ui/index.html)

## Configuration
- **Application Name:** BMR_Generator
- **Server Port:** 8085
- **Environment Info Enabled:** true
- **Database URL:** jdbc:mysql://localhost:3306/bmr_generator_db
- **JPA/Hibernate DDL Auto:** update

## Testing

To verify the health status of the API server:
[http://localhost:8085/actuator/health](http://localhost:8085/actuator/health)


To retrieve custom application information:
[http://localhost:8085/actuator/info](http://localhost:8085/actuator/info)