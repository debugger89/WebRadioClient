# Web Radio Application using Electron

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - The main web page to render. This is the app's **renderer process**.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/debugger89/WebRadioClient.git
# Go into the repository
cd WebRadioClient
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Packaging

To package this app you need to install the [electron-packager](https://github.com/electron-userland/electron-packager)

```bash
# for use from cli
npm install electron-packager -g
```

Packaging for windows
```bash
npm run package-win
# or
electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CC --version-string.FileDescription=C&C --version-string.ProductName=\"CCWebRadioClient\"
```


Packaging for mac
```bash
npm run package-mac
# or
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```

Packaging for linux
```bash
npm run package-linux
# or
electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds
```

All the packaging scripts are written in package.json file.


## License

[Apache 2.0](LICENSE.md)
