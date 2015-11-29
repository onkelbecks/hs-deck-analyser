'use strict';

/**
 * is-Objekt, welches das vorliegen diverser Eigenschaften von Objekten oder des Browsers überprüfen kann
 *
 * Lives in global scope.
 **/
let is = {
  /**
   * Testet eine Variable daraufhin, ob sie einen gültigen Wert enthält. Also weder null noch undefined ist.
   * Auch Leerstring ist nicht erlaubt. 0 (vom Typ number) hingegen schon.
   *
   * @param {*} o
   * @return {boolean}
   **/
  value: function(o) {
    if (typeof o === 'undefined') return false;
    if (o === null) return false;
    if (typeof o === 'string' && o === '') return false;

    return true;
  },

  /**
   * Testet eine Variable daraufhin, ob es ein Array ist.
   *
   * @param {*} o
   * @return {boolean}
   **/
  array: function(o) {
    return Array.isArray(o);
  },

  /**
   * NaN is the only object that is unequal to itself
   * (The BuiltIn-Function isNaN() is broken, because e. g. isNaN({}) would return true)
   *
   * @param {*} v
   * @return {boolean}
   **/
  reallyNaN: function(v) {
    return v !== v;
  },

  /**
   * Detects if the string contains a valid URI
   **/
  validUri: function(a){ return/(ftp|http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/.test(a);},

  /**
   * Detects if the object is the window object
   **/
  window: function(o) { return (typeof o === 'object' && obj.subType(o).contains('Window')); }, // This may be not cross-browser-compatible

  /**
   * Detects if a function is called without new (if you pass "this" to this function).
   *
   * @param {object} t - has to be always the "this" of the function
   **/
  calledWithoutNew: function(t) { return (typeof t === 'undefined' || is.window(t)); },

  /**
   * All versions of IE have window.ActiveXObject property present. IE11, however hides this property from DOM and that property is now undefined.
   * But the property itself is present within object, so checking for property presence returns true in all IE versions, but in IE11 second check returns false.
   * Finally hasOwnProperty is called via Object because in IE8 (and I believe earlier) window is not an instanceof Object and does not have hasOwnProperty method.
   **/
  IE11: typeof window !== 'undefined' && (Object.prototype.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject),

  /**
   * Detects if ActiveX is supported
   * (hier gehe ich direkt über window, passt genauso)
   **/
  activeXSupported: typeof window !== 'undefined' && window.hasOwnProperty('ActiveXObject'),

  /**
   * Detects if page runs as HTA
   **/
  hta: function() { var isHTA=false; try{isHTA=(window.external==null)}catch(e){} return isHTA; },

  /**
   * Detects if page runs in node
   * Wenn window nicht bekannt ist, dafür aber module, können wir recht sicher sein, dass wir unter Node laufen
   **/
  runningInNode: typeof window === 'undefined' && typeof module !== 'undefined',

  /**
   * Detects if page runs in a GIT Repository (Development Environment)
   **/
  // code is broken in nodeJS TODO fix
  // runningInGitRepository: location.href.toUpperCase().indexOf('GITREPOSITORY') !== -1 || location.href.toUpperCase().indexOf('WEBSTORMPROJECTS') !== -1, // Ohne contains(), da dieser Library-Code sehr früh ausgeführt wird
};





/**
 * obj-Objekt, welches diverse Methoden bereithält, um mit Objekten zu arbeiten
 *
 * Lives in global scope.
 **/
let obj = {
  /**
   * Classical inheritance with Object.create(): {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create}
   */



  /**
   * Ermittelt den "Subtype" eines Objekts.
   *
   * @param {object} o - the object to check
   * @return {string}
   *
   * @example {} => [object Object]
   * @example new Date => [object Date]
   * @example new RegExp => [object RegExp]
   * @example '' => [object String]
   * @example 2 => [object Number]
   * @example true => [object Boolean]
   * @example undefined => [object Undefined]
   * @example null => [object Null]
   * @example function(){} => [object Function]
   **/
  subType: function(o) {
    return Object.prototype.toString.apply(o);
  },


  /**
   * Duplicates an object
   *
   * Object must be JSON-safe
   * @param {object} o - the object to duplicate
   **/
  duplicate: function (o) {
    return JSON.parse(JSON.stringify(o));
  },


  /**
   * Copys an object / Erzeugt eine flache Kopie. Unsupported in IE 11...
   *
   * @param {object} source - the object to copy
   **/
  shallowCopy: function (source) {
    let target = {};
    return Object.assign(target,source);
  },


  /**
   * Prevent Extensions on an object => Prevent an object from having new properties added to it.
   *
   * @param {object} o - the object where to prevent extensions
   **/
  preventExtensionsOnIt: function (o) {
    return Object.preventExtensions(o);
  },


  /**
   * Seals an object => It takes an existing object and essentially calls Object.preventExtensions() on it, but also marks all its existing properties as configurable:false.
   *
   * @param {object} o - the object to seal
   **/
  sealIt: function (o) {
    return Object.seal(o);
  },


  /**
   * Freezes an object => It takes an existing object and essentially calls Object.seal() on it, but it also marks all "data accessor" properties as writable:false, so that their values cannot be changed.
   *
   * @param {object} o - the object to freeze
   **/
  freezeIt: function (o) {
    return Object.freeze(o);
  },


  /**
   * Liefert, wenn man nur das Objekt hat, den protoype des zugehörigen Object Constructors
   * Wenn man den Object constructor schon hat, braucht man diese Funktion nicht, weil
   * let o = new OC(); => OC.prototype === Object.getPrototypeOf(o)
   *
   * @param {object} o - The object to get the protoype from
   **/
  getPrototype: function (o) {
    return Object.getPrototypeOf(o);
  },


  /**
   * Renames a property
   *
   * @param {object} o - The object, which has the property
   * @param {string} oldName - Name der alten Property, welche entfernt wird
   * @param {string} newName - Name der neuen Property, welche angelegt wird, aber den Wert von oldName übernimmt
   * @return {boolean} true on success, false on fail
   **/
  renameProperty: function (o, oldName, newName) { // Anstatt eines prototypischen Eingriffs über Object.prototype.renameProperty
    if (typeof o !== 'object') {
        console.warn('obj.renameProperty - first arg is supposed to be a object');
      return false;
    }
    if (typeof oldName !== 'string') {
      console.warn('obj.renameProperty - second arg is supposed to be a string');
      return false;
    }
    if (typeof newName !== 'string') {
      console.warn('obj.renameProperty - third arg is supposed to be a string');
      return false;
    }

    if (o.hasOwnProperty(oldName)) { // hasOwnProperty without reason. May be opened for all propertys later.
      o[newName] = o[oldName];
    }

    return delete o[oldName]; // Will try to delete the prop and afterwards return the result of deletion
  }
};


/**
 * nodeJS doesn't seem to know contains()...
 **/
if (!('contains' in String.prototype)) {
  String.prototype.contains = function(str, startIndex) {
    return -1 !== String.prototype.indexOf.call(this, str, startIndex);
  };
}



if (is.runningInNode) {
  // Export the library-object to nodeJS (via module)
  module.exports = is;
  // module.exports.obj = obj; // Well TODO
}