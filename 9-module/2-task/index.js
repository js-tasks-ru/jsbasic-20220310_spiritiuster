import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

	constructor() {
	}
	
	async render() {

		const carouselPromise = new Promise( resolve => {
			this.carousel = new Carousel(slides);
			resolve(this.carousel);
		});

		const ribbonMenuPromise =  new Promise( resolve => {
			this.ribbonMenu = new RibbonMenu(categories);
			resolve(this.ribbonMenu);
		});

		const stepSliderPromise = new Promise( resolve => {
			this.stepSlider = new StepSlider({steps: 5, value: 3});
			resolve(this.stepSlider);
		});

		const cartIconPromise = new Promise( resolve => {
			this.cartIcon = new CartIcon();
			resolve(this.cartIcon);
		});

		const cartPromise = new Promise( resolve => {
			cartIconPromise.then(cartIcon => {
				this.cart = new Cart(cartIcon);
				resolve(this.cart);
			});
		});

		carouselPromise
			.then(data => document.querySelector('[data-carousel-holder]').insertAdjacentElement('beforeEnd', data.elem));
			
		ribbonMenuPromise
			.then(data => document.querySelector('[data-ribbon-holder]').insertAdjacentElement('beforeEnd', data.elem));

		stepSliderPromise
			.then(data => document.querySelector('[data-slider-holder]').insertAdjacentElement('beforeEnd', data.elem));

		cartIconPromise
			.then(data => document.querySelector('[data-cart-icon-holder]').insertAdjacentElement('beforeEnd', data.elem));

		
		let productResponse = await fetch('products.json');
		this.productJSON = await productResponse.json();
		this.productsGrid = new ProductsGrid(this.productJSON);
		document.querySelector('[data-products-grid-holder]').insertAdjacentElement('beforeEnd', this.productsGrid.elem);

		await Promise.all([stepSliderPromise, ribbonMenuPromise]);
		this.productsGrid.updateFilter({
			noNuts: document.getElementById('nuts-checkbox').checked,
			vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
			maxSpiciness: this.stepSlider.value(),
			category: this.ribbonMenu.value()
		});

		this.handlers();
	}

	handlers() {
		document.body.addEventListener('product-add', event => {
			for (let item of this.productJSON) {
				if (item.id === event.detail) {
					this.cart.addProduct(item);
					break;
				}
			}
		});

		document.body.addEventListener('slider-change', () => {
			this.productsGrid.updateFilter({
				maxSpiciness: this.stepSlider.value()
			});
		})

		document.body.addEventListener('ribbon-select', event => {
			this.productsGrid.updateFilter({
				category: this.ribbonMenu.value()
			});
		})

		document.querySelector('#nuts-checkbox').addEventListener('change', event => {
			console.log(event.target.checked);
			this.productsGrid.updateFilter({
				noNuts: event.target.checked
			});
		})
		
		document.querySelector('#vegeterian-checkbox').addEventListener('change', event => {
			this.productsGrid.updateFilter({
				vegeterianOnly: event.target.checked
			});
		})
	}
}
