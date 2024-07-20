const express = require('express');
const router = express.Router();
const Tbcnext = require('./Tbcnext');

router.get('/tbcnext', (req, res) => {
    Tbcnext.findAll({
        order: [
            ['article', 'DESC']
        ]
    }).then(articles => {
        res.render('tbcnext/index', {articles: articles})
    })
});

// Criar artigo sem colocar artigo
router.post('/tbcnext/save', async (req, res) => {
    let { description, exec, requester, dpto, release } = req.body;

    try {
        // Obter o último valor da coluna 'article'
        let lastRecord = await Tbcnext.findOne({
            order: [['article', 'DESC']]
        });

        let newArticleValue = lastRecord ? Number(lastRecord.article) + 1 : 1;
        
        if (description !== undefined && exec !== undefined && requester !== undefined && dpto !== undefined && release !== undefined) {
            await Tbcnext.create({
                article: newArticleValue,
                description: description,
                exec: exec,
                requester: requester,
                dpto: dpto,
                release: release
            });
            res.redirect('/tbcnext');
        } else {
            res.redirect('/tbcnext');
        }
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        res.status(500).send('Erro ao salvar os dados');
    }
});

module.exports = router;