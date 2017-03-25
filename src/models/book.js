import mongoose from 'mongoose';

var BookSchema = new mongoose.Schema({
    title: String,
    url: String
});

module.exports = mongoose.model("Book", BookSchema);