import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadURL('localhost:5173');
    win.webContents.openDevTools();
    
}

// for file operation
ipcMain.handle('save-note', async (event, { content }) => {
    const { filePath } = await dialog.showSaveDialog({
        filters: [{name: 'Text Files', extensions: ['txt']}],
    });

    if (filePath) {
        fs.writeFileSync(filePath, content, 'utf-8');
        return { success: true};
    }
    return { success: false};
});

ipcMain.handle('load-note', async () => {
    const { filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Text Files', extensions: ['txt']}],
    });

    if (filePaths.length > 0) {
        const content = fs.readFileSync(filePaths[0], 'utf-8');
        return { success: true, content};
    }
    return { success: false };
});

app.whenReady().then(createWindow);
