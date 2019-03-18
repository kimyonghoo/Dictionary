const express = require('express');
const router = express.Router();
const Booking = require('../schemas/booking');

router.get('/', async (req, res)=>{
    try {
        res.send('booking servlet home');
    } catch (err) {
        res.send(err);
    }
});

router.get('/search', async (req, res)=>{
    try {
        const result = await Booking.find(req.query)
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;