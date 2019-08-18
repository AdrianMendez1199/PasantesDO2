import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


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

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
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

export default mongoose.model('User', UserSchema);
