let footer = undefined;

function initFooter() {
	let i = '',
		footer_styles = {
			'position': 'fixed',
			'width': '100vw',
			'height': '6vh',
			'line-height': '6vh',
			'font-size': '2.5vh',
			'color': '#666',
			'left': 0,
			'text-align': 'center',
			'bottom': 0,
			'border-top': 'solid 1px #333'
		};
	footer = document.createElement('div');
	footer.id = 'footer';
	for(i in footer_styles) {
		footer.style[i] = footer_styles[i];
	};
	footer.innerText = "node.js v" + process.versions.node + " - chromium v" + process.versions.chrome + " - electron " + process.versions.electron + " - " + process.platform;
	if(document.body) {
		return {
			'added': true,
			'elemt': document.body.appendChild(footer)
		};
	} else {
		return {
			'added': false,
			'elemt': footer
		}; 
	};
};
setTimeout(initFooter);