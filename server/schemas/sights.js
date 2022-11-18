const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sightSchema = new Schema({
   name: {
      type: String,
      required: true,
      maxLength: 150
   },
   excerpt: {
      type: String,
      required: false,
      maxLength: 210,
   },
   body: {
      type: String,
      required: false
   },
   images: [{
      id: {
         type: String,
         required: true
      },
      server: {
         type: String,
         required: true
      },
      secret: {
         type: String,
         required: true
      }
   }],
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
   nearbyCoffeeShops: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Cafe',
         required: true
      }
   ],
   nearbyHospitals: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Hospital',
         required: true
      }
   ],
   city: {
      type: String,
      required: true
   }
}, { versionKey: false });

module.exports = sightSchema;