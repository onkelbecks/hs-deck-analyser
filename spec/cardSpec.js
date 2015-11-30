describe("Card", function() {
  var Card = require('../Card.js');
  var card = new Card({cost:2,type:"minion"});

  it("should have a type and cost", function() {
    expect(card.type).toEqual("minion");
    expect(card.cost).toEqual(2);
  });

});
