const { Schema } = require('mongoose');

const cafeSchema = new Schema({
   _id: Schema.Types.ObjectId,
   place: {
      type: String,
      required: true
   },
   name: {
      type: String,
      require: true
   },
   photoReference: {
      type: String,
      required: false
   },
   location: {
      lat: {
         type: Number,
         required: true
      },
      long: {
         type: Number,
         required: true
      }
   },
   address: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      default: 0
   },
   priceLevel: {
      type: Number,
      default: 0
   },
   types: [String]
});

module.exports = cafeSchema;