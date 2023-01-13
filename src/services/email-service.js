const nodemailer = require('nodemailer');


class EmailService {
    sendEmail = (email, name, otp) => {
        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amarnathmandal097@gmail.com',
                pass: 'uhjdjjejhngjffei'
            }
        });

        const mailOption = {
            from: 'amarnathmandal097@gmail.com',
            to: email,
            subject: `OTP mail from weeConnect`,
            html: `<h1>hi</h1>
        <p>${name}</p>
        <p>your otp is ${otp}</p>
        <p>Hope you enjoy our services</p>
        <span>weeConnect</span>
        `
        };

        transport.sendMail(mailOption, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('email sent to' + info.response);
            }
        })
    }
}

module.exports = EmailService