# 💳 Payment Dashboard

Sistema Fullstack para simulación de pagos desarrollado con:

- **Backend:** Spring Boot (Java)
- **Frontend:** React + TypeScript + Vite
- **Base de datos:** PostgreSQL
- **Contenerización:** Docker & Docker Compose

Este proyecto simula un POS virtual y muestra el historial de transacciones en un dashboard dinámico.

---

## 🏗 Arquitectura del Sistema

Frontend (React + Nginx)  
↓  
Backend (API REST Spring Boot)  
↓  
PostgreSQL

- El frontend consume la API REST del backend.
- El backend gestiona la lógica de negocio y persistencia.
- PostgreSQL almacena las transacciones.
- Docker Compose orquesta todos los servicios.

---

## 🚀 Cómo levantar el proyecto

### ✅ Requisitos previos

Solo se necesita tener instalado:

- Docker
- Docker Compose

No es necesario instalar:

- Java
- Node
- Maven

Todo se ejecuta dentro de contenedores.

---

## ▶️ Ejecutar la aplicación

1️⃣ Clonar el repositorio:

- git clone <URL_DEL_REPOSITORIO>
- cd payment-dashboard

2️⃣ Construir y levantar todos los servicios:

- docker compose up --build


## ▶️ Accesos a la aplicación

- Frontend: http://localhost:3000

- Backend: http://localhost:8080
