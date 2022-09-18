import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export default function contactMe({name, email, message}) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });
      
        let textBody = `FROM: ${name}; EMAIL: ${email}; MESSAGE: ${message}`;
        let htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${name}
                        <a href='mailto:${email}'>${email}</a><p>${message}</p></p>`;
      
        let mail = {
            from:    process.env.EMAIL,
            to:      process.env.EMAIL_TO_SEND,
            subject: "Mail From Contact Form",
            text:    textBody,
            html:    htmlBody
        };
      
        transporter.sendMail(mail, (err, info) => {
            if(err) {
                console.error(err);
                reject({status: "error", error: "An error has ocurred"});
            } 
            resolve({status: "ok", data: `Message sent with ID: ${info.messageId}`});
        });
    })
}