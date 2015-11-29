

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
  IE11: (Object.prototype.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject),

  /**
   * Detects if ActiveX is supported
   * (hier gehe ich direkt über window, passt genauso)
   **/
  activeXSupported: window.hasOwnProperty('ActiveXObject'),

  /**
   * Detects if page runs as HTA
   **/
  hta: function() { var isHTA=false; try{isHTA=(window.external==null)}catch(e){} return isHTA; },

  /**
   * Detects if page runs in a GIT Repository (Development Environment)
   **/
  runningInGitRepository: location.href.toUpperCase().indexOf('GITREPOSITORY') !== -1 || location.href.toUpperCase().indexOf('WEBSTORMPROJECTS') !== -1, // Ohne contains(), da dieser Library-Code sehr früh ausgeführt wird

  /**
   * Detects if page runs on a fileserver
   **/
  runningOnFileServer: document.location.href.indexOf('file:///C:/') === -1
};