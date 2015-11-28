(function() {
	'use strict';
	var Card = require('./card.js');
	var twoCostCard = new Card(2,"Minion");

	console.log(twoCostCard.cost);
	console.log(twoCostCard.type);
})();

