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

    function send(mail, code) {
        let mailObj = {
            from: '"邮件名称" <2176*****@qq.com>',   // 邮件名称和发件人邮箱地址
            to: mail,   //收件人邮箱地址（这里的mail是封装后方法的参数，代表收件人的邮箱地址）
            subject: '邮箱验证',   //邮件标题
            text: '您的验证码是：'+ code, // 邮件内容，这里的code是这个方法的参数，代表要发送的验证码信息，这里的内容可以自定义
        }
        //发送邮件(封装成一个promise对象)，方便后面调用该方法
        //这部分代码直接复制粘贴即可，但是注意发送邮件的请求对象名称要和上面声明的名称保持一致（这里我的名称是transporter）
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailObj, (err, data) => {
                if ( err ) {
                    reject()    //出错
                } else {
                    resolve()    //成功
                }
            })
        })
    }




module.exports = { send } 