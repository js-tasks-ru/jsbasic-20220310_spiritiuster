/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
	constructor(rows) {
		this._rows = rows;
		this.elem = this.render();
	}

	render() {
		const table = document.createElement('table');

		table.insertAdjacentHTML('afterBegin', '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>');

		const tr = this._rows.map(item => {
			return `<tr>
			<td>${item.name}</td>
			<td>${item.age}</td>
			<td>${item.salary}</td>
			<td>${item.city}</td>
			<td><button>X</button></td></tr>
			</tr>`
		}).join('');

		table.insertAdjacentHTML('beforeEnd', tr);
		
		this.table = table;
		this.eventListners();

		return table;
	}

	eventListners() {
		this.table.addEventListener('click', event => {
			if (event.target.tagName === 'BUTTON') {
				event.target.closest('tr').remove();
			}
		})
	}
}
