var express = require('express');
var router = express.Router();
var controller = require('../controllers/produto.controller');
var authenticationFilter = require ('../middleware/authenticationFilter');
var administrationFilter = require ('../middleware/administrationFilter');

/* GET all  */
router.get('/',[authenticationFilter], controller.getAll);

/* GET by ID  */
router.get('/:id',[authenticationFilter], controller.getById);

/* POST insert  */
router.post('/',[authenticationFilter, administrationFilter], controller.insert);

/* PUT update */
router.put('/',[authenticationFilter, administrationFilter], controller.update);

/* get By low Stock*/
router.get('/stock/low',[authenticationFilter, administrationFilter], controller.getByLowStock);

/* PUT update stock by id  */
router.put('/stock',[authenticationFilter], controller.updateStock);



module.exports = router;