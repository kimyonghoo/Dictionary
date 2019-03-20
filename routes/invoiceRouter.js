const express = require('express');
const router = express.Router();
const Invoice = require('../schemas/invoice');

router.get('/', async (req, res)=>{
    try {
        res.send('invoice servlet home');
    } catch (err) {
        res.send(err);
    }
});

router.get('/search', async (req, res)=>{
    try {
        const result = await Invoice.find(req.query , {"_id": false});
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;