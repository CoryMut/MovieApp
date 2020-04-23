$('#addToList').on('click', function(e) {
	e.preventDefault();
	let $movieTitle = $('#movie-title').val();
	let $movieRating = $('#movie-rating').val();
	if ($movieRating === '' || $movieTitle === '') {
		showErrors('Please fill out both Title and Rating!');
	} else if (!isValidNumber($movieRating)) {
		showErrors('Rating is not between 0-10!');
	} else if (!isEnoughCharacters($movieTitle)) {
		showErrors('The title must be at least 2 characters!');
	} else {
		createTableEntry($movieTitle, $movieRating);
		cleanDOM();
		$('#movie-title').focus();
	}
});

function createTableEntry(titleValue, ratingValue) {
	$('<tr></tr>')
		.addClass('entry')
		.appendTo($('table'))
		.html('<td class="title">' + titleValue + '</td> <td class="rating">' + ratingValue + '</td>')
		.append('<td class="buttonRow"><button type="submit">Remove</button></td>');
}

function showErrors(message) {
	$('.alert').text(message);
	if ($('.alert').hasClass('filter')) {
		$('.alert').toggleClass('filter');
	}
}

function cleanDOM() {
	$('#movie-title').val('');
	$('#movie-rating').val('');
	if (!$('.alert').hasClass('filter')) {
		$('.alert').toggleClass('filter');
	}
}

function isValidNumber(value) {
	return value >= 0 && value <= 10;
}

function isEnoughCharacters(value) {
	return value.length >= 2;
}

// this function was inspired by results found on Stack Overflow
function comparer(index) {
	return function(a, b) {
		let valA = getCellValue(a, index);
		let valB = getCellValue(b, index);
		return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
	};
}

// this function was inspired by results found on Stack Overflow
function getCellValue(row, index) {
	return $(row).children('td').eq(index).text();
}

$('table').on('click', '.buttonRow', function(event) {
	$(this).parent().remove();
});

$('img').click(function() {
	let tables = $(this).parents('table').eq(0); // .eq(0) only necessary if have more than one table
	let rows = tables.find('tr').get().slice(1).sort(comparer($(this).index()));
	this.asc = !this.asc;
	if (!this.asc) {
		rows = rows.reverse();
	}
	for (let i = 0; i < rows.length; i++) {
		tables.append(rows[i]);
	}
});

// $('th').click(function() {
// 	var table = $(this).parents('table').eq(0);
// 	console.log(table);
// 	var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
// 	console.log(rows);
// 	console.log(this.asc);
// 	this.asc = !this.asc;
// 	console.log(this.asc);
// 	if (!this.asc) {
// 		rows = rows.reverse();
// 	}
// 	for (var i = 0; i < rows.length; i++) {
// 		table.append(rows[i]);
// 	}
// });
// function comparer(index) {
// 	return function(a, b) {
// 		var valA = getCellValue(a, index),
// 			valB = getCellValue(b, index);
// 		return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
// 	};
// }
// function getCellValue(row, index) {
// 	return $(row).children('td').eq(index).text();
// }
