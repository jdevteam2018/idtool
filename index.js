const electron = require('electron');
const {execSync, exec, execFile} = require('child_process');
const {app, BrowserWindow, ipcMain} = electron;
let mainWindow;

let err = new (function Errors() {
	this.l = ["Whoops.. That didn't work so well, did it?", "Fuck.. You are screwed now, aren't you?"];
	this.getRandom = ()=>{
		let i = Math.floor(Math.random() * this.l.length);
		return this.l[i];
	};
});

function _init() {
	mainWindow = new BrowserWindow({
		width: 500,
		height: 600,
		minWidth: 500,
		minHeight: 600
	});
	mainWindow.loadFile("ui/html/index.html");
	ipcMain.on('command-req', function _async_msg(evt, arg) {
		let res = err.getRandom();
		try {
			var cmd = arg.toString().replace(/\$\{DIRNAME\}/g, (__dirname.replace(/\/app\.asar/g, "")))
									.replace(/\$\{BIN\}/g, (__dirname.replace(/\/app\.asar/g, "")) + "/bin/" + process.platform)
									.split(" | ");
			execFile(cmd[0], cmd[1].split(" "), {
				cwd: __dirname.replace(/\/app\.asar/g, ""),
				timeout: 10000
			}, function _callback(error, stdout, stderr) {
				res = stdout || stderr || error;
				evt.sender.send('command-res', arg + '\n\n\n' + res.toString());
			});
		} catch(e) {
			res = e || res;
			evt.sender.send('command-res', res.toString());
		};
	});
	ipcMain.on('command-req-b', function _async_msg(evt, arg) {
		let res = err.getRandom();
		try {
			var cmd = arg.toString().replace(/\$\{DIRNAME\}/g, __dirname)
									.replace(/\$\{BIN\}/g, __dirname + "/bin/" + process.platform);
			exec(cmd.split(" "), {
							cwd: __dirname,
							timeout: 30000
						}, function _callback(error, stdout, stderr) {
				res = stdout || stderr || error;
				evt.sender.send('command-res', res.toString());
			});
		} catch(e) {
			res = e || res;
			evt.sender.send('command-res-b', res.toString());
		};
	});
	ipcMain.on('save-to-file', function _async_msg(evt, arg) {
		require('fs').writeFileSync(arg.file, arg.content);
	});
	app.on('window-all-closed', function _close() {
		app.quit();
	});
	mainWindow.on('closed', function _closed() {
		app.quit();
	});
};

app.on('ready', _init);