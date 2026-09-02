const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//setup mailer class
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content){
        // any constructor defined on the mail class gets executed by calling super
        super();
        this.from_email = new helper.Email('')
    }
}

module.exports = Mailer;