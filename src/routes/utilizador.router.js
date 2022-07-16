var express = require('express');
var router = express.Router();
var controller = require('../controllers/utilizador.controller');
var authenticationFilter = require ('../middleware/authenticationFilter');
var administrationFilter = require ('../middleware/administrationFilter');


/* GET all  */
router.get('/',[authenticationFilter, administrationFilter], controller.getAll);

/* GET by ID  */
router.get('/:id',[authenticationFilter], controller.getById);

/* POST insert  */
router.post('/',[authenticationFilter, administrationFilter], controller.insert);

/* PUT update  */
router.put('/',[authenticationFilter,administrationFilter], controller.update);

/* PUT update Password current user */
router.put('/password',[authenticationFilter], controller.updateCurrentUserPassword);

/* PUT update Password by userId */
router.put('/:id/password',[authenticationFilter, administrationFilter], controller.updatePasswordByUserId);




module.exports = router;