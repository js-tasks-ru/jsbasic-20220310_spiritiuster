import createElement from '../../assets/lib/create-element.js';

export default class Modal {
	constructor() {
		this.elem = createElement(`<div class="modal">
			<div class="modal__overlay"></div>
			<div class="modal__inner">
			<div class="modal__header">
				<button type="button" class="modal__close">
				<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
				</button>
				<h3 class="modal__title"></h3>
			</div>
			<div class="modal__body"></div>
			</div>
		</div>`);
		this.keyDownBound = this.keyDown.bind(this);
		this.handlers();
	}

	keyDown(event) {
		if(event.code === 'Escape') {
			this.close();
		}
	}

	handlers() {
		this.elem.addEventListener('click', event => {
			const btn = this.elem.querySelector('.modal__close');
			if (event.target === btn || event.target.parentNode === btn) {
				this.close();
			}
		});
		
		document.addEventListener('keydown', this.keyDownBound);
	}

	open() {
		document.body.classList.add('is-modal-open');
		document.body.insertAdjacentElement('beforeEnd', this.elem);
	}
	
	close() {
		document.body.classList.remove('is-modal-open');
		if (document.querySelector('.modal')) {
			document.querySelector('.modal').remove();
		}
		document.removeEventListener('keydown', this.keyDownBound);
	}

	setTitle(title) {
		this.elem.querySelector('.modal__title').textContent = title;
	}

	setBody(body) {
		this.elem.querySelector('.modal__body').insertAdjacentElement('beforeEnd', body);
	}
}
