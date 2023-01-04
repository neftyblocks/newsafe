import { BrowserWindow, ipcRenderer } from "electron";
import { Store } from "redux";
import { changeModule } from "../../../modules/main/actions/navigation";

export function handleNewcoinUri(uriString, mainWindow) {
    if (uriString.startsWith('newcoin:')) {
        const uri = new URL(uriString);
        const { host, search } = uri;
        if (host === 'swap') {
            const params = new URLSearchParams(search);
            // TODO: handle params
            const from = params.get('from') ?? 'GNCO';
            const to = params.get('to');
            mainWindow.webContents.send('swapTokens', { from, to });
            mainWindow.setVisibleOnAllWorkspaces(true);
            mainWindow.show();
            mainWindow.focus();
            mainWindow.setVisibleOnAllWorkspaces(false);
        }
    }
}

export function registerIpcNewcoinEvents(store) {
    ipcRenderer.on('swapTokens', (event, ) => {
        store.dispatch(changeModule('badges'));
    });
}