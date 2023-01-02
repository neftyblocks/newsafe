import { app, Menu, Tray } from 'electron';

const path = require('path');
const log = require('electron-log');

const createTrayIcon = (resourcePath, menu) => {
  log.info('creating tray menu');

  let trayIcon = null;
  if (process.platform === 'darwin') {
    trayIcon = path.join(resourcePath, 'renderer/assets/icons/png/32x32Template.png');
  } else if (process.platform === 'win32') {
    trayIcon = path.join(resourcePath, 'renderer/assets/icons/win/icon.ico');
  } else {
    trayIcon = path.join(resourcePath, 'renderer/assets/icons/png/256x256.png');
  }

  log.info(trayIcon);

  const tray = new Tray(trayIcon);

  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Debug',
        click: () => {
          menu.openDevTools({ mode: 'detach' });
          log.info('Anchor > Tray Menu > DevTools');
        }
      },
      {
        label: 'Quit',
        click: () => {
          app.quit();
        }
      }
    ]);
    tray.popUpContextMenu(contextMenu);
  });

  tray.on('click', () => {
    global.showManager();
  });

  return tray;
};

const toggleMenu = (menu, tray) => {
  if (menu.isVisible()) {
    menu.hide();
  } else {
    showMenu(menu, tray);
  }
};

const showMenu = (menu, tray) => {
  const position = getWindowPosition(menu, tray);
  menu.setPosition(position.x, position.y, false);
  menu.show();
  menu.focus();
};

const getWindowPosition = (menu, tray) => {
  const windowBounds = menu.getBounds();
  const trayBounds = tray.getBounds();
  const width = (trayBounds.width / 2) - (windowBounds.width / 2);
  const x = Math.round(trayBounds.x + width);
  const y = Math.round(trayBounds.y + trayBounds.height + 4);
  return { x, y };
};

export default { createTrayIcon };
