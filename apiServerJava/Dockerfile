FROM openjdk:19-jdk-alpine

WORKDIR /app

COPY build/libs/BMR_Generator-0.0.1-TestVersion.jar /app/BMR_Generator-0.0.1-TestVersion.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "/app/BMR_Generator-0.0.1-TestVersion.jar"]
