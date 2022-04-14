import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
	cartItems = []; // [product: {...}, count: N]

	constructor(cartIcon) {
		this.cartIcon = cartIcon;

		this.addEventListeners();
	}

	addProduct(product) {
		if (product === null || product === 'undefined' || product === '' || !product) return false;

		let name = product.name,
			cartItem = {};

		let index = this.cartItems.findIndex(item => item.product.name === name);
		if (index >= 0) {
			this.cartItems[index].count++
			cartItem = this.cartItems[index];
		} else {
			cartItem = {product, count: 1}
			this.cartItems.push(cartItem);
		}

		this.onProductUpdate(cartItem);
	}

	updateProductCount(productId, amount) {
		let cartItem = this.cartItems.find(item => item.product.id === productId);
		if (cartItem) {
			if (amount > 0) {
				cartItem.count++;
			} else {
				cartItem.count--;
				if (cartItem.count === 0) {
					let newCartItems = this.cartItems.filter(item => item.count > 0);
					this.cartItems = newCartItems;
				}
			}
		}
		if (cartItem) this.onProductUpdate(cartItem);
	}

	isEmpty() {
		return this.cartItems.length > 0 ? false : true;
	}

	getTotalCount() {
		return this.cartItems.reduce((total, item) => total + item.count, 0);
	}

	getTotalPrice() {
		return this.cartItems.reduce((total, item) => total + item.count * item.product.price, 0);
	}

	renderProduct(product, count) {
		return createElement(`
		<div class="cart-product" data-product-id="${
			product.id
		}">
			<div class="cart-product__img">
				<img src="/assets/images/products/${product.image}" alt="product">
			</div>
			<div class="cart-product__info">
				<div class="cart-product__title">${escapeHtml(product.name)}</div>
				<div class="cart-product__price-wrap">
					<div class="cart-counter">
						<button type="button" class="cart-counter__button cart-counter__button_minus">
							<img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
						</button>
						<span class="cart-counter__count">${count}</span>
						<button type="button" class="cart-counter__button cart-counter__button_plus">
							<img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
						</button>
					</div>
					<div class="cart-product__price">€${product.price.toFixed(2)}</div>
				</div>
			</div>
		</div>`);
	}

	renderOrderForm() {
		return createElement(`<form class="cart-form">
			<h5 class="cart-form__title">Delivery</h5>
			<div class="cart-form__group cart-form__group_row">
				<input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
				<input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
				<input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
			</div>
			<div class="cart-form__group">
				<input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
			</div>
			<div class="cart-buttons">
				<div class="cart-buttons__buttons btn-group">
					<div class="cart-buttons__info">
						<span class="cart-buttons__info-text">total</span>
						<span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
							2
						)}</span>
					</div>
					<button type="submit" class="cart-buttons__button btn-group__button button">order</button>
				</div>
			</div>
		</form>`);
	}

	renderModal() {
		const modal = new Modal();
		const body = document.createElement('div');
		this.cartItems.map(item => {
			body.insertAdjacentElement('beforeEnd', this.renderProduct(item.product, item.count));
		});
		body.insertAdjacentElement('beforeEnd', this.renderOrderForm());
		
		modal.setTitle('Your order');
		modal.setBody(body);
		modal.open();

		document.querySelector('.modal__body').onclick = e => {

			if (e.target.closest('.cart-form')) {
				document.querySelector('.cart-form').addEventListener('submit', this.onSubmit);
				return;
			}
			if (e.target.closest('.cart-product')) {
				let btn,
					parent = e.target.closest('.cart-product'),
					id = parent.dataset.productId;
				
				if (e.target.tagName === 'BUTTON') btn = e.target;
				if (e.target.parentNode.tagName === 'BUTTON') btn = e.target.parentNode;
				
				if (btn.classList.contains('cart-counter__button_minus')) {
					this.updateProductCount(id, -1);
				} else {
					this.updateProductCount(id, 1);
				}
			}
		}

		this.modal = modal;
	}

	onProductUpdate(cartItem) {
		this.cartIcon.update(this);
			
		if (!this.cartItems.length) {
			this.modal.close();
			return
		}

		if (!document.body.classList.contains('is-modal-open')) return;

		let productId = cartItem.product.id,
			modalBody = document.querySelector('.modal'),
			productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`),
			productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`),
			totalPrice = modalBody.querySelector(`.cart-buttons__info-price`);
		
		productCount.innerHTML = cartItem.count;
		productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
		totalPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

		if (cartItem.count === 0) {
			modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
		}
	}

	onSubmit(event) {
		event.preventDefault();

		document.querySelector('button[type=submit]').classList.add('is-loading');
		let data = new FormData(document.querySelector('.cart-form'));

		fetch('https://httpbin.org/post', { method: 'POST', body: data })
			.then( response => {
				if (response.ok) {
					this.cartItems = [];
					// this.cartIcon.update(this);
					document.querySelector('.modal__title').textContent = 'Success!';
					document.querySelector('.modal__body').innerHTML = `<div class="modal__body-inner">
						<p>
						Order successful! Your order is being cooked :) <br>
						We’ll notify you about delivery time shortly.<br>
						<img src="/assets/images/delivery.gif">
						</p>
					</div>`;
				}
			})
			.catch( error => console.log(error) );
	};

	addEventListeners() {
		this.cartIcon.elem.onclick = () => this.renderModal();
	}
}

