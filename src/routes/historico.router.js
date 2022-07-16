var express = require('express');
var router = express.Router();
var controller = require('../controllers/historico.controller');
var authenticationFilter = require ('../middleware/authenticationFilter');
var administrationFilter = require ('../middleware/administrationFilter');

/* GET all  */
router.get('/',[authenticationFilter, administrationFilter], controller.getAll);

/* GET by ID  */
router.get('/:id',[authenticationFilter, administrationFilter], controller.getById);

/* GET by UserId  */
router.get('/user/id/:id',[authenticationFilter, administrationFilter], controller.getByUserId);

/* GET by CurrentUser  */
router.get('/user/current',[authenticationFilter], controller.getByCurrentUser);

module.exports = router;