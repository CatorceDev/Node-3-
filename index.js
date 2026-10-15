import express from "express";
import router from "./routes/inicio_router.js";
import librosRouter from "./routes/libros_router.js"
import ventasRouter from "./routes/ventas_router.js"
import db from "./config/db.js";
import dotenv from 'dotenv';
import methodOverride from "method-override";
import path from 'path';
const __dirname = path.resolve();
dotenv.config({ path: '.env' });
//Crear la aplicación
const app = express();
//accesos a los datos del formulario
app.use(express.urlencoded({ extended: true }))
// Permite PUT/DELETE vía ?_method=PUT
app.use(methodOverride('_method'));
// Middleware para parsear JSON
app.use(express.json());
// Motor de vistas
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');
//carpeta publica
app.use(express.static("public"));
//acceso a bootstrap
app.use('/bootstrap', express.static(
    path.join(__dirname, 'public/bootstrap')
));
//routing
app.use("/personas", router);
app.use("/libros", librosRouter);
app.use("/ventas", ventasRouter);
//definiendo el puerto
const port = 2800;
(async () => {
    try {
        await db.authenticate();
        console.log('Conexión a la base de datos establecida.');
        await db.sync(); // crea/actualiza tablas
        console.log('Modelos sincronizados.');
        app.listen(port, () => {

            console.log(`Esperando peticiones en el puerto ${port}`);
        });
    } catch (err) {
        console.error('Error al iniciar:', err);
    }
})();