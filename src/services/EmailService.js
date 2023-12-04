const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const { convertPrice } = require('../utils')

dotenv.config()

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD
        }
    });

    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    let listItem = '';
    const attachImage = [];

    orderItems.forEach((order) => {
        listItem +=
            `<div style="margin-bottom: 20px;">
                <div>
                    <b style="font-size: 30px">${order.name}</b>        
                </div> 
                <div>
                    Số lượng: <b>${order.amount}</b>        
                </div> 
                <div>
                    Giá: <b>${convertPrice(order.price)}</b>        
                </div> 
                <h1>
                <img src="${order.image}" alt="Sản Phẩm" style="max-width: 100%;"/>
                </h1>
            </div>`;
        attachImage.push({ path: order.image });
    });

    let info = await transporter.sendMail({
        from: `"WebPhone" <${process.env.MAIL_ACCOUNT}>`,
        to: email,
        subject: "Đặt Hàng Thành Công - Shop WebPhone",
        html: `
            <div style="background-color: #f4f4f4; padding: 20px;">
                <h2 style="color: #186c91;">Đặt Hàng Thành Công !!!</h2>
                ${listItem}
                <p style="color: #333;">Cảm ơn quý khách đã tin tưởng và sử dụng sản phẩm của chúng tôi.</p>
                <p style="color: #333;">Nếu cần hỗ trợ hoặc có yêu cầu về sản phẩm, vui lòng liên hệ trực tiếp tại Fanpage. </p>
                <p style="color: #333;">Fanpage: <a href="https://www.facebook.com/profile.php?id=61553944561370" target="_blank">WebPhone</a></p>
                <p style="color: #333; font-weight: bold;">Thân mến!</p>
                <hr style="border: 1px solid #ddd;">
                <p style="color: #333; font-weight: bold;">WebPhone</p>
                <p style="color: #333;">Hotline: +(84) 67896789</p>
                <p style="color: #333;">Địa chỉ: Số 47, Thành Thái, Q.10, HCM</p>
                <p style="color: #333;">Website: <a href="https://webphone-kappa.vercel.app" target="_blank">https://webphone-kappa.vercel.app</a></p>
            </div>`,
        attachments: attachImage,
    });
};

module.exports = {
    sendEmailCreateOrder
}