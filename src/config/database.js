const mongoose = require('mongoose');

require('./config');
// const uri = 'mongodb://localhost:27017/pasantesDO';


module.exports = mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .catch((err) => {
    throw new Error(err);
  });
