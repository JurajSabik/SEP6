FROM openjdk:17-alpine
 
WORKDIR /app
 
COPY ./InfrastructureServices/build/libs/InfrastructureServices-1.0.jar /app/InfrastructureServices-1.0.jar
 
EXPOSE 8080
 
ENTRYPOINT ["java", "-jar", "InfrastructureServices-1.0.jar"]
