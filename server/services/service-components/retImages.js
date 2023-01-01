import flickrRequestUrlAPI from '../service-components/API/flickrRequestUrl.js';

const retImages = async function (sights) {
    const sightsImagePromises = sights.map(sight => flickrRequestUrlAPI(sight.location.lat, sight.location.lng));
    const imagesForPlaces = (await Promise.all(sightsImagePromises)).map(img => img.data.photos.photo);
    
    return imagesForPlaces;
}

export default retImages;