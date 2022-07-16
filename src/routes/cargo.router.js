var express = require('express');
var router = express.Router();
var controller = require('../controllers/cargo.controller');
var authenticationFilter = require ('../middleware/authenticationFilter');
var administrationFilter = require ('../middleware/administrationFilter');

/* GET all  */
router.get('/',[authenticationFilter, administrationFilter], controller.getAll);

/* GET by ID  */
router.get('/:id',[authenticationFilter, administrationFilter], controller.getById);

/* GET by username do utilizador logado  */
router.get('/user',[authenticationFilter], controller.getFromUser);

module.exports = router;