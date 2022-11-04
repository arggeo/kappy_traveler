const mongoose = requrire('mongoose');
const Schema = mongoose.Schema;

const sightSchema = new Schema({
   _id: Schema.Types.ObjectId,
   name: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 10
   },
   excerpt: {
      type: String,
      required: true,
      maxLength: 150,
      minLength: 50
   },
   body: {
      type: String,
      required: true
   },
   images: [String],
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
   nearbySights: [{
      sightId: {
         type: Schema.Types.ObjectId,
         ref: 'Sight',
         required: false
      },
      name: {
         type: String,
         required: True
      }
   }],
   nearbyCoffeeShops: [String], // Will change once CoffeShop schema is available
   nearbyHospitals: [String]    // Will change once Hospital schema is available
});

module.exports = sightSchema;