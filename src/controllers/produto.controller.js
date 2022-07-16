const ProdutoService = require('../services/produto.service');
const HistoricoService = require('../services/historico.service');


const ResponseData = require('../data/response.data');
const ProductNotFoundException = require('../exceptions/ProductNotFoundException');
const InvalidMinValueException = require('../exceptions/InvalidMinValueException');
const InvalidMaxValueException = require('../exceptions/InvalidMaxValueException');
const InvalidStockValueException = require('../exceptions/InvalidStockValueException');
const MinIsGreaterThanMaxException = require('../exceptions/MinIsGreaterThanMaxException');
const MaxIsLessThanMinException = require('../exceptions/MaxIsLessThanMinException');


class ProdutoController {
    async getAll(req, res, next) {
        console.log("[ProdutoController.getAll()]");
        let produtos;
        if(req.query.active== undefined){
            produtos = await ProdutoService.getAll();
        } else{
            produtos = await ProdutoService.getAllByActive( req.query.active == "true" );
        }
        res.status(200).json(new ResponseData(200, null, produtos));
    }

    async getByLowStock(req, res, next) {
        console.log("[ProdutoController.getByLowStock()]");
        const produtos = await ProdutoService.getByLowStock();

        res.status(200).json(new ResponseData(200, null, produtos));
    }

    
    async getById(req, res, next) {
        console.log("[ProdutoController.getById()]");
        const id = req.params.id;
        const produto = await ProdutoService.getById(id);
        res.status(200).json(new ResponseData(200, null, produto));
    }
    async update(req, res, next) {
        console.log("[ProdutoController.update()]");
        const body = req.body;
        console.log("body: ", body);
        if (!body.id ||
            !body.ref ||
            (!body.min && body.min != 0) ||
            (!body.max && body.max != 0) ||
            (!body.stock && body.stock != 0) ||
            (body.ativo == undefined) || !body.nome) {
            res.status(400).json(new ResponseData(400, "Os campos id, ref, min, max, stock, nome, ativo são obrigatórios.", null));
            return;
        }
        try {
            let produto = await ProdutoService.getById(body.id);
            if(produto.ativo && !body.ativo){
                HistoricoService.create(req.user.userId, new Date().getTime().toString(),
                HistoricoService.DELETE_PRODUCT_ACTION, HistoricoService.DELETE_PRODUCT_LOG.replace("{ref}", produto.ref));
            }

            produto = await ProdutoService.update(body);
            HistoricoService.create(req.user.userId, new Date().getTime().toString(),
            HistoricoService.UPDATE_PRODUCT_ACTION, HistoricoService.UPDATE_PRODUCT_LOG.replace("{ref}", produto.ref));
            res.status(200).json(new ResponseData(200, null, produto));
            return;
        }
        catch (exception) {
            if (exception instanceof ProductNotFoundException) {
                console.log(exception.toString());
                res.status(404).json(new ResponseData(404, exception.toString(), null));
                return;
            } else if (exception instanceof InvalidMinValueException || exception instanceof InvalidMaxValueException
                || exception instanceof InvalidStockValueException || exception instanceof MinIsGreaterThanMaxException
                || exception instanceof MaxIsLessThanMinException) {
                console.log(exception.toString());
                res.status(400).json(new ResponseData(400, exception.toString(), null));
                return;
            } else {
                res.status(500).json(new ResponseData(500, "Internal server error", null));
                return;
            }
        }
    }



    async updateStock(req, res, next){
        console.log("[ProdutoController.updateStock()]");
        const body = req.body;
        if (!body.id || (!body.stock && body.stock != 0)){
            res.status(400).json(new ResponseData(400, "Os campos id, stock são obrigatórios.", null));
            return;
        }
        try {
           const produto = await ProdutoService.updateStock(body);
            HistoricoService.create(req.user.userId, new Date().getTime().toString(),
            HistoricoService.UPDATE_PRODUCT_ACTION, HistoricoService.UPDATE_PRODUCT_LOG.replace("{ref}", produto.ref));
            res.status(200).json(new ResponseData(200, null, produto));
            return;
        }
        catch (exception) {
            if (exception instanceof ProductNotFoundException) {
                console.log(exception.toString());
                res.status(404).json(new ResponseData(404, exception.toString(), null));
                return;
            } else if (exception instanceof InvalidStockValueException) {
                console.log(exception.toString());
                res.status(400).json(new ResponseData(400, exception.toString(), null));
                return;
            } else {
                res.status(500).json(new ResponseData(500, "Internal server error", null));
                return;
            }
        }
    }
    async insert(req, res, next) {
        console.log("[ProdutoController.insert()]");
        const body = req.body;
        console.log("body: ", body);
        if (!body.ref ||
            (!body.min && body.min != 0) ||
            (!body.max && body.max != 0) ||
            (!body.stock && body.stock != 0) ||
            (body.ativo == undefined) || !body.nome) {
            res.status(400).json(new ResponseData(400, "Os campos ref, min, max, stock, nome, ativo são obrigatórios.", null));
            return;
        }


        try {
            delete body.id  ;
            const produto = await ProdutoService.create(body);
            HistoricoService.create(req.user.userId, new Date().getTime().toString(),
            HistoricoService.CREATE_PRODUCT_ACTION, HistoricoService.CREATE_PRODUCT_LOG.replace("{ref}", produto.ref));
            res.status(200).json(new ResponseData(200, null, produto));
            return;
        }
        catch (exception) {
            if (exception instanceof InvalidMinValueException || exception instanceof InvalidMaxValueException
                || exception instanceof InvalidStockValueException || exception instanceof MinIsGreaterThanMaxException
                || exception instanceof MaxIsLessThanMinException) {
                console.log(exception.toString());
                res.status(400).json(new ResponseData(400, exception.toString(), null));
                return;
            } else {
                res.status(500).json(new ResponseData(500, "Internal server error", null));
                return;
            }
        }
    }
}
const controller = new ProdutoController();

module.exports = controller;





















