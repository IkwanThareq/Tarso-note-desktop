import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';

let currentFilePath: string | null = null;

function createWindow() {
    console.log("🚀 Main process is starting...");
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadURL('http://localhost:5173');


    console.log("Electron window created");
}

// for file operation
ipcMain.handle('save-note', async (event, { content }) => {
	if (currentFilePath) {
		fs.writeFileSync(currentFilePath, content, 'utf-8');
		return { success: true, updated: true };
	} else {
		const { filePath } = await dialog.showSaveDialog({
			filters: [{ name: 'Text Files', extensions: ['txt'] }],
		});
		if (filePath) {
			currentFilePath = filePath;
			fs.writeFileSync(currentFilePath, content, 'utf-8');
			return { success: true, updated: false };
		}
	}
	return { success: false };
});


ipcMain.handle('load-note', async () => {
    console.log("ipcMainHandle call LoadNote");
    const { filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Text Files', extensions: ['txt'] }],
    });

    if (filePaths.length > 0) {
        currentFilePath = filePaths[0];
        const content = fs.readFileSync(currentFilePath, 'utf-8');
        return { success: true, content };
    }
    return { success: false };
});

app.whenReady().then(createWindow);
