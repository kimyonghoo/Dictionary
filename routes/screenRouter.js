const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        res.send('screen servlet home');
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res)=>{
    res.render(req.params.id, {
    });
});

module.exports = router;