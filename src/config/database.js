const Version = require('../models/version.model');
const Cargo = require('../models/cargo.model');
const Utilizador = require('../models/utilizador.model');
const Historico = require('../models/historico.model');
const Produto = require('../models/produto.model');

const bcrypt = require('bcryptjs');

async function syncronization() {
    await Version.sync({ alter: true });
    await Cargo.sync({ alter: true });
    await Utilizador.sync({ alter: true });
    await Historico.sync({ alter: true });
    await Produto.sync({ alter: true });
}

async function loadInitialData() {
    const recordsSize = await Version.count();
    if( recordsSize > 0 ) {
        console.log("Existem " + recordsSize + " registos, não vamos fazer o carregamento de dados iniciais.");
    } else {
        await Version.create({version: "1.0.0", timestamp: "202206"});
        console.log("Carregamento inicial de dados da tabela cargo.");
        await Cargo.create({id: 1, nome:  'Administrador', descricao:  'Administrador'});
        await Cargo.create({id: 2, nome:  'Abastecedor', descricao:  'Abastecedor'});

        console.log("Carregamento inicial de dados da tabela utilizador.");
        await Utilizador.create({username:  'admin', password: bcrypt.hashSync('admin'), primeiroNome:'João', ultimoNome:'Alberto', cargoId: 1});
        await Utilizador.create({username: 'user', password: bcrypt.hashSync('user'), primeiroNome:'José', ultimoNome:'Manuel', cargoId: 2});

       /*  console.log("Carregamento inicial de dados da tabela historico.");
        await Historico.create({ userId: 1, timestamp: '1234', action: 'action 1', log: 'log 1' });
        await Historico.create({ userId: 2, timestamp: '1234', action: 'action 1', log: 'log 1' }); */

        console.log("Carregamento inicial de dados da tabela Produtos.");
        await Produto.create({ref:'REF1', nome:'Coca-cola',min:10, max:50, stock:23});
        await Produto.create({ref:'REF2', nome:'Whisky',min:15, max:40, stock:17});

    }
}


async function initialize() {
    await syncronization();
    await loadInitialData();
}

initialize();