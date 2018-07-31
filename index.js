const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, ipcMain} = electron; // this is sorta overall process(Electron App)

let mainWindow;
app.on('ready', () => {
	// event based
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:path', (event, path) => {
	ffmpeg.ffprobe(path, (err, result) => {
		if (err) {
			return;
		}
		mainWindow.send('video:metadata', result.format);
	});
});

// the above listener that is attached can be broken down to three -
// app - thing we are listening to
// ready - event we are listening for
// function to accur when event occurs
