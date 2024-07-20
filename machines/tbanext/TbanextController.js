const express = require('express');
const router = express.Router();
const Tbanext = require('./Tbanext');

router.get('/tbanext', (req, res) => {
    Tbanext.findAll({
        order: [
            ['article', 'DESC']
        ]
    }).then(articles => {
        res.render('tbanext/index', {articles: articles})
    })
});

// Criar artigo sem colocar artigo
router.post('/tbanext/save', async (req, res) => {
    let { description, exec, requester, dpto, release } = req.body;

    try {
        // Obter o último valor da coluna 'article'
        let lastRecord = await Tbanext.findOne({
            order: [['article', 'DESC']]
        });

        let newArticleValue = lastRecord ? Number(lastRecord.article) + 1 : 1;
        
        if (description !== undefined && exec !== undefined && requester !== undefined && dpto !== undefined && release !== undefined) {
            await Tbanext.create({
                article: newArticleValue,
                description: description,
                exec: exec,
                requester: requester,
                dpto: dpto,
                release: release
            });
            res.redirect('/tbanext');
        } else {
            res.redirect('/tbanext');
        }
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        res.status(500).send('Erro ao salvar os dados');
    }
});

module.exports = router;