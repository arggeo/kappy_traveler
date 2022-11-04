const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
   _id: Schema.Types.ObjectId,
   place: {
      type: String,
      required: true
   },
   count: {
      type: Number,
      required: true
   }
});

module.exports = searchSchema;