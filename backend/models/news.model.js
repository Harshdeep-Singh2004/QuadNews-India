const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    genre: { type:String, required:true },
    headline: { type:String, required:true },
    article: { type:String, required:true },
    link: { type:String, required:true },
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("News", newsSchema);