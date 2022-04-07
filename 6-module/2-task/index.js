import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
	constructor(product) {
		this._product = product;
		this.elem = this.render();
	}

	render() {
		const card = createElement(`
			<div class="card">
				<div class="card__top">
					<img src="/assets/images/products/${this._product.image}" class="card__image" alt="product">
					<span class="card__price">€${this._product.price.toFixed(2)}</span>
				</div>
				<div class="card__body">
					<div class="card__title">${this._product.name}</div>
					<button type="button" class="card__button">
						<img src="/assets/images/icons/plus-icon.svg" alt="icon">
					</button>
				</div>
			</div>
		`);

		this.card = card;
		this.eventListners();

		return card;
	}

	eventListners() {
		this.card.querySelector('.card__button').addEventListener('click', event => {
			this.card.dispatchEvent(new CustomEvent('product-add', {
				detail: this._product.id,
				bubbles: true
			}));
		});

	}
}