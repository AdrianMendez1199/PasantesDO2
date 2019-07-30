const mongoose = require('mongoose');

require('./config');
// const uri = 'mongodb://localhost:27017/pasantesDO';

console.log(process.env.URLDB);
module.exports = mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then((result) => {
    console.log('conected');
  }).catch((err) => {
    console.log(err);
  });
