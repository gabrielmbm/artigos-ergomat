const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

// Import dos controllers das máquinas
const programa1Controller = require('./machines/programa1/Programa1Controller');
const tngController = require('./machines/tng/TngController');
const tndController = require('./machines/tnd/TndController');
const tbatbcController = require('./machines/tbatbc/TbatbcController');
const tbanextController = require('./machines/tbanext/TbanextController');
const tbcnextController = require('./machines/tbcnext/TbcnextController');
const projetosespeciaistController = require('./machines/projetosespeciais/ProjetosespeciaisController');
const materialbrutoController = require('./machines/materialbruto/MaterialbrutoController');
// const dispositivosController = require('./machines/dispositivos/DispositivosController');
const iemcaController = require('./machines/iemca/IemcaController');
const starhardingeController = require('./machines/starhardinge/StarhardingeController');

// EJS
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body-Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Database connected')
    }).catch((error) => {
        console.log(error)
    });

// Importando rotas
app.use('/', programa1Controller);
app.use('/', tngController);
app.use('/', tndController);
app.use('/', tbatbcController);
app.use('/', tbanextController);
app.use('/', tbcnextController);
app.use('/', projetosespeciaistController);
app.use('/', materialbrutoController);
// app.use('/', dispositivosController);
app.use('/', iemcaController);
app.use('/', starhardingeController)

app.get('/', (req, res) => {
    res.render('index')
});

const PORT = 8081;

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running')
});