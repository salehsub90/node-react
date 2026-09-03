const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//setup mailer class
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content){
        // any constructor defined on the mail class gets executed by calling super
        super();
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }
}

module.exports = Mailer;