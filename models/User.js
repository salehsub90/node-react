const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 } 
});

mongoose.model('users', userSchema); // creates a model class called 'users' and creates a collection called 'users' in the database.
