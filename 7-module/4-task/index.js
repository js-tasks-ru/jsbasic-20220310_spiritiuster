export default class StepSlider {
	constructor({ steps, value = 0 }) {
		this._steps = steps;
		this._segments = this._steps-1;
		this.render();
		this.setValue(value);
		this.handlers();
	}

	render() {
		const elem = document.createElement('div');
		elem.classList.add('slider');
		elem.innerHTML = `<div class="slider__thumb">
				<span class="slider__value">${this._value}</span>
			</div>
			<div class="slider__progress" style="width:0;"></div>
			<div class="slider__steps">
				${'<span></span>'.repeat(this._steps)}
			</div>`;

		this.elem = elem;
		return elem;
	}

	setValue(value) {
		this._value = value;
		let percents = this._value / this._segments * 100;

		this.elem.querySelector('.slider__value').textContent = this._value;
		this.elem.querySelector('.slider__progress').style.width = `${percents}%`;
		this.elem.querySelector('.slider__thumb').style.left = `${percents}%`;

		let spanActive = this.elem.querySelector('.slider__steps span.slider__step-active'),
			spanParent = this.elem.querySelector('.slider__steps');
	
		if (spanActive) {
			spanActive.classList.remove('slider__step-active');
		}
		spanParent.children[this._value].classList.add('slider__step-active');
	}

	handlers() {
		let thumb = this.elem.querySelector('.slider__thumb');
		thumb.ondragstart = () => false;
		thumb.addEventListener('pointerdown', this.onPointerDown);
		this.elem.addEventListener('click', this.onClick);
	}
	
	onPointerDown = event => {
		event.preventDefault();
		this.elem.classList.add('slider_dragging');
		document.addEventListener('pointermove', this.onPointerMove);
		document.addEventListener('pointerup', this.onPointerUp);
	}

	onPointerMove = event => {
		let click = event.clientX - this.elem.offsetLeft,
			left = click / this.elem.offsetWidth;
		
		if (left<0) left=0;
		if (left>1) left=1;

		this._value = Math.round(left * this._segments);

		this.elem.querySelector('.slider__thumb').style.left = `${left * 100}%`;
		this.elem.querySelector('.slider__progress').style.width = `${left * 100}%`;
		this.elem.querySelector('.slider__value').innerHTML = this._value;
	}
	
	onPointerUp = () => {
		this.elem.classList.remove('slider_dragging');
		document.removeEventListener('pointermove', this.onPointerMove);
		document.removeEventListener('pointerup', this.onPointerUp);

		const sliderChange = new CustomEvent('slider-change', {
			detail: this._value,
			bubbles: true
		});
		this.elem.dispatchEvent(sliderChange);
	}

	onClick = event => {
		let left = (event.clientX - this.elem.offsetLeft) / this.elem.offsetWidth,
			value = Math.round(left * this._segments);
		
		this.setValue(value);

		const sliderChange = new CustomEvent('slider-change', {
			detail: this._value,
			bubbles: true
		});
		this.elem.dispatchEvent(sliderChange);
	}
}