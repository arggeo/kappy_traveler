const mongoose = requrire('mongoose');
const Schema = mongoose.Schema;

const sightSchema = new Schema({
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
   thumbnail: String,
   images: [String],
   nearbySights: [this],
   nearbyCoffeeShops: [String], // Will change once CoffeShop schema is available
   nearbyHospitals: [String]    // Will change once Hospital schema is available
});

module.exports = sightSchema;