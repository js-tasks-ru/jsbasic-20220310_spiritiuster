function hideSelf() {
	let btn = document.querySelector('.hide-self-button');
	btn.addEventListener('click', () => btn.setAttribute('hidden', true));
}