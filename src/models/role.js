const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const RoleSchema = new mongoose.Schema({

  name: {
    type: String,
    unique: true,
    maxlength: 15,
    required: [true, 'el nombre es requerido'],
  },

  description: {
    type: String,
    maxlength: 150,
  },

  status: {
    type: Boolean,
    default: true,
  },

  permissions:{
    type:Array
  },
  create_at: {
    type: Date,
    default: Date.now,
  },

  update_at: {
    type: Date,
    default: Date.now,
  },

});

mongoose.plugin(uniqueValidator, { message: 'el campo {PATH} es unico.' });

module.exports = mongoose.model('Role', RoleSchema);
