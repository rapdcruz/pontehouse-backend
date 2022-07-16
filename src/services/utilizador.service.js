const bcrypt = require('bcryptjs');
const DeleteUserNotAllowException = require('../exceptions/DeleteUserNotAllowException');
const PasswordDoesNotMatch = require('../exceptions/PasswordDoesNotMatchException');
const UserNotFoundException = require('../exceptions/UserNotFoundException');
const Utilizador = require('../models/utilizador.model');

class UtilizadorService {

    async getAll() {
        const users = await Utilizador.findAll({
            order: [
                ['ativo', 'DESC'],
                ['id', 'ASC']


            ]
        });
        return users;
    }
    async getByUsername(username) {
        const user = await Utilizador.findOne({ where: { username: username, ativo: true } });
        return user;
    }

    async getById(id) {
        const user = await Utilizador.findByPk(id);
        return user;
    }


    async updatePassword(userId, oldPassword, newPassword) {
        const user = await this.getById(userId);
        if (!user) {
            throw new UserNotFoundException(userId);
        }
        if (!this.validatePassword(oldPassword, user.password)) {
            throw new PasswordDoesNotMatch();
        }
        await user.update({ password: this.encodePassword(newPassword) });
    }

    async update(userChanges, currentUserId) {
        console.log("[UtilizadorService.update]");
        console.log("[UtilizadorService.update] - userChanges: " + JSON.stringify(userChanges) );
        console.log("[UtilizadorService.update] - currentUserId: " + currentUserId);
        const utilizador = await this.getById(userChanges.id);
        console.log("[UtilizadorService.update] - utilizdor: " + JSON.stringify(utilizador));

        if (!utilizador) {
            throw new UserNotFoundException(userChanges.id);
        }
        if (userChanges.id == currentUserId && !userChanges.ativo) {
            throw new DeleteUserNotAllowException(userChanges.id);

        }

        return await utilizador.update(userChanges);
    }

    async create(utilizador) {

        return await Utilizador.create(utilizador);
    }


    encodePassword(password) {
        return bcrypt.hashSync(password);
    }

    validatePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    }
}

const utilizadorService = new UtilizadorService();

module.exports = utilizadorService;