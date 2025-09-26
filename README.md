# Parcial 1 — API de Dinosaurios Argentinos 🦕

**Alumna:** Margoth Valeria Sanchez Ordoñez  
**Materia:** Aplicaciones Híbridas  
**Docente:** Cruz Jonathan Emanuel  
**Comisión:** DWN4AV

---

## 📌 Descripción

API RESTful sobre dinosaurios argentinos. Provee información de dinosaurios (nombre, período, dieta, longitud aproximada y descubridor).  
Este parcial implementa la parte básica de la API y una página pública para probar endpoints.

---

## 🚦 Estado actual

- ✅ **Implementado:** `GET /api/dinosaurios` (listar y filtrar)
- 🛠️ **En proceso:** rutas y controladores para paleontólogos
- 📝 Formularios para `POST/PUT/DELETE` disponibles en la página (requieren MongoDB en ejecución)

---

## 🛠️ Tecnologías

- Node.js (ES modules)
- Express
- MongoDB (Mongoose)
- express-validator
- Bootstrap (frontend)
- Nodemon (desarrollo)
- MongoDB Compass (opcional)

---

## 📂 Estructura (resumen)

index.js → servidor principal
routers/ → montaje de routers
routes/ → definición de endpoints y validaciones
controllers/ → lógica por entidad
models/ → esquemas Mongoose
middlewares/ → manejo de errores
public/ → documentación HTML + scripts cliente
scripts/ → seed data (opcional)

---

## 📋 Requisitos

- Node.js >= 18
- MongoDB (local o Atlas)
- npm

---

## ⚙️ Instalación y ejecución (local)

1. **Clonar el repositorio:**
   ```bash
   git clone <URL-del-repo>
   cd <nombre-del-repo>
   ```

## Instalar dependencias:

- Ejecutar la API:
- Desarrollo:
- npm run dev
- Producción:
- npm start

## Abrir la página de pruebas:

👉 http://localhost:3000/
