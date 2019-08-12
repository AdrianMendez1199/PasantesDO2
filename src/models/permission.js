import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;


const rolesValid = {
  values: ['ADMIN_ROL', 'USER_ROLE'], // add function to find roles valid
  message: '{VALUE} no es un rol valido',
};


const schemaPermissions = new Schema({
  permission: {
    type: String,
    unique: true,
    required: [true, 'el permiso es requerido'],
  },
  roles: {
    type: Array,
    default: 'ADMIN_ROLE',
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_by: {
    type: ObjectId,
    required: true,
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

mongoose.plugin(uniqueValidator, { message: 'el campo {PATH} es unico.' });

module.exports = mongoose.model('Permission', schemaPermissions);
