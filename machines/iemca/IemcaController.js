const express = require('express');
const router = express.Router();
const Iemca = require('./Iemca');

router.get('/iemca', (req, res) => {
    Iemca.findAll({
        order: [
            ['article', 'DESC']
        ]
    }).then(articles => {
        res.render('iemca/index', {articles: articles})
    })
});

// Criar artigo sem colocar artigo
router.post('/iemca/save', async (req, res) => {
    let { description, exec, requester, dpto, release } = req.body;

    try {
        // Obter o último valor da coluna 'article'
        let lastRecord = await Iemca.findOne({
            order: [['article', 'DESC']]
        });

        let newArticleValue = lastRecord ? Number(lastRecord.article) + 1 : 1;
        
        if (description !== undefined && exec !== undefined && requester !== undefined && dpto !== undefined && release !== undefined) {
            await Iemca.create({
                article: newArticleValue,
                description: description,
                exec: exec,
                requester: requester,
                dpto: dpto,
                release: release
            });
            res.redirect('/iemca');
        } else {
            res.redirect('/iemca');
        }
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        res.status(500).send('Erro ao salvar os dados');
    }
});

module.exports = router;