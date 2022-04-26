import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
	constructor(categories) {
		this.categories = categories;
		this.scrollWidth = 350;
		this.elem = this.render();
		this._value = '';
	}

	render() {
		const ribbon = createElement(`<div class="ribbon">
		<button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
		</button>
		<button class="ribbon__arrow ribbon__arrow_right">
			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
		</button>
		</div>
		`);

		this.ribbon = ribbon;

		const ribbonInner = createElement(`<nav class="ribbon__inner"></nav>`);
		const ribbonItems = this.categories.map((item, index) => {
			if (index === 0) {
				return `<a href="#" class="ribbon__item ribbon__item_active" data-id="${item.id}">${item.name}</a>`
			} else {
				return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
			}
		}).join('');

		ribbonInner.insertAdjacentHTML('beforeEnd', ribbonItems);

		this.ribbon.querySelector('.ribbon__arrow_left').after(ribbonInner);
		this.ribbonInner = ribbonInner;
		this.btnLeft = this.ribbon.querySelector('.ribbon__arrow_left');
		this.btnRight = this.ribbon.querySelector('.ribbon__arrow_right');

		this.handlers();
		this.arrowsDisplay(this.ribbonInner.scrollLeft, this.ribbonInner.scrollWidth);

		return ribbon;
	}
	
	value() {
		return this._value;
	}

	handlers() {
		this.ribbon.addEventListener('click', event => {
			if (event.target === this.btnRight || event.target.parentNode === this.btnRight) {
				this.ribbonInner.scrollBy(this.scrollWidth, 0);
			}
			if (event.target === this.btnLeft || event.target.parentNode === this.btnLeft) {
				this.ribbonInner.scrollBy(-this.scrollWidth, 0);
			}
			if (event.target.classList.contains('ribbon__item')) {
				event.preventDefault();
				event.target.parentNode.querySelectorAll('.ribbon__item_active').forEach(item => {
					item.classList.remove('ribbon__item_active');
				})
				event.target.classList.add('ribbon__item_active');

				this._value = event.target.dataset.id;

				const ribbonSelect = new CustomEvent('ribbon-select', {
					detail: event.target.dataset.id,
					bubbles: true
				})
				this.ribbon.dispatchEvent(ribbonSelect);
			}
		})

		this.ribbonInner.addEventListener('scroll', event => {
			const scrollLeft = event.target.scrollLeft;
			const scrollRight = event.target.scrollWidth - event.target.scrollLeft - event.target.clientWidth;
			this.arrowsDisplay(scrollLeft, scrollRight);
		})
	}

	arrowsDisplay(left, right) {
		if (left === 0) {
			this.btnLeft.classList.remove('ribbon__arrow_visible');
			this.btnRight.classList.add('ribbon__arrow_visible');
		} else if (right < 1) {
			this.btnRight.classList.remove('ribbon__arrow_visible');
			this.btnLeft.classList.add('ribbon__arrow_visible');
		} else {
			this.btnRight.classList.add('ribbon__arrow_visible');
			this.btnLeft.classList.add('ribbon__arrow_visible');
		}
	}
}
