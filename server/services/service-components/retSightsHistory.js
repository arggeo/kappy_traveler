const getSightsHistoryAPI = require('../service-components/API/getSightsHistory');

const retsightsHistory = async function (sights) {
    let sightsHistory = (await Promise.all(sights.map(sight => getSightsHistoryAPI(sight.name)))).map(sh => {
        const data = Object.values(sh.data.query.pages);
        return {
            title: data[0].title,
            extract: data[0]?.extract || ''
        }
    });
    return sightsHistory;
}

module.exports = retsightsHistory;