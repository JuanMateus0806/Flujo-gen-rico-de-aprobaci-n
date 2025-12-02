# Flujo-genérico-de-aprobación
Kata Junior - Fullstack/Cloud Challenge 5 | Flujo Genérico de Aprobación

Este repositorio contiene un sistema completo de gestión de solicitudes y flujo de aprobaciones.

# Tecnologias utilzadas
- **Backend:** Node.js + Nest.js + TypeOrm  
- **Frontend:** React + Vite + TailwindCSS  
- **Base de Datos:** PostgreSQL    
- **Notificaciones Email:** Nodemailer  
- **Infraestructura Local:** Docker Compose  

A continuacion encontraras los requisitos previos y el paso a paso para poder ejecutar todo el sistema de forma local

---

## Requisitos Previos

Asegúrate de tener instalado:

- Docker

Lo puedes verificar con los sigueintes comandos:
```bash
docker --version
docker compose version
```

---

## 📥 Instalación

### **Clonar el repositorio**

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git](https://github.com/JuanMateus0806/Flujo-gen-rico-de-aprobaci-n.git
```

### **Configurar variables de entorno**

#### **Variable de entorno global**

Al ubicarte en raiz del respositorio que clonaste debes ver una estructura similar a la siguiente

```bash
|_ backend
|_ init
|_ frontend
```

Hay debes crear un **.env** que tenga lo siguiente.

```bash
DB_NAME=requests_database
DB_USER=postgres
DB_PASSWORD=postgres
```

Luego debes ubicarte dentro de la carpeta **backend** y crear el sigeuinte **.env**,  en este caso debes agregar tus credenciales de correo.
Debes tener en cuenta que las credeciales de la base de datos deben coincidir en los **.env**

```bash
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=requests_database
PORT=3000
ALLOWED_ORIGINS=http://localhost:5173
EMAIL_PORT=465
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=correo@gmail.com
EMAIL_PASSWORD=contraseña de applicaion
```

Luego debes ubicarte dentro de la carpeta **frontend** y crear el sigueinte **.env**.

```bash
VITE_API_URL=/api
```

## **Importante**

Si usas Gmail, debes generar una Contraseña de Aplicación desde Google → Seguridad → Verificación en dos pasos → Contraseñas de aplicación.

### **Levantar el proyecto (Backend, Frontend, PostgreSQL y MongoDB)**

```bash
docker compose up -d --build
```

Esto levantara todo el sistema, puedes verificar el estado de los contenedores con el siguiente comando 

```bash
docker ps
```

## **Acceder al sistema**

```bash
http://localhost
```
