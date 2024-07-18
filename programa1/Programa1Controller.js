const express = require('express');
const router = express.Router();
const Programa1 = require('./Programa1');
const slugify = require('slugify')

router.get('/programa1', (req, res) => {
    Programa1.findAll({
        order: [
            ['article', 'DESC']
        ]
    }).then(articles => {
        res.render('programa1/index', {articles: articles})
    })
    
});

// Criar artigo colocando o artigo
// router.post('/programa1/save', (req, res) => {
//     let article = req.body.article;
//     let description = req.body.description;
//     let exec = req.body.exec;
//     let requester = req.body.requester;
//     let dpto = req.body.dpto;
//     let release = req.body.release;
    
//     if (description !== undefined && exec !== undefined && requester !== undefined && dpto !== undefined && release !== undefined) {
//         Programa1.create({
//             article: article,
//             description: description,
//             exec: exec,
//             requester: requester,
//             dpto: dpto,
//             release: release,
//         }).then(() => {
//             res.redirect('/programa1/articles')
//         })
//     } else {
//         res.redirect('/programa1/articles');
//     }
// });

// Criar artigo sem colocar artigo
router.post('/programa1/save', async (req, res) => {
    let { description, exec, requester, dpto, release } = req.body;

    try {
        // Obter o último valor da coluna 'article'
        let lastRecord = await Programa1.findOne({
            order: [['article', 'DESC']]
        });

        let newArticleValue = lastRecord ? Number(lastRecord.article) + 1 : 1;
        
        if (description !== undefined && exec !== undefined && requester !== undefined && dpto !== undefined && release !== undefined) {
            await Programa1.create({
                article: newArticleValue,
                description: description,
                exec: exec,
                requester: requester,
                dpto: dpto,
                release: release,
                slug: slugify(description)
            });

            res.redirect('/programa1');
        } else {
            res.redirect('/programa1');
        }
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        res.status(500).send('Erro ao salvar os dados');
    }
});

router.get('/programa1/articles', (req, res) => {
    Programa1.findAll({
        order: [
            ['article', 'DESC']
        ]
    }).then(articles => {
        res.render('programa1/articles', {articles: articles})
    })
})

module.exports = router;