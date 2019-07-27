const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



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

    status: {
        type: Boolean,
        default: true,
    },

    google: {
        type: Boolean,
        default: false,
    },

});

UserSchema.plugin(uniqueValidator, { message: 'el campo {PATH} es unico.' });

/**
 * this function delete
 * password to object json
 */
UserSchema.methods.toJSON = function() {
    const user = this;

    const userObject = user.toObject();
    delete userObject.password;

    return UserSchema;
};

module.exports = mongoose.model('User', UserSchema);