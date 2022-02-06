//Importar express
const express = require('express');
//Importar rutas
const routes = require('./routes');
//Importar cors
const cors = require('cors');
//Importar DB
const connectDB = require('./config/db');

//Crear servidor
const app = express();

//Habilitar carpeta publica
app.use(express.static('uploads'));

//Habilitar cors
app.use(cors());

//Conectar DB
connectDB();

//Habilitar express.json
app.use(express.json());

//Puerto de la app
const port = process.env.PORT || 4000;

app.use('/', routes());

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor funciona en el puerto ${port}`)
})