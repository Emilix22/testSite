const express = require('express');
const router = express.Router();
const rickApiController = require('../controllers/rickApiController');

router.get('/personajes', rickApiController.personajes);


module.exports = router;