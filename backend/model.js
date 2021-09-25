const mongoose = require('mongoose');
const schema = mongoose.Schema;

const scoreSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    }
});

const score = mongoose.model('score', scoreSchema);
module.exports = score;