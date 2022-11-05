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
   images: [{
      id: {
         type: String,
         required: true
      },
      serverId: {
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
      long: {
         type: Number,
         required: true
      }
   },
   nearbySights: {
      type: [{
         sightId: {
            type: Schema.Types.ObjectId,
            ref: 'Sight',
            required: true
         },
         name: {
            type: String,
            required: True
         }
      }],
      required: false
   },
   nearbyCoffeeShops: {
      type: [{
         sightId: {
            type: Schema.Types.ObjectId,
            ref: 'Cafe',
            required: true
         },
         name: {
            type: String,
            required: True
         }
      }],
      required: false
   },
   nearbyHospitals: {
      type: [{
         sightId: {
            type: Schema.Types.ObjectId,
            ref: 'Hospital',
            required: true
         },
         name: {
            type: String,
            required: True
         }
      }],
      required: false
   }
});

module.exports = sightSchema;