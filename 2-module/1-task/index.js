function sumSalary(salaries) {
	let result = 0;

	for (let item in salaries) {
		let value = salaries[item];
		if ( typeof(value) === 'number' && !isNaN(value) && isFinite(value)) {
			result += value;
		}
	}
	return result;
}