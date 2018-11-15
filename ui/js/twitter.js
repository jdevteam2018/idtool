function initTwitter() {
	let twitterers = document.querySelectorAll('twitter');
	twitterers.forEach(twitterer => {
		twitterer.onclick = ()=>window.open("https://www.twitter.com/" + twitterer.innerText);
		twitterer.innerText = "@" + twitterer.innerText;
	});
};

setTimeout(initTwitter);