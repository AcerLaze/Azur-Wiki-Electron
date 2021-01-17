const puppeteer = require('puppeteer');
const { Ship } = require('./../../../Model/Ship');
const { Rarity } = require('./../../../Model/Rarity');
const { ShipType } = require('./../../../Model/ShipType');
const { Faction } = require('./../../../Model/Faction');

async function loadShipListRow(event, row, retro = false) {
    let shipData = Array.from(await row.$$('td'));
    let mode = shipData.length > 11 ? 1 : 0;
    //Get content and save it to a variable
    
    try {
        let ShipCode = await (await shipData[0].getProperty('textContent')).jsonValue();
        let ShipName = await (await shipData[1].getProperty('textContent')).jsonValue();
        event.reply('loadData-reply', `Processing ship : ${ShipName}`);

        let RarityName = await (await shipData[2].getProperty('textContent')).jsonValue();
        let RarityColor = await shipData[2].evaluate(element => {
            let style = getComputedStyle(element);
            if (!style.getPropertyValue('background-color').includes('rgba(0, 0, 0, 0)'))
                return style.getPropertyValue('background-color');
            else
                return style.getPropertyValue('background-image');
        })
        let ShipTypeName = await (await shipData[3 + mode].getProperty('textContent')).jsonValue();
        //let ShipTypeColor = await (await shipData[3 + mode].getProperty('style')).jsonValue();

        let ShipTypeColor = await shipData[3 + mode].evaluate(element => {
            return getComputedStyle(element).getPropertyValue('background-color');
        })

        let FactionName = await (await shipData[4 + mode].getProperty('textContent')).jsonValue();

        let Firepower = await (await shipData[5 + mode].getProperty('textContent')).jsonValue();
        let Health = await (await shipData[6 + mode].getProperty('textContent')).jsonValue();
        let AntiAir = await (await shipData[7 + mode].getProperty('textContent')).jsonValue();
        let Evasion = await (await shipData[8 + mode].getProperty('textContent')).jsonValue();
        let Aviation = await (await shipData[9 + mode].getProperty('textContent')).jsonValue();
        let Torpedo = await (await shipData[10 + mode].getProperty('textContent')).jsonValue();

        Rarity.findOrCreate({
            where: { RarityName },
            defaults: {
                RarityName,
                Color: RarityColor
            }
        }).then(e => e.save())

        ShipType.findOrCreate({
            where: { ShipTypeName },
            defaults: {
                ShipTypeName,
                Color: ShipTypeColor
            }
        }).then(e => e.save())

        let faction = Faction.findOrCreate({
            where: { FactionName },
            defaults: {
                FactionName
            }
        }).then(e => e.save())

        let ship = Ship.findOrCreate({
            where: { ShipName },
            defaults: {
                ShipName,
                ShipCode,
                Health,
                Firepower,
                Torpedo,
                Evasion,
                AntiAir,
                Aviation
            }
        }).then(e => e.save())

        if (Date.now() - faction.createdAt > (1000 * 60 * 60 * 24 * 7)) {
            //TODO update faction
        }
        if (Date.now() - ship.createdAt > (1000 * 60 * 60 * 24 * 7)) {
            //TODO update ship
        }

        event.reply('loadData-reply', `Finish processing ship : ${ShipName}`);

    } catch (error) {
        console.error(`Error Processing ship skipping . . . \n`, error);
    }
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

    await Promise.all(shipList)

    console.log('finish processing ship list table')
}

async function loadShipList(event, url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    event.reply('loadData-reply', 'Opening page . . . ');
    await page.goto(url);

    //Get all table body
    event.reply('loadData-reply', 'Fetching Table . . . ');
    let shipTable = Array.from(await page.$$('table.wikitable.sortable.jquery-tablesorter>tbody'));

    let shipPromise = [];
    event.reply('loadData-reply', shipTable.length);
    //Process all table async
    shipTable.forEach((e, index) => {
        if (index == 3) shipPromise.push(loadShipListTable(event, e, true));
        else shipPromise.push(loadShipListTable(event, e));
    })

    await Promise.all(shipPromise).then(() => {
        browser.close();
        event.reply('loadData-reply', 'Finish Processing all ship . . . ');
    });
}

module.exports = {
    loadShipList
}