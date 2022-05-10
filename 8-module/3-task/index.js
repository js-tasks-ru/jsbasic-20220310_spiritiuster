export default class Cart {
	cartItems = []; // [product: {...}, count: N]

	constructor(cartIcon) {
		this.cartIcon = cartIcon;
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
					cartItem = {};
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

	onProductUpdate(cartItem) {
		// реализуем в следующей задаче

		this.cartIcon.update(this);
	}
}

