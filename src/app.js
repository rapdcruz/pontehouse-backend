const express = require('express');

const app = express();
const database = require('./config/database');
const cors = require("cors");

const authenticationRouter = require('./routes/authentication.router');
const cargoRouter = require('./routes/cargo.router');
const historicoRouter = require('./routes/historico.router');
const produtoRouter = require('./routes/produto.router');
const utilizadorRouter = require('./routes/utilizador.router');

const administrationFilter = require('./middleware/administrationFilter');
const authenticationFilter = require('./middleware/authenticationFilter');
const dotenv = require('dotenv');
dotenv.config();


// Configurar CORS 
app.use(cors({
  origin: '*'
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Allow', '*');
  next();
});

//Configurações
app.set('port', process.env.PORT || 5000); //Middlewares
app.use(express.json());
//Rotas

app.use('/alive', (req, res) => {
  res.send("I'm Alive: " + new Date());
});

app.use('/api/v1/authentication', authenticationRouter);
app.use('/api/v1/cargo', authenticationFilter, cargoRouter);
app.use('/api/v1/historico', authenticationFilter, historicoRouter);
app.use('/api/v1/produto', authenticationFilter, produtoRouter);
app.use('/api/v1/utilizador', authenticationFilter, utilizadorRouter);

//app.use('/genero', generoRouter); 


app.listen(app.get('port'), () => {
  console.log('########### -> Syncronizing database...');
  console.log("########### -> Start server on port " + app.get('port'))
});







