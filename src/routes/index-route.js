'use strict';
const express     = require('express');
const router      = express.Router();

router.get('/', (req,res,next) => {
    res.status(201).send({
        title: "Node Store Api",
        version: "0.0.2",
        author : "Yargo Fernando S. de Siqueira"
    });
});

module.exports = router;