const ArticleModel = require('../models/article_model')
const CategoryModel = require('../models/category_model')

class Article{
    //新建文章
    static async newArticle(ctx) {
        // 验证文章类别是否已存在
        // 验证文章标题是否已存在
        let { category, title, content } = ctx.request.query;
        // let category = 'life' 
        // let author = 'Rui'
        // let title = 'watching tv'
        // let content = 'hhhhhhhhhhh'
        let hasCategory = await CategoryModel.findOne({name: category})
        let hasArticle = await ArticleModel.findOne({title: title});
        if (hasCategory && !hasArticle) {
            //在已存在类别中添加文章
            await ArticleModel.create({
                category: category,
                title: title,
                content: content
            });
            ctx.response.body = { msg: '文章新建成功', code: 200}
            return ctx.response.body
        } else if (!hasCategory && !hasArticle) {
            //新建类别并且在该类别下新建文章
            await CategoryModel.create({
                name: category,
            })
            await ArticleModel.create({
                category: category,
                title: title,
                content: content
            });
            ctx.response.body = { msg: '文章新建成功', code: 200}
            return ctx.response.body
        } else if (hasCategory && hasArticle) {
            ctx.response.body = { msg: '此标题已存在', code: 201}
            return ctx.response.body
        }
    }

    //编辑文章
    static async updateArticle(ctx) {
        //查询文章
        let { title, content, id } = ctx.request.query;
        let updateResult = await ArticleModel.findOneAndUpdate(
            { _id: id },
            { content: content, title: title }
        );
        if (updateResult) {
            console.log(updateResult);
            ctx.response.body = { msg: '文章编辑成功' }
            return ctx.response.body;
        } else {
            console.log(updateResult);
            ctx.response.body = { msg: '文章编辑失败' }
            return ctx.response.body;
        }
    }

    //删除文章
    static async delArticle(ctx) {
        let { id } = ctx.request.query
        let delResult = await ArticleModel.deleteOne({ _id: id })
        if (delResult) {
            ctx.response.body = { msg: '文章删除成功' }
            return ctx.response.body;
        } else {
            ctx.response.body = { msg: '文章删除失败' }
            return ctx.response.body;
        }
    }

    //获取类别表
    static async getCategory(ctx) {
        // let { name } = ctx.request.query
        let categoryResult = await CategoryModel.find({})

        if (categoryResult) {
            console.log(categoryResult);
            ctx.response.body = { msg: '获取类别列表成功', data: categoryResult}
            return ctx.response.body;
        } else {
            ctx.response.body = { msg: '获取文章列表失败' }
            return ctx.response.body;
        }
    }

    //根据文章类别获取文章列表
    static async getList(ctx) {
        let { category } = ctx.request.query;
        let listResult = await ArticleModel.find({ category: category })
        if (listResult) {
            console.log(listResult);
            ctx.response.body = { msg: '获取文章列表成功', data: listResult}
            return ctx.response.body;
        } else {
            ctx.response.body = { msg: '获取文章列表失败' }
            return ctx.response.body;
        }
    }

    //根据文章标题获取文章内容
    static async getArticle(ctx) {
        let { title } = ctx.request.body;
        let articleResult  = await ArticleModel.findOne({ title: title })
        if (articleResult) {
            console.log(articleResult);
            ctx.response.body = { msg: '获取文章成功', data: articleResult}
            return ctx.response.body;
        } else {
            ctx.response.body = { msg: '获取文章失败' }
            return ctx.response.body;
        }
    }
}

module.exports = Article