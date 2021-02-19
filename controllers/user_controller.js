//用户表对应的控制器，用来暴露接口
const UserModel = require('../models/user_model');
const redis = require('koa-redis')

const store = redis().client;


const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: 'smtp.qq.com',
    post: 465,
    secure: true,
    auth: {
        user: '2176241983@qq.com',
        pass: 'okutscowbwhndjhc'
    }
})

class User {
    //验证邮箱是否已被注册
    static async mailcode(ctx) {
        // console.log(typeof (ctx.request.body))
        // console.log(ctx.request.query);
        let { email } = ctx.request.query
        console.log(email);
    
        const ishas = await UserModel.findOne({ email: email });
        console.log(ishas)
        if (ishas) {
            ctx.response.body = { msg: '此邮箱已被注册', code: 201};
            console.log(ctx.response.body);
            return ctx.response.body;
        } else {
            //生成验证码
            let code = "";
            for (let i = 0; i < 4; i++) {
                code += Math.floor(Math.random() * 10)
            }
            code = parseInt(code)
            console.log(code)
            ctx.response.body = { code: code }
        }
    }
  
    //发送邮箱验证码
    static async sendcheckcode(ctx) {
        let { email, code } =ctx.request.query;
        let mailObj = {
            from: '2176241983@qq.com',   // 邮件名称和发件人邮箱地址
            to: email,   //收件人邮箱地址（这里的mail是封装后方法的参数，代表收件人的邮箱地址）
            subject: '邮箱验证',   //邮件标题
            text: '您的验证码是：' + code, // 邮件内容，这里的code是这个方法的参数，代表要发送的验证码信息，这里的内容可以自定义
        }
        transporter.sendMail(mailObj, (err, data) => {
            if ( err ) {
                ctx.response.body = { msg: '验证码发送失败' , code: 201 }
                console.log( err );
                console.log('失败');    //出错
            } else {
                ctx.response.body = { msg: '验证码发送成功' , code: 200 }
                console.log('成功');    //成功
            }
        })
    }
  
    //注册
    static async register(ctx) {
        console.log(ctx.request.query)
        let { name, email, passwd } = ctx.request.query
        const newuser = await UserModel.create({ email: email, name: name, passwd: passwd })
        if (newuser) {
            ctx.response.body = { msg: '注册成功', code:200 }
            return ctx.response.body
        }
        else {
            ctx.response.body = { msg: '注册失败', code:201 }
            return ctx.response.body
        }
    }

    //登录
    static async login(ctx) {
        console.log(ctx.request.query);
        let { email, passwd } = ctx.request.query
        const user = await UserModel.findOne({ email: email, passwd: passwd })
        const user2 = await UserModel.findOne({email: '123@127.com', passwd: '123456'})
        console.log(user);
        console.log(user2);
        if ( !user ) {
            ctx.response.body = { msg: '用户名或密码错误', code: 201 };
            return ctx.response.body;
        } else {
            ctx.response.body = { msg: '登录成功', code: 200 };
            return ctx.response.body;
        }
    }
}


module.exports = User