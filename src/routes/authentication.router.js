var express = require('express');
var router = express.Router();
var controller = require('../controllers/authentication.controller');

/* POST login  */
router.post('/login', controller.login);

module.exports = router;