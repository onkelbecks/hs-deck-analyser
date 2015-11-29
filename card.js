'use strict';


/**
 * 1) Contains all of the code in a scope (lives good with other libraries)
 * 2) All of the code is wrapped in an anonymous function. Hides the code and prevents it from leaking.
 * {@link http://ejohn.org/apps/learn/#60 }
 **/
(function(){
  /**
   * private vars (hidden from global scope)
   * @private
   **/
  // let pVar = false;


  /**
   * private method (hidden from global scope)
   * @private
   **/
  // let pMethod = {};


  // TODO finalisieren
  /**
   * Unser grundlegendes Card-Objekt. Jede Karte wird über diesen constructor erzeugt
   *
   * @param {{cost,type,hasTaunt,deathrattleEffect}} settings - Die Einstellungen der Karte als Objekt
   * @constructor
   */
  let Card = function(settings) {
    if (is.calledWithoutNew(this)) { // force new operator
      alert('Thats not the way Card() is supposed to be called. Use new-Operator instead.');
      return;
    }

    if (typeof settings !== 'object') {
      alert('Card() - First arg is supposed to be an object.');
      return;
    }

    // Use the given settings or use the default value instead
    if (typeof settings.cost !== 'number') {
      settings.cost = 1;
    }

    if (settings.type !== 'minion' && settings.type !== 'spell' && settings.type !== 'weapon') {
      settings.type = 'minion'; // Default
    }

    if (typeof settings.hasTaunt !== 'boolean') {
      settings.hasTaunt = false; // Default
    }

    if (typeof settings.deathrattleEffect !== 'string') {
      settings.deathrattleEffect = ''; // Default
    }

    /**
     * @type {number}
     **/
    this.cost = settings.cost;

    /**
     * @type {string}
     **/
    this.type = settings.type;

    /**
     * @type {boolean}
     **/
    this.hasTaunt = settings.hasTaunt;

    /**
     * @type {string}
     **/
    this.deathrattleEffect = settings.deathrattleEffect;
  };



  // Export object to a browser (via window)
  window.Card = Card;

  // Export object to nodeJS (via module)
  module.exports = Card;
})();