function factorial(n) {
	let result = 1;

		if ( n > 1 ) {
			for (let i=1; i<=n; i++) {
				result *= i;
			}
		}
		
		return result;
}