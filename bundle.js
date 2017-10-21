(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
  init: function init() {
    return Object({ ingredients: null, status: 'NOT_LOADED' });
  },
  fetchAllIngredients: function fetchAllIngredients(state, _, actions) {
    fetch('http://174.138.61.188/allIngredients').then(function (data) {
      return data.json();
    }).then(function (data) {
      actions.setAllIngredients(data);
    });
    return Object.assign({}, state, { status: 'LOADING' });
  },
  setAllIngredients: function setAllIngredients(state, data) {
    return Object.assign({}, state, { ingredients: data, status: 'LOADED' });
  }
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
  init: function init() {
    return Object({ drink: null, status: 'NOT_LOADED' });
  },
  fetchDrinkById: function fetchDrinkById(state, id, actions) {
    fetch('http://174.138.61.188/drink/' + id).then(function (data) {
      return data.json();
    }).then(function (data) {
      actions.setDrinkInfo(data);
    });
    return Object.assign({}, state, { status: 'LOADING' });
  },
  setDrinkInfo: function setDrinkInfo(state, data) {
    return Object.assign({}, state, { drink: data, status: 'LOADED' });
  }
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
  init: function init() {
    return Object({ drinks: null, ingredients: null, status: 'NOT_LOADED' });
  },
  fetchDrinksByIngredients: function fetchDrinksByIngredients(state, ingredients, actions) {
    var ingredientsCSV = Array.isArray(ingredients) ? ingredients.join(',') : ingredients;
    var limit = window.location.href.match(/limit=(\d+)/)[1];
    fetch('http://174.138.61.188/filter?ingredients=' + ingredientsCSV + '&limit=' + limit).then(function (data) {
      return data.json();
    }).then(function (data) {
      actions.setDrinks(data);
    });
    return Object.assign({}, state, { ingredients: ingredients }, { status: 'LOADING' });
  },
  setDrinks: function setDrinks(state, data) {
    return Object.assign({}, state, { drinks: data, status: 'LOADED' });
  }
};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = {
  init: function init() {
    return [];
  },
  addIngredient: function addIngredient(ingredients, newIngredient) {
    console.log(ingredients, newIngredient);
    if (ingredients.indexOf(newIngredient) === -1) {
      return ingredients.concat(newIngredient);
    }
    return ingredients;
  },
  removeIngredient: function removeIngredient(ingredients, removedIngredient) {
    return ingredients.filter(function (ingredient) {
      return ingredient !== removedIngredient;
    });
  }
};

},{}],5:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <style>\n    .drink-preview-text::before {\n      content: "";\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: inherit;\n      background-attachment: fixed;\n      -webkit-filter: blur(4px);\n      filter: blur(4px)\n    }\n    .drink-preview-text::after {\n      content: "";\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: rgba(0, 0, 0, 0.25)\n    }\n  </style>\n'], ['\n  <style>\n    .drink-preview-text::before {\n      content: "";\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: inherit;\n      background-attachment: fixed;\n      -webkit-filter: blur(4px);\n      filter: blur(4px)\n    }\n    .drink-preview-text::after {\n      content: "";\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: rgba(0, 0, 0, 0.25)\n    }\n  </style>\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div onclick=', '>\n      ', '\n      <div class="drink-preview" style=', '>\n        <div class="drink-preview-text" style=', '>\n          <h3 style=', '>\n            ', '\n          </h3>\n          <div style=', '>\n            includes: ', ', ...\n          </div>\n        </div>\n      </div>\n    </div>\n  '], ['\n    <div onclick=', '>\n      ', '\n      <div class="drink-preview" style=', '>\n        <div class="drink-preview-text" style=', '>\n          <h3 style=', '>\n            ', '\n          </h3>\n          <div style=', '>\n            includes: ', ', ...\n          </div>\n        </div>\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html();

var textStyle = '\n  text-align: center;\n  color: white;\n  position: relative;\n  z-index: 1;\n';

var infoStyle = '\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 20px 10px;\n  background: inherit;\n  background-attachment: fixed;\n  overflow: hidden;\n';

var blurStyle = html(_templateObject);

module.exports = function (attrs) {
  var ingredientsDOM = attrs.ingredients.map(function (ingredient) {
    return ingredient.name;
  }).join(', ');

  var onClickDrink = function onClickDrink() {
    window.history.pushState({}, '', '/drink/' + attrs.id);
  };

  var drinkPreviewStyle = '\n    background: url(' + attrs.image + ');\n    background-attachment: fixed;\n    width: 600px;\n    max-width: 100%;\n    height: 400px;\n    position: relative;\n    overflow: hidden;\n    margin: 20px auto;\n    background-position: center;\n    border-radius: 3rem;\n  ';

  return html(_templateObject2, onClickDrink, blurStyle, drinkPreviewStyle, infoStyle, textStyle, attrs.name, textStyle, ingredientsDOM);
};

},{"tram-one":10}],6:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n      <span style=', '>\n        ', '\n      </span>\n    '], ['\n      <span style=', '>\n        ', '\n      </span>\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div style=', '>\n      <img src=', ' style=', '/>\n      <h1 style=', '>\n        ', '\n      </h1>\n      <ul style=', '>\n        ', '\n      </ul>\n      <div style=', '>\n        ', '\n      </div>\n    </div>\n  '], ['\n    <div style=', '>\n      <img src=', ' style=', '/>\n      <h1 style=', '>\n        ', '\n      </h1>\n      <ul style=', '>\n        ', '\n      </ul>\n      <div style=', '>\n        ', '\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html();

var imageStyle = '\n  grid-area: image;\n  width: 600px;\n  max-width: 100%;\n  border-radius: 3rem;\n  margin: auto;\n';

var ingredientStyle = '\n  border: 1px solid #271604;\n  border-radius: .5rem;\n  padding: 0.25em 0.75em;\n  margin: 0.25em;\n  display: inline-block;\n';

var titleStyle = '\n  grid-area: title;\n  text-align: center;\n  margin: 0px;\n';

var instructionsStyle = '\n  grid-area: instructions;\n  text-align: justify;\n  align-self: end;\n  margin: auto;\n';

var gridStyle = '\n  display: grid;\n  grid-template-rows: auto auto auto auto;\n  grid-row-gap: 2em;\n  grid-template-areas:\n    "title"\n    "image"\n    "ingredients"\n    "instructions";\n';

module.exports = function (attrs) {
  var ingredientsDOM = attrs.ingredients.map(function (ingredient) {
    var ingredientLabel = ingredient.measure === '' ? ingredient.name : ingredient.measure + ' : ' + ingredient.name;
    return html(_templateObject, ingredientStyle, ingredientLabel);
  });

  var ingredientsStyle = '\n    grid-area: ingredients;\n    max-width: 80%;\n    margin: auto;\n  ';

  return html(_templateObject2, gridStyle, attrs.image, imageStyle, titleStyle, attrs.name, ingredientsStyle, ingredientsDOM, instructionsStyle, attrs.instructions);
};

},{"tram-one":10}],7:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <h1 style=', ' style=', '>\n      <a href="/" style=', '>\n        Cocktail Curator\n        <img src="/drink.png" style=', ' />\n      </a>\n      <a href="/about" style=', '>\n        <img src="/info.png" style=', ' />\n      </a>\n      <a href="/" style=', '>\n        <img src="/search.png" style=', ' />\n      </a>\n    </h1>\n  '], ['\n    <h1 style=', ' style=', '>\n      <a href="/" style=', '>\n        Cocktail Curator\n        <img src="/drink.png" style=', ' />\n      </a>\n      <a href="/about" style=', '>\n        <img src="/info.png" style=', ' />\n      </a>\n      <a href="/" style=', '>\n        <img src="/search.png" style=', ' />\n      </a>\n    </h1>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html();

var headerStyle = '\n  color: #e3edf3;\n  background: #b25a00;\n  padding: 0.8rem;\n  margin-top: 0px;\n';

var imageStyle = '\n  width: 1em;\n  margin-bottom: -0.2rem;\n  filter: contrast(0%) brightness(180%);\n';

var titleStyle = 'grid-area: title;';
var infoStyle = 'grid-area: info;';
var searchStyle = 'grid-area: search;';

var gridStyle = '\n  display: grid;\n  grid-template-rows: auto;\n  grid-template-columns: auto 1fr auto auto;\n  grid-column-gap: 0.25em;\n  grid-template-areas:\n    "title . info search"\n';

module.exports = function () {
  return html(_templateObject, headerStyle, gridStyle, titleStyle, imageStyle, infoStyle, imageStyle, searchStyle, imageStyle);
};

},{"tram-one":10}],8:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['<style>.autocomplete__label{font-size:1.5rem}.autocomplete__input{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;border:1px solid;border-radius:3px;padding:.5rem 1rem;font-size:1rem}.autocomplete__select{display:none}.autocomplete__results{position:absolute;top:100%;left:0;right:0;margin:0;padding:0;max-height:0;overflow-y:auto;-webkit-transition:all 260ms ease-in-out;transition:all 260ms ease-in-out;opacity:0;border:1px solid;border-radius:3px}.autocomplete__results--is-visible{max-height:280px;opacity:1}.autocomplete__result{list-style:none;font-size:1rem;margin:0;padding:.5rem 1rem;cursor:pointer}.autocomplete__result+.autocomplete__result{border-top:1px solid}.autocomplete__result--is-selected,.autocomplete__result:hover{background:#eee}.autocomplete__notice{position:absolute;clip:rect(1px,1px,1px,1px);padding:0;border:0;height:1px;width:1px;overflow:hidden}</style>'], ['<style>.autocomplete__label{font-size:1.5rem}.autocomplete__input{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;border:1px solid;border-radius:3px;padding:.5rem 1rem;font-size:1rem}.autocomplete__select{display:none}.autocomplete__results{position:absolute;top:100%;left:0;right:0;margin:0;padding:0;max-height:0;overflow-y:auto;-webkit-transition:all 260ms ease-in-out;transition:all 260ms ease-in-out;opacity:0;border:1px solid;border-radius:3px}.autocomplete__results--is-visible{max-height:280px;opacity:1}.autocomplete__result{list-style:none;font-size:1rem;margin:0;padding:.5rem 1rem;cursor:pointer}.autocomplete__result+.autocomplete__result{border-top:1px solid}.autocomplete__result--is-selected,.autocomplete__result:hover{background:#eee}.autocomplete__notice{position:absolute;clip:rect(1px,1px,1px,1px);padding:0;border:0;height:1px;width:1px;overflow:hidden}</style>']),
    _templateObject2 = _taggedTemplateLiteral(['\n  <style>\n    .autocomplete__result {\n      background: #ea8800;\n    }\n    .autocomplete__result:hover {\n      background: #ff9400;\n    }\n\n    .autocomplete__input {\n      background: #ea8800;\n      font-style: inherit;\n      font-family: inherit;\n      width: 100%;\n    }\n\n    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */\n      color: #58422b;\n      text-align: center;\n    }\n    ::-moz-placeholder { /* Firefox 19+ */\n      color: #58422b;\n      text-align: center;\n    }\n    :-ms-input-placeholder { /* IE 10+ */\n      color: #58422b;\n      text-align: center;\n    }\n    :-moz-placeholder { /* Firefox 18- */\n      color: #58422b;\n      text-align: center;\n    }\n  </style>\n'], ['\n  <style>\n    .autocomplete__result {\n      background: #ea8800;\n    }\n    .autocomplete__result:hover {\n      background: #ff9400;\n    }\n\n    .autocomplete__input {\n      background: #ea8800;\n      font-style: inherit;\n      font-family: inherit;\n      width: 100%;\n    }\n\n    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */\n      color: #58422b;\n      text-align: center;\n    }\n    ::-moz-placeholder { /* Firefox 19+ */\n      color: #58422b;\n      text-align: center;\n    }\n    :-ms-input-placeholder { /* IE 10+ */\n      color: #58422b;\n      text-align: center;\n    }\n    :-moz-placeholder { /* Firefox 18- */\n      color: #58422b;\n      text-align: center;\n    }\n  </style>\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <option value="', '">\n      ', '\n    </option>'], ['\n    <option value="', '">\n      ', '\n    </option>']),
    _templateObject4 = _taggedTemplateLiteral(['\n    <div>\n      <label for="ingredients"></label>\n      <select id="ingredients" class="autocomplete">\n        ', '\n      </select>\n    </div>\n  '], ['\n    <div>\n      <label for="ingredients"></label>\n      <select id="ingredients" class="autocomplete">\n        ', '\n      </select>\n    </div>\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['\n    <div style=', '>\n      ', '\n      ', '\n      ', '\n    </div>\n  '], ['\n    <div style=', '>\n      ', '\n      ', '\n      ', '\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html();

var Combobox = require('combobox-node');

var comboboxCSS = html(_templateObject);
var comboboxCustomCSS = html(_templateObject2);

module.exports = function (attrs) {
  var ingredientOptions = attrs.ingredients.map(function (ingredient) {
    return html(_templateObject3, ingredient, ingredient);
  });

  var selectDOM = html(_templateObject4, ingredientOptions);

  // mutates the selectDOM element
  var comboboxDOM = new Combobox(selectDOM.querySelector('.autocomplete'));
  comboboxDOM.input.setAttribute('placeholder', 'Add Ingredients to Search');
  comboboxDOM.selectOption = function (t, e) {
    var s = this;
    console.log(t);
    window.requestAnimationFrame(function () {
      s.clearSelected();
      t.classList.add('autocomplete__result--is-selected');
      s.input.dataset.selected = t.id;
      t.scrollIntoView(!1);
      s.resultsNotice.textContent = t.textContent;
      e && e();
    });
  };

  comboboxDOM.chooseOption = function () {
    console.log('CALLED');
    var t = document.getElementById(this.input.dataset.selected);
    console.log(t);
    this.input.value = t.textContent;
    this.select.value = t.dataset.value;
    this.resultsNotice.textContent = t.textContent + ' selected';
    this.hideResults();
    attrs.onAddIngredient(this.select.value);
  };

  return html(_templateObject5, attrs.style, comboboxCSS, comboboxCustomCSS, comboboxDOM.container);
};

},{"combobox-node":16,"tram-one":10}],9:[function(require,module,exports){
'use strict';

var Tram = require('tram-one');

var app = new Tram();
app.addRoute('/', require('./pages/home'));
app.addRoute('/404', require('./pages/404'));
app.addRoute('/drink/:drinkId', require('./pages/drink'));
app.addRoute('/filter', require('./pages/filter'));
app.addRoute('/about', require('./pages/about'));
app.addActions({ drinkStore: require('./actions/drink-by-id') });
app.addActions({ filterStore: require('./actions/filter-by-ingredients') });
app.addActions({ ingredientsStore: require('./actions/all-ingredients') });
app.addActions({ selectedIngredientsStore: require('./actions/selected-ingredients') });
app.start('.main');

},{"./actions/all-ingredients":1,"./actions/drink-by-id":2,"./actions/filter-by-ingredients":3,"./actions/selected-ingredients":4,"./pages/404":11,"./pages/about":12,"./pages/drink":13,"./pages/filter":14,"./pages/home":15,"tram-one":10}],10:[function(require,module,exports){
(function (global){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e["tram-one"]=t()}(this,function(){"use strict";function e(e,t){return t={exports:{}},e(t,t.exports),t.exports}function t(e,n){if(!(this instanceof t))return new t(e,n);this.data=e,this.nodeValue=e,this.length=e.length,this.ownerDocument=n||null}function n(e,t){if(!(this instanceof n))return new n(e);this.data=e||"",this.length=this.data.length,this.ownerDocument=t||null}function r(e){switch(e.nodeType){case 3:return c(e.data);case 8:return"\x3c!--"+e.data+"--\x3e";default:return o(e)}}function o(e){var t=[],n=e.tagName;return"http://www.w3.org/1999/xhtml"===e.namespaceURI&&(n=n.toLowerCase()),t.push("<"+n+l(e)+u(e)),H.indexOf(n)>-1?t.push(" />"):(t.push(">"),e.childNodes.length?t.push.apply(t,e.childNodes.map(r)):e.textContent||e.innerText?t.push(c(e.textContent||e.innerText)):e.innerHTML&&t.push(e.innerHTML),t.push("</"+n+">")),t.join("")}function i(e,t){var n=I(e[t]);return"style"===t&&Object.keys(e.style).length>0||e.hasOwnProperty(t)&&("string"===n||"boolean"===n||"number"===n)&&"nodeName"!==t&&"className"!==t&&"tagName"!==t&&"textContent"!==t&&"innerText"!==t&&"namespaceURI"!==t&&"innerHTML"!==t}function a(e){if("string"==typeof e)return e;var t="";return Object.keys(e).forEach(function(n){var r=e[n];n=n.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}),t+=n+":"+r+";"}),t}function u(e){var t=e.dataset,n=[];for(var r in t)n.push({name:"data-"+r,value:t[r]});return n.length?s(n):""}function s(e){var t=[];return e.forEach(function(e){var n=e.name,r=e.value;"style"===n&&(r=a(r)),t.push(n+'="'+f(r)+'"')}),t.length?" "+t.join(" "):""}function l(e){var t=[];for(var n in e)i(e,n)&&t.push({name:n,value:e[n]});for(var r in e._attributes)for(var o in e._attributes[r]){var a=e._attributes[r][o],u=(a.prefix?a.prefix+":":"")+o;t.push({name:u,value:a.value})}return e.className&&t.push({name:"class",value:e.className}),t.length?s(t):""}function c(e){var t="";return"string"==typeof e?t=e:e&&(t=e.toString()),t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function f(e){return c(e).replace(/"/g,"&quot;")}function h(e,t,n){if(!(this instanceof h))return new h(e);var r=void 0===n?Q:n||null;this.tagName=r===Q?String(e).toUpperCase():e,this.nodeName=this.tagName,this.className="",this.dataset={},this.childNodes=[],this.parentNode=null,this.style={},this.ownerDocument=t||null,this.namespaceURI=r,this._attributes={},"INPUT"===this.tagName&&(this.type="text")}function p(e){if(!(this instanceof p))return new p;this.childNodes=[],this.parentNode=null,this.ownerDocument=e||null}function d(e){}function m(){if(!(this instanceof m))return new m;this.head=this.createElement("head"),this.body=this.createElement("body"),this.documentElement=this.createElement("html"),this.documentElement.appendChild(this.head),this.documentElement.appendChild(this.body),this.childNodes=[this.documentElement],this.nodeType=9}function v(e,t,n){function r(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var n=e[t];if(Array.isArray(n))r(n);else{if(("number"==typeof n||"boolean"==typeof n||"function"==typeof n||n instanceof Date||n instanceof RegExp)&&(n=n.toString()),"string"==typeof n){if(/^[\n\r\s]+$/.test(n))continue;if(o.lastChild&&"#text"===o.lastChild.nodeName){o.lastChild.nodeValue+=n;continue}n=Y.createTextNode(n)}n&&n.nodeType&&o.appendChild(n)}}}var o;-1!==oe.indexOf(e)&&(t.namespace=ee);var i=!1;if(t.namespace&&(i=t.namespace,delete t.namespace),i)o=Y.createElementNS(i,e);else{if(e===re)return Y.createComment(t.comment);o=Y.createElement(e)}(t.onload||t.onunload)&&(delete t.onload,delete t.onunload);for(var a in t)if(t.hasOwnProperty(a)){var u=a.toLowerCase(),s=t[a];if("classname"===u&&(u="class",a="class"),"htmlFor"===a&&(a="for"),ne[u])if("true"===s)s=u;else if("false"===s)continue;"on"===u.slice(0,2)?o[a]=s:i?"xlink:href"===a?o.setAttributeNS(te,a,s):/^xmlns($|:)/i.test(a)||o.setAttributeNS(null,a,s):o.setAttribute(a,s)}return r(n),o}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var n=t.attributes,r=e.attributes,o=null,i=null,a=null,u=null,s=r.length-1;s>=0;--s)a=(u=r[s]).name,o=u.namespaceURI,i=u.value,o?(a=u.localName||a,t.getAttributeNS(o,a)!==i&&t.setAttributeNS(o,a,i)):t.hasAttribute(a)?t.getAttribute(a)!==i&&("null"===i||"undefined"===i?t.removeAttribute(a):t.setAttribute(a,i)):t.setAttribute(a,i);for(var l=n.length-1;l>=0;--l)!1!==(u=n[l]).specified&&(a=u.name,(o=u.namespaceURI)?(a=u.localName||a,e.hasAttributeNS(o,a)||t.removeAttributeNS(o,a)):e.hasAttributeNS(null,a)||t.removeAttribute(a))}function N(e,t){for(var n=0;n<he;n++){var r=fe[n];e[r]?t[r]=e[r]:t[r]&&(t[r]=void 0)}}function w(e,t){A(e,t,"selected")}function x(e,t){var n=e.value,r=t.value;A(e,t,"checked"),A(e,t,"disabled"),n!==r&&(t.setAttribute("value",n),t.value=n),"null"===n&&(t.value="",t.removeAttribute("value")),e.hasAttributeNS(null,"value")?"range"===t.type&&(t.value=n):t.removeAttribute("value")}function C(e,t){var n=e.value;if(n!==t.value&&(t.value=n),t.firstChild&&t.firstChild.nodeValue!==n){if(""===n&&t.firstChild.nodeValue===t.placeholder)return;t.firstChild.nodeValue=n}}function A(e,t,n){e[n]!==t[n]&&(t[n]=e[n],e[n]?t.setAttribute(n,""):t.removeAttribute(n))}function k(e,t){return t?e?e.isSameNode&&e.isSameNode(t)?t:e.tagName!==t.tagName?e:(ve(e,t),S(e,t),t):null:e}function S(e,t){for(var n,r,o,i,a=0,u=0;n=t.childNodes[u],r=e.childNodes[u-a],n||r;u++)if(r)if(n)if(E(r,n))(o=k(r,n))!==n&&(t.replaceChild(o,n),a++);else{i=null;for(var s=u;s<t.childNodes.length;s++)if(E(t.childNodes[s],r)){i=t.childNodes[s];break}i?((o=k(r,i))!==i&&a++,t.insertBefore(o,n)):r.id||n.id?(t.insertBefore(r,n),a++):(o=k(r,n))!==n&&(t.replaceChild(o,n),a++)}else t.appendChild(r),a++;else t.removeChild(n),u--}function E(e,t){return e.id?e.id===t.id:e.isSameNode?e.isSameNode(t):e.tagName===t.tagName&&(e.type===ye&&e.nodeValue===t.nodeValue)}function T(e){return e===Le||e===_e}function O(e){return De.test(e)}var L="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},_=Array.prototype.slice,j=function(e,t){"length"in e||(e=[e]),e=_.call(e);for(;e.length;){var n=e.shift(),r=t(n);if(r)return r;n.childNodes&&n.childNodes.length&&(e=_.call(n.childNodes).concat(e))}},R=t;t.prototype.nodeType=8,t.prototype.nodeName="#comment",t.prototype.toString=function(){return"[object Comment]"};var M=n;n.prototype.type="DOMTextNode",n.prototype.nodeType=3,n.prototype.nodeName="#text",n.prototype.toString=function(){return this.data},n.prototype.replaceData=function(e,t,n){var r=this.data,o=r.substring(0,e),i=r.substring(e+t,r.length);this.data=o+n+i,this.length=this.data.length};var P=function(e){var t=this,n=e.type;e.target||(e.target=t),t.listeners||(t.listeners={});var r=t.listeners[n];if(r)return r.forEach(function(n){e.currentTarget=t,"function"==typeof n?n(e):n.handleEvent(e)});t.parentNode&&t.parentNode.dispatchEvent(e)},D=function(e,t){var n=this;n.listeners||(n.listeners={}),n.listeners[e]||(n.listeners[e]=[]),-1===n.listeners[e].indexOf(t)&&n.listeners[e].push(t)},B=function(e,t){var n=this;if(n.listeners&&n.listeners[e]){var r=n.listeners[e],o=r.indexOf(t);-1!==o&&r.splice(o,1)}},I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},F=(function(){function e(e){this.value=e}function t(t){function n(o,i){try{var a=t[o](i),u=a.value;u instanceof e?Promise.resolve(u.value).then(function(e){n("next",e)},function(e){n("throw",e)}):r(a.done?"return":"normal",a.value)}catch(e){r("throw",e)}}function r(e,t){switch(e){case"return":o.resolve({value:t,done:!0});break;case"throw":o.reject(t);break;default:o.resolve({value:t,done:!1})}(o=o.next)?n(o.key,o.arg):i=null}var o,i;this._invoke=function(e,t){return new Promise(function(r,a){var u={key:e,arg:t,resolve:r,reject:a,next:null};i?i=i.next=u:(o=i=u,n(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)}}(),function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}),U=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),G=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},V=r,H=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"],Q="http://www.w3.org/1999/xhtml",$=h;h.prototype.type="DOMElement",h.prototype.nodeType=1,h.prototype.appendChild=function(e){return e.parentNode&&e.parentNode.removeChild(e),this.childNodes.push(e),e.parentNode=this,e},h.prototype.replaceChild=function(e,t){e.parentNode&&e.parentNode.removeChild(e);var n=this.childNodes.indexOf(t);return t.parentNode=null,this.childNodes[n]=e,e.parentNode=this,t},h.prototype.removeChild=function(e){var t=this.childNodes.indexOf(e);return this.childNodes.splice(t,1),e.parentNode=null,e},h.prototype.insertBefore=function(e,t){e.parentNode&&e.parentNode.removeChild(e);var n=null===t||void 0===t?-1:this.childNodes.indexOf(t);return n>-1?this.childNodes.splice(n,0,e):this.childNodes.push(e),e.parentNode=this,e},h.prototype.setAttributeNS=function(e,t,n){var r=null,o=t,i=t.indexOf(":");i>-1&&(r=t.substr(0,i),o=t.substr(i+1)),"INPUT"===this.tagName&&"type"===t?this.type=n:(this._attributes[e]||(this._attributes[e]={}))[o]={value:n,prefix:r}},h.prototype.getAttributeNS=function(e,t){var n=this._attributes[e],r=n&&n[t]&&n[t].value;return"INPUT"===this.tagName&&"type"===t?this.type:"string"!=typeof r?null:r},h.prototype.removeAttributeNS=function(e,t){var n=this._attributes[e];n&&delete n[t]},h.prototype.hasAttributeNS=function(e,t){var n=this._attributes[e];return!!n&&t in n},h.prototype.setAttribute=function(e,t){return this.setAttributeNS(null,e,t)},h.prototype.getAttribute=function(e){return this.getAttributeNS(null,e)},h.prototype.removeAttribute=function(e){return this.removeAttributeNS(null,e)},h.prototype.hasAttribute=function(e){return this.hasAttributeNS(null,e)},h.prototype.removeEventListener=B,h.prototype.addEventListener=D,h.prototype.dispatchEvent=P,h.prototype.focus=function(){},h.prototype.toString=function(){return V(this)},h.prototype.getElementsByClassName=function(e){var t=e.split(" "),n=[];return j(this,function(e){if(1===e.nodeType){var r=(e.className||"").split(" ");t.every(function(e){return-1!==r.indexOf(e)})&&n.push(e)}}),n},h.prototype.getElementsByTagName=function(e){e=e.toLowerCase();var t=[];return j(this.childNodes,function(n){1!==n.nodeType||"*"!==e&&n.tagName.toLowerCase()!==e||t.push(n)}),t},h.prototype.contains=function(e){return j(this,function(t){return e===t})||!1};var q=p;p.prototype.type="DocumentFragment",p.prototype.nodeType=11,p.prototype.nodeName="#document-fragment",p.prototype.appendChild=$.prototype.appendChild,p.prototype.replaceChild=$.prototype.replaceChild,p.prototype.removeChild=$.prototype.removeChild,p.prototype.toString=function(){return this.childNodes.map(function(e){return String(e)}).join("")};var K=d;d.prototype.initEvent=function(e,t,n){this.type=e,this.bubbles=t,this.cancelable=n},d.prototype.preventDefault=function(){};var z=m,Z=m.prototype;Z.createTextNode=function(e){return new M(e,this)},Z.createElementNS=function(e,t){var n=null===e?null:String(e);return new $(t,this,n)},Z.createElement=function(e){return new $(e,this)},Z.createDocumentFragment=function(){return new q(this)},Z.createEvent=function(e){return new K(e)},Z.createComment=function(e){return new R(e,this)},Z.getElementById=function(e){return e=String(e),j(this.childNodes,function(t){if(String(t.id)===e)return t})||null},Z.getElementsByClassName=$.prototype.getElementsByClassName,Z.getElementsByTagName=$.prototype.getElementsByTagName,Z.contains=$.prototype.contains,Z.removeEventListener=B,Z.addEventListener=D,Z.dispatchEvent=P;var X,J=new z,W=void 0!==L?L:"undefined"!=typeof window?window:{};"undefined"!=typeof document?X=document:(X=W["__GLOBAL_DOCUMENT_CACHE@4"])||(X=W["__GLOBAL_DOCUMENT_CACHE@4"]=J);var Y=X,ee="http://www.w3.org/2000/svg",te="http://www.w3.org/1999/xlink",ne={autofocus:1,checked:1,defaultchecked:1,disabled:1,formnovalidate:1,indeterminate:1,readonly:1,required:1,selected:1,willvalidate:1},re="!--",oe=["svg","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"],ie=v,ae=v;ie.createElement=ae;var ue=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),se=function(e){return Object.keys(e).map(function(t){return e[t]})},le=function(e,t){return e.concat(t)},ce=function(){function e(){g(this,e),this.engine={},this.store={},this.actionQueue=[],this.listeners=[],this.actions={}}return ue(e,[{key:"addActions",value:function(e){var t=this,n=function(e,t){var n=t.name in e?e[t.name].concat(t):[t];return G({},e,y({},t.name,n))};this.engine=Object.keys(e).map(function(e){return function(t){return se(e[t]).map(function(e){return e._storeKey=t,e})}}(e)).reduce(function(e,t){return se(t).reduce(n,e)},this.engine),this.store=Object.keys(e).map(function(t){return Object({key:t,init:e[t].init})}).reduce(function(e,t){return G({},e,y({},t.key,t.init()))},this.store);var r=function(e,n){var r=0===t.actionQueue.length;for(t.actionQueue.push({actions:t.engine[e],args:n});r&&t.actionQueue.length>0;){var o=t.actionQueue[0],i=function(e){return function(n,r){return G({},n,y({},r._storeKey,r(n[r._storeKey],e.args,t.actions)))}}(o);t.store=(o.actions||[]).reduce(i,t.store),t.actionQueue.shift(),t.notifyListeners()}};return this.actions=se(e).map(function(e){return Object.keys(e)}).reduce(le,[]).reduce(function(e,t){return G({},e,y({},t,function(e){return r(t,e)}))},this.actions),this}},{key:"addListener",value:function(e){return this.listeners.push(e),this}},{key:"notifyListeners",value:function(){var e=this;return this.listeners.forEach(function(t){return t(e.store,e.actions)}),this}}]),e}(),fe=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onmouseenter","onmouseleave","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ondragstart","ondrag","ondragenter","ondragleave","ondragover","ondrop","ondragend","onkeydown","onkeypress","onkeyup","onunload","onabort","onerror","onresize","onscroll","onselect","onchange","onsubmit","onreset","onfocus","onblur","oninput","oncontextmenu","onfocusin","onfocusout"],he=fe.length,pe=1,de=3,me=8,ve=function(e,t){var n=e.nodeType,r=e.nodeName;n===pe&&b(e,t),n!==de&&n!==me||t.nodeValue!==e.nodeValue&&(t.nodeValue=e.nodeValue),"INPUT"===r?x(e,t):"OPTION"===r?w(e,t):"TEXTAREA"===r&&C(e,t),N(e,t)},ye=3,ge=function(e,t){return k(t,e)},be=e(function(e){!function(t,n){var r=t&&t.define;r&&r.amd?r("rlite",[],n):e.exports?e.exports=n():t.Rlite=n()}(L,function(){return function(e,t){function n(e){return e}function r(e){return~e.indexOf("/?")&&(e=e.replace("/?","?")),"/"==e[0]&&(e=e.slice(1)),"/"==e[e.length-1]&&(e=e.slice(0,-1)),e}function o(e,t,n,r,a){if(r){if(n>=e.length){var u=r["@"];return u&&{cb:u,params:a.reduce(function(e,t){return e[t[0]]=t[1],e},{})}}var s=t(e[n]),l=a.length;return o(e,t,n+1,r[s.toLowerCase()],a)||i(e,t,n+1,r,":",s,a,l)||i(e,t,e.length,r,"*",e.slice(n).join("/"),a,l)}}function i(e,t,n,r,i,a,u,s){u.length=s;var l=r[i];return l&&u.push([l["~"],a]),o(e,t,n,l,u)}function a(e,t,n){if(e&&t.cb)for(var r=e.indexOf("#"),o=(r<0?e:e.slice(0,r)).split("&"),i=0;i<o.length;++i){var a=o[i].split("=");t.params[a[0]]=n(a[1])}return t}function u(e){var t=r(e).split("?"),i=~e.indexOf("%")?c:n;return a(t[1],o(t[0].split("/"),i,0,l,[])||{},i)}function s(e,t){for(var n=e.split("/"),r=l,o=+("/"===e[0]);o<n.length;++o){var i=n[o],a=":"==i[0]?":":"*"==i[0]?"*":i.toLowerCase();r=r[a]||(r[a]={}),(":"==a||"*"==a)&&(r["~"]=i.slice(1))}r["@"]=t}var l={},c=decodeURIComponent;return function(){for(var e in t)s(e,t[e])}(),function(t,n){var r=u(t);return(r.cb||e)(r.params,n,t)}}})}),Ne=function(e){return function(t,n,r){for(var o in n)o in we&&(n[we[o]]=n[o],delete n[o]);return e(t,n,r)}},we={class:"className",for:"htmlFor","http-equiv":"httpEquiv"},xe=1,Ce=2,Ae=3,ke=4,Se=5,Ee=6,Te=7,Oe=8,Le=9,_e=10,je=11,Re=12,Me=13,Pe=function(e,t){function n(e){return"function"==typeof e?e:"string"==typeof e?e:e&&"object"===(void 0===e?"undefined":I(e))?e:r("",e)}t||(t={});var r=t.concat||function(e,t){return String(e)+String(t)};return!1!==t.attrToProp&&(e=Ne(e)),function(o){function i(e){var n=[];a===Te&&(a=ke);for(var r=0;r<e.length;r++){var o=e.charAt(r);a===xe&&"<"===o?(u.length&&n.push([xe,u]),u="",a=Ce):">"!==o||T(a)||a===Me?a===Me&&/-$/.test(u)&&"-"===o?(t.comments&&n.push([Oe,u.substr(0,u.length-1)],[Ae]),u="",a=xe):a===Ce&&/^!--$/.test(u)?(t.comments&&n.push([Ce,u],[Se,"comment"],[je]),u=o,a=Me):a===xe||a===Me?u+=o:a===Ce&&/\s/.test(o)?(n.push([Ce,u]),u="",a=ke):a===Ce?u+=o:a===ke&&/[^\s"'=/]/.test(o)?(a=Se,u=o):a===ke&&/\s/.test(o)?(u.length&&n.push([Se,u]),n.push([Re])):a===Se&&/\s/.test(o)?(n.push([Se,u]),u="",a=Ee):a===Se&&"="===o?(n.push([Se,u],[je]),u="",a=Te):a===Se?u+=o:a!==Ee&&a!==ke||"="!==o?a!==Ee&&a!==ke||/\s/.test(o)?a===Te&&'"'===o?a=_e:a===Te&&"'"===o?a=Le:a===_e&&'"'===o?(n.push([Oe,u],[Re]),u="",a=ke):a===Le&&"'"===o?(n.push([Oe,u],[Re]),u="",a=ke):a!==Te||/\s/.test(o)?a===Oe&&/\s/.test(o)?(n.push([Oe,u],[Re]),u="",a=ke):a!==Oe&&a!==Le&&a!==_e||(u+=o):(a=Oe,r--):(n.push([Re]),/[\w-]/.test(o)?(u+=o,a=Se):a=ke):(n.push([je]),a=Te):(a===Ce?n.push([Ce,u]):a===Se?n.push([Se,u]):a===Oe&&u.length&&n.push([Oe,u]),n.push([Ae]),u="",a=xe)}return a===xe&&u.length?(n.push([xe,u]),u=""):a===Oe&&u.length?(n.push([Oe,u]),u=""):a===_e&&u.length?(n.push([Oe,u]),u=""):a===Le&&u.length?(n.push([Oe,u]),u=""):a===Se&&(n.push([Se,u]),u=""),n}for(var a=xe,u="",s=arguments.length,l=[],c=0;c<o.length;c++)if(c<s-1){var f=arguments[c+1],h=i(o[c]),p=a;p===_e&&(p=Oe),p===Le&&(p=Oe),p===Te&&(p=Oe),p===ke&&(p=Se),h.push([0,p,f]),l.push.apply(l,h)}else l.push.apply(l,i(o[c]));for(var d=[null,{},[]],m=[[d,-1]],c=0;c<l.length;c++){var v=m[m.length-1][0],y=(h=l[c])[0];if(y===Ce&&/^\//.test(h[1])){x=m[m.length-1][1];m.length>1&&(m.pop(),m[m.length-1][0][2][x]=e(v[0],v[1],v[2].length?v[2]:void 0))}else if(y===Ce){var g=[h[1],{},[]];v[2].push(g),m.push([g,v[2].length-1])}else if(y===Se||0===y&&h[1]===Se){for(var b,N="";c<l.length;c++)if(l[c][0]===Se)N=r(N,l[c][1]);else{if(0!==l[c][0]||l[c][1]!==Se)break;if("object"!==I(l[c][2])||N)N=r(N,l[c][2]);else for(b in l[c][2])l[c][2].hasOwnProperty(b)&&!v[1][b]&&(v[1][b]=l[c][2][b])}l[c][0]===je&&c++;for(var w=c;c<l.length;c++)if(l[c][0]===Oe||l[c][0]===Se)v[1][N]?v[1][N]=r(v[1][N],l[c][1]):v[1][N]=n(l[c][1]);else{if(0!==l[c][0]||l[c][1]!==Oe&&l[c][1]!==Se){!N.length||v[1][N]||c!==w||l[c][0]!==Ae&&l[c][0]!==Re||(v[1][N]=N.toLowerCase());break}v[1][N]?v[1][N]=r(v[1][N],l[c][2]):v[1][N]=n(l[c][2])}}else if(y===Se)v[1][h[1]]=!0;else if(0===y&&h[1]===Se)v[1][h[2]]=!0;else if(y===Ae){if(O(v[0])&&m.length){var x=m[m.length-1][1];m.pop(),m[m.length-1][0][2][x]=e(v[0],v[1],v[2].length?v[2]:void 0)}}else if(0===y&&h[1]===xe)void 0===h[2]||null===h[2]?h[2]="":h[2]||(h[2]=r("",h[2])),Array.isArray(h[2][0])?v[2].push.apply(v[2],h[2]):v[2].push(h[2]);else if(y===xe)v[2].push(h[1]);else if(y!==je&&y!==Re)throw new Error("unhandled: "+y)}if(d[2].length>1&&/^\s*$/.test(d[2][0])&&d[2].shift(),d[2].length>2||2===d[2].length&&/\S/.test(d[2][1]))throw new Error("multiple root elements must be wrapped in an enclosing tag");return Array.isArray(d[2][0])&&"string"==typeof d[2][0][0]&&Array.isArray(d[2][0][2])&&(d[2][0]=e(d[2][0][0],d[2][0][1],d[2][0][2])),d[2][0]}},De=RegExp("^("+["area","base","basefont","bgsound","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr","!--","animate","animateTransform","circle","cursor","desc","ellipse","feBlend","feColorMatrix","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","font-face-format","font-face-name","font-face-uri","glyph","glyphRef","hkern","image","line","missing-glyph","mpath","path","polygon","polyline","rect","set","stop","tref","use","view","vkern"].join("|")+")(?:[.#][a-zA-Z0-9-￿_:-]+)*$"),Be=function(e,t){var n=function(n,r,o){var i=t[n];return i?i(r,o):e(n,r,o)},r=Pe(n);return r.h=n,r},Ie=e(function(e,t){!function(t,n){e.exports=n()}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){e.exports=function(e){window.addEventListener("hashchange",e,!1),window.addEventListener("popstate",e,!1);var t=window.history.pushState;window.history.pushState=function(n){for(var r=arguments.length,o=Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];var a=t.apply(history,[n].concat(o));return e({state:n}),a}}}])})});return function(){function e(t){F(this,e),t=t||{},this.defaultRoute=t.defaultRoute||"/404",this.router=be(),this.internalRouter={},this.engine=new ce}return U(e,[{key:"addActions",value:function(e){return this.engine.addActions(e),this}},{key:"addRoute",value:function(e,t){return this.internalRouter[e]=function(e){return function(n,r){return t(n,r,e)}},this.router=be(this.internalRouter[this.defaultRoute],this.internalRouter),this}},{key:"start",value:function(e,t){var n=this;return this.engine.addListener(function(r,o){n.mount(e,t,r,o)}),Ie(function(){n.mount(e,t)}),this.mount(e,t),this}},{key:"mount",value:function(e,t,n,r){var o="string"==typeof e?document.querySelector(e):e;if(null===o&&console.warn("Tram-One: could not find target, is the element on the page yet?"),!o.firstElementChild){var i=document.createElement("div");o.appendChild(i)}var a=o.firstElementChild,u=t||window.location.href.replace(window.location.origin,"");return ge(a,this.toNode(u,n,r)),this}},{key:"toNode",value:function(e,t,n){return this.router(e)(t||this.engine.store,n||this.engine.actions)}},{key:"toString",value:function(e,t){return"undefined"!=typeof window?this.toNode(e,t).outerHTML:this.toNode(e,t).toString()}}],[{key:"html",value:function(e){return Be(ie,e||{})}}]),e}()});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <div>\n      <header></header>\n      <div style=', '>\n        <h1>404</h1>\n        <img src="/404.gif" />\n      </div>\n    </div>\n  '], ['\n    <div>\n      <header></header>\n      <div style=', '>\n        <h1>404</h1>\n        <img src="/404.gif" />\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html({
  header: require('../elements/header')
});

var pageStyle = '\n  margin: 1em;\n  text-align: center;\n';

module.exports = function () {
  return html(_templateObject, pageStyle);
};

},{"../elements/header":7,"tram-one":10}],12:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <div>\n      <header></header>\n      <div style=', '>\n        <div style=', '>\n          Cocktail Curator created by\n          <a style=', ' href="https://github.com/chtinahow/">Tina Howard</a> and\n          <a style=', ' href="http://jrjurman.com/">Jesse Jurman</a>\n        </div>\n        <div style=', '>\n          Project Code on\n          <a style=', ' href="https://github.com/chtinahow/cocktail-curator">\n            github.com/chtinahow/cocktail-curator\n          </a>\n        </div>\n        <div style=', '>\n          <a style=', ' href="http://www.thecocktaildb.com/">\n            Powered by TheCocktailDB.com\n          </a>\n        </div>\n        <div style=', '>\n          <a style=', ' href="http://tram-one.io/">\n            Built using Tram-One\n          </a>\n        </div>\n        <div style=', '>\n          <a style=', ' href="https://www.emojione.com/">\n            Icon from Emojione\n          </a>\n        </div>\n      </div>\n    </div>\n  '], ['\n    <div>\n      <header></header>\n      <div style=', '>\n        <div style=', '>\n          Cocktail Curator created by\n          <a style=', ' href="https://github.com/chtinahow/">Tina Howard</a> and\n          <a style=', ' href="http://jrjurman.com/">Jesse Jurman</a>\n        </div>\n        <div style=', '>\n          Project Code on\n          <a style=', ' href="https://github.com/chtinahow/cocktail-curator">\n            github.com/chtinahow/cocktail-curator\n          </a>\n        </div>\n        <div style=', '>\n          <a style=', ' href="http://www.thecocktaildb.com/">\n            Powered by TheCocktailDB.com\n          </a>\n        </div>\n        <div style=', '>\n          <a style=', ' href="http://tram-one.io/">\n            Built using Tram-One\n          </a>\n        </div>\n        <div style=', '>\n          <a style=', ' href="https://www.emojione.com/">\n            Icon from Emojione\n          </a>\n        </div>\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html({
  header: require('../elements/header')
});

var pageStyle = '\n  margin: 1em;\n  text-align: center;\n';

var divStyle = '\n  font-size: 1.5em;\n  padding: 0.25em;\n';

var link = '\n  white-space: nowrap;\n  border-bottom: solid 1px black;\n';

module.exports = function () {
  return html(_templateObject, pageStyle, divStyle, link, link, divStyle, link, divStyle, link, divStyle, link, divStyle, link);
};

},{"../elements/header":7,"tram-one":10}],13:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n        <drink\n          image=', '\n          name=', '\n          ingredients=', '\n          instructions=', '>\n        </drink>\n      '], ['\n        <drink\n          image=', '\n          name=', '\n          ingredients=', '\n          instructions=', '>\n        </drink>\n      ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n      <header></header>\n      <div style=', '>\n        ', '\n      </div>\n    </div>\n  '], ['\n    <div>\n      <header></header>\n      <div style=', '>\n        ', '\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html({
  header: require('../elements/header'),
  drink: require('../elements/drink')
});

var bodyStyle = '\n  padding: 0.8rem;\n';

var getOrFetchDrinkDOM = function getOrFetchDrinkDOM(store, actions, params) {
  switch (store.drinkStore.status) {
    case 'NOT_LOADED':
      actions.fetchDrinkById(params.drinkId);
      return 'fetching...';
    case 'LOADING':
      return 'loading...';
    case 'LOADED':
      if (store.drinkStore.drink.id !== params.drinkId) {
        actions.fetchDrinkById(params.drinkId);
        return 'fetching...';
      }
      return html(_templateObject, store.drinkStore.drink.image, store.drinkStore.drink.name, store.drinkStore.drink.ingredients, store.drinkStore.drink.instructions);
    default:
      return 'Error...';
  }
};

module.exports = function (store, actions, params) {
  var drinkDOM = getOrFetchDrinkDOM(store, actions, params);
  return html(_templateObject2, bodyStyle, drinkDOM);
};

},{"../elements/drink":6,"../elements/header":7,"tram-one":10}],14:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n          <drink-preview\n            id=', '\n            image=', '\n            name=', '\n            ingredients=', '\n          >\n          </drink-preview>\n        '], ['\n          <drink-preview\n            id=', '\n            image=', '\n            name=', '\n            ingredients=', '\n          >\n          </drink-preview>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n      <header></header>\n      <div style=', '>\n        ', '\n      </div>\n    </div>\n  '], ['\n    <div>\n      <header></header>\n      <div style=', '>\n        ', '\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html({
  header: require('../elements/header'),
  'drink-preview': require('../elements/drink-preview')
});

var bodyStyle = '\n  padding: 0.8rem;\n  margin: auto;\n';

var getOrFetchDrinkDOM = function getOrFetchDrinkDOM(store, actions, params) {
  switch (store.filterStore.status) {
    case 'NOT_LOADED':
      actions.fetchDrinksByIngredients(params.ingredients);
      return 'fetching...';
    case 'LOADING':
      return 'loading...';
    case 'LOADED':
      if (store.filterStore.ingredients !== params.ingredients) {
        actions.fetchDrinksByIngredients(params.ingredients);
        return 'fetching...';
      }
      return store.filterStore.drinks.map(function (drink) {
        return html(_templateObject, drink.id, drink.image, drink.name, drink.ingredients);
      });
    default:
      return 'Error ...';
  }
};

module.exports = function (store, actions, params) {
  var drinkDOM = getOrFetchDrinkDOM(store, actions, params);
  return html(_templateObject2, bodyStyle, drinkDOM);
};

},{"../elements/drink-preview":5,"../elements/header":7,"tram-one":10}],15:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n        <select-ingredients\n          style=', '\n          ingredients=', '\n          onAddIngredient=', '>\n        </select-ingredients>\n      '], ['\n        <select-ingredients\n          style=', '\n          ingredients=', '\n          onAddIngredient=', '>\n        </select-ingredients>\n      ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      <span onclick=', ' style=', '>\n        ', ' <span style=\'color:rgba(0,0,0,0.30)\'> \u2717 </span>\n      </span>\n    '], ['\n      <span onclick=', ' style=', '>\n        ', ' <span style=\'color:rgba(0,0,0,0.30)\'> \u2717 </span>\n      </span>\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <div>\n      <header></header>\n      <div style=', '>\n        ', '\n        <div style=', '>\n          ', '\n        </div>\n        <button style=', ' onclick=', '>\n          Search\n        </button>\n      </div>\n    </div>\n  '], ['\n    <div>\n      <header></header>\n      <div style=', '>\n        ', '\n        <div style=', '>\n          ', '\n        </div>\n        <button style=', ' onclick=', '>\n          Search\n        </button>\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html({
  header: require('../elements/header'),
  'select-ingredients': require('../elements/select-ingredients')
});

var buttonStyle = '\n  grid-area: button;\n  border: 1px solid #271604;\n  border-radius: .5rem;\n  font-size: 1em;\n  padding: 0.25em 0.75em;\n  cursor: pointer;\n  margin: 0.75rem;\n  font-family: inherit;\n  background: #e78900;\n';

var disabledButtonStyle = '\n  ' + buttonStyle + '\n  color: #58422b;\n  border: 1px solid #58422b;\n  cursor: default;\n';

var comboStyle = '\n  grid-area: combobox;\n';

var selectedIngredientsStyle = '\n  grid-area: selected-ingredients\n';
var ingredientStyle = '\n  border: 1px solid #271604;\n  margin: 1rem;\n  border-radius: .5rem;\n  padding: 0.25em 0.75em;\n  cursor: pointer;\n  margin: 0.25em;\n  display: inline-block;\n';

var gridStyle = '\n  display: grid;\n  margin: auto;\n  max-width: 80%;\n  grid-template-columns: 1fr;\n  grid-template-rows: auto auto auto;\n  grid-row-gap: 1em;\n  grid-template-areas:\n    "combobox"\n    "selected-ingredients"\n    "button";\n';

var getOrFetchAllIngredients = function getOrFetchAllIngredients(store, actions) {
  var addIngredient = function addIngredient(ingredient) {
    actions.addIngredient(ingredient);
  };
  switch (store.ingredientsStore.status) {
    case 'NOT_LOADED':
      actions.fetchAllIngredients();
      return 'fetching...';
    case 'LOADING':
      return 'loading...';
    case 'LOADED':
      return html(_templateObject, comboStyle, store.ingredientsStore.ingredients, addIngredient);
    default:
      return 'Error...';
  }
};

module.exports = function (store, actions) {
  var searchIngredients = getOrFetchAllIngredients(store, actions);
  var selectedIngredients = store.selectedIngredientsStore;
  var ingredientsDOM = selectedIngredients.map(function (ingredient) {
    var removeIngredient = function removeIngredient() {
      return actions.removeIngredient(ingredient);
    };
    return html(_templateObject2, removeIngredient, ingredientStyle, ingredient);
  });

  var onClickIngredients = function onClickIngredients() {
    window.history.pushState({}, '', '/filter?ingredients=' + selectedIngredients + '&limit=30');
  };

  var seachButtonStyle = selectedIngredients.length === 0 ? disabledButtonStyle : buttonStyle;
  var searchButtonAction = selectedIngredients.length === 0 ? function () {} : onClickIngredients;

  return html(_templateObject3, gridStyle, searchIngredients, selectedIngredientsStyle, ingredientsDOM, seachButtonStyle, searchButtonAction);
};

},{"../elements/header":7,"../elements/select-ingredients":8,"tram-one":10}],16:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,s,i){return s&&t(e.prototype,s),i&&t(e,i),e}}(),CLASSES={BASE:"autocomplete",CONTAINER:"autocomplete-container",INPUT:"autocomplete__input",LABEL:"autocomplete__label",RESULTS:{BASE:"autocomplete__results",VISIBLE:"autocomplete__results--is-visible"},RESULT:{BASE:"autocomplete__result",SELECTED:"autocomplete__result--is-selected"},NOTICE:"autocomplete__notice",SELECT_RESULT:"autocomplete__select-result",LIST:"autocomplete__list"},KEY_CODES={ENTER:13,ESC:27,UP:38,DOWN:40},Autocomplete=function(){function t(e){var s=this;_classCallCheck(this,t),this.select=e,this.select.style.display="none",this.container=this.select.parentElement,this.container.classList.add(CLASSES.CONTAINER),this.container.style.position="relative",this.label=this.container.querySelector("label");var i=[].slice.call(e.querySelectorAll("option")),n=this.select.id+"-autocomplete";this.isVisible=!1,this.options=i.map(function(t,e){return{label:t.textContent,value:t.value,id:s.select.id+"-autocomplete-result-"+e}}),this.outputInput(n),this.outputResultsList(n),this.outputResultsNotice(n),window.requestAnimationFrame(function(){s.container.appendChild(s.input),s.container.appendChild(s.resultsList)}),this.input.addEventListener("input",function(t){var e=t.target.value.toLowerCase();s.filterResults(e)}),this.input.addEventListener("focus",function(){s.results?s.showResults():(s.updateResults(s.options),s.outputResults())}),this.input.addEventListener("blur",function(){s.hideResults()}),document.body.addEventListener("click",function(t){s.container.contains(t.target)||s.hideResults()}),document.addEventListener("keydown",function(t){s.keydownEvent(t)})}return _createClass(t,[{key:"clearSelected",value:function(){var t=this.resultsList.querySelector("."+CLASSES.RESULT.SELECTED);t&&t.classList.remove(CLASSES.RESULT.SELECTED)}},{key:"selectPreviousOption",value:function(){var t=this.resultsList.querySelector("."+CLASSES.RESULT.SELECTED);t&&(t===this.resultsList.firstChild?this.selectOption(this.resultsList.lastChild):this.selectOption(t.previousSibling))}},{key:"selectNextOption",value:function(){var t=this.resultsList.querySelector("."+CLASSES.RESULT.SELECTED);t?t===this.resultsList.lastChild?this.selectOption(this.resultsList.firstChild):this.selectOption(t.nextSibling):this.selectOption(this.resultsList.firstChild)}},{key:"selectOption",value:function(t,e){var s=this;window.requestAnimationFrame(function(){s.clearSelected(),t.classList.add(CLASSES.RESULT.SELECTED),s.input.dataset.selected=t.id,t.scrollIntoView(!1),s.resultsNotice.textContent=t.textContent,e&&e()})}},{key:"chooseOption",value:function(){var t=document.getElementById(this.input.dataset.selected);this.input.value=t.textContent,this.select.value=t.dataset.value,this.resultsNotice.textContent=t.textContent+" selected",this.hideResults()}},{key:"clearResults",value:function(){var t=this;window.requestAnimationFrame(function(){for(;t.resultsList.hasChildNodes();)t.resultsList.removeChild(t.resultsList.lastChild)})}},{key:"filterResults",value:function(t){var e=this.options.filter(function(e){return e.value.toLowerCase().indexOf(t)!=-1||e.label.toLowerCase().indexOf(t)!=-1});this.updateResults(e),this.outputResults()}},{key:"hideResults",value:function(){var t=this;this.isVisible=!1,window.requestAnimationFrame(function(){t.resultsList.classList.remove(CLASSES.RESULTS.VISIBLE),t.input.setAttribute("aria-expanded","false")})}},{key:"updateResults",value:function(t){this.clearResults(),this.results=t}},{key:"outputResults",value:function(){var t=this;if(this.results.length>0)this.results.forEach(function(e){var s=document.createElement("li");s.setAttribute("id",e.id),s.classList.add(CLASSES.RESULT.BASE),s.textContent=e.label,s.dataset.value=e.value,s.setAttribute("role","option"),s.addEventListener("click",function(e){t.selectOption(e.target,function(){return t.chooseOption()})}),window.requestAnimationFrame(function(){t.resultsList.appendChild(s)})});else{var e=document.createElement("li");e.classList.add(CLASSES.RESULT.BASE),e.textContent="No results found",window.requestAnimationFrame(function(){t.resultsList.appendChild(e)})}this.showResults()}},{key:"showResults",value:function(){var t=this;this.isVisible=!0,window.requestAnimationFrame(function(){t.resultsList.classList.add(CLASSES.RESULTS.VISIBLE),t.input.setAttribute("aria-expanded","true"),0===t.results.length?t.resultsNotice.textContent="No results found":1===t.results.length?t.resultsNotice.textContent="1 result":t.resultsNotice.textContent=t.results.length+" results"})}},{key:"outputInput",value:function(t){var e=this;this.input=document.createElement("input"),this.input.type="text",this.input.setAttribute("role","combobox"),this.input.setAttribute("aria-label","Search and select an option for "+this.label.textContent),this.input.setAttribute("aria-expanded","false"),this.input.setAttribute("aria-autocomplete","list"),this.input.setAttribute("aria-owns",t),this.input.classList.add(CLASSES.INPUT),window.requestAnimationFrame(function(){e.container.appendChild(e.input)})}},{key:"outputResultsList",value:function(t){var e=this;this.resultsList=document.createElement("ul"),this.resultsList.classList.add(CLASSES.RESULTS.BASE),this.resultsList.setAttribute("id",t),this.resultsList.setAttribute("role","listbox"),window.requestAnimationFrame(function(){e.container.appendChild(e.resultsList)})}},{key:"outputResultsNotice",value:function(){var t=this;this.resultsNotice=document.createElement("div"),this.resultsNotice.classList.add(CLASSES.NOTICE),this.resultsNotice.setAttribute("role","status"),this.resultsNotice.setAttribute("aria-live","polite"),window.requestAnimationFrame(function(){t.container.appendChild(t.resultsNotice)})}},{key:"keydownEvent",value:function(t){if(this.container.contains(t.target))switch(t.keyCode){case KEY_CODES.ENTER:this.chooseOption();break;case KEY_CODES.ESC:this.hideResults(),this.input.blur();break;case KEY_CODES.DOWN:this.isVisible?this.selectNextOption():this.showResults(),t.preventDefault();break;case KEY_CODES.UP:t.preventDefault(),this.selectPreviousOption()}}}]),t}();module.exports=Autocomplete;
},{}]},{},[9]);
