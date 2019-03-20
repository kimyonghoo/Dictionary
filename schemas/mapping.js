const mongoose = require('mongoose');

const { Schema } = mongoose;
const mappingSchema = new Schema({
}, {collection: 'mapping' });

module.exports = mongoose.model('Mapping', mappingSchema);