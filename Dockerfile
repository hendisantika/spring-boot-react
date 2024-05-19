# Create a new image for running the application
FROM eclipse-temurin:21-alpine
LABEL authors="hendisantika"
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
