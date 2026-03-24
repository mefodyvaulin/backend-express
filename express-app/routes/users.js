const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({items: [{"id": 1, "name":"Мефодий"}, {"id": 2, "name": "Кристина"}]});
});

module.exports = router;
