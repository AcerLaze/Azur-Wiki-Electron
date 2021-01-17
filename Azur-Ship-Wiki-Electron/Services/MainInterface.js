const { ipcMain } = require('electron');
const { scrapShips } = require('./Web/MainScrapper');

ipcMain.on('debug-main', (event) => {
    event.reply('debug-renderer', 'Hit')
})

ipcMain.on('loadData-message', async (event) => {
    event.reply('loadData-reply', 'Retrieving ship list . . . ');
    await scrapShips(event)
    event.reply('loadData-reply', 'Downloading Data . . . ');

})