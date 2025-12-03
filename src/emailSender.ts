import nodemailer from "nodemailer";

// Don't call dotenv.config() here - let the consuming application handle it
// This allows the package to work in any environment (local, Render, AWS, etc.)

const email = process.env.EMAIL;
const pass = process.env.PASS;

if (!email || !pass) {
    throw new Error("EMAIL and PASS environment variables must be set. Make sure to set EMAIL and PASS in your environment or .env file.");
}

const transporter = nodemailer.createTransport({
    service:"gmail",
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