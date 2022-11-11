const Search = require('../models/searches');

/**
 * Middleware to log request
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @callback next
 */
const requestLogger = async (req, res, next) => {
    const cityName = req.params.cityName?.toLowerCase();

    try {
        const storedSearch = await Search.findOne({ place: cityName });
        
        if (storedSearch) {
            storedSearch.count++;
            await storedSearch.save();
            return next();
        }

        await Search.create({
            place: cityName,
            count: 1
        });

        next();
    } catch (e) {
        console.log(e);
    }
};

module.exports = requestLogger;