const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config()

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASSWORD
        }
    });

    transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}))
      
      // async..await is not allowed in global scope, must use a wrapper
    let listItem = ''
    const attachImage = []
    orderItems.forEach((order) => {
        listItem +=
            `<div>
                <div>
                    Bạn đã đặt sản phẩm: <b>${order.name}</b>        
                </div> 
                <div>
                    Với số lượng: <b>${order.amount}</b>        
                </div> 
                <div>
                    Giá: <b>${order.price}</b>        
                </div> 
                <div>
                    <img src=${order.price} alt="Sản Phẩm" />        
                </div> 
            </div>`
        attachImage.push({path: order.image})
    }) 
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: process.env.MAIL_ACCOUNT, // list of receivers
        subject: "Bạn Đã Đặt Hàng Tại Shop WebPhone", // Subject line
        text: "Hello world?", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công tại shop WebPhone</b></div>${listItem}`, // html body
        attachments: attachImage
    });
}

module.exports = {
    sendEmailCreateOrder
}