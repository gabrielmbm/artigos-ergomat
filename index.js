const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database')
const machinesController = require('./machines/MachinesController')
const articlesController = require('./articles/ArticlesController')

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

// Import rotas de Machine
app.use('/', machinesController);

// Import rotas de Artigos
app.use('/', articlesController);

app.get('/', (req, res) => {
    res.render('index')
});

app.listen(8080, () => {
    console.log('Server On')
});