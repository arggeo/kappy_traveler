// constructing url for each image, given required parameters
const urlParser = function (params) {
    return `https://live.staticflickr.com/${serverId}/${photoId}_${secret}.jpg`;
};

module.exports = urlParser;