import express from 'express';
import dotenv from 'dotenv';
/* eslint import/no-unresolved: 2 */
import bodyParser from 'body-parser';
// import path from 'path';

import './config/config';
import './config/database';
import router from './routes/index';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();

// test google sing-in
// app.use(express.static(path.resolve(__dirname, '../public')));


// configuracion de las rutas
app.use(router);


app.listen(process.env.PORT, () => {
  console.info(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});
