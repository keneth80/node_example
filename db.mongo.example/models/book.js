var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
schema에서 사용되는 SchemaType 8종류

String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array
*/

var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('book', bookSchema);
