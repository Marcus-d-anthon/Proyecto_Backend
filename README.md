# 🚀 **Backend ISTLC — API para Gestión de Usuarios con Node.js, Express y MongoDB Atlas**

Este proyecto corresponde a la primera fase del desarrollo Full Stack y tiene como objetivo implementar un backend funcional capaz de gestionar usuarios mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Utiliza Node.js, Express y MongoDB Atlas junto con Mongoose. El backend sigue buenas prácticas de arquitectura, modularización y documentación, y está diseñado para que cada estudiante conozca y aplique correctamente los conceptos de API REST, cliente-servidor, uso de rutas, controladores y conexión con una base de datos alojada en la nube.

---

## 📘 Propósito del Backend

El propósito principal del backend es:

- Implementar un servidor REST real y funcional.
- Conectarlo a MongoDB Atlas a través de Mongoose.
- Permitir crear, consultar, actualizar y eliminar usuarios.
- Aplicar correctamente la arquitectura cliente-servidor.
- Practicar buenas prácticas de estructura de proyecto, uso de .env, documentación y manejo de errores.
- Servir como base para futuras fases del proyecto Full Stack.

---

## 📦 Tecnologías Utilizadas

- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- dotenv  
- bcryptjs (Para cifrado de contraseñas)  
- jsonwebtoken (Para autenticación JWT)  
- Nodemon (solo en desarrollo)

---

## 🛠️ Requisitos Previos

Para trabajar con el proyecto se necesita:

- Node.js versión 16 o superior  
- Cuenta activa en MongoDB Atlas  
- Clúster creado y funcionando  
- Acceso habilitado en Network Access (IP actual o 0.0.0.0/0 para desarrollo)  
- Crear un usuario de base de datos en Atlas con permisos adecuados  
- Git (opcional pero recomendado)

---

## ⚙️ Instalación y Ejecución del Proyecto

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <nombre-del-proyecto>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo .env

En la raíz del proyecto crear un archivo llamado .env con el siguiente contenido.

```bash
PORT=5000
MONGODB_URI="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombreBase>?retryWrites=true&w=majority&appName=ISTLC"
JWT_SECRET="TuClaveSecretaMuyLargaYseguraParaJWTs"
```

### 4. Ejecutar el backend

Modo desarrollo:

```bash
npm run dev
```

Con esto, el backend se ejecutará en:

http://localhost:5000

---

## 📂 Estructura del Proyecto

proyecto_backend/
├── config/
│   └── basedatos.js
├── controllers/
│   └── userControllers.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── utils/
│   └── generateToken.js
├── .env
├── .gitignore
├── package.json
└── server.js

---

## 🔌 Endpoints Disponibles — CRUD y Autenticación de Usuarios

El prefijo base para todas las rutas de usuario es /api.

### Rutas Públicas (Autenticación)

| Método | URL             | Función del Controlador | Descripción                                                       |
|--------|------------------|--------------------------|-------------------------------------------------------------------|
| POST   | /api/usuarios    | createUser               | Registra un nuevo usuario, cifra la contraseña y devuelve un JWT. |
| POST   | /api/auth/login  | loginUser                | Verifica credenciales y devuelve un JWT si son válidas.           |

### Rutas Protegidas (Requieren Token JWT)

| Método | URL                   | Función del Controlador | Descripción                                |
|--------|------------------------|--------------------------|--------------------------------------------|
| GET    | /api/usuarios         | getUsers                 | Lista todos los usuarios (sin contraseña). |
| GET    | /api/usuarios/:email  | getUserByEmail           | Obtiene un usuario por su email.           |
| PUT    | /api/usuarios/:id     | updateUser               | Actualiza datos del usuario por su ID.     |
| DELETE | /api/usuarios/:id     | deleteUser               | Elimina un usuario por su ID.              |

---

## 🧪 Pruebas con Postman

### ✔ 1. Registrar un usuario

**POST /api/usuarios**

**Método:** POST
**URL:** [http://localhost:5000/api/usuarios](http://localhost:5000/api/usuarios) 
**Body JSON:**

```json
{
  "name": "Maria Lopez",
  "email": "maria@gmail.com",
  "password": "passwordSegura123"
}
```

**Resultado:** Status 201 y un JWT en la respuesta.

### ✔ 2. Listar usuarios

**GET /api/usuarios**

**Método:** GET
**URL:** [http://localhost:5000/api/usuarios](http://localhost:5000/api/usuarios) 
**Autorización:** Bearer Token (pegar el JWT del paso 1).
**Resultado:** Status 200 y un arreglo de usuarios.

---

## 🔐 Recomendaciones de Seguridad

- Nunca subir el archivo .env al repositorio.
- No exponer credenciales en el código ni capturas.
- Mantener restringidas las IP permitidas en MongoDB Atlas.
- Usar contraseñas fuertes y únicas para el usuario del clúster.

---

## ✅ Estado Actual del Proyecto

El backend cumple con:

- Arquitectura modular y organizada.
- CRUD completo de usuarios.
- Sistema de Autenticación con JWT.
- Conexión funcional con MongoDB Atlas.
- Rutas protegidas con el middleware protect.
- Listo para integrarse con el frontend.
