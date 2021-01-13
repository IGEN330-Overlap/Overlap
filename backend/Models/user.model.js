const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String, 
        unique: true,
        required: true,
        trim: true
    },
    refreshToken: {type: String},
    name: {type: String},
    profilePictureURL: {type: String},
    groups: {type: Array}
}, {
    timestamps: true,    
});

const User = mongoose.model('User', userSchema);
module.exports = User;