import getSightsAPI from '../service-components/API/getSights.js';

const retSights = async function (cityName) {
    try {
        let sights = await getSightsAPI(cityName);

        sights = sights.map(sight => {
            return {
                name: sight.name,
                city: cityName,
                location: sight.geometry?.location,
                avgRating: sight.rating,
                totalRatings: sight.user_ratings_total
            };
        });

        return sights;
    } catch (e) {
        console.log(e);
    }
}
export default retSights;