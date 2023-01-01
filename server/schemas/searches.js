import { Schema } from "mongoose";

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

export default searchSchema;