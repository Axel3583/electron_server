const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    id: Number,

    text: {
        type: String,
        required: true,
        unique: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema);
