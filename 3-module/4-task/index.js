function showSalary(users, age) {
	let list = users.filter((item) => item.age <= age );
	return list.map((item) => item.name + ', ' + item.balance).join('\n');
}
