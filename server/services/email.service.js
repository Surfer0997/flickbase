const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async(userEmail,user) => {
    try{
        const emailToken = user.generateRegisterToken(); // generating token to verify via email
        const mailGenerator = new Mailgen({ // creates email template
            theme:"default",
            product:{
                name:"Flickbase",
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });

        const email = { // template
          body:{
              name: userEmail,
              intro: 'Welcome to Flickbase! We\'re very excited to have you on board.',
              action:{
                instructions: 'To validate your account, please click here:',
                button:{
                    color:'#1a73e8',
                    text: 'Validate your account',
                    link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
          }
        }
        const emailBody = mailGenerator.generate(email); // applying template

        const message = { // attaching all to a real letter
            from: process.env.EMAIL, // from which mail is sent
            to: userEmail,
            subject: "Welcome to Flickbase", // just email subject
            html:emailBody
        }

        await transporter.sendMail(message);
        return true;
    } catch(error){
        throw error
    }
}

module.exports = {
    registerEmail
}