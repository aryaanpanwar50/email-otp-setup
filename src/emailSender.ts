import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const email = process.env.EMAIL;
const pass = process.env.PASS;

if (!email || !pass) {
    throw new Error("EMAIL and PASS environment variables must be set");
}

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:email,
        pass:pass,
    }

})


async function sendMail(sender:string,receiver:string,subject:string,content:string) {
    try{
        const info = await transporter.sendMail({
            from : `${sender}<example@gmail.com>`,
            to:receiver,
            subject:subject,
            html:content
        })

        console.log("Email send",info.messageId)
    }catch(error){
        console.error("Error sending mail",error)
    }
}

export {sendMail};