function isEmpty(obj) {
	for (let item in obj) {
		if (item) return false;
	}
	return true;
}
