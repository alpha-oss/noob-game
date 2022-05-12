var express = require('express');
var router = express.Router();

// json parser
router.use(express.json());

router.get('/', function (req, res) {
    res.send('hello');
});

// define the home page route
router.post('/', function (req, res) {
    res.send({
        name: req.body.name,
        score: req.body.score,
    });
});

module.exports = router;