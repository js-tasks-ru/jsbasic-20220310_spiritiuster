import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
	constructor() {
		this.render();

		this.addEventListeners();
	}

	render() {
		this.elem = createElement('<div class="cart-icon"></div>');
		return this.elem;
	}

	update(cart) {
		if (!cart.isEmpty()) {
			this.elem.classList.add('cart-icon_visible');

			this.elem.innerHTML = `
				<div class="cart-icon__inner">
					<span class="cart-icon__count">${cart.getTotalCount()}</span>
					<span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
				</div>`;

			this.updatePosition();

			this.elem.classList.add('shake');
			this.elem.addEventListener('transitionend', () => {
				this.elem.classList.remove('shake');
			}, {once: true});

		} else {
			this.elem.classList.remove('cart-icon_visible');
		}
	}

	addEventListeners() {
		document.addEventListener('scroll', () => this.updatePosition());
		window.addEventListener('resize', () => this.updatePosition());
	}

	updatePosition() {
		let elemTop = this.elem.offsetTop;

		if (this.elem.offsetWidth) {
			let scrollTop = window.scrollY,
				container = document.querySelectorAll('.container')[0],
				elemLeft = container.getBoundingClientRect().right + 20,
				elemRight = document.documentElement.clientWidth - this.elem.offsetWidth - 10;
			
			if (scrollTop >= elemTop && window.innerWidth >= 768) {
				this.elem.style.position = 'fixed';
				this.elem.style.zIndex = '99';
				this.elem.style.left = Math.min(elemLeft, elemRight) + 'px';
				this.elem.style.right = '10px';
			} else {
				this.elem.style.position = '';
				this.elem.style.left = '';
				this.elem.style.right = '';
			}
		}
	}
}
