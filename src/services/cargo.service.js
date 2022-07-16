const Cargo = require('../models/cargo.model');

//constantes para os ID's do cargo.
const ADMIN = 1;
const USER = 2;

class CargoService {
    async getById(id){
        const cargo = await Cargo.findByPk(id);
        return cargo;
    }

    async getAll(){
        const cargos = await Cargo.findAll();
        return cargos;
    }

    isAdmin(cargo){
        return cargo.id == ADMIN;
    }
}

const cargoService = new CargoService();
module.exports = cargoService;