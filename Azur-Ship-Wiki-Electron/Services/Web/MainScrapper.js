const { loadShipList } = require('./Scrapper/ShipListScrapper')
require('dotenv').config();

const mainUrl = process.env.MAIN_URL;
const shipListUrl = `${mainUrl}/List_of_Ships`;

function scrapShips(event) {
    const shipPromise = loadShipList(event, shipListUrl);

    return Promise.resolve(shipPromise);
}

module.exports = {
    scrapShips
}
