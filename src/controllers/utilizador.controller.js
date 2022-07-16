const UtilizadorService = require('../services/utilizador.service');
const HistoricoService = require('../services/historico.service');


const ResponseData = require('../data/response.data');
const Utilizador = require('../models/utilizador.model');
const UserNotFoundException = require('../exceptions/UserNotFoundException');
const PasswordDoesNotMatch = require('../exceptions/PasswordDoesNotMatchException');
const DeleteUserNotAllowException = require('../exceptions/DeleteUserNotAllowException');
const UpdateRoleNotAllowException = require('../exceptions/UpdateRoleNotAllowException');


class UtilizadorController {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordByUserId = this.updatePasswordByUserId.bind(this);
        this.updateCurrentUserPassword = this.updateCurrentUserPassword.bind(this);
        this.insert = this.insert.bind(this);

    }

    async getAll(req, res, next) {
        const utilizadores = await UtilizadorService.getAll();
        res.status(200).json(new ResponseData(200, null, utilizadores));
    }
    async getById(req, res, next) {
        const id = req.params.id;
        const utilizador = await UtilizadorService.getById(id);
        res.status(200).json(new ResponseData(200, null, utilizador));
    }
    async update(req, res, next) {
        console.log("[UtilizadorControler.update()]");
        const body = req.body;
        console.log("body: ", body);
        if (!body.id ||
            !body.primeiroNome ||
            !body.ultimoNome ||
            !body.username ||
            (!body.cargoId && body.cargoId != 0) ||
            (body.ativo == undefined)) {
            res.status(400).json(new ResponseData(400, "Os campos id, primeiroNome, ultimoNome, username, cargoId, ativo são obrigatórios.", null));
            return;
        }
        try {
            let utilizador = await UtilizadorService.getById(req.user.userId);
            if (utilizador.ativo && !body.ativo) {
                HistoricoService.create(req.user.userId, new Date().getTime().toString(),
                    HistoricoService.DELETE_USER_ACTION, HistoricoService.DELETE_USER_LOG.replace("{username}", utilizador.username));
            }

            utilizador = await UtilizadorService.update(body, req.user.userId);
            HistoricoService.create(req.user.userId, new Date().getTime().toString(),
                HistoricoService.UPDATE_USER_ACTION, HistoricoService.UPDATE_USER_LOG.replace("{username}", utilizador.username));
            res.status(200).json(new ResponseData(200, null, utilizador));
            return;
        }
        catch (exception) {
            if (exception instanceof UserNotFoundException) {
                console.log(exception.toString());
                res.status(404).json(new ResponseData(404, exception.toString(), null));
                return;

            } else if (exception instanceof DeleteUserNotAllowException || exception instanceof UpdateRoleNotAllowException) {
                console.log(exception.toString());
                res.status(403).json(new ResponseData(403, exception.toString(), null));
                return;

            } else {
                res.status(500).json(new ResponseData(500, "Internal server error", null));
                return;
            }
        }
    }
    async updatePassword(userId, oldPassword, newPassword, req, res, next) {
        try {
            await UtilizadorService.updatePassword(userId, oldPassword, newPassword);
            let utilizador = await UtilizadorService.getById(userId);
            utilizador.atualizarPassword = req.user.userId != utilizador.id;
            utilizador = await UtilizadorService.update(utilizador.dataValues, req.user.userId);

            HistoricoService.create(req.user.userId, new Date().getTime().toString(),
                HistoricoService.UPDATE_PASSWORD_USER_ACTION,
                HistoricoService.UPDATE_PASSWORD_USER_LOG.replace("{username}", utilizador.username));

            res.status(204).json(new ResponseData(204, null, null));
        }
        catch (exception) {
            if (exception instanceof UserNotFoundException) {
                console.log(exception.toString());
                res.status(404).json(new ResponseData(404, exception.toString(), null));
            } else if (exception instanceof PasswordDoesNotMatch) {
                console.log(exception.toString());
                res.status(403).json(new ResponseData(403, exception.toString(), null));
            } else {
                res.status(500).json(new ResponseData(500, "Internal server error", null));
            }
        }
    }
    async updatePasswordByUserId(req, res, next) {
        const id = req.params.id;
        const body = req.body;
        if (!body.oldPassword || !body.newPassword) {
            res.status(400).json(new ResponseData(400, "Os campos oldPassword, newPassword são obrigatórios.", null));
        }
        this.updatePassword(id, body.oldPassword, body.newPassword, req, res, next);
    }
    async updateCurrentUserPassword(req, res, next) {
        const body = req.body;
        if (!body.oldPassword || !body.newPassword) {
            res.status(400).json(new ResponseData(400, "Os campos oldPassword, newPassword são obrigatórios.", null));
        }
        console.log("####################")
        console.log(JSON.stringify(req.user.userId));
        await this.updatePassword(req.user.userId, body.oldPassword, body.newPassword, req, res, next);
    }


    async insert(req, res, next) {
        console.log("[UtilizadorControler.insert()]");
        const body = req.body;
        console.log("body: ", body);
        if (!body.primeiroNome ||
            !body.ultimoNome ||
            !body.username ||
            (!body.cargoId && body.cargoId != 0) ||
            (body.ativo == undefined)) {
            res.status(400).json(new ResponseData(400, "Os campos id, primeiroNome, ultimoNome, username, cargoId, ativo são obrigatórios.", null));
            return;
        }
        try {
            delete body.id;
            body.password = UtilizadorService.encodePassword(body.username);
            const utilizador = await UtilizadorService.create(body);
            HistoricoService.create(req.user.userId, new Date().getTime().toString(),
                HistoricoService.CREATE_USER_ACTION, HistoricoService.CREATE_USER_LOG.replace("{username}", utilizador.username));
            res.status(200).json(new ResponseData(200, null, utilizador));
            return;
        }
        catch (exception) {
            res.status(500).json(new ResponseData(500, "Internal server error", null));
            return;

        }
    }

}
const controller = new UtilizadorController();

module.exports = controller;

