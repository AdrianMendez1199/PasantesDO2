const express = require('express');
const bodyParser = require('body-parser');

require('./config/config');
require('./config/database');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configuracion de las rutas
app.use(require('./routes/index'));


app.listen(process.env.PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});
