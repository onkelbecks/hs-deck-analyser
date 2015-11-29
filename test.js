(function() {
	'use strict';
	let Card = require('./card.js');
	let twoCostCard = new Card({cost:2, type:"Minion"});

	console.log(twoCostCard.cost);
	console.log(twoCostCard.type);
})();

