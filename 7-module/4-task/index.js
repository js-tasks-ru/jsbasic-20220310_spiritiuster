import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
	constructor({ steps, value = 0 }) {
		this._steps = steps;
		this._value = value;
		this.elem = this.render();
	}

	render() {
		const sliderSteps = [];
		for (let i=0; i<this._steps; i++) {
			sliderSteps.push(i === this._value ? '<span class="slider__step-active"></span>' : '<span></span>');
		}

		const slider = createElement(`<div class="slider">
			<div class="slider__thumb">
				<span class="slider__value">${this._value}</span>
			</div>
			<div class="slider__progress" style="width:0;"></div>
			<div class="slider__steps"></div>
		</div>`);

		this.slider = slider;

		this.slider.querySelector('.slider__steps').insertAdjacentHTML('afterbegin', sliderSteps.join(''));
		this.handlers();

		let thumb = this.slider.querySelector('.slider__thumb');
		thumb.ondragstart = () => false;

		return slider;
	}

	handlers() {
		this.slider.addEventListener('pointerdown', event => {
			
			let thumb = this.slider.querySelector('.slider__thumb'),
				// progress = this.slider.querySelector('.slider__progress'),
				// value = this.slider.querySelector('.slider__value'),
				slider = this.slider,
				totalSteps = this._steps-1;
			
			thumb.ondragstart = () => false;
			slider.classList.add('slider_dragging');
			moveAt(event.clientX);
			
			function moveAt(x) {
				let left = x - slider.offsetLeft,
					step = left / slider.offsetWidth;
				
				if (step<0) step=0;
				if (step>1) step=1;

				let interval = Math.round(step * totalSteps),
					leftPercents = Math.round(step * 100);
	
				onPointerUp(interval, leftPercents);
			}

			function onPointerMove(event) {
				moveAt(event.clientX);
			}
			function onPointerUp(interval, leftPercents) {
				slider.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
				slider.querySelector('.slider__progress').style.width = `${leftPercents}%`;
				slider.querySelector('.slider__value').textContent = interval;

			}
			
			document.addEventListener('pointermove', onPointerMove);
			thumb.addEventListener('pointerup', (interval) => {
				document.removeEventListener('pointermove', onPointerMove);
				slider.classList.remove('slider_dragging');
				thumb.pointerup = null;

				const sliderChange = new CustomEvent('slider-change', {
					detail: interval,
					bubbles: true
				});
				slider.dispatchEvent(sliderChange);
			})
		})
	}
}