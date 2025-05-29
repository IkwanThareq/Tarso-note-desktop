"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    saveNote: (content) => electron_1.ipcRenderer.invoke('save-note', { content }),
    loadNote: () => electron_1.ipcRenderer.invoke('load-note'),
});
