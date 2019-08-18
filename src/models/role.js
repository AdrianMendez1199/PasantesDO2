import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


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

  permissions: {
    type: Array,
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

export default mongoose.model('Role', RoleSchema);
