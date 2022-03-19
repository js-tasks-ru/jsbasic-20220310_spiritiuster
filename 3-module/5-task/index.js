function getMinMax(str) {
	let arr = str.split(' ').filter(item => +item);
	let result = {
		min: Math.min(...arr),
		max: Math.max(...arr)
	}
	return result;	
}
