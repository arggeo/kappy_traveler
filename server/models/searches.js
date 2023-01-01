import { model } from 'mongoose';
import searchSchema from '../schemas/searches.js';

const Search = model('Search', searchSchema);

export default Search;