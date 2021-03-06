const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
    googleID: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});

mongoose.model('users',UserSchema);