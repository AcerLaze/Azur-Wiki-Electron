const { app, BrowserWindow } = require('electron');
const db = require('./Services/DB/DatabaseInterface');
require('./Services/MainInterface');

function createWindow() {
	let window = new BrowserWindow({
		width: 1000,
		height: 700,
		backgroundColor: '#1a1a1a',
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	try {
		db.initializeDatabase();
		window.loadFile(`dist/AzurShipWiki/index.html`);
	} catch (error) {
		console.error(error)
		window.loadFile('Source/error.html');
	}
	
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
