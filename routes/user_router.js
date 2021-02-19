const router = require('koa-router')()
const User = require('../controllers/user_controller')
const Article = require('../controllers/article_controller')

router
    .get('/mailcode', User.mailcode)
    .get('/register', User.register)
    .get('/login', User.login)
    .get('/sendcheckcode', User.sendcheckcode)
    .get('/newArticle', Article.newArticle)
    .get('/updateArticle',Article.updateArticle)
    .get('/delArticle', Article.delArticle)
    .get('/getList', Article.getList)
    .get('/getArticle', Article.getArticle)
    .get('/getCategory', Article.getCategory)


module.exports = router


