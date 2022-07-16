const Historico = require('../models/historico.model');

class HistoricoService {
    get LOGIN_ACTION() { return "LOGIN_ACTION" };
    get LOGIN_LOG() { return "O utilizador iniciou sessão." };

    get LOGOUT_ACTION() { return "LOGOUT_ACTION" };
    get LOGOUT_LOG() { return "O utilizador terminou sessão." };


    get CREATE_USER_ACTION() { return "CREATE_USER_ACTION" };
    get CREATE_USER_LOG() { return "Foi criado o utilizador com o username: '{username}'." };
    get UPDATE_USER_ACTION() { return "UPDATE_USER_ACTION" };
    get UPDATE_USER_LOG() { return "Foi atualizado o utilizador com o username: '{username}'." };
    get DELETE_USER_ACTION() { return "DELETE_USER_ACTION" };
    get DELETE_USER_LOG() { return "Foi eliminado o utilizador com o username: '{username}'." };
    get UPDATE_PASSWORD_USER_ACTION() { return "UPDATE_PASSWORD_USER_ACTION" };
    get UPDATE_PASSWORD_USER_LOG() { return "Foi atualizado a password do utilizador com o username: '{username}'." };

    get CREATE_PRODUCT_ACTION() { return "CREATE_PRODUCT_ACTION" };
    get CREATE_PRODUCT_LOG() { return "Foi atualizado o produto com a referência: '{ref}'." };
    get UPDATE_PRODUCT_ACTION() { return "UPDATE_PRODUCT_ACTION" };
    get UPDATE_PRODUCT_LOG() { return "Foi atualizado o produto com a referência: '{ref}'." };

    get UPDATE_PRODUCT_STOCK_ACTION() { return "UPDATE_PRODUCT_STOCK_ACTION" };
    get UPDATE_PRODUCT_STOCK_LOG() { return "O stock do produto com a referência: '{ref}' foi atualizado de {oldStock} para {newStock}" };
    get DELETE_PRODUCT_ACTION() { return "DELETE_PRODUCT_ACTION" };
    get DELETE_PRODUCT_LOG() { return "Foi eliminado o produto com a referência: '{ref}'." };

    async getById(id) {
        const historico = await Historico.findByPk(id);
        return historico;
    }

    async getAll(limit) {
        let historicos;

        if (limit > 0) {
            historicos = await Historico.findAll({
                limit: limit,
                order: [['id', 'DESC']]
            });
        } else {
            historicos = await Historico.findAll({ order: [['id', 'DESC']] });
        }

        return historicos;
    }

    async getByUserId(id) {
        const historicos = await Historico.findAll({ where: { userId: id }, order: [['id', 'DESC']] });
        return historicos;
    }

    async create(userId, timestamp, action, log) {
        const data = {
            userId: userId,
            timestamp: timestamp,
            action: action,
            log: log
        }
        const historico = await Historico.create(data);
        return historico;
    }

}


const historicoService = new HistoricoService();
module.exports = historicoService;