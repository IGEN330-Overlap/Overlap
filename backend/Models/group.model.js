const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Building group schema and defining the fields
const groupSchema = new Schema({
    groupCode: {
        type: String,
        unique: true,
        required: true,
    },
    groupName: {
        type: String
    },
    groupLeader: {
        type: String,
        required: true
    },
    users: [
        {
            type: String,
        },
    ],
},
    {
        timestamps: true,
    }
);

const group = mongoose.model('group', groupSchema);

module.exports = group;