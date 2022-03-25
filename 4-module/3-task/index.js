function highlight(table) {
  for (let i=0; i<table.tBodies[0].rows.length; i++) {
		
		let tr = table.tBodies[0].rows[i],
			attr = tr.cells[3].getAttribute('data-available'),
			gender = tr.cells[2].textContent,
			age = +tr.cells[1].textContent;
    
    if (attr === 'true') {
      tr.classList.add('available');
    } else if (attr === 'false') {
      tr.classList.add('unavailable');
    } else {
      tr.hidden = true
    }

		gender === 'm' ? tr.classList.add('male') : tr.classList.add('female');

		if (age < 18) tr.style.textDecoration = 'line-through';
	}
}
