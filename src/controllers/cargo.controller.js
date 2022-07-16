const CargoService = require('../services/cargo.service');
const ResponseData = require('../data/response.data');


class CargoController {
   async getAll (req, res, next){
        const cargos = await CargoService.getAll();
        res.status(200).json(new ResponseData(200, null, cargos));
    }
    async getById (req, res, next){
        const id = req.params.id;
        const cargo = await CargoService.getById(id);
        res.status(200).json(new ResponseData(200, null, cargo));
    }
    getFromUser(){
        
    }
}
const controller = new CargoController();

module.exports = controller;





















