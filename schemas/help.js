const mongoose = require('mongoose');

const { Schema } = mongoose;
const helpSchema = new Schema({
    PGM_NO: {
        type: String,
        required: true,
    },
    GUIDE: {
        type: Array,
    }
}, {collection: 'help' });

module.exports = mongoose.model('Help', helpSchema);