// constructing url for each image, given required parameters
const urlParser = function (params) {
    const { server, id, secret } = params;
    return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

export default urlParser;