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

## Install Docker on Linux
```
which curl
sudo apt-get update
sudo apt-get install curl

curl -fsSL https://get.docker.com/ | sh
docker -v
sudo usermod -aG docker admin
sudo service docker restart

docker build -t bmrimage1:v0.1 . 
```

## MySQL docker container
```
docker pull mysql
```
```
docker run -p 3307:3306 --name mysqlcontainer -e MYSQL_ROOT_PASSWORD="password" -e MYSQL_DATABASE="DB name" -d mysql
```
### User should be added "bmradmin"
```
 mysql -h 127.0.0.1 -P 3307 -u root -p

SELECT user, host FROM mysql.user;
```
### Create a network
```
docker network create netmysql
docker network connect netmysql mysqlcontainer

docker inspect mysqlcontainer
```

### RUN APP CONTAINER
```
docker run -p 8090:8085 --name bmrconteiner --net netmysql -e MYSQL_HOST=mysqlcontainer -e MYS
QL_PORT=3306 -e MYSQL_USER=bmradmin -e MYSQL_PASSWORD=password bmrimage1:v0.1
```