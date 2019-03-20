const mongoose = require('mongoose');

const { Schema } = mongoose;
const invoiceSchema = new Schema({
    INV_NO: {
        type: String,
        required: true,
    },
}, {collection: 'invoice' });

module.exports = mongoose.model('Invoice', invoiceSchema);