const { sendEmailService } = require("./../services/sendEmail.service");

module.exports = {
    sendEmail: (to, subject, text) => {
        sendEmailService(to, subject, text, (error, result) => {});
    },
};