import createElement from '../../assets/lib/create-element.js';
import slides from './slides.js';

export default class Carousel {
	constructor(slides) {
		this._slides = slides;
		this._current = 0;
		this.elem = this.render();
	}

	render() {
		const outer = createElement(`<div class="carousel">
		<div class="carousel__arrow carousel__arrow_right"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></div>
		<div class="carousel__arrow carousel__arrow_left"><img src="/assets/images/icons/angle-left-icon.svg" alt="icon"></div>
		</div>`);

		const inner = this._slides.map((item, index) => {
			this._length = index;
			return `<div class="carousel__slide" data-id="${item.id}">
				<img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
				<div class="carousel__caption">
				<span class="carousel__price">€${item.price.toFixed(2)}</span>
				<div class="carousel__title">${item.name}</div>
				<button type="button" class="carousel__button">
					<img src="/assets/images/icons/plus-icon.svg" alt="icon">
				</button>
				</div>
			</div>
			`
		}).join('');

		const innerWrapper = createElement(`<div class="carousel__inner"></div>`);
		innerWrapper.insertAdjacentHTML('beforeend', inner);
		outer.insertAdjacentElement('beforeend', innerWrapper);

		this.outer = outer;
		this.eventsListners();

		return outer;
	}

	eventsListners() {
		const inner = this.outer.querySelector('.carousel__inner');

		inner.addEventListener('click', event => {
			const productAdd = new CustomEvent('product-add', {
				detail: event.target.closest('.carousel__slide').dataset.id,
				bubbles: true
			});

			this.outer.dispatchEvent(productAdd);
		});
		this.outer.addEventListener('product-add', event => {
			console.log('--product-add detail: ', event.detail);
		})

		this.carouselArrowRight = this.outer.querySelector('.carousel__arrow_right');
		this.carouselArrowLeft = this.outer.querySelector('.carousel__arrow_left');
		
		this.carouselArrowRight.addEventListener('click', () => {
			this.move(this._current++);
			this.arrowsDisplay();
		})
		this.carouselArrowLeft.addEventListener('click', () => {
			this.move(this._current--);
			this.arrowsDisplay();
		})

		this.arrowsDisplay();
	}

	move() {
		const width = document.querySelector('.container').offsetWidth,
			inner = document.querySelector('.carousel__inner'),
			shift = width * this._current + 'px';

		inner.style.transform = `translateX(-${shift})`;
	}

	arrowsDisplay() {
		if (this._current <= 0) {
			this.carouselArrowLeft.style.display = 'none';
		} else if (this._current >= this._length) {
			this.carouselArrowRight.style.display = 'none';
		} else {
			this.carouselArrowLeft.style.display = '';
			this.carouselArrowRight.style.display = '';
		}
	}
}
