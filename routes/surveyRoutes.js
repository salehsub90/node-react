const mongoose = require('mongoose');
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');


const Survey = mongoose.model('surveys');
//need to check if a user have enough credits to send out a survye
module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        //object destructuring
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => {
                return { email: email.trim() }
                //.map(email => ({ email.trim() }))
            }),
            _user: req.user.id,
            dateSent: Date.now()
        });
        
        // great place to send an email
        // Calling the constructor
        const mailer = new Mailer(survey, surveyTemplate(survey));

    });
}