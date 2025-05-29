import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  saveNote: (content: string) =>
    ipcRenderer.invoke('save-note', { content }),

  loadNote: () =>
    ipcRenderer.invoke('load-note'),
});
