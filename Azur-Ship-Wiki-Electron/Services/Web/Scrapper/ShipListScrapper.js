const puppeteer = require('puppeteer');

async function loadShipListRow(event, row, retro = false) {
    const shipData = Array.from(await row.$$('td'));
    const mode = shipData.length > 11 ? 1 : 0;
    
    let result = {};
    //Get content and save it to a variable
    try {
        const ShipCode = await (await shipData[0].getProperty('textContent')).jsonValue();
        const ShipName = await (await shipData[1].getProperty('textContent')).jsonValue();
        event.reply('loadData-reply', `Processing ship : ${ShipName}`);

        const RarityName = await (await shipData[2].getProperty('textContent')).jsonValue();
        const RarityColor = await shipData[2].evaluate(element => {
            const style = getComputedStyle(element);
            if (!style.getPropertyValue('background-color').includes('rgba(0, 0, 0, 0)'))
                return style.getPropertyValue('background-color');
            else
                return style.getPropertyValue('background-image');
        })
        const ShipTypeName = await (await shipData[3 + mode].getProperty('textContent')).jsonValue();

        const ShipTypeColor = await shipData[3 + mode].evaluate(element => {
            return getComputedStyle(element).getPropertyValue('background-color');
        })

        const FactionName = await (await shipData[4 + mode].getProperty('textContent')).jsonValue();

        const Firepower = await (await shipData[5 + mode].getProperty('textContent')).jsonValue();
        const Health = await (await shipData[6 + mode].getProperty('textContent')).jsonValue();
        const AntiAir = await (await shipData[7 + mode].getProperty('textContent')).jsonValue();
        const Evasion = await (await shipData[8 + mode].getProperty('textContent')).jsonValue();
        const Aviation = await (await shipData[9 + mode].getProperty('textContent')).jsonValue();
        const Torpedo = await (await shipData[10 + mode].getProperty('textContent')).jsonValue();

        result = {
            Rarity: {
                RarityName,
                Color: RarityColor
            },
            ShipType: {
                ShipTypeName,
                Color: ShipTypeColor
            },
            Faction: {
                FactionName
            },
            Ship: {
                ShipName,
                ShipCode,
                Health,
                Firepower,
                Torpedo,
                Evasion,
                AntiAir,
                Aviation
            }
        }

        event.reply('loadData-reply', `Finish processing row for ship : ${ShipName}`);
    } catch (error) {
        console.error(`Error Processing row for ship ${ShipName} skipping . . . \n`, error);
    }

    return Promise.resolve(result);
}

async function loadShipListTable(event, table, retro = false) {
    let shipList = [];
    console.log('processing ship list table')
    //Fetch all Row
    let row = Array.from(await table.$$('tr'));

    //Process all Row async
    row.forEach(e => {
        shipList.push(loadShipListRow(event, e, retro));
    })

    console.log('finish processing ship list table');

    return await Promise.all(shipList);
}

async function loadShipList(event, url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    event.reply('loadData-reply', `Opening page at ${url} . . . `);
    await page.goto(url);

    //Get all table body
    event.reply('loadData-reply', 'Fetching Table . . . ');
    let shipTable = Array.from(await page.$$('table.wikitable.sortable.jquery-tablesorter>tbody'));

    let shipPromise = [];
    //Process all table async
    shipTable.forEach((e, index) => {
        if (index == 3) shipPromise.push(loadShipListTable(event, e, true));
        else shipPromise.push(loadShipListTable(event, e));
    })

    let ships = [];
    await Promise.all(shipPromise).then(shipPromise => {
        shipPromise.forEach(shipList => {
            ships = [...ships, ...shipList];
        })
    });
    browser.close();
    event.reply('loadData-reply', 'Finish Processing all ship . . . ');

    return ships;
}

module.exports = {
    loadShipList
}