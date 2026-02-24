# ---------- ETAPA 1: BUILD ----------
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copiamos primero el pom para cache inteligente
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el código fuente
COPY src ./src

# Compilamos
RUN mvn clean package -DskipTests


# ---------- ETAPA 2: RUNTIME ----------
FROM eclipse-temurin:17

WORKDIR /app

# Copiamos el jar generado en la etapa builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
