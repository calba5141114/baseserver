const mongoose = require('mongoose');


const workerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
        default: 'none',
    },
    location:{
        type: String,
        required: true,
    },
    friends: {
        type: [String],
        default: [],
        required: true,
    }
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;