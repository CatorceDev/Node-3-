# Ejercicio escolar: gestión de librería

Este proyecto es un ejercicio práctico escolar para aprender y practicar desarrollo backend con JavaScript y Node.js. Consiste en una aplicación web sencilla para administrar personas, libros y ventas, usando Express, plantillas EJS y una base de datos MariaDB.

## ¿Qué se practica?

- Crear un servidor y definir rutas con **Node.js** y **Express**.
- Organizar el código en rutas, controladores y modelos.
- Recibir y procesar datos de formularios con JavaScript.
- Renderizar páginas dinámicas usando **EJS**.
- Conectar una aplicación a **MariaDB** y realizar operaciones CRUD con **Sequelize**.
- Usar variables de entorno para configurar la conexión a la base de datos.

## Requisitos

- Node.js y npm
- MariaDB en ejecución
- Una base de datos creada para el ejercicio

## Instalación y configuración

1. Instala las dependencias:

   ```bash
   npm ci
   ```

2. Crea un archivo `.env` en la raíz del proyecto, tomando `.example.env` como referencia:

   ```env
   BD_NOMBRE=base_web
   BD_USUARIO=Tu usuario
   BD_CLAVE=Tu contraseña
   BD_DIALEC=mariadb
   BD_HOST=localhost
   BD_PORT=3306
   ```

3. Crea en MariaDB la base de datos indicada en `BD_NOMBRE`. Al iniciar, Sequelize comprobará la conexión y sincronizará los modelos.

## Iniciar la aplicación

Desde la raíz del proyecto, ejecuta:

```bash
node index.js
```

El servidor escucha en [http://localhost:2800](http://localhost:2800). La sección de personas está disponible en `/personas`.

## Secciones y rutas

Cada sección permite listar registros, mostrar formularios, crear, editar y eliminar datos. Para editar y eliminar formularios HTML se utiliza `method-override` para enviar solicitudes `PUT` y `DELETE`.

| Sección | Listado | Crear | Editar |
| --- | --- | --- | --- |
| Personas | `GET /personas` | `GET /personas/crear` y `POST /personas/registrar` | `GET /personas/:id/editar` y `PUT /personas/:id` |
| Libros | `GET /libros` | `GET /libros/crear` y `POST /libros/registrar` | `GET /libros/:id/editar` y `PUT /libros/:id` |
| Ventas | `GET /ventas` | `GET /ventas/crear` y `POST /ventas/registrar` | `GET /ventas/:id/editar` y `PUT /ventas/:id` |

Para eliminar, se envía `DELETE /:id` en la sección correspondiente.

## Modelos de datos

- **Persona:** nombre, apellido, correo electrónico y edad.
- **Libro:** título, autor y precio.
- **Venta:** cantidad y fecha, que se establece automáticamente si no se proporciona.

Los modelos incluyen asociaciones de uno a muchos entre personas y ventas, y entre libros y ventas. Estas relaciones forman parte de la práctica de modelado de datos con Sequelize.

## Estructura del proyecto

```text
config/       Configuración de la conexión a MariaDB
controllers/  Lógica de las operaciones y renderizado de vistas
models/       Modelos y asociaciones de Sequelize
routes/       Rutas de personas, libros y ventas
views/        Plantillas EJS
public/       Bootstrap y archivos estáticos
index.js      Configuración e inicio del servidor
```

## Nota

El archivo `.env` contiene la configuración local de la base de datos y está excluido de Git. Usa `.example.env` como plantilla. El script `npm run server` definido actualmente en `package.json` apunta a `views/index.js`; con la estructura actual, inicia el ejercicio con `node index.js`.
