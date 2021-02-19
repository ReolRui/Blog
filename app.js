const Koa = require("koa");
const mongoose = require("mongoose");
const router = require('./routes/user_router')
const koaBody = require('koa-body')
const redis = require('koa-redis')
const bodyParser = require('koa-bodyparser')
const nodeMailer = require('nodemailer')

const cors = require('koa2-cors')

const app = new Koa();

app.use(
    cors({
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
      maxAge: 5,
      credentials: true,
      allowMethods: ["POST"],
      allowHeaders: ["Content-Type", "Authorization", "Accept", "multipart"]}))

app.use(
    koaBody({
      multipart: true, // 支持文件上传
  
      formidable: {
        uploadDir: "/www/front/dist/img", // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => {
          // 文件上传前的设置
        }
      }
    })
  );

app.use(bodyParser())

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, function() {
    console.log('running');
})