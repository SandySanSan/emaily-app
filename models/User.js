const mongoose = require('mongoose');
// const Schema = mongoose.Schema
// destructuring
const { Schema } = mongoose;
// mongoose has to know the properties of the collection
// the schema object creates a schema for a new collection
// and describes properties

const userSchema = new Schema({
    googleId: String,
});

// two arguments means loading schema into mongoose
mongoose.model('users', userSchema);
