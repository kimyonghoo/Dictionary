const express = require('express');
const router = express.Router();
const Mapping = require('../schemas/mapping');

router.get('/', async (req, res)=>{
    try {
        res.send('mapping servlet home');
    } catch (err) {
        res.send(err);
    }
});

router.get('/search', async (req, res)=>{
    try {
        const result = await Mapping.find({PGM_NO: req.query.pgmNo}, {"_id": false, "PGM_NO": false});
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;