"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let currentFilePath = null;
function createWindow() {
    console.log("🚀 Main process is starting...");
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    win.loadURL('http://localhost:5173');
    console.log("Electron window created");
}
// for file operation
electron_1.ipcMain.handle('save-note', async (event, { content }) => {
    if (currentFilePath) {
        fs_1.default.writeFileSync(currentFilePath, content, 'utf-8');
        return { success: true, updated: true };
    }
    else {
        const { filePath } = await electron_1.dialog.showSaveDialog({
            filters: [{ name: 'Text Files', extensions: ['txt'] }],
        });
        if (filePath) {
            currentFilePath = filePath;
            fs_1.default.writeFileSync(currentFilePath, content, 'utf-8');
            return { success: true, updated: false };
        }
    }
    return { success: false };
});
electron_1.ipcMain.handle('load-note', async () => {
    console.log("ipcMainHandle call LoadNote");
    const { filePaths } = await electron_1.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Text Files', extensions: ['txt'] }],
    });
    if (filePaths.length > 0) {
        currentFilePath = filePaths[0];
        const content = fs_1.default.readFileSync(currentFilePath, 'utf-8');
        return { success: true, content };
    }
    return { success: false };
});
electron_1.app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
// 	currentFilePath = null;
// 	if (process.platform !== 'darwin') {
// 		app.quit();
// 	}
// });
// app.whenReady().then(() => {
//     createWindow
//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length == 0) {
//             createWindow();
//         }
//     });
// });
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });
