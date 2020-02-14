import mongoose from 'mongoose';

import './config';


module.exports = mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .catch((err) => {
    throw new Error(err);
  });
