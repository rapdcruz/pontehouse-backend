const HistoricoService = require('../services/historico.service');
const ResponseData = require('../data/response.data');


class HistoricoController {
    async getAll(req, res, next) {
        console.log("[HistoricoController.getAll()]");
        const limit = (!req.query.limit || req.query.limit<0)?0 : req.query.limit;
        const historicos = await HistoricoService.getAll(limit);
        res.status(200).json(new ResponseData(200, null, historicos));
    }

    async getById(req, res, next) {
        console.log("[HistoricoController.getById()]");
        const id = req.params.id;
        const historico = await HistoricoService.getById(id);
        res.status(200).json(new ResponseData(200, null, historico));
    }
    async getByUserId(req, res, next) {
        console.log("[HistoricoController.getByUserId()]");
        const id = req.params.id;
        const historico = await HistoricoService.getByUserId(id);
        res.status(200).json(new ResponseData(200, null, historico));
    }

    async getByCurrentUser(req, res, next) {
        console.log("[HistoricoController.getByCurrentUser()]");
        const historico = await HistoricoService.getByUserId(req.user.userId);
        res.status(200).json(new ResponseData(200, null, historico));
    }
}
const controller = new HistoricoController();

module.exports = controller;





















