process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB = 'mongodb://localhost:27017/pasantesDO';
if (process.env.NODE_ENV !== 'DEV') {
  urlDB = 'mongodb+srv://amendez:Judoneyba1234@cluster0-ofpyn.mongodb.net/pasantesDO';
}

process.env.URL_DB = urlDB;
