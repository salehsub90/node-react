const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');
const keys = require('./config/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
