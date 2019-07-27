const mongoose = require('mongoose');


module.exports = mongoose.connect('mongodb://localhost:27017/pasantesDO')
  .then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
