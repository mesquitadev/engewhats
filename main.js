const { BrowserWindow, app, Menu, Tray } = require('electron')
const path = require("path");

var AutoLaunch = require('auto-launch');
var autoLauncher = new AutoLaunch({
    name: "Whatsapp Integração | Engeplus Sistemas"
});
autoLauncher.isEnabled().then(function(isEnabled) {
  if (isEnabled) return;
   autoLauncher.enable();
}).catch(function (err) {
  throw err;
});
 

app.on('ready', () => {
    const mainWindow = new BrowserWindow({ 
        title: 'Integração Whatsapp',
        width: 800,
        height: 600,
        frame: true,
        menubarVisible: false,
        icon: './build/wpp_ico.ico'
    });
    mainWindow.setMenuBarVisibility(false)

    mainWindow.loadURL('https://web.whatsapp.com')

    let tray = null;
    mainWindow.on('minimize', function (event) {
        event.preventDefault();
        mainWindow.hide();
        tray = createTray();
    });

    mainWindow.on('restore', function (event) {
        mainWindow.show();
        tray.destroy();
    });

    function createTray() {
        
        let appIcon = new Tray(path.join(__dirname, "./build/wpp_ico.ico"));
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show', click: function () {
                    mainWindow.show();
                }
            },
            {
                label: 'Exit', click: function () {
                    mainWindow.isQuiting = true;
                    mainWindow.quit();
                }
            }
        ]);

        if(process.platform === 'win32') {
            appIcon.on('double-click', function (event) {
                mainWindow.show();
            });
        }
        appIcon.setToolTip('Integrador Whatsapp | Engeplus Sistemas');
        appIcon.setContextMenu(contextMenu);
        return appIcon;
    }
});



app.on('ready', () => {
  tray = new Tray(path.join(__dirname, '/Icon.png'));

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click() { app.quit(); }
    }
  ]);

  tray.setToolTip('Clipmaster');
  tray.setContextMenu(menu);
});

