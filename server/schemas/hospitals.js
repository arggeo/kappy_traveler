const { Schema } = require('mongoose');

const hospitalSchema = new Schema({
   placeId: {
      type: String,
      required: true
   },
   name: {
      type: String,
      require: true
   },
   location: {
      lat: {
         type: Number,
         required: true
      },
      lng: {
         type: Number,
         required: true
      }
   },
   vicinity: {
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
   }
}, { versionKey: false });

module.exports = hospitalSchema;