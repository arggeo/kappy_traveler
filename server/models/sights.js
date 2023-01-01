import { model } from 'mongoose';
import sightSchema from '../schemas/sights.js';

const Sight = model('Sight', sightSchema);

export default Sight;