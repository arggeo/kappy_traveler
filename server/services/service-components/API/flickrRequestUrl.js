import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const FLICKR_API_KEY = process.env.FLICKR_API_KEY;

const flickrRequestUrl = function (lat, lng) {
    return axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=?&lat=${lat}&lon=${lng}&per_page=10`);
}

export default flickrRequestUrl;