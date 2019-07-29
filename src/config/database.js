const mongoose = require('mongoose');

require('./config');
// const uri = 'mongodb://localhost:27017/pasantesDO';


module.exports = mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then((result) => {
    console.log('conected');
  }).catch((err) => {
    console.log(err);
  });
