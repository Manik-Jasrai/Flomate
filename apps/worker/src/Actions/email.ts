import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service : "gmail",
    host: "smtp.googlemail.com",
    port: 465,  
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

export const sendEmail = async (to : string, body : string) => {

    try {

        const info = await transporter.sendMail({
            to,
            from : process.env.EMAIL_USER,
            subject : "FLOMATE",
            text : body
        })
        
        console.log(info.response);
    } catch (e : any) {
        console.log(e)
    }
}