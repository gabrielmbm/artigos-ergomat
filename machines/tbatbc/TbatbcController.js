const express = require('express');
const router = express.Router();
const Tbatbc = require('./Tbatbc');

router.get('/tbatbc', (req, res) => {
    Tbatbc.findAll({
        order: [
            ['article', 'DESC']
        ]
    }).then(articles => {
        res.render('tbatbc/index', {articles: articles})
    })
});

// Criar artigo colocando o artigo
// router.post('/tnd/save', (req, res) => {
//     let article = req.body.article;
//     let description = req.body.description;
//     let exec = req.body.exec;
//     let requester = req.body.requester;
//     let dpto = req.body.dpto;
//     let release = req.body.release;
//     if (description !== undefined && exec !== undefined && requester !== undefined && dpto !== undefined && release !== undefined) {
//         Tnd.create({
//             article: article,
//             description: description,
//             exec: exec,
//             requester: requester,
//             dpto: dpto,
//             release: release,
//         }).then(() => {
//             res.redirect('/tnd')
//         })
//     } else {
//         res.redirect('/tnd');
//     }
// });

// Criar artigo sem colocar artigo
router.post('/tbatbc/save', async (req, res) => {
    let { description, exec, requester, dpto, release } = req.body;

    try {
        // Obter o último valor da coluna 'article'
        let lastRecord = await Tbatbc.findOne({
            order: [['article', 'DESC']]
        });

        let newArticleValue = lastRecord ? Number(lastRecord.article) + 1 : 1;
        
        if (description !== undefined && exec !== undefined && requester !== undefined && dpto !== undefined && release !== undefined) {
            await Tbatbc.create({
                article: newArticleValue,
                description: description,
                exec: exec,
                requester: requester,
                dpto: dpto,
                release: release
            });
            res.redirect('/tbatbc');
        } else {
            res.redirect('/tbatbc');
        }
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        res.status(500).send('Erro ao salvar os dados');
    }
});

module.exports = router;