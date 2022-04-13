import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
	constructor(products) {
		this.products = products;
		this.filters = {
			noNuts: false,
			vegeterianOnly: false,
			maxSpiciness: 4,
			category: '',
		};
		this.elem = this.render();
	}

	render() {
		const grid = createElement(`<div class="products-grid"></div>`);
		const gridInner = createElement('<div class="products-grid__inner"></div>');

		this.grid = grid;
		this.gridInner = gridInner;
		grid.insertAdjacentElement('beforeend', gridInner);
		
		this.fillGrid();
		return grid;
	}

	fillGrid = () => {
		this.gridInner.innerHTML = '';

		this.products
			.filter(item => item.nuts !== this.filters.noNuts)
			.filter(item => item.spiciness <= this.filters.maxSpiciness)
			.filter(item => {
				if (!this.filters.vegeterianOnly) {
					return item;
				} else {
					return item.vegeterian === this.filters.vegeterianOnly;
				}
			})
			.filter(item => {
				if (this.filters.category === '') {
					return item;
				} else {
					return item.category === this.filters.category;
				}
			})
			.map(item => {
				let product = new ProductCard(item);
				this.gridInner.append(product.elem);
			});
	}

	updateFilter = filters =>  {
		Object.assign(this.filters, filters);
		this.fillGrid();
	}
}
