const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

let db;
let cookieKey;
try {
    const keys = require('./config/keys');
    db = keys.mongoURI;
    cookieKey = keys.cookieKey;
} catch (error) {
    db = process.env.MONGO_URI;
    cookieKey = process.env.COOKIE_KEY;
}

mongoose.connect(db);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
