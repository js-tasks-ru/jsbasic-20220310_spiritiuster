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

		const slider = document.createElement('div');
		slider.classList.add('slider');
		slider.innerHTML = `<div class="slider__thumb">
				<span class="slider__value">${this._value}</span>
			</div>
			<div class="slider__progress" style="width:0;"></div>
			<div class="slider__steps"></div>`;

		this.slider = slider;

		this.slider.querySelector('.slider__steps').insertAdjacentHTML('afterbegin', sliderSteps.join(''));
		this.handlers();

		return slider;
	}

	handlers() {
		this.slider.addEventListener('click', event => {
			const thumb = this.slider.querySelector('.slider__thumb'),
				progress = this.slider.querySelector('.slider__progress'),
				value = this.slider.querySelector('.slider__value');

			const clickX = event.clientX - this.slider.offsetLeft,
				step = clickX / this.slider.offsetWidth,
				interval = Math.round(step * (this._steps-1)),
				leftPercents = interval / (this._steps-1) * 100;

			value.textContent = interval;
			thumb.style.left = `${leftPercents}%`;
			progress.style.width = `${leftPercents}%`;

			const sliderChange = new CustomEvent('slider-change', {
				detail: interval,
				bubbles: true
			});
			this.slider.dispatchEvent(sliderChange);
		})
	}
}