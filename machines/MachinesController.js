const express = require('express');
const router = express.Router();

router.get('/machines', (req, res) => {
    res.send('Rota de máquinas')
});

module.exports = router;