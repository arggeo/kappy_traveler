import { model } from 'mongoose';
import cafeSchema from '../schemas/cafe.js';

const Cafe = model('Cafe', cafeSchema);

export default Cafe;