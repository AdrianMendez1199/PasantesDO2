const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/pasantesDO';


module.exports = mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then((result) => {
        console.log('conected');
    }).catch((err) => {
        console.log(err);
    });