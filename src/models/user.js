const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const rolesValid = {
  values: ['ADMIN_ROL', 'USER_ROLE'], // add function to find roles valid
  message: '{VALUE} no es un rol valido',
};


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'el campo name es obligatorio'],
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'el campo email es obligatorio'],
  },

  password: {
    type: String,
    required: [true, 'el campo password es obligatorio'],
  },

  role: {
    enum: rolesValid,
    type: String,
    default: 'USER_ROLE',
  },
  img: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: 'PEND',
  },

  google: {
    type: Boolean,
    default: false,
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

UserSchema.plugin(uniqueValidator, { message: 'el campo {PATH} es unico.' });

/**
 * this function delete
 * password to object json
 */
UserSchema.methods.toJSON = function deletePasswordToJSON() {
  const user = this;

  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};


module.exports = mongoose.model('User', UserSchema);
