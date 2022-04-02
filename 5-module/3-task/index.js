function initCarousel() {
	let slides = document.querySelectorAll('.carousel__slide'),
		slideWidth = slides[0].offsetWidth,
		slidesLength = slides.length-1,
		carouselWrapper = document.querySelector('.carousel__inner'),
		currentSlide = 0;
	
	let btnPrev = document.querySelector('.carousel__arrow_left'),
		btnNext = document.querySelector('.carousel__arrow_right');
	
	btnNext.addEventListener('click', () => move('next'));
	btnPrev.addEventListener('click', () => move('prev'));
	
	function arrowsDisplay() {
		if (currentSlide === 0) {
			btnPrev.style.display = 'none';
		} else if (currentSlide === slidesLength) {
			btnNext.style.display = 'none';
		} else {
			btnNext.style.display = '';
			btnPrev.style.display = '';
		}
	}
	arrowsDisplay();
	
	function move(nav) {
		if (nav === 'next') currentSlide++;
		if (nav === 'prev') currentSlide--;

		if (currentSlide >= slidesLength) currentSlide = slidesLength;
		if (currentSlide < 0) currentSlide = 0;

		arrowsDisplay();

		let transform = currentSlide * slideWidth +'px';
		carouselWrapper.style.transform = `translateX(-${transform})`
	}
}