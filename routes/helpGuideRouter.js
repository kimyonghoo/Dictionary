const express = require('express');
const router = express.Router();
const Help = require('../schemas/help');

router.get('/', async (req, res)=>{
    try {
        res.send('help servlet home');
    } catch (err) {
        res.send(err);
    }
});

router.get('/search', async (req, res)=>{
    try {
        const result = await Help.find({PGM_NO: req.query.curPgmNo} , {"_id": false});
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;