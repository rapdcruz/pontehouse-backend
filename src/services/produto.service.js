const bcrypt = require('bcryptjs');
const InvalidMaxValueException = require('../exceptions/InvalidMaxValueException');
const InvalidMinValueException = require('../exceptions/InvalidMinValueException');
const InvalidStockValueException = require('../exceptions/InvalidStockValueException');
const MaxIsLessThanMinException = require('../exceptions/MaxIsLessThanMinException');
const MinIsGreaterThanMaxException = require('../exceptions/MinIsGreaterThanMaxException');
const ProductNotFoundException = require('../exceptions/ProductNotFoundException');
const { Op } = require('sequelize');

const Produto = require('../models/produto.model');

class ProdutoService {
    async getById(id) {
        console.log("[ProdutoService.getById]");
        const produto = await Produto.findByPk(id);
        return produto;
    }

    async getAll() {
        console.log("[ProdutoService.getAll]");
        const produtos = await Produto.findAll({
            order: [
                ['ativo', 'DESC'],
                ['id', 'ASC']
               

            ]
        }

        );
        return produtos;
    }

    async getAllByActive(active) {
        console.log("[ProdutoService.getAllByActive]");
        const produtos = await Produto.findAll({
            where: {
                ativo: active
            },
            order: [
                ['id', 'ASC']

            ]
        });
        return produtos;
    }

    async getByLowStock() {
        console.log("[ProdutoService.getByLowStock]");
        const produtos = await Produto.findAll({
            where: {
                stock: {
                    [Op.lte]: { [Op.col]: "min" }
                },
                ativo: true
            },
            order: [['id', 'ASC']]
        });
        return produtos;
    }

    async update(produtoChanges) {
        const produto = await this.getById(produtoChanges.id);
        if (!produto) {
            throw new ProductNotFoundException(produtoChanges.id);
        }
        if (produtoChanges.min < 0) {
            throw new InvalidMinValueException(produtoChanges.min);
        }
        if (produtoChanges.max < 0) {
            throw new InvalidMaxValueException(produtoChanges.max);
        }
        if (produtoChanges.stock < 0) {
            throw new InvalidStockValueException(produtoChanges.stock);
        }
        if (produtoChanges.max < produtoChanges.min) {
            throw new MaxIsLessThanMinException(produtoChanges.min, produtoChanges.max);
        }
        if (produtoChanges.min > produtoChanges.max) {
            throw new MinIsGreaterThanMaxException(produtoChanges.min, produtoChanges.max);
        }
        return await produto.update(produtoChanges);
    }

    async updateStock(produtoChanges) {
        const produto = await this.getById(produtoChanges.id);
        if (!produto) {
            throw new ProductNotFoundException(produtoChanges.id);
        }
        if (produtoChanges.stock < 0) {
            throw new InvalidStockValueException(produtoChanges.stock);
        }
        return await produto.update(produtoChanges);
    }

    async create(produto) {
        if (produto.min < 0) {
            throw new InvalidMinValueException(produto.min);
        }
        if (produto.max < 0) {
            throw new InvalidMaxValueException(produto.max);
        }
        if (produto.stock < 0) {
            throw new InvalidStockValueException(produto.stock);
        }
        if (produto.max < produto.min) {
            throw new MaxIsLessThanMinException(produto.min, produto.max);
        }
        if (produto.min > produto.max) {
            throw new MinIsGreaterThanMaxException(produto.min, produto.max);
        }
        return await Produto.create(produto);
    }


}

const utilizadorService = new ProdutoService();

module.exports = utilizadorService;