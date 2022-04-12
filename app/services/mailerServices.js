const nodeMailer = require('nodemailer')

const nodeSmtpTransport = require('nodemailer-smtp-transport')

const transporterDetail = nodeSmtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    auth: {
        user: 'erfannouri.dev@gmail.com',
        pass: ''
    }
});


const transporter = nodeMailer.createTransport(transporterDetail);


exports.sendMail = (to, subject, text) => {
    options = {
        sender: 'erfannouri.dev@gmail.com',
        to,
        subject,
        html: text
    }

    transporter.sendMail(options, (err, info) => {

        // err ? console.log(err) : console.log(info);
    })


}