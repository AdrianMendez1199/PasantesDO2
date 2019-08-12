import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import './config/config';
import './config/database';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();

// configuracion de las rutas
app.use(require('./routes/index'));


app.listen(process.env.PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});
