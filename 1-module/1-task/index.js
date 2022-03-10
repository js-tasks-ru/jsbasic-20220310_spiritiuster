function factorial(n) {
	let result = 1;

		if ( n > 1 ) {
			for (let i=1; i<=n; i++) {
				result *= i;
			}
		} else if ( !(typeof n == "number") ) { // если ввели не число
			alert('В качестве аргумента необходимо число :)');
			return;
		}
		
		return result;
}
