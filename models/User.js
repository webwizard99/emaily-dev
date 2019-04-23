const mongoose = require('mongoose');
const { Schema } = mongoose;

// define the data types in the collection
const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  credits: { type: Number, default: 0 }
});

// create new collection
mongoose.model('users', userSchema);

