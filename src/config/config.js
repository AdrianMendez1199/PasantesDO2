// =============================
// Puerto 
// =============================
process.env.PORT = process.env.PORT || 3000;


// =============================
// Desarrollo o produccion
// =============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =============================
// Base de datos
// =============================
let urlDB = 'mongodb+srv://amendez:Judoneyba1234@cluster0-ofpyn.mongodb.net/pasantesDO';

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/pasantesDO';
}

process.env.URLDB = urlDB;


// =============================
// Caducidad TOKEN
// =============================

process.env.CADUCIDAD_TOKEN = 60 * 60;


// =============================
// SEED de autenticacion
// =============================

process.env.SEED = process.env.SEED || 'hola-mundo-token-autenticacion';

