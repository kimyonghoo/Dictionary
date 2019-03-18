const mongoose = require('mongoose');

const { Schema } = mongoose;
const mappingSchema = new Schema({
    POR_ID: {
        type: String,
        required: true,
    },
    POL_ID: {
        type: String,
        required: true,
    },
    POD_ID: {
        type: String,
        required: true,
    },
    DEL_ID: {
        type: String,
        required: true,
    }
}, {collection: 'mapping' });

module.exports = mongoose.model('Mapping', mappingSchema);