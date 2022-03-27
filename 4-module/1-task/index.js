function makeFriendsList(friends) {
  let ul = document.createElement('UL');
	
	for (let i of friends) {
		let li = document.createElement('LI');
		li.textContent = i.firstName + ' ' + i.lastName;
		ul.appendChild(li);
	}

	return ul;
}
