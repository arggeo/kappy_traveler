import { model } from 'mongoose';
import hospitalSchema from '../schemas/hospitals.js';

const Hospital = model('Hospital', hospitalSchema);

export default Hospital;