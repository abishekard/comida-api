const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    sendEmailService: (mail_to, mail_subject, mail_text, callback) => {
        const msg = {
            to: mail_to, // Change to your recipient
            from: "abishek.ard@gmail.com", // Change to your verified sender
            subject: mail_subject,
            text: mail_text,
            //  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        };
        sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode);
                console.log(response[0].headers);
                callback(null, response[0].statusCode);
            })
            .catch((error) => {
                console.error(error);
                callback(error);
            });
    },
};