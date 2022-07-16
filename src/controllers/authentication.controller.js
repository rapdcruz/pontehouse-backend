const jwt = require('jsonwebtoken');

const UtilizadorService = require('../services/utilizador.service');
const CargoService = require('../services/cargo.service');
const ResponseData = require('../data/response.data');
const HistoricoService = require('../services/historico.service');




class AuthenticationController {
    async login(req, res, next) {
        const username = req.body['username'];
        const password = req.body['password'];
        if (!username) {
            res.status(400).json(new ResponseData(400, "Username is required!", null));
            return;
        }
        if (!password) {
            res.status(400).json(new ResponseData(400, "Password is required!", null));
            return;
        }
        const utilizador = await UtilizadorService.getByUsername(username);

        if (!utilizador) {
            res.status(401).json(new ResponseData(401, "Invalid Login", null));
            return;
        }
        const verified = UtilizadorService.validatePassword(password, utilizador.password);

        if (!verified) {

            res.status(401).json(new ResponseData(401, "Invalid Login", null));
            return;
        }

        const payload = {
            userId: utilizador.id,
            isAdmin: CargoService.isAdmin(await CargoService.getById(utilizador.cargoId)),

        };
        const token = jwt.sign(
            payload,
            process.env.JWT_TOKEN_KEY
        )

        utilizador['token'] = token;

        console.log("#############################################");
        console.log("token: " + token);
        console.log("user: " + JSON.stringify(utilizador));
        console.log("#############################################");

        delete utilizador['password'];
        console.log(HistoricoService.LOGIN_ACTION);
        HistoricoService.create(utilizador.id, new Date().getTime().toString(),
            HistoricoService.LOGIN_ACTION, HistoricoService.LOGIN_LOG);

        res.status(200).json(new ResponseData(200, null, utilizador));
    }
}
const controller = new AuthenticationController();

module.exports = controller;





















