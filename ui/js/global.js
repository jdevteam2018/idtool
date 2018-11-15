let scripts = [];

function addScripts(fn) {
	fn.forEach((f)=>{
		let temp = document.createElement('script');
		temp.src = '../js/' + f + '.js';
		scripts.push(temp);
	});
};

window.$ = document.querySelectorAll.bind(document);

function redirect(url) {
	document.location.href = url;
};

function global() {
	addScripts(['footer', 'twitter']);
	scripts.forEach(s=>document.body.appendChild(s));
};

setTimeout(global);