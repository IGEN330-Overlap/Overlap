const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Building user schema and defining the fields
const userSchema = new Schema({
    userID: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    imageURL: {
        type: String
    },
    email: {
        type: String
    },
    groups: [
        {
            type: String
        },
    ],
},
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;