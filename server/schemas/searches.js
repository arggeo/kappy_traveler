const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
   place: {
      type: String,
      required: true
   },
   count: {
      type: Number,
      required: true
   }
}, { versionKey: false });

module.exports = searchSchema;