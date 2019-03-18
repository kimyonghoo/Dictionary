const mongoose = require('mongoose');

const { Schema } = mongoose;
const bookingeSchema = new Schema({
    BKG_NO: {
        type: String,
        required: true,
    },
}, {collection: 'booking' });

module.exports = mongoose.model('Booking', bookingeSchema);