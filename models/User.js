const mongoose = require('mongoose');
const { Schema } = mongoose;

// define the data types in the collection
const userSchema = new Schema({
  googleId: String,
  facebookId: String
});

// create new collection
mongoose.model('users', userSchema);

