# ToDo FullStack API

Backend para una aplicación de organización y gestión de tareas (ToDo List) fullstack. Este proyecto proporciona una API RESTful construida con Node.js, Express y MongoDB.

## 🚀 Características

-   **Autenticación de Usuarios**: Registro e inicio de sesión seguros utilizando JWT (JSON Web Tokens) y bcrypt para el hashing de contraseñas.
-   **Gestión de Tableros**: Crea, organiza y elimina tableros para agrupar tus notas.
-   **Notas Avanzadas**:
    -   CRUD completo (Crear, Leer, Actualizar, Eliminar).
    -   Sistema de prioridad.
    -   Opción para fijar (pin) notas importantes.
    -   Asociación a tableros específicos.
-   **Checklists (Subnotas)**: Agrega listas de tareas dentro de cada nota y marca ítems como completados.
-   **Seguridad**: Middleware de autenticación para proteger rutas privadas.

## 🛠️ Tecnologías

-   **Node.js**: Entorno de ejecución.
-   **Express**: Framework web para la API.
-   **MongoDB & Mongoose**: Base de datos NoSQL y ODM.
-   **JWT (JsonWebToken)**: Manejo de sesiones y seguridad.
-   **Bcryptjs**: Encriptación de contraseñas.
-   **Cors**: Manejo de orígenes cruzados.
-   **Dotenv**: Manejo de variables de entorno.

## 📦 Instalación

1.  **Clonar el repositorio**
    ```bash
    git clone <tu-repo-url>
    cd Back-express-todo
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**
    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
    ```env
    PORT=3000
    MONGO_URI=tu_cadena_de_conexion_a_mongodb
    JWT_SECRET=tu_secreto_super_seguro
    JWT_EXPIRES_IN=1d
    ```

4.  **Correr el servidor**
    ```bash
    # Modo desarrollo (con watch)
    npm run dev

    # Modo producción
    npm start
    ```

## 🔌 Endpoints Principales

### Auth
-   `POST /api/auth/register`: Registrar nuevo usuario.
-   `POST /api/auth/login`: Iniciar sesión.

### Notas
-   `GET /api/notes`: Obtener todas las notas del usuario.
-   `POST /api/notes`: Crear una nueva nota.
-   `PUT /api/notes/:id`: Actualizar una nota.
-   `DELETE /api/notes/:id`: Eliminar una nota.
-   `PUT /api/notes/:id/pin`: Fijar/Desfijar una nota.

### Tableros
-   `GET /api/boards`: Obtener tableros.
-   `POST /api/boards`: Crear tablero.
