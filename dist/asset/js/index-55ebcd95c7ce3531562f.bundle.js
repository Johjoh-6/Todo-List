/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* eslint-env browser */

/*
  eslint-disable
  no-console,
  func-names
*/
var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");

var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;

function debounce(fn, time) {
  var timeout = 0;
  return function () {
    var self = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}

function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src = document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }

    srcByModuleId[moduleId] = src;
  }

  return function (fileMap) {
    if (!src) {
      return null;
    }

    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];

    if (!filename) {
      return [src.replace(".js", ".css")];
    }

    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }

    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    } // eslint-disable-next-line


    url = el.href.split("?")[0];
  }

  if (!isUrlRequest(url)) {
    return;
  }

  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  } // eslint-disable-next-line no-param-reassign


  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());

  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

function getReloadUrl(href, src) {
  var ret; // eslint-disable-next-line no-param-reassign

  href = normalizeUrl(href, {
    stripWWW: false
  }); // eslint-disable-next-line array-callback-return

  src.some(function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

function reloadStyle(src) {
  if (!src) {
    return false;
  }

  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }

    var url = getReloadUrl(el.href, src);

    if (!isUrlRequest(url)) {
      return;
    }

    if (el.visited === true) {
      return;
    }

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }

    updateCss(el);
  });
}

function isUrlRequest(url) {
  // An URL is not an request if
  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }

  return true;
}

module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }

  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);

    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }

    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }

  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/* eslint-disable */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;

      case ".":
        break;

      default:
        accumulator.push(item);
    }

    return accumulator;
  }, []).join("/");
}

module.exports = function (urlString) {
  urlString = urlString.trim();

  if (/^data:/i.test(urlString)) {
    return urlString;
  }

  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./src/asset/css/style.scss":
/*!**********************************!*\
  !*** ./src/asset/css/style.scss ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1641303373514
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);

    this.client = new WebSocket(url);

    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }
  /**
   * @param {(...args: any[]) => void} f
   */


  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }
    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    } // call f with the message string as the first argument

    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);

  return WebSocketClient;
}();



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=4000&pathname=%2Fws&logging=info&reconnect=10":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=4000&pathname=%2Fws&logging=info&reconnect=10 ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=4000&pathname=%2Fws&logging=info&reconnect=10";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/strip-ansi/index.js */ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js");
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />









/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | { warnings?: boolean, errors?: boolean }} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @type {Status}
 */

var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};
/** @type {Options} */

var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}
/**
 * @param {string} level
 */


function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },

  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,

  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
  },

  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }

    options.reconnect = value;
  },

  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },

  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'

  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");

    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
          header = _formatProblem.header,
          body = _formatProblem.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);

    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }

    var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlayForWarnings) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("warning", _warnings);
    }

    if (params && params.preventReloading) {
      return;
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },

  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");

    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
          header = _formatProblem2.header,
          body = _formatProblem2.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);

    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }

    var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlayForErrors) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("error", _errors);
    }
  },

  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {


/**
 * Client stub for tapable SyncBailHook
 */

module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var LogType = Object.freeze({
  error:
  /** @type {"error"} */
  "error",
  // message, c style arguments
  warn:
  /** @type {"warn"} */
  "warn",
  // message, c style arguments
  info:
  /** @type {"info"} */
  "info",
  // message, c style arguments
  log:
  /** @type {"log"} */
  "log",
  // message, c style arguments
  debug:
  /** @type {"debug"} */
  "debug",
  // message, c style arguments
  trace:
  /** @type {"trace"} */
  "trace",
  // no arguments
  group:
  /** @type {"group"} */
  "group",
  // [label]
  groupCollapsed:
  /** @type {"groupCollapsed"} */
  "groupCollapsed",
  // [label]
  groupEnd:
  /** @type {"groupEnd"} */
  "groupEnd",
  // [label]
  profile:
  /** @type {"profile"} */
  "profile",
  // [profileName]
  profileEnd:
  /** @type {"profileEnd"} */
  "profileEnd",
  // [profileName]
  time:
  /** @type {"time"} */
  "time",
  // name, time as [seconds, nanoseconds]
  clear:
  /** @type {"clear"} */
  "clear",
  // no arguments
  status:
  /** @type {"status"} */
  "status" // message, arguments

});
exports.LogType = LogType;
/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);

    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }

  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }

      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);

      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }

      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);

  return WebpackLogger;
}();

exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10785__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var _require = __nested_webpack_require_10785__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    LogType = _require.LogType;
/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */


var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace( // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }

  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }

  if (typeof item === "function") {
    return item;
  }

  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};
/**
 * @enum {number}
 */


var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};
/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */

module.exports = function (_ref) {
  var _ref$level = _ref.level,
      level = _ref$level === void 0 ? "info" : _ref$level,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] :
  /** @type {FilterItemTypes[]} */
  [].concat(debug).map(filterToFunction);
  /** @type {number} */

  var loglevel = LogLevel["".concat(level)] || 0;
  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */

  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };

    var debug = debugFilters.some(function (f) {
      return f(name);
    });

    switch (type) {
      case LogType.debug:
        if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;

      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;

        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;
        }

      // falls through

      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }

        break;

      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");

          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }

          break;
        }

      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }

        break;

      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;

        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }

        break;

      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };

  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20872__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SyncBailHook = __nested_webpack_require_20872__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");

var _require = __nested_webpack_require_20872__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    Logger = _require.Logger;

var createConsoleLogger = __nested_webpack_require_20872__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
/** @type {createConsoleLogger.LoggerOptions} */


var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */

exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};
/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */


exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);

  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};

exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_22988__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22988__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_22988__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_22988__.o(definition, key) && !__nested_webpack_require_22988__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_22988__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_22988__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_22988__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_22988__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22988__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_368__) {

__nested_webpack_require_368__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_368__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripAnsi; }
/* harmony export */ });
/* harmony import */ var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_368__(/*! ansi-regex */ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js");

function stripAnsi(string) {
  if (typeof string !== 'string') {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }

  return string.replace((0,ansi_regex__WEBPACK_IMPORTED_MODULE_0__["default"])(), '');
}

/***/ }),

/***/ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/strip-ansi/node_modules/ansi-regex/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_1387__) {

__nested_webpack_require_1387__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_1387__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ansiRegex; }
/* harmony export */ });
function ansiRegex() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$onlyFirst = _ref.onlyFirst,
      onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;

  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_2352__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2352__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_2352__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_2352__.o(definition, key) && !__nested_webpack_require_2352__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_2352__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_2352__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************!*\
  !*** ./client-src/modules/strip-ansi/index.js ***!
  \************************************************/
__nested_webpack_require_2352__.r(__webpack_exports__);
/* harmony import */ var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2352__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

/* harmony default export */ __webpack_exports__["default"] = (strip_ansi__WEBPACK_IMPORTED_MODULE_0__["default"]);
}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatProblem": () => (/* binding */ formatProblem),
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "hide": () => (/* binding */ hide)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).


var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
/** @type {HTMLIFrameElement | null | undefined} */

var iframeContainerElement;
/** @type {HTMLDivElement | null | undefined} */

var containerElement;
/** @type {Array<(element: HTMLDivElement) => void>} */

var onLoadQueue = [];
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

function createContainer() {
  iframeContainerElement = document.createElement("iframe");
  iframeContainerElement.id = "webpack-dev-server-client-overlay";
  iframeContainerElement.src = "about:blank";
  iframeContainerElement.style.position = "fixed";
  iframeContainerElement.style.left = 0;
  iframeContainerElement.style.top = 0;
  iframeContainerElement.style.right = 0;
  iframeContainerElement.style.bottom = 0;
  iframeContainerElement.style.width = "100vw";
  iframeContainerElement.style.height = "100vh";
  iframeContainerElement.style.border = "none";
  iframeContainerElement.style.zIndex = 9999999999;

  iframeContainerElement.onload = function () {
    containerElement =
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.createElement("div");
    containerElement.id = "webpack-dev-server-client-overlay-div";
    containerElement.style.position = "fixed";
    containerElement.style.boxSizing = "border-box";
    containerElement.style.left = 0;
    containerElement.style.top = 0;
    containerElement.style.right = 0;
    containerElement.style.bottom = 0;
    containerElement.style.width = "100vw";
    containerElement.style.height = "100vh";
    containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    containerElement.style.color = "#E8E8E8";
    containerElement.style.fontFamily = "Menlo, Consolas, monospace";
    containerElement.style.fontSize = "large";
    containerElement.style.padding = "2rem";
    containerElement.style.lineHeight = "1.2";
    containerElement.style.whiteSpace = "pre-wrap";
    containerElement.style.overflow = "auto";
    var headerElement = document.createElement("span");
    headerElement.innerText = "Compiled with problems:";
    var closeButtonElement = document.createElement("button");
    closeButtonElement.innerText = "X";
    closeButtonElement.style.background = "transparent";
    closeButtonElement.style.border = "none";
    closeButtonElement.style.fontSize = "20px";
    closeButtonElement.style.fontWeight = "bold";
    closeButtonElement.style.color = "white";
    closeButtonElement.style.cursor = "pointer";
    closeButtonElement.style.cssFloat = "right"; // @ts-ignore

    closeButtonElement.style.styleFloat = "right";
    closeButtonElement.addEventListener("click", function () {
      hide();
    });
    containerElement.appendChild(headerElement);
    containerElement.appendChild(closeButtonElement);
    containerElement.appendChild(document.createElement("br"));
    containerElement.appendChild(document.createElement("br"));
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.body.appendChild(containerElement);
    onLoadQueue.forEach(function (onLoad) {
      onLoad(
      /** @type {HTMLDivElement} */
      containerElement);
    });
    onLoadQueue = [];
    /** @type {HTMLIFrameElement} */

    iframeContainerElement.onload = null;
  };

  document.body.appendChild(iframeContainerElement);
}
/**
 * @param {(element: HTMLDivElement) => void} callback
 */


function ensureOverlayExists(callback) {
  if (containerElement) {
    // Everything is ready, call the callback right away.
    callback(containerElement);
    return;
  }

  onLoadQueue.push(callback);

  if (iframeContainerElement) {
    return;
  }

  createContainer();
} // Successful compilation.


function hide() {
  if (!iframeContainerElement) {
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(iframeContainerElement);
  iframeContainerElement = null;
  containerElement = null;
}
/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string }} item
 * @returns {{ header: string, body: string }}
 */


function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";

  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || ""; // eslint-disable-next-line no-nested-ternary

    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }

  return {
    header: header,
    body: body
  };
} // Compilation with errors (e.g. syntax error or missing modules).

/**
 * @param {string} type
 * @param {Array<string  | { file?: string, moduleName?: string, loc?: string, message?: string }>} messages
 */


function show(type, messages) {
  ensureOverlayExists(function () {
    messages.forEach(function (message) {
      var entryElement = document.createElement("div");
      var typeElement = document.createElement("span");

      var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;

      typeElement.innerText = header;
      typeElement.style.color = "#".concat(colors.red); // Make it look similar to our terminal.

      var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(body));
      var messageTextNode = document.createElement("div");
      messageTextNode.innerHTML = text;
      entryElement.appendChild(typeElement);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(messageTextNode);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      /** @type {HTMLDivElement} */

      containerElement.appendChild(entryElement);
    });
  });
}



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */

 // this WebsocketClient is here as a default fallback, in case the client is not injected

/* eslint-disable camelcase */

var Client = // eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;
var client = null;
/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */

var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;

    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);

    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";

  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }

  var auth = objURL.auth || "";

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }

  var host = "";

  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));

    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }

  var pathname = objURL.pathname || "";

  if (objURL.slashes) {
    host = "//".concat(host || "");

    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }

  var search = objURL.search || "";

  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }

  var hash = objURL.hash || "";

  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }

  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}
/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */


function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname; // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'

  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]"; // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384

  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }

  var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.

  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }

  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = ""; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them

  if (parsedURL.username) {
    socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.

    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  } // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided


  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;

  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  } // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.


  var socketURLPathname = "/ws";

  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }

  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  } // Fallback to getting all scripts running in the document.


  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });

  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  } // Fail as there was no script to use.


  throw new Error("[webpack-dev-server] Failed to get current script source.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "setLogLevel": () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server"; // default level is set on the client side, so it does not need
// to be set by the CLI or API

var defaultLevel = "info"; // options new options, merge with old options

/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */

function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}

setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */

function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};

  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.substr(1).split("&");

    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;

    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {// URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }

    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }

  return options;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");


/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */

function reloadApp(_ref, status) {
  var hot = _ref.hot,
      liveReload = _ref.liveReload;

  if (status.isUnloading) {
    return;
  }

  var currentHash = status.currentHash,
      previousHash = status.previousHash;
  var isInitial = currentHash.indexOf(
  /** @type {string} */
  previousHash) >= 0;

  if (isInitial) {
    return;
  }
  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */


  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }

  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */
// Send messages to the outside, so plugins can consume it.

/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	var lastHash;
	var upToDate = function upToDate() {
		return lastHash.indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log("warning", "[HMR] Cannot find update. Need to do a full reload!");
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					window.location.reload();
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. Need to do a full reload!"
					);
					log("warning", "[HMR] " + log.formatError(err));
					window.location.reload();
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./src/asset/js/index.js":
/*!*******************************!*\
  !*** ./src/asset/js/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./src/asset/css/style.scss");

function component() {
    const element = document.createElement('div');
  element.setAttribute('id', 'try');
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'Hello webpack';
  
    return element;
  }
  
  document.body.appendChild(component());

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("index." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("bc1c5c899c50f3a8c533")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "todo-list:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatetodo_list"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=4000&pathname=%2Fws&logging=info&reconnect=10");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/asset/js/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQvanMvaW5kZXgtNTVlYmNkOTVjN2NlMzUzMTU2MmYuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBWTs7QUFFWjs7QUFFQTtBQUNBLG1EQUFtRCxJQUFJLFNBQVMsTUFBTSxJQUFJOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsR0FBRztB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QUE2QiwyQkFBMkIsNkJBQTZCLHlCQUF5QiwyQkFBMkIsMkJBQTJCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLHVCQUF1Qiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIsNkJBQTZCLHlCQUF5Qiw2QkFBNkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qix5QkFBeUIsdUJBQXVCLHFCQUFxQixxQkFBcUIsY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGFBQWEsZUFBZSxhQUFhLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsWUFBWSxjQUFjLGFBQWEsY0FBYyxlQUFlLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixXQUFXLFlBQVksY0FBYyxZQUFZLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsWUFBWSxjQUFjLGFBQWEsY0FBYyxlQUFlLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixXQUFXLFlBQVksZUFBZSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsaUJBQWlCLGNBQWMsWUFBWSxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsYUFBYSxjQUFjLGdCQUFnQixhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsY0FBYyxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsZUFBZSxhQUFhLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxXQUFXLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsWUFBWSxZQUFZLFdBQVcsWUFBWSxZQUFZLFlBQVksZUFBZSxZQUFZLGFBQWEsY0FBYyxXQUFXLGNBQWMsV0FBVyxXQUFXLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxjQUFjLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLFlBQVksZUFBZSxjQUFjLGVBQWUsY0FBYyxNQUFNLGFBQWEsV0FBVyxhQUFhLGNBQWMsYUFBYSxjQUFjLGVBQWUsWUFBWSxlQUFlLGFBQWEsWUFBWSxhQUFhLGFBQWEsY0FBYyxZQUFZLFlBQVksWUFBWSxhQUFhLFlBQVksZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGFBQWEsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxlQUFlLGNBQWMsYUFBYSxZQUFZLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsZUFBZSxjQUFjLGFBQWEsWUFBWSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGNBQWMsYUFBYSxhQUFhLFlBQVksV0FBVyxXQUFXLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGVBQWUsYUFBYSxZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVks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Y0FBYyxjQUFjLGFBQWEsYUFBYSxZQUFZLGVBQWUsZUFBZSxZQUFZLGFBQWEsa0JBQWtCLGNBQWMsb0JBQW9CLGVBQWUsZUFBZSxjQUFjLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxlQUFlLGVBQWUsYUFBYSxpQkFBaUIsY0FBYyxlQUFlLGNBQWMsWUFBWSxlQUFlLGFBQWEsZUFBZSxjQUFjLGFBQWEsbUJBQW1CLGFBQWEseUJBQXlCLGFBQWEsY0FBYyxjQUFjLGNBQWMsbUJBQW1CLGNBQWMsYUFBYSxjQUFjLGFBQWEsaUJBQWlCLGdCQUFnQixnQkFBZ0IsY0FBYyxnQkFBZ0IsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGFBQWEsWUFBWSxjQUFjLGVBQWUsYUFBYSxhQUFhLGFBQWEsYUFBYSwwQkFBMEIsZUFBZSxlQUFlLGFBQWEsY0FBYyxjQUFjLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGFBQWEsV0FBVyxjQUFjLGNBQWMsYUFBYSxhQUFhLGFBQWEsZUFBZSxjQUFjLFlBQVksYUFBYSxjQUFjLGNBQWMsYUFBYSxhQUFhLGVBQWUsZUFBZSxZQUFZLGFBQWEsYUFBYSxlQUFlLGlCQUFpQixjQUFjLGVBQWUsZUFBZSxlQUFlLGFBQWEsWUFBWSxjQUFjLFlBQVksY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxpQkFBaUIsYUFBYSxjQUFjLGFBQWEsc0JBQXNCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsY0FBYyxnQkFBZ0IsaUJBQWlCLGVBQWUsZ0JBQWdCLGNBQWMsY0FBYyxZQUFZLGVBQWUsaUJBQWlCLGFBQWEsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGlCQUFpQixpQkFBaUIsWUFBWSxlQUFlLGdCQUFnQixhQUFhLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGlCQUFpQixhQUFhLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGVBQWUsWUFBWSxlQUFlLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsY0FBYyxlQUFlLGVBQWUsY0FBYyxjQUFjLGdCQUFnQixhQUFhLGdCQUFnQixhQUFhLGFBQWEsYUFBYSxrQkFBa0IsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLGNBQWMsY0FBYyxXQUFXLGFBQWEsYUFBYSxjQUFjLGlCQUFpQixlQUFlLGdCQUFnQixpQkFBaUIsY0FBYyxjQUFjLGVBQWUsbUJBQW1CLGdCQUFnQixjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixnQkFBZ0Isb0JBQW9CLG9CQUFvQix1QkFBdUIsZ0JBQWdCLFlBQVksaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyx3QkFBd0IsZ0JBQWdCLGNBQWMsY0FBYyxlQUFlLGNBQWMsZUFBZSxhQUFhLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxZQUFZLHVCQUF1QixjQUFjLFlBQVksY0FBYyxnQkFBZ0IsZUFBZSxhQUFhLGNBQWMsZUFBZSxjQUFjLGVBQWUsZUFBZSxhQUFhLGlCQUFpQixlQUFlLGFBQWEsY0FBYyxhQUFhLGVBQWUsZUFBZSxjQUFjLGlCQUFpQixlQUFlLGNBQWMsYUFBYSxhQUFhLGVBQWUsY0FBYyxxQkFBcUIsZ0JBQWdCLGFBQWEsaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxnQkFBZ0IsWUFBWSxhQUFhLHNCQUFzQixhQUFhLFdBQVcsZUFBZSxtQkFBbUIsZUFBZSxXQUFXLGlCQUFpQixZQUFZLG9CQUFvQixlQUFlLGNBQWMsbUJBQW1CLGVBQWUsZUFBZSxhQUFhLFlBQVksYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsZ0JBQWdCLG1CQUFtQixlQUFlLGdCQUFnQixnQkFBZ0IsaUJBQWlCLHFCQUFxQixjQUFjLGFBQWEsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLFlBQVksZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsa0JBQWtCLGNBQWMsaUJBQWlCLGFBQWEsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLG1CQUFtQixlQUFlLGNBQWMsa0JBQWtCLGVBQWUsY0FBYyxZQUFZLGFBQWEsY0FBYyxlQUFlLGdCQUFnQixpQkFBaUIsY0FBYyxlQUFlLGFBQWEsY0FBYyxhQUFhLFlBQVksWUFBWSxZQUFZLGNBQWMsaUJBQWlCLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxlQUFlLGVBQWUsZ0JBQWdCLGVBQWUsY0FBYyxlQUFlLGdCQUFnQiw0QkFBNEIsZUFBZSxjQUFjLGtCQUFrQixhQUFhLGVBQWUsYUFBYSxlQUFlLGVBQWUsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLFlBQVksYUFBYSxjQUFjLGFBQWEsZUFBZSxhQUFhLGFBQWEsZUFBZSxjQUFjLGNBQWMsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGNBQWMsaUJBQWlCLGlCQUFpQixpQkFBaUIsY0FBYyxhQUFhLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGdCQUFnQixjQUFjLGVBQWUsZUFBZSxjQUFjLGFBQWEsY0FBYyxZQUFZLGFBQWEsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGNBQWMsaUJBQWlCLGVBQWUsWUFBWSxhQUFhLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLGNBQWMsbUJBQW1CLGFBQWEsZUFBZSxpQkFBaUIsZUFBZSxjQUFjLG1CQUFtQixjQUFjLGdCQUFnQixlQUFlLHNCQUFzQixlQUFlLGdCQUFnQixzQkFBc0IsWUFBWSxlQUFlLGFBQWEsZUFBZSxjQUFjLGNBQWMsSUFBSSxTQUFTLGFBQWEsY0FBYyxnQkFBZ0IsZ0JBQWdCLGVBQWUsZUFBZSxZQUFZLGFBQWEsZ0JBQWdCLGlCQUFpQixhQUFhLFlBQVksY0FBYyxlQUFlLGNBQWMsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsZUFBZSxjQUFjLGVBQWUsYUFBYSxZQUFZLGVBQWUsY0FBYyxhQUFhLGVBQWUsY0FBYyxlQUFlLG1CQUFtQixjQUFjLGlCQUFpQixhQUFhLGNBQWMsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsZUFBZSxnQkFBZ0IsZUFBZSxnQkFBZ0IsYUFBYSxlQUFlLGVBQWUsWUFBWSxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGVBQWUsZ0JBQWdCLGVBQWUscUJBQXFCLGlCQUFpQixnQkFBZ0IsY0FBYyxjQUFjLGNBQWMsYUFBYSxnQkFBZ0IsZUFBZSxlQUFlLFlBQVksY0FBYyxhQUFhLFlBQVksY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLGFBQWEsZUFBZSxjQUFjLGNBQWMsV0FBVyxjQUFjLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLGVBQWUsY0FBYyxnQkFBZ0IsYUFBYSxlQUFlLGVBQWUsa0JBQWtCLGFBQWEsWUFBWSxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSx3QkFBd0IsY0FBYyxZQUFZLGFBQWEsYUFBYSxlQUFlLG1CQUFtQixhQUFhLGNBQWMsWUFBWSxnQkFBZ0Isa0JBQWtCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZUFBZSxnQkFBZ0Isb0JBQW9CLGdCQUFnQixnQkFBZ0IsY0FBYyxhQUFhLG9CQUFvQixhQUFhLG9CQUFvQixlQUFlLFdBQVcsWUFBWSxlQUFlLGNBQWMsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLGNBQWMsZ0JBQWdCLGVBQWUsY0FBYyxjQUFjLGlCQUFpQixlQUFlLGlCQUFpQixlQUFlLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxZQUFZLGVBQWUsYUFBYSxlQUFlLGNBQWMsY0FBYyxhQUFhLGFBQWEsZUFBZSxZQUFZLGNBQWMsY0FBYyxnQkFBZ0IsWUFBWSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsY0FBYyxhQUFhLGNBQWMsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLGVBQWUsYUFBYSxnQkFBZ0IsWUFBWSxlQUFlLGFBQWEsZUFBZSxpQkFBaUIsYUFBYSxjQUFjLGFBQWEsZUFBZSxjQUFjLFlBQVksZUFBZSxlQUFlLGVBQWUsZ0JBQWdCLGFBQWEsWUFBWSxlQUFlLGNBQWMsV0FBVyxjQUFjLGdCQUFnQixhQUFhLGlCQUFpQixnQkFBZ0IsZUFBZSxjQUFjLGdCQUFnQixnQkFBZ0IsaUJBQWlCLGNBQWMsY0FBYyxZQUFZLG1CQUFtQixjQUFjLGFBQWEsZUFBZSxjQUFjLGlCQUFpQixpQkFBaUIsaUJBQWlCLGVBQWUsY0FBYyxZQUFZLGVBQWUsYUFBYSxjQUFjLGVBQWUsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGlCQUFpQixjQUFjLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixjQUFjLGVBQWUsZUFBZSxnQkFBZ0IsdUJBQXVCLHdCQUF3QixlQUFlLGNBQWMsY0FBYyxJQUFJLFNBQVMsYUFBYSxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLFlBQVksYUFBYSxnQkFBZ0IsYUFBYSxhQUFhLGVBQWUsYUFBYSxlQUFlLFlBQVksZUFBZSxjQUFjLGVBQWUsYUFBYSxZQUFZLG1CQUFtQixjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxnQkFBZ0IsYUFBYSxlQUFlLGlCQUFpQixlQUFlLGNBQWMsZUFBZSxzQkFBc0IsaUJBQWlCLGdCQUFnQixXQUFXLGVBQWUsWUFBWSxtQkFBbUIsZUFBZSxlQUFlLGNBQWMsaUJBQWlCLG9CQUFvQixpQkFBaUIsaUJBQWlCLFlBQVksYUFBYSxjQUFjLGNBQWMsYUFBYSxJQUFJLFNBQVMsYUFBYSxhQUFhLGFBQWEsY0FBYyxlQUFlLGFBQWEsWUFBWSxjQUFjLGlCQUFpQixlQUFlLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsZ0JBQWdCLGVBQWUsaUJBQWlCLGVBQWUsWUFBWSxhQUFhLGVBQWUsZUFBZSxZQUFZLGFBQWEsZUFBZSxjQUFjLGtCQUFrQixnQkFBZ0IsZ0JBQWdCLGNBQWMsYUFBYSxlQUFlLGtCQUFrQixlQUFlLGdCQUFnQixnQkFBZ0IsbUJBQW1CLGtCQUFrQixnQkFBZ0IsZ0JBQWdCLGVBQWUsZUFBZSxlQUFlLGFBQWEsYUFBYSxhQUFhLGFBQWEsa0JBQWtCLGVBQWUsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsbUJBQW1CLGtCQUFrQixnQkFBZ0IsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsZUFBZSxZQUFZLGVBQWUsZUFBZSxZQUFZLGVBQWUsYUFBYSxjQUFjLGlCQUFpQixjQUFjLGNBQWMsaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGNBQWMsZ0JBQWdCLGVBQWUsYUFBYSxhQUFhLGVBQWUsaUJBQWlCLGdCQUFnQixjQUFjLGdCQUFnQixpQkFBaUIsY0FBYyxhQUFhLGNBQWMsZUFBZSxhQUFhLGVBQWUsY0FBYyxlQUFlLGNBQWMsWUFBWSxlQUFlLGVBQWUsYUFBYSxlQUFlLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxnQkFBZ0IsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFB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QUFFQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsYUFBYTtBQUN2RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkVBQTZFLGVBQWU7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxtR0FBbUcsZUFBZTtBQUNsSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkVBQTZFLGVBQWU7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0ZBQWdGLGlCQUFpQjtBQUNqRztBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFF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O1dBQ0E7O1dBRUE7V0FDQSxtQkFBbUIsd0NBQXdDO1dBQzNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTTtXQUNOO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxRQUFRO1dBQ1IsUUFBUTtXQUNSO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFNBQVM7V0FDVDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxPQUFPO1dBQ1A7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFFBQVE7V0FDUjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRSxJQUFJO1dBQ047V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0Esc0NBQXNDO1dBQ3RDO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7O1dBRUE7O1dBRUE7Ozs7O1VFNWZBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9hbnNpLWh0bWwtY29tbXVuaXR5L2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbmFtZWQtcmVmZXJlbmNlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbnVtZXJpYy11bmljb2RlLW1hcC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvc3Vycm9nYXRlLXBhaXJzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvbm9ybWFsaXplLXVybC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXQvY3NzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvc29ja2V0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2NyZWF0ZVNvY2tldFVSTC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2xvZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9wYXJzZVVSTC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9yZWxvYWRBcHAuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvc2VuZE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy1hcHBseS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXQvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgdXBkYXRlIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2V0IG1pbmktY3NzIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2V0IHVwZGF0ZSBtYW5pZmVzdCBmaWxlbmFtZSIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9ob3QgbW9kdWxlIHJlcGxhY2VtZW50Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NzcyBsb2FkaW5nIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKyltL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XG4gICAgdmFyIG90ID0gX29wZW5UYWdzW3NlcV1cbiAgICBpZiAob3QpIHtcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cbiAgICAgIGlmICghIX5hbnNpQ29kZXMuaW5kZXhPZihzZXEpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0cmEtYm9vbGVhbi1jYXN0XG4gICAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXG4gICAgICB9XG4gICAgICAvLyBPcGVuIHRhZy5cbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcbiAgICAgIHJldHVybiBvdFswXSA9PT0gJzwnID8gb3QgOiAnPHNwYW4gc3R5bGU9XCInICsgb3QgKyAnO1wiPidcbiAgICB9XG5cbiAgICB2YXIgY3QgPSBfY2xvc2VUYWdzW3NlcV1cbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICByZXR1cm4gY3RcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH0pXG5cbiAgLy8gTWFrZSBzdXJlIHRhZ3MgYXJlIGNsb3NlZC5cbiAgdmFyIGwgPSBhbnNpQ29kZXMubGVuZ3RoXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcblxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bjb2xvcnNgIHBhcmFtZXRlciBtdXN0IGJlIGFuIE9iamVjdC4nKVxuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XG4gICAgdmFyIGhleCA9IGNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gY29sb3JzW2tleV0gOiBudWxsXG4gICAgaWYgKCFoZXgpIHtcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaGV4ID0gW2hleF1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZXgpIHx8IGhleC5sZW5ndGggPT09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBoICE9PSAnc3RyaW5nJ1xuICAgICAgfSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIEFycmF5IGFuZCBlYWNoIGl0ZW0gY291bGQgb25seSBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgICB9XG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGlmICghaGV4WzBdKSB7XG4gICAgICAgIGhleFswXSA9IGRlZkhleENvbG9yWzBdXG4gICAgICB9XG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMSB8fCAhaGV4WzFdKSB7XG4gICAgICAgIGhleCA9IFtoZXhbMF1dXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgIH1cbiAgICBfZmluYWxDb2xvcnNba2V5XSA9IGhleFxuICB9XG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcbn1cblxuLyoqXG4gKiBSZXNldCBjb2xvcnMuXG4gKi9cbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICBfc2V0VGFncyhfZGVmQ29sb3JzKVxufVxuXG4vKipcbiAqIEV4cG9zZSB0YWdzLCBpbmNsdWRpbmcgb3BlbiBhbmQgY2xvc2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5hbnNpSFRNTC50YWdzID0ge31cblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ29wZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxuICB9KVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ2Nsb3NlJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XG4gIH0pXG59IGVsc2Uge1xuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcbiAgYW5zaUhUTUwudGFncy5jbG9zZSA9IF9jbG9zZVRhZ3Ncbn1cblxuZnVuY3Rpb24gX3NldFRhZ3MgKGNvbG9ycykge1xuICAvLyByZXNldCBhbGxcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxuICAvLyBpbnZlcnNlXG4gIF9vcGVuVGFnc1snNyddID0gJ2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzFdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzBdXG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXlcblxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcbiAgICB2YXIgY29sb3IgPSBfc3R5bGVzW2NvZGVdXG4gICAgdmFyIG9yaUNvbG9yID0gY29sb3JzW2NvbG9yXSB8fCAnMDAwJ1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXG4gICAgY29kZSA9IHBhcnNlSW50KGNvZGUpXG4gICAgX29wZW5UYWdzWyhjb2RlICsgMTApLnRvU3RyaW5nKCldID0gJ2JhY2tncm91bmQ6IycgKyBvcmlDb2xvclxuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KClcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbmFtZWRfcmVmZXJlbmNlc18xID0gcmVxdWlyZShcIi4vbmFtZWQtcmVmZXJlbmNlc1wiKTtcbnZhciBudW1lcmljX3VuaWNvZGVfbWFwXzEgPSByZXF1aXJlKFwiLi9udW1lcmljLXVuaWNvZGUtbWFwXCIpO1xudmFyIHN1cnJvZ2F0ZV9wYWlyc18xID0gcmVxdWlyZShcIi4vc3Vycm9nYXRlLXBhaXJzXCIpO1xudmFyIGFsbE5hbWVkUmVmZXJlbmNlcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBuYW1lZF9yZWZlcmVuY2VzXzEubmFtZWRSZWZlcmVuY2VzKSwgeyBhbGw6IG5hbWVkX3JlZmVyZW5jZXNfMS5uYW1lZFJlZmVyZW5jZXMuaHRtbDUgfSk7XG52YXIgZW5jb2RlUmVnRXhwcyA9IHtcbiAgICBzcGVjaWFsQ2hhcnM6IC9bPD4nXCImXS9nLFxuICAgIG5vbkFzY2lpOiAvKD86Wzw+J1wiJlxcdTAwODAtXFx1RDdGRlxcdUUwMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXSkvZyxcbiAgICBub25Bc2NpaVByaW50YWJsZTogLyg/Ols8PidcIiZcXHgwMS1cXHgwOFxceDExLVxceDE1XFx4MTctXFx4MUZcXHg3Zi1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKS9nLFxuICAgIGV4dGVuc2l2ZTogLyg/OltcXHgwMS1cXHgwY1xceDBlLVxceDFmXFx4MjEtXFx4MmNcXHgyZS1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHg3ZFxceDdmLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pL2dcbn07XG52YXIgZGVmYXVsdEVuY29kZU9wdGlvbnMgPSB7XG4gICAgbW9kZTogJ3NwZWNpYWxDaGFycycsXG4gICAgbGV2ZWw6ICdhbGwnLFxuICAgIG51bWVyaWM6ICdkZWNpbWFsJ1xufTtcbi8qKiBFbmNvZGVzIGFsbCB0aGUgbmVjZXNzYXJ5IChzcGVjaWZpZWQgYnkgYGxldmVsYCkgY2hhcmFjdGVycyBpbiB0aGUgdGV4dCAqL1xuZnVuY3Rpb24gZW5jb2RlKHRleHQsIF9hKSB7XG4gICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IGRlZmF1bHRFbmNvZGVPcHRpb25zIDogX2EsIF9jID0gX2IubW9kZSwgbW9kZSA9IF9jID09PSB2b2lkIDAgPyAnc3BlY2lhbENoYXJzJyA6IF9jLCBfZCA9IF9iLm51bWVyaWMsIG51bWVyaWMgPSBfZCA9PT0gdm9pZCAwID8gJ2RlY2ltYWwnIDogX2QsIF9lID0gX2IubGV2ZWwsIGxldmVsID0gX2UgPT09IHZvaWQgMCA/ICdhbGwnIDogX2U7XG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIGVuY29kZVJlZ0V4cCA9IGVuY29kZVJlZ0V4cHNbbW9kZV07XG4gICAgdmFyIHJlZmVyZW5jZXMgPSBhbGxOYW1lZFJlZmVyZW5jZXNbbGV2ZWxdLmNoYXJhY3RlcnM7XG4gICAgdmFyIGlzSGV4ID0gbnVtZXJpYyA9PT0gJ2hleGFkZWNpbWFsJztcbiAgICBlbmNvZGVSZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgX2IgPSBlbmNvZGVSZWdFeHAuZXhlYyh0ZXh0KTtcbiAgICB2YXIgX2M7XG4gICAgaWYgKF9iKSB7XG4gICAgICAgIF9jID0gJyc7XG4gICAgICAgIHZhciBfZCA9IDA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChfZCAhPT0gX2IuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBfYyArPSB0ZXh0LnN1YnN0cmluZyhfZCwgX2IuaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9lID0gX2JbMF07XG4gICAgICAgICAgICB2YXIgcmVzdWx0XzEgPSByZWZlcmVuY2VzW19lXTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0XzEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZV8xID0gX2UubGVuZ3RoID4gMSA/IHN1cnJvZ2F0ZV9wYWlyc18xLmdldENvZGVQb2ludChfZSwgMCkgOiBfZS5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICAgIHJlc3VsdF8xID0gKGlzSGV4ID8gJyYjeCcgKyBjb2RlXzEudG9TdHJpbmcoMTYpIDogJyYjJyArIGNvZGVfMSkgKyAnOyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfYyArPSByZXN1bHRfMTtcbiAgICAgICAgICAgIF9kID0gX2IuaW5kZXggKyBfZS5sZW5ndGg7XG4gICAgICAgIH0gd2hpbGUgKChfYiA9IGVuY29kZVJlZ0V4cC5leGVjKHRleHQpKSk7XG4gICAgICAgIGlmIChfZCAhPT0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIF9jICs9IHRleHQuc3Vic3RyaW5nKF9kKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2MgPVxuICAgICAgICAgICAgdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIF9jO1xufVxuZXhwb3J0cy5lbmNvZGUgPSBlbmNvZGU7XG52YXIgZGVmYXVsdERlY29kZU9wdGlvbnMgPSB7XG4gICAgc2NvcGU6ICdib2R5JyxcbiAgICBsZXZlbDogJ2FsbCdcbn07XG52YXIgc3RyaWN0ID0gLyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOy9nO1xudmFyIGF0dHJpYnV0ZSA9IC8mKD86I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKVs7PV0/L2c7XG52YXIgYmFzZURlY29kZVJlZ0V4cHMgPSB7XG4gICAgeG1sOiB7XG4gICAgICAgIHN0cmljdDogc3RyaWN0LFxuICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSxcbiAgICAgICAgYm9keTogbmFtZWRfcmVmZXJlbmNlc18xLmJvZHlSZWdFeHBzLnhtbFxuICAgIH0sXG4gICAgaHRtbDQ6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMuaHRtbDRcbiAgICB9LFxuICAgIGh0bWw1OiB7XG4gICAgICAgIHN0cmljdDogc3RyaWN0LFxuICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSxcbiAgICAgICAgYm9keTogbmFtZWRfcmVmZXJlbmNlc18xLmJvZHlSZWdFeHBzLmh0bWw1XG4gICAgfVxufTtcbnZhciBkZWNvZGVSZWdFeHBzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGJhc2VEZWNvZGVSZWdFeHBzKSwgeyBhbGw6IGJhc2VEZWNvZGVSZWdFeHBzLmh0bWw1IH0pO1xudmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIgb3V0T2ZCb3VuZHNDaGFyID0gZnJvbUNoYXJDb2RlKDY1NTMzKTtcbnZhciBkZWZhdWx0RGVjb2RlRW50aXR5T3B0aW9ucyA9IHtcbiAgICBsZXZlbDogJ2FsbCdcbn07XG4vKiogRGVjb2RlcyBhIHNpbmdsZSBlbnRpdHkgKi9cbmZ1bmN0aW9uIGRlY29kZUVudGl0eShlbnRpdHksIF9hKSB7XG4gICAgdmFyIF9iID0gKF9hID09PSB2b2lkIDAgPyBkZWZhdWx0RGVjb2RlRW50aXR5T3B0aW9ucyA6IF9hKS5sZXZlbCwgbGV2ZWwgPSBfYiA9PT0gdm9pZCAwID8gJ2FsbCcgOiBfYjtcbiAgICBpZiAoIWVudGl0eSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBfYiA9IGVudGl0eTtcbiAgICB2YXIgZGVjb2RlRW50aXR5TGFzdENoYXJfMSA9IGVudGl0eVtlbnRpdHkubGVuZ3RoIC0gMV07XG4gICAgaWYgKGZhbHNlXG4gICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzEgPT09ICc9Jykge1xuICAgICAgICBfYiA9XG4gICAgICAgICAgICBlbnRpdHk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZhbHNlXG4gICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzEgIT09ICc7Jykge1xuICAgICAgICBfYiA9XG4gICAgICAgICAgICBlbnRpdHk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMSA9IGFsbE5hbWVkUmVmZXJlbmNlc1tsZXZlbF0uZW50aXRpZXNbZW50aXR5XTtcbiAgICAgICAgaWYgKGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzEpIHtcbiAgICAgICAgICAgIF9iID0gZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbnRpdHlbMF0gPT09ICcmJyAmJiBlbnRpdHlbMV0gPT09ICcjJykge1xuICAgICAgICAgICAgdmFyIGRlY29kZVNlY29uZENoYXJfMSA9IGVudGl0eVsyXTtcbiAgICAgICAgICAgIHZhciBkZWNvZGVDb2RlXzEgPSBkZWNvZGVTZWNvbmRDaGFyXzEgPT0gJ3gnIHx8IGRlY29kZVNlY29uZENoYXJfMSA9PSAnWCdcbiAgICAgICAgICAgICAgICA/IHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMyksIDE2KVxuICAgICAgICAgICAgICAgIDogcGFyc2VJbnQoZW50aXR5LnN1YnN0cigyKSk7XG4gICAgICAgICAgICBfYiA9XG4gICAgICAgICAgICAgICAgZGVjb2RlQ29kZV8xID49IDB4MTBmZmZmXG4gICAgICAgICAgICAgICAgICAgID8gb3V0T2ZCb3VuZHNDaGFyXG4gICAgICAgICAgICAgICAgICAgIDogZGVjb2RlQ29kZV8xID4gNjU1MzVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc3Vycm9nYXRlX3BhaXJzXzEuZnJvbUNvZGVQb2ludChkZWNvZGVDb2RlXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGZyb21DaGFyQ29kZShudW1lcmljX3VuaWNvZGVfbWFwXzEubnVtZXJpY1VuaWNvZGVNYXBbZGVjb2RlQ29kZV8xXSB8fCBkZWNvZGVDb2RlXzEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfYjtcbn1cbmV4cG9ydHMuZGVjb2RlRW50aXR5ID0gZGVjb2RlRW50aXR5O1xuLyoqIERlY29kZXMgYWxsIGVudGl0aWVzIGluIHRoZSB0ZXh0ICovXG5mdW5jdGlvbiBkZWNvZGUodGV4dCwgX2EpIHtcbiAgICB2YXIgZGVjb2RlU2Vjb25kQ2hhcl8xID0gX2EgPT09IHZvaWQgMCA/IGRlZmF1bHREZWNvZGVPcHRpb25zIDogX2EsIGRlY29kZUNvZGVfMSA9IGRlY29kZVNlY29uZENoYXJfMS5sZXZlbCwgbGV2ZWwgPSBkZWNvZGVDb2RlXzEgPT09IHZvaWQgMCA/ICdhbGwnIDogZGVjb2RlQ29kZV8xLCBfYiA9IGRlY29kZVNlY29uZENoYXJfMS5zY29wZSwgc2NvcGUgPSBfYiA9PT0gdm9pZCAwID8gbGV2ZWwgPT09ICd4bWwnID8gJ3N0cmljdCcgOiAnYm9keScgOiBfYjtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgZGVjb2RlUmVnRXhwID0gZGVjb2RlUmVnRXhwc1tsZXZlbF1bc2NvcGVdO1xuICAgIHZhciByZWZlcmVuY2VzID0gYWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5lbnRpdGllcztcbiAgICB2YXIgaXNBdHRyaWJ1dGUgPSBzY29wZSA9PT0gJ2F0dHJpYnV0ZSc7XG4gICAgdmFyIGlzU3RyaWN0ID0gc2NvcGUgPT09ICdzdHJpY3QnO1xuICAgIGRlY29kZVJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHZhciByZXBsYWNlTWF0Y2hfMSA9IGRlY29kZVJlZ0V4cC5leGVjKHRleHQpO1xuICAgIHZhciByZXBsYWNlUmVzdWx0XzE7XG4gICAgaWYgKHJlcGxhY2VNYXRjaF8xKSB7XG4gICAgICAgIHJlcGxhY2VSZXN1bHRfMSA9ICcnO1xuICAgICAgICB2YXIgcmVwbGFjZUxhc3RJbmRleF8xID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHJlcGxhY2VMYXN0SW5kZXhfMSAhPT0gcmVwbGFjZU1hdGNoXzEuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXBsYWNlUmVzdWx0XzEgKz0gdGV4dC5zdWJzdHJpbmcocmVwbGFjZUxhc3RJbmRleF8xLCByZXBsYWNlTWF0Y2hfMS5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVwbGFjZUlucHV0XzEgPSByZXBsYWNlTWF0Y2hfMVswXTtcbiAgICAgICAgICAgIHZhciBkZWNvZGVSZXN1bHRfMSA9IHJlcGxhY2VJbnB1dF8xO1xuICAgICAgICAgICAgdmFyIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgPSByZXBsYWNlSW5wdXRfMVtyZXBsYWNlSW5wdXRfMS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChpc0F0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc1N0cmljdFxuICAgICAgICAgICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgIT09ICc7Jykge1xuICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMiA9IHJlZmVyZW5jZXNbcmVwbGFjZUlucHV0XzFdO1xuICAgICAgICAgICAgICAgIGlmIChkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVwbGFjZUlucHV0XzFbMF0gPT09ICcmJyAmJiByZXBsYWNlSW5wdXRfMVsxXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNvZGVTZWNvbmRDaGFyXzIgPSByZXBsYWNlSW5wdXRfMVsyXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY29kZUNvZGVfMiA9IGRlY29kZVNlY29uZENoYXJfMiA9PSAneCcgfHwgZGVjb2RlU2Vjb25kQ2hhcl8yID09ICdYJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChyZXBsYWNlSW5wdXRfMS5zdWJzdHIoMyksIDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBwYXJzZUludChyZXBsYWNlSW5wdXRfMS5zdWJzdHIoMikpO1xuICAgICAgICAgICAgICAgICAgICBkZWNvZGVSZXN1bHRfMSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVDb2RlXzIgPj0gMHgxMGZmZmZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG91dE9mQm91bmRzQ2hhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZGVjb2RlQ29kZV8yID4gNjU1MzVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBzdXJyb2dhdGVfcGFpcnNfMS5mcm9tQ29kZVBvaW50KGRlY29kZUNvZGVfMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmcm9tQ2hhckNvZGUobnVtZXJpY191bmljb2RlX21hcF8xLm51bWVyaWNVbmljb2RlTWFwW2RlY29kZUNvZGVfMl0gfHwgZGVjb2RlQ29kZV8yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBsYWNlUmVzdWx0XzEgKz0gZGVjb2RlUmVzdWx0XzE7XG4gICAgICAgICAgICByZXBsYWNlTGFzdEluZGV4XzEgPSByZXBsYWNlTWF0Y2hfMS5pbmRleCArIHJlcGxhY2VJbnB1dF8xLmxlbmd0aDtcbiAgICAgICAgfSB3aGlsZSAoKHJlcGxhY2VNYXRjaF8xID0gZGVjb2RlUmVnRXhwLmV4ZWModGV4dCkpKTtcbiAgICAgICAgaWYgKHJlcGxhY2VMYXN0SW5kZXhfMSAhPT0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSB0ZXh0LnN1YnN0cmluZyhyZXBsYWNlTGFzdEluZGV4XzEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXBsYWNlUmVzdWx0XzEgPVxuICAgICAgICAgICAgdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHJlcGxhY2VSZXN1bHRfMTtcbn1cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmJvZHlSZWdFeHBzPXt4bWw6LyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOz8vZyxodG1sNDovJig/Om5ic3B8aWV4Y2x8Y2VudHxwb3VuZHxjdXJyZW58eWVufGJydmJhcnxzZWN0fHVtbHxjb3B5fG9yZGZ8bGFxdW98bm90fHNoeXxyZWd8bWFjcnxkZWd8cGx1c21ufHN1cDJ8c3VwM3xhY3V0ZXxtaWNyb3xwYXJhfG1pZGRvdHxjZWRpbHxzdXAxfG9yZG18cmFxdW98ZnJhYzE0fGZyYWMxMnxmcmFjMzR8aXF1ZXN0fEFncmF2ZXxBYWN1dGV8QWNpcmN8QXRpbGRlfEF1bWx8QXJpbmd8QUVsaWd8Q2NlZGlsfEVncmF2ZXxFYWN1dGV8RWNpcmN8RXVtbHxJZ3JhdmV8SWFjdXRlfEljaXJjfEl1bWx8RVRIfE50aWxkZXxPZ3JhdmV8T2FjdXRlfE9jaXJjfE90aWxkZXxPdW1sfHRpbWVzfE9zbGFzaHxVZ3JhdmV8VWFjdXRlfFVjaXJjfFV1bWx8WWFjdXRlfFRIT1JOfHN6bGlnfGFncmF2ZXxhYWN1dGV8YWNpcmN8YXRpbGRlfGF1bWx8YXJpbmd8YWVsaWd8Y2NlZGlsfGVncmF2ZXxlYWN1dGV8ZWNpcmN8ZXVtbHxpZ3JhdmV8aWFjdXRlfGljaXJjfGl1bWx8ZXRofG50aWxkZXxvZ3JhdmV8b2FjdXRlfG9jaXJjfG90aWxkZXxvdW1sfGRpdmlkZXxvc2xhc2h8dWdyYXZlfHVhY3V0ZXx1Y2lyY3x1dW1sfHlhY3V0ZXx0aG9ybnx5dW1sfHF1b3R8YW1wfGx0fGd0fCNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7Py9nLGh0bWw1Oi8mKD86QUVsaWd8QU1QfEFhY3V0ZXxBY2lyY3xBZ3JhdmV8QXJpbmd8QXRpbGRlfEF1bWx8Q09QWXxDY2VkaWx8RVRIfEVhY3V0ZXxFY2lyY3xFZ3JhdmV8RXVtbHxHVHxJYWN1dGV8SWNpcmN8SWdyYXZlfEl1bWx8TFR8TnRpbGRlfE9hY3V0ZXxPY2lyY3xPZ3JhdmV8T3NsYXNofE90aWxkZXxPdW1sfFFVT1R8UkVHfFRIT1JOfFVhY3V0ZXxVY2lyY3xVZ3JhdmV8VXVtbHxZYWN1dGV8YWFjdXRlfGFjaXJjfGFjdXRlfGFlbGlnfGFncmF2ZXxhbXB8YXJpbmd8YXRpbGRlfGF1bWx8YnJ2YmFyfGNjZWRpbHxjZWRpbHxjZW50fGNvcHl8Y3VycmVufGRlZ3xkaXZpZGV8ZWFjdXRlfGVjaXJjfGVncmF2ZXxldGh8ZXVtbHxmcmFjMTJ8ZnJhYzE0fGZyYWMzNHxndHxpYWN1dGV8aWNpcmN8aWV4Y2x8aWdyYXZlfGlxdWVzdHxpdW1sfGxhcXVvfGx0fG1hY3J8bWljcm98bWlkZG90fG5ic3B8bm90fG50aWxkZXxvYWN1dGV8b2NpcmN8b2dyYXZlfG9yZGZ8b3JkbXxvc2xhc2h8b3RpbGRlfG91bWx8cGFyYXxwbHVzbW58cG91bmR8cXVvdHxyYXF1b3xyZWd8c2VjdHxzaHl8c3VwMXxzdXAyfHN1cDN8c3psaWd8dGhvcm58dGltZXN8dWFjdXRlfHVjaXJjfHVncmF2ZXx1bWx8dXVtbHx5YWN1dGV8eWVufHl1bWx8I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2d9O2V4cG9ydHMubmFtZWRSZWZlcmVuY2VzPXt4bWw6e2VudGl0aWVzOntcIiZsdDtcIjpcIjxcIixcIiZndDtcIjpcIj5cIixcIiZxdW90O1wiOidcIicsXCImYXBvcztcIjpcIidcIixcIiZhbXA7XCI6XCImXCJ9LGNoYXJhY3RlcnM6e1wiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiZhcG9zO1wiLFwiJlwiOlwiJmFtcDtcIn19LGh0bWw0OntlbnRpdGllczp7XCImYXBvcztcIjpcIidcIixcIiZuYnNwXCI6XCLCoFwiLFwiJm5ic3A7XCI6XCLCoFwiLFwiJmlleGNsXCI6XCLCoVwiLFwiJmlleGNsO1wiOlwiwqFcIixcIiZjZW50XCI6XCLColwiLFwiJmNlbnQ7XCI6XCLColwiLFwiJnBvdW5kXCI6XCLCo1wiLFwiJnBvdW5kO1wiOlwiwqNcIixcIiZjdXJyZW5cIjpcIsKkXCIsXCImY3VycmVuO1wiOlwiwqRcIixcIiZ5ZW5cIjpcIsKlXCIsXCImeWVuO1wiOlwiwqVcIixcIiZicnZiYXJcIjpcIsKmXCIsXCImYnJ2YmFyO1wiOlwiwqZcIixcIiZzZWN0XCI6XCLCp1wiLFwiJnNlY3Q7XCI6XCLCp1wiLFwiJnVtbFwiOlwiwqhcIixcIiZ1bWw7XCI6XCLCqFwiLFwiJmNvcHlcIjpcIsKpXCIsXCImY29weTtcIjpcIsKpXCIsXCImb3JkZlwiOlwiwqpcIixcIiZvcmRmO1wiOlwiwqpcIixcIiZsYXF1b1wiOlwiwqtcIixcIiZsYXF1bztcIjpcIsKrXCIsXCImbm90XCI6XCLCrFwiLFwiJm5vdDtcIjpcIsKsXCIsXCImc2h5XCI6XCLCrVwiLFwiJnNoeTtcIjpcIsKtXCIsXCImcmVnXCI6XCLCrlwiLFwiJnJlZztcIjpcIsKuXCIsXCImbWFjclwiOlwiwq9cIixcIiZtYWNyO1wiOlwiwq9cIixcIiZkZWdcIjpcIsKwXCIsXCImZGVnO1wiOlwiwrBcIixcIiZwbHVzbW5cIjpcIsKxXCIsXCImcGx1c21uO1wiOlwiwrFcIixcIiZzdXAyXCI6XCLCslwiLFwiJnN1cDI7XCI6XCLCslwiLFwiJnN1cDNcIjpcIsKzXCIsXCImc3VwMztcIjpcIsKzXCIsXCImYWN1dGVcIjpcIsK0XCIsXCImYWN1dGU7XCI6XCLCtFwiLFwiJm1pY3JvXCI6XCLCtVwiLFwiJm1pY3JvO1wiOlwiwrVcIixcIiZwYXJhXCI6XCLCtlwiLFwiJnBhcmE7XCI6XCLCtlwiLFwiJm1pZGRvdFwiOlwiwrdcIixcIiZtaWRkb3Q7XCI6XCLCt1wiLFwiJmNlZGlsXCI6XCLCuFwiLFwiJmNlZGlsO1wiOlwiwrhcIixcIiZzdXAxXCI6XCLCuVwiLFwiJnN1cDE7XCI6XCLCuVwiLFwiJm9yZG1cIjpcIsK6XCIsXCImb3JkbTtcIjpcIsK6XCIsXCImcmFxdW9cIjpcIsK7XCIsXCImcmFxdW87XCI6XCLCu1wiLFwiJmZyYWMxNFwiOlwiwrxcIixcIiZmcmFjMTQ7XCI6XCLCvFwiLFwiJmZyYWMxMlwiOlwiwr1cIixcIiZmcmFjMTI7XCI6XCLCvVwiLFwiJmZyYWMzNFwiOlwiwr5cIixcIiZmcmFjMzQ7XCI6XCLCvlwiLFwiJmlxdWVzdFwiOlwiwr9cIixcIiZpcXVlc3Q7XCI6XCLCv1wiLFwiJkFncmF2ZVwiOlwiw4BcIixcIiZBZ3JhdmU7XCI6XCLDgFwiLFwiJkFhY3V0ZVwiOlwiw4FcIixcIiZBYWN1dGU7XCI6XCLDgVwiLFwiJkFjaXJjXCI6XCLDglwiLFwiJkFjaXJjO1wiOlwiw4JcIixcIiZBdGlsZGVcIjpcIsODXCIsXCImQXRpbGRlO1wiOlwiw4NcIixcIiZBdW1sXCI6XCLDhFwiLFwiJkF1bWw7XCI6XCLDhFwiLFwiJkFyaW5nXCI6XCLDhVwiLFwiJkFyaW5nO1wiOlwiw4VcIixcIiZBRWxpZ1wiOlwiw4ZcIixcIiZBRWxpZztcIjpcIsOGXCIsXCImQ2NlZGlsXCI6XCLDh1wiLFwiJkNjZWRpbDtcIjpcIsOHXCIsXCImRWdyYXZlXCI6XCLDiFwiLFwiJkVncmF2ZTtcIjpcIsOIXCIsXCImRWFjdXRlXCI6XCLDiVwiLFwiJkVhY3V0ZTtcIjpcIsOJXCIsXCImRWNpcmNcIjpcIsOKXCIsXCImRWNpcmM7XCI6XCLDilwiLFwiJkV1bWxcIjpcIsOLXCIsXCImRXVtbDtcIjpcIsOLXCIsXCImSWdyYXZlXCI6XCLDjFwiLFwiJklncmF2ZTtcIjpcIsOMXCIsXCImSWFjdXRlXCI6XCLDjVwiLFwiJklhY3V0ZTtcIjpcIsONXCIsXCImSWNpcmNcIjpcIsOOXCIsXCImSWNpcmM7XCI6XCLDjlwiLFwiJkl1bWxcIjpcIsOPXCIsXCImSXVtbDtcIjpcIsOPXCIsXCImRVRIXCI6XCLDkFwiLFwiJkVUSDtcIjpcIsOQXCIsXCImTnRpbGRlXCI6XCLDkVwiLFwiJk50aWxkZTtcIjpcIsORXCIsXCImT2dyYXZlXCI6XCLDklwiLFwiJk9ncmF2ZTtcIjpcIsOSXCIsXCImT2FjdXRlXCI6XCLDk1wiLFwiJk9hY3V0ZTtcIjpcIsOTXCIsXCImT2NpcmNcIjpcIsOUXCIsXCImT2NpcmM7XCI6XCLDlFwiLFwiJk90aWxkZVwiOlwiw5VcIixcIiZPdGlsZGU7XCI6XCLDlVwiLFwiJk91bWxcIjpcIsOWXCIsXCImT3VtbDtcIjpcIsOWXCIsXCImdGltZXNcIjpcIsOXXCIsXCImdGltZXM7XCI6XCLDl1wiLFwiJk9zbGFzaFwiOlwiw5hcIixcIiZPc2xhc2g7XCI6XCLDmFwiLFwiJlVncmF2ZVwiOlwiw5lcIixcIiZVZ3JhdmU7XCI6XCLDmVwiLFwiJlVhY3V0ZVwiOlwiw5pcIixcIiZVYWN1dGU7XCI6XCLDmlwiLFwiJlVjaXJjXCI6XCLDm1wiLFwiJlVjaXJjO1wiOlwiw5tcIixcIiZVdW1sXCI6XCLDnFwiLFwiJlV1bWw7XCI6XCLDnFwiLFwiJllhY3V0ZVwiOlwiw51cIixcIiZZYWN1dGU7XCI6XCLDnVwiLFwiJlRIT1JOXCI6XCLDnlwiLFwiJlRIT1JOO1wiOlwiw55cIixcIiZzemxpZ1wiOlwiw59cIixcIiZzemxpZztcIjpcIsOfXCIsXCImYWdyYXZlXCI6XCLDoFwiLFwiJmFncmF2ZTtcIjpcIsOgXCIsXCImYWFjdXRlXCI6XCLDoVwiLFwiJmFhY3V0ZTtcIjpcIsOhXCIsXCImYWNpcmNcIjpcIsOiXCIsXCImYWNpcmM7XCI6XCLDolwiLFwiJmF0aWxkZVwiOlwiw6NcIixcIiZhdGlsZGU7XCI6XCLDo1wiLFwiJmF1bWxcIjpcIsOkXCIsXCImYXVtbDtcIjpcIsOkXCIsXCImYXJpbmdcIjpcIsOlXCIsXCImYXJpbmc7XCI6XCLDpVwiLFwiJmFlbGlnXCI6XCLDplwiLFwiJmFlbGlnO1wiOlwiw6ZcIixcIiZjY2VkaWxcIjpcIsOnXCIsXCImY2NlZGlsO1wiOlwiw6dcIixcIiZlZ3JhdmVcIjpcIsOoXCIsXCImZWdyYXZlO1wiOlwiw6hcIixcIiZlYWN1dGVcIjpcIsOpXCIsXCImZWFjdXRlO1wiOlwiw6lcIixcIiZlY2lyY1wiOlwiw6pcIixcIiZlY2lyYztcIjpcIsOqXCIsXCImZXVtbFwiOlwiw6tcIixcIiZldW1sO1wiOlwiw6tcIixcIiZpZ3JhdmVcIjpcIsOsXCIsXCImaWdyYXZlO1wiOlwiw6xcIixcIiZpYWN1dGVcIjpcIsOtXCIsXCImaWFjdXRlO1wiOlwiw61cIixcIiZpY2lyY1wiOlwiw65cIixcIiZpY2lyYztcIjpcIsOuXCIsXCImaXVtbFwiOlwiw69cIixcIiZpdW1sO1wiOlwiw69cIixcIiZldGhcIjpcIsOwXCIsXCImZXRoO1wiOlwiw7BcIixcIiZudGlsZGVcIjpcIsOxXCIsXCImbnRpbGRlO1wiOlwiw7FcIixcIiZvZ3JhdmVcIjpcIsOyXCIsXCImb2dyYXZlO1wiOlwiw7JcIixcIiZvYWN1dGVcIjpcIsOzXCIsXCImb2FjdXRlO1wiOlwiw7NcIixcIiZvY2lyY1wiOlwiw7RcIixcIiZvY2lyYztcIjpcIsO0XCIsXCImb3RpbGRlXCI6XCLDtVwiLFwiJm90aWxkZTtcIjpcIsO1XCIsXCImb3VtbFwiOlwiw7ZcIixcIiZvdW1sO1wiOlwiw7ZcIixcIiZkaXZpZGVcIjpcIsO3XCIsXCImZGl2aWRlO1wiOlwiw7dcIixcIiZvc2xhc2hcIjpcIsO4XCIsXCImb3NsYXNoO1wiOlwiw7hcIixcIiZ1Z3JhdmVcIjpcIsO5XCIsXCImdWdyYXZlO1wiOlwiw7lcIixcIiZ1YWN1dGVcIjpcIsO6XCIsXCImdWFjdXRlO1wiOlwiw7pcIixcIiZ1Y2lyY1wiOlwiw7tcIixcIiZ1Y2lyYztcIjpcIsO7XCIsXCImdXVtbFwiOlwiw7xcIixcIiZ1dW1sO1wiOlwiw7xcIixcIiZ5YWN1dGVcIjpcIsO9XCIsXCImeWFjdXRlO1wiOlwiw71cIixcIiZ0aG9yblwiOlwiw75cIixcIiZ0aG9ybjtcIjpcIsO+XCIsXCImeXVtbFwiOlwiw79cIixcIiZ5dW1sO1wiOlwiw79cIixcIiZxdW90XCI6J1wiJyxcIiZxdW90O1wiOidcIicsXCImYW1wXCI6XCImXCIsXCImYW1wO1wiOlwiJlwiLFwiJmx0XCI6XCI8XCIsXCImbHQ7XCI6XCI8XCIsXCImZ3RcIjpcIj5cIixcIiZndDtcIjpcIj5cIixcIiZPRWxpZztcIjpcIsWSXCIsXCImb2VsaWc7XCI6XCLFk1wiLFwiJlNjYXJvbjtcIjpcIsWgXCIsXCImc2Nhcm9uO1wiOlwixaFcIixcIiZZdW1sO1wiOlwixbhcIixcIiZjaXJjO1wiOlwiy4ZcIixcIiZ0aWxkZTtcIjpcIsucXCIsXCImZW5zcDtcIjpcIuKAglwiLFwiJmVtc3A7XCI6XCLigINcIixcIiZ0aGluc3A7XCI6XCLigIlcIixcIiZ6d25qO1wiOlwi4oCMXCIsXCImendqO1wiOlwi4oCNXCIsXCImbHJtO1wiOlwi4oCOXCIsXCImcmxtO1wiOlwi4oCPXCIsXCImbmRhc2g7XCI6XCLigJNcIixcIiZtZGFzaDtcIjpcIuKAlFwiLFwiJmxzcXVvO1wiOlwi4oCYXCIsXCImcnNxdW87XCI6XCLigJlcIixcIiZzYnF1bztcIjpcIuKAmlwiLFwiJmxkcXVvO1wiOlwi4oCcXCIsXCImcmRxdW87XCI6XCLigJ1cIixcIiZiZHF1bztcIjpcIuKAnlwiLFwiJmRhZ2dlcjtcIjpcIuKAoFwiLFwiJkRhZ2dlcjtcIjpcIuKAoVwiLFwiJnBlcm1pbDtcIjpcIuKAsFwiLFwiJmxzYXF1bztcIjpcIuKAuVwiLFwiJnJzYXF1bztcIjpcIuKAulwiLFwiJmV1cm87XCI6XCLigqxcIixcIiZmbm9mO1wiOlwixpJcIixcIiZBbHBoYTtcIjpcIs6RXCIsXCImQmV0YTtcIjpcIs6SXCIsXCImR2FtbWE7XCI6XCLOk1wiLFwiJkRlbHRhO1wiOlwizpRcIixcIiZFcHNpbG9uO1wiOlwizpVcIixcIiZaZXRhO1wiOlwizpZcIixcIiZFdGE7XCI6XCLOl1wiLFwiJlRoZXRhO1wiOlwizphcIixcIiZJb3RhO1wiOlwizplcIixcIiZLYXBwYTtcIjpcIs6aXCIsXCImTGFtYmRhO1wiOlwizptcIixcIiZNdTtcIjpcIs6cXCIsXCImTnU7XCI6XCLOnVwiLFwiJlhpO1wiOlwizp5cIixcIiZPbWljcm9uO1wiOlwizp9cIixcIiZQaTtcIjpcIs6gXCIsXCImUmhvO1wiOlwizqFcIixcIiZTaWdtYTtcIjpcIs6jXCIsXCImVGF1O1wiOlwizqRcIixcIiZVcHNpbG9uO1wiOlwizqVcIixcIiZQaGk7XCI6XCLOplwiLFwiJkNoaTtcIjpcIs6nXCIsXCImUHNpO1wiOlwizqhcIixcIiZPbWVnYTtcIjpcIs6pXCIsXCImYWxwaGE7XCI6XCLOsVwiLFwiJmJldGE7XCI6XCLOslwiLFwiJmdhbW1hO1wiOlwizrNcIixcIiZkZWx0YTtcIjpcIs60XCIsXCImZXBzaWxvbjtcIjpcIs61XCIsXCImemV0YTtcIjpcIs62XCIsXCImZXRhO1wiOlwizrdcIixcIiZ0aGV0YTtcIjpcIs64XCIsXCImaW90YTtcIjpcIs65XCIsXCIma2FwcGE7XCI6XCLOulwiLFwiJmxhbWJkYTtcIjpcIs67XCIsXCImbXU7XCI6XCLOvFwiLFwiJm51O1wiOlwizr1cIixcIiZ4aTtcIjpcIs6+XCIsXCImb21pY3JvbjtcIjpcIs6/XCIsXCImcGk7XCI6XCLPgFwiLFwiJnJobztcIjpcIs+BXCIsXCImc2lnbWFmO1wiOlwiz4JcIixcIiZzaWdtYTtcIjpcIs+DXCIsXCImdGF1O1wiOlwiz4RcIixcIiZ1cHNpbG9uO1wiOlwiz4VcIixcIiZwaGk7XCI6XCLPhlwiLFwiJmNoaTtcIjpcIs+HXCIsXCImcHNpO1wiOlwiz4hcIixcIiZvbWVnYTtcIjpcIs+JXCIsXCImdGhldGFzeW07XCI6XCLPkVwiLFwiJnVwc2loO1wiOlwiz5JcIixcIiZwaXY7XCI6XCLPllwiLFwiJmJ1bGw7XCI6XCLigKJcIixcIiZoZWxsaXA7XCI6XCLigKZcIixcIiZwcmltZTtcIjpcIuKAslwiLFwiJlByaW1lO1wiOlwi4oCzXCIsXCImb2xpbmU7XCI6XCLigL5cIixcIiZmcmFzbDtcIjpcIuKBhFwiLFwiJndlaWVycDtcIjpcIuKEmFwiLFwiJmltYWdlO1wiOlwi4oSRXCIsXCImcmVhbDtcIjpcIuKEnFwiLFwiJnRyYWRlO1wiOlwi4oSiXCIsXCImYWxlZnN5bTtcIjpcIuKEtVwiLFwiJmxhcnI7XCI6XCLihpBcIixcIiZ1YXJyO1wiOlwi4oaRXCIsXCImcmFycjtcIjpcIuKGklwiLFwiJmRhcnI7XCI6XCLihpNcIixcIiZoYXJyO1wiOlwi4oaUXCIsXCImY3JhcnI7XCI6XCLihrVcIixcIiZsQXJyO1wiOlwi4oeQXCIsXCImdUFycjtcIjpcIuKHkVwiLFwiJnJBcnI7XCI6XCLih5JcIixcIiZkQXJyO1wiOlwi4oeTXCIsXCImaEFycjtcIjpcIuKHlFwiLFwiJmZvcmFsbDtcIjpcIuKIgFwiLFwiJnBhcnQ7XCI6XCLiiIJcIixcIiZleGlzdDtcIjpcIuKIg1wiLFwiJmVtcHR5O1wiOlwi4oiFXCIsXCImbmFibGE7XCI6XCLiiIdcIixcIiZpc2luO1wiOlwi4oiIXCIsXCImbm90aW47XCI6XCLiiIlcIixcIiZuaTtcIjpcIuKIi1wiLFwiJnByb2Q7XCI6XCLiiI9cIixcIiZzdW07XCI6XCLiiJFcIixcIiZtaW51cztcIjpcIuKIklwiLFwiJmxvd2FzdDtcIjpcIuKIl1wiLFwiJnJhZGljO1wiOlwi4oiaXCIsXCImcHJvcDtcIjpcIuKInVwiLFwiJmluZmluO1wiOlwi4oieXCIsXCImYW5nO1wiOlwi4oigXCIsXCImYW5kO1wiOlwi4oinXCIsXCImb3I7XCI6XCLiiKhcIixcIiZjYXA7XCI6XCLiiKlcIixcIiZjdXA7XCI6XCLiiKpcIixcIiZpbnQ7XCI6XCLiiKtcIixcIiZ0aGVyZTQ7XCI6XCLiiLRcIixcIiZzaW07XCI6XCLiiLxcIixcIiZjb25nO1wiOlwi4omFXCIsXCImYXN5bXA7XCI6XCLiiYhcIixcIiZuZTtcIjpcIuKJoFwiLFwiJmVxdWl2O1wiOlwi4omhXCIsXCImbGU7XCI6XCLiiaRcIixcIiZnZTtcIjpcIuKJpVwiLFwiJnN1YjtcIjpcIuKKglwiLFwiJnN1cDtcIjpcIuKKg1wiLFwiJm5zdWI7XCI6XCLiioRcIixcIiZzdWJlO1wiOlwi4oqGXCIsXCImc3VwZTtcIjpcIuKKh1wiLFwiJm9wbHVzO1wiOlwi4oqVXCIsXCImb3RpbWVzO1wiOlwi4oqXXCIsXCImcGVycDtcIjpcIuKKpVwiLFwiJnNkb3Q7XCI6XCLii4VcIixcIiZsY2VpbDtcIjpcIuKMiFwiLFwiJnJjZWlsO1wiOlwi4oyJXCIsXCImbGZsb29yO1wiOlwi4oyKXCIsXCImcmZsb29yO1wiOlwi4oyLXCIsXCImbGFuZztcIjpcIuKMqVwiLFwiJnJhbmc7XCI6XCLijKpcIixcIiZsb3o7XCI6XCLil4pcIixcIiZzcGFkZXM7XCI6XCLimaBcIixcIiZjbHVicztcIjpcIuKZo1wiLFwiJmhlYXJ0cztcIjpcIuKZpVwiLFwiJmRpYW1zO1wiOlwi4pmmXCJ9LGNoYXJhY3RlcnM6e1wiJ1wiOlwiJmFwb3M7XCIsXCLCoFwiOlwiJm5ic3A7XCIsXCLCoVwiOlwiJmlleGNsO1wiLFwiwqJcIjpcIiZjZW50O1wiLFwiwqNcIjpcIiZwb3VuZDtcIixcIsKkXCI6XCImY3VycmVuO1wiLFwiwqVcIjpcIiZ5ZW47XCIsXCLCplwiOlwiJmJydmJhcjtcIixcIsKnXCI6XCImc2VjdDtcIixcIsKoXCI6XCImdW1sO1wiLFwiwqlcIjpcIiZjb3B5O1wiLFwiwqpcIjpcIiZvcmRmO1wiLFwiwqtcIjpcIiZsYXF1bztcIixcIsKsXCI6XCImbm90O1wiLFwiwq1cIjpcIiZzaHk7XCIsXCLCrlwiOlwiJnJlZztcIixcIsKvXCI6XCImbWFjcjtcIixcIsKwXCI6XCImZGVnO1wiLFwiwrFcIjpcIiZwbHVzbW47XCIsXCLCslwiOlwiJnN1cDI7XCIsXCLCs1wiOlwiJnN1cDM7XCIsXCLCtFwiOlwiJmFjdXRlO1wiLFwiwrVcIjpcIiZtaWNybztcIixcIsK2XCI6XCImcGFyYTtcIixcIsK3XCI6XCImbWlkZG90O1wiLFwiwrhcIjpcIiZjZWRpbDtcIixcIsK5XCI6XCImc3VwMTtcIixcIsK6XCI6XCImb3JkbTtcIixcIsK7XCI6XCImcmFxdW87XCIsXCLCvFwiOlwiJmZyYWMxNDtcIixcIsK9XCI6XCImZnJhYzEyO1wiLFwiwr5cIjpcIiZmcmFjMzQ7XCIsXCLCv1wiOlwiJmlxdWVzdDtcIixcIsOAXCI6XCImQWdyYXZlO1wiLFwiw4FcIjpcIiZBYWN1dGU7XCIsXCLDglwiOlwiJkFjaXJjO1wiLFwiw4NcIjpcIiZBdGlsZGU7XCIsXCLDhFwiOlwiJkF1bWw7XCIsXCLDhVwiOlwiJkFyaW5nO1wiLFwiw4ZcIjpcIiZBRWxpZztcIixcIsOHXCI6XCImQ2NlZGlsO1wiLFwiw4hcIjpcIiZFZ3JhdmU7XCIsXCLDiVwiOlwiJkVhY3V0ZTtcIixcIsOKXCI6XCImRWNpcmM7XCIsXCLDi1wiOlwiJkV1bWw7XCIsXCLDjFwiOlwiJklncmF2ZTtcIixcIsONXCI6XCImSWFjdXRlO1wiLFwiw45cIjpcIiZJY2lyYztcIixcIsOPXCI6XCImSXVtbDtcIixcIsOQXCI6XCImRVRIO1wiLFwiw5FcIjpcIiZOdGlsZGU7XCIsXCLDklwiOlwiJk9ncmF2ZTtcIixcIsOTXCI6XCImT2FjdXRlO1wiLFwiw5RcIjpcIiZPY2lyYztcIixcIsOVXCI6XCImT3RpbGRlO1wiLFwiw5ZcIjpcIiZPdW1sO1wiLFwiw5dcIjpcIiZ0aW1lcztcIixcIsOYXCI6XCImT3NsYXNoO1wiLFwiw5lcIjpcIiZVZ3JhdmU7XCIsXCLDmlwiOlwiJlVhY3V0ZTtcIixcIsObXCI6XCImVWNpcmM7XCIsXCLDnFwiOlwiJlV1bWw7XCIsXCLDnVwiOlwiJllhY3V0ZTtcIixcIsOeXCI6XCImVEhPUk47XCIsXCLDn1wiOlwiJnN6bGlnO1wiLFwiw6BcIjpcIiZhZ3JhdmU7XCIsXCLDoVwiOlwiJmFhY3V0ZTtcIixcIsOiXCI6XCImYWNpcmM7XCIsXCLDo1wiOlwiJmF0aWxkZTtcIixcIsOkXCI6XCImYXVtbDtcIixcIsOlXCI6XCImYXJpbmc7XCIsXCLDplwiOlwiJmFlbGlnO1wiLFwiw6dcIjpcIiZjY2VkaWw7XCIsXCLDqFwiOlwiJmVncmF2ZTtcIixcIsOpXCI6XCImZWFjdXRlO1wiLFwiw6pcIjpcIiZlY2lyYztcIixcIsOrXCI6XCImZXVtbDtcIixcIsOsXCI6XCImaWdyYXZlO1wiLFwiw61cIjpcIiZpYWN1dGU7XCIsXCLDrlwiOlwiJmljaXJjO1wiLFwiw69cIjpcIiZpdW1sO1wiLFwiw7BcIjpcIiZldGg7XCIsXCLDsVwiOlwiJm50aWxkZTtcIixcIsOyXCI6XCImb2dyYXZlO1wiLFwiw7NcIjpcIiZvYWN1dGU7XCIsXCLDtFwiOlwiJm9jaXJjO1wiLFwiw7VcIjpcIiZvdGlsZGU7XCIsXCLDtlwiOlwiJm91bWw7XCIsXCLDt1wiOlwiJmRpdmlkZTtcIixcIsO4XCI6XCImb3NsYXNoO1wiLFwiw7lcIjpcIiZ1Z3JhdmU7XCIsXCLDulwiOlwiJnVhY3V0ZTtcIixcIsO7XCI6XCImdWNpcmM7XCIsXCLDvFwiOlwiJnV1bWw7XCIsXCLDvVwiOlwiJnlhY3V0ZTtcIixcIsO+XCI6XCImdGhvcm47XCIsXCLDv1wiOlwiJnl1bWw7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIixcIsWSXCI6XCImT0VsaWc7XCIsXCLFk1wiOlwiJm9lbGlnO1wiLFwixaBcIjpcIiZTY2Fyb247XCIsXCLFoVwiOlwiJnNjYXJvbjtcIixcIsW4XCI6XCImWXVtbDtcIixcIsuGXCI6XCImY2lyYztcIixcIsucXCI6XCImdGlsZGU7XCIsXCLigIJcIjpcIiZlbnNwO1wiLFwi4oCDXCI6XCImZW1zcDtcIixcIuKAiVwiOlwiJnRoaW5zcDtcIixcIuKAjFwiOlwiJnp3bmo7XCIsXCLigI1cIjpcIiZ6d2o7XCIsXCLigI5cIjpcIiZscm07XCIsXCLigI9cIjpcIiZybG07XCIsXCLigJNcIjpcIiZuZGFzaDtcIixcIuKAlFwiOlwiJm1kYXNoO1wiLFwi4oCYXCI6XCImbHNxdW87XCIsXCLigJlcIjpcIiZyc3F1bztcIixcIuKAmlwiOlwiJnNicXVvO1wiLFwi4oCcXCI6XCImbGRxdW87XCIsXCLigJ1cIjpcIiZyZHF1bztcIixcIuKAnlwiOlwiJmJkcXVvO1wiLFwi4oCgXCI6XCImZGFnZ2VyO1wiLFwi4oChXCI6XCImRGFnZ2VyO1wiLFwi4oCwXCI6XCImcGVybWlsO1wiLFwi4oC5XCI6XCImbHNhcXVvO1wiLFwi4oC6XCI6XCImcnNhcXVvO1wiLFwi4oKsXCI6XCImZXVybztcIixcIsaSXCI6XCImZm5vZjtcIixcIs6RXCI6XCImQWxwaGE7XCIsXCLOklwiOlwiJkJldGE7XCIsXCLOk1wiOlwiJkdhbW1hO1wiLFwizpRcIjpcIiZEZWx0YTtcIixcIs6VXCI6XCImRXBzaWxvbjtcIixcIs6WXCI6XCImWmV0YTtcIixcIs6XXCI6XCImRXRhO1wiLFwizphcIjpcIiZUaGV0YTtcIixcIs6ZXCI6XCImSW90YTtcIixcIs6aXCI6XCImS2FwcGE7XCIsXCLOm1wiOlwiJkxhbWJkYTtcIixcIs6cXCI6XCImTXU7XCIsXCLOnVwiOlwiJk51O1wiLFwizp5cIjpcIiZYaTtcIixcIs6fXCI6XCImT21pY3JvbjtcIixcIs6gXCI6XCImUGk7XCIsXCLOoVwiOlwiJlJobztcIixcIs6jXCI6XCImU2lnbWE7XCIsXCLOpFwiOlwiJlRhdTtcIixcIs6lXCI6XCImVXBzaWxvbjtcIixcIs6mXCI6XCImUGhpO1wiLFwizqdcIjpcIiZDaGk7XCIsXCLOqFwiOlwiJlBzaTtcIixcIs6pXCI6XCImT21lZ2E7XCIsXCLOsVwiOlwiJmFscGhhO1wiLFwizrJcIjpcIiZiZXRhO1wiLFwizrNcIjpcIiZnYW1tYTtcIixcIs60XCI6XCImZGVsdGE7XCIsXCLOtVwiOlwiJmVwc2lsb247XCIsXCLOtlwiOlwiJnpldGE7XCIsXCLOt1wiOlwiJmV0YTtcIixcIs64XCI6XCImdGhldGE7XCIsXCLOuVwiOlwiJmlvdGE7XCIsXCLOulwiOlwiJmthcHBhO1wiLFwizrtcIjpcIiZsYW1iZGE7XCIsXCLOvFwiOlwiJm11O1wiLFwizr1cIjpcIiZudTtcIixcIs6+XCI6XCImeGk7XCIsXCLOv1wiOlwiJm9taWNyb247XCIsXCLPgFwiOlwiJnBpO1wiLFwiz4FcIjpcIiZyaG87XCIsXCLPglwiOlwiJnNpZ21hZjtcIixcIs+DXCI6XCImc2lnbWE7XCIsXCLPhFwiOlwiJnRhdTtcIixcIs+FXCI6XCImdXBzaWxvbjtcIixcIs+GXCI6XCImcGhpO1wiLFwiz4dcIjpcIiZjaGk7XCIsXCLPiFwiOlwiJnBzaTtcIixcIs+JXCI6XCImb21lZ2E7XCIsXCLPkVwiOlwiJnRoZXRhc3ltO1wiLFwiz5JcIjpcIiZ1cHNpaDtcIixcIs+WXCI6XCImcGl2O1wiLFwi4oCiXCI6XCImYnVsbDtcIixcIuKAplwiOlwiJmhlbGxpcDtcIixcIuKAslwiOlwiJnByaW1lO1wiLFwi4oCzXCI6XCImUHJpbWU7XCIsXCLigL5cIjpcIiZvbGluZTtcIixcIuKBhFwiOlwiJmZyYXNsO1wiLFwi4oSYXCI6XCImd2VpZXJwO1wiLFwi4oSRXCI6XCImaW1hZ2U7XCIsXCLihJxcIjpcIiZyZWFsO1wiLFwi4oSiXCI6XCImdHJhZGU7XCIsXCLihLVcIjpcIiZhbGVmc3ltO1wiLFwi4oaQXCI6XCImbGFycjtcIixcIuKGkVwiOlwiJnVhcnI7XCIsXCLihpJcIjpcIiZyYXJyO1wiLFwi4oaTXCI6XCImZGFycjtcIixcIuKGlFwiOlwiJmhhcnI7XCIsXCLihrVcIjpcIiZjcmFycjtcIixcIuKHkFwiOlwiJmxBcnI7XCIsXCLih5FcIjpcIiZ1QXJyO1wiLFwi4oeSXCI6XCImckFycjtcIixcIuKHk1wiOlwiJmRBcnI7XCIsXCLih5RcIjpcIiZoQXJyO1wiLFwi4oiAXCI6XCImZm9yYWxsO1wiLFwi4oiCXCI6XCImcGFydDtcIixcIuKIg1wiOlwiJmV4aXN0O1wiLFwi4oiFXCI6XCImZW1wdHk7XCIsXCLiiIdcIjpcIiZuYWJsYTtcIixcIuKIiFwiOlwiJmlzaW47XCIsXCLiiIlcIjpcIiZub3RpbjtcIixcIuKIi1wiOlwiJm5pO1wiLFwi4oiPXCI6XCImcHJvZDtcIixcIuKIkVwiOlwiJnN1bTtcIixcIuKIklwiOlwiJm1pbnVzO1wiLFwi4oiXXCI6XCImbG93YXN0O1wiLFwi4oiaXCI6XCImcmFkaWM7XCIsXCLiiJ1cIjpcIiZwcm9wO1wiLFwi4oieXCI6XCImaW5maW47XCIsXCLiiKBcIjpcIiZhbmc7XCIsXCLiiKdcIjpcIiZhbmQ7XCIsXCLiiKhcIjpcIiZvcjtcIixcIuKIqVwiOlwiJmNhcDtcIixcIuKIqlwiOlwiJmN1cDtcIixcIuKIq1wiOlwiJmludDtcIixcIuKItFwiOlwiJnRoZXJlNDtcIixcIuKIvFwiOlwiJnNpbTtcIixcIuKJhVwiOlwiJmNvbmc7XCIsXCLiiYhcIjpcIiZhc3ltcDtcIixcIuKJoFwiOlwiJm5lO1wiLFwi4omhXCI6XCImZXF1aXY7XCIsXCLiiaRcIjpcIiZsZTtcIixcIuKJpVwiOlwiJmdlO1wiLFwi4oqCXCI6XCImc3ViO1wiLFwi4oqDXCI6XCImc3VwO1wiLFwi4oqEXCI6XCImbnN1YjtcIixcIuKKhlwiOlwiJnN1YmU7XCIsXCLiiodcIjpcIiZzdXBlO1wiLFwi4oqVXCI6XCImb3BsdXM7XCIsXCLiipdcIjpcIiZvdGltZXM7XCIsXCLiiqVcIjpcIiZwZXJwO1wiLFwi4ouFXCI6XCImc2RvdDtcIixcIuKMiFwiOlwiJmxjZWlsO1wiLFwi4oyJXCI6XCImcmNlaWw7XCIsXCLijIpcIjpcIiZsZmxvb3I7XCIsXCLijItcIjpcIiZyZmxvb3I7XCIsXCLijKlcIjpcIiZsYW5nO1wiLFwi4oyqXCI6XCImcmFuZztcIixcIuKXilwiOlwiJmxvejtcIixcIuKZoFwiOlwiJnNwYWRlcztcIixcIuKZo1wiOlwiJmNsdWJzO1wiLFwi4pmlXCI6XCImaGVhcnRzO1wiLFwi4pmmXCI6XCImZGlhbXM7XCJ9fSxodG1sNTp7ZW50aXRpZXM6e1wiJkFFbGlnXCI6XCLDhlwiLFwiJkFFbGlnO1wiOlwiw4ZcIixcIiZBTVBcIjpcIiZcIixcIiZBTVA7XCI6XCImXCIsXCImQWFjdXRlXCI6XCLDgVwiLFwiJkFhY3V0ZTtcIjpcIsOBXCIsXCImQWJyZXZlO1wiOlwixIJcIixcIiZBY2lyY1wiOlwiw4JcIixcIiZBY2lyYztcIjpcIsOCXCIsXCImQWN5O1wiOlwi0JBcIixcIiZBZnI7XCI6XCLwnZSEXCIsXCImQWdyYXZlXCI6XCLDgFwiLFwiJkFncmF2ZTtcIjpcIsOAXCIsXCImQWxwaGE7XCI6XCLOkVwiLFwiJkFtYWNyO1wiOlwixIBcIixcIiZBbmQ7XCI6XCLiqZNcIixcIiZBb2dvbjtcIjpcIsSEXCIsXCImQW9wZjtcIjpcIvCdlLhcIixcIiZBcHBseUZ1bmN0aW9uO1wiOlwi4oGhXCIsXCImQXJpbmdcIjpcIsOFXCIsXCImQXJpbmc7XCI6XCLDhVwiLFwiJkFzY3I7XCI6XCLwnZKcXCIsXCImQXNzaWduO1wiOlwi4omUXCIsXCImQXRpbGRlXCI6XCLDg1wiLFwiJkF0aWxkZTtcIjpcIsODXCIsXCImQXVtbFwiOlwiw4RcIixcIiZBdW1sO1wiOlwiw4RcIixcIiZCYWNrc2xhc2g7XCI6XCLiiJZcIixcIiZCYXJ2O1wiOlwi4qunXCIsXCImQmFyd2VkO1wiOlwi4oyGXCIsXCImQmN5O1wiOlwi0JFcIixcIiZCZWNhdXNlO1wiOlwi4oi1XCIsXCImQmVybm91bGxpcztcIjpcIuKErFwiLFwiJkJldGE7XCI6XCLOklwiLFwiJkJmcjtcIjpcIvCdlIVcIixcIiZCb3BmO1wiOlwi8J2UuVwiLFwiJkJyZXZlO1wiOlwiy5hcIixcIiZCc2NyO1wiOlwi4oSsXCIsXCImQnVtcGVxO1wiOlwi4omOXCIsXCImQ0hjeTtcIjpcItCnXCIsXCImQ09QWVwiOlwiwqlcIixcIiZDT1BZO1wiOlwiwqlcIixcIiZDYWN1dGU7XCI6XCLEhlwiLFwiJkNhcDtcIjpcIuKLklwiLFwiJkNhcGl0YWxEaWZmZXJlbnRpYWxEO1wiOlwi4oWFXCIsXCImQ2F5bGV5cztcIjpcIuKErVwiLFwiJkNjYXJvbjtcIjpcIsSMXCIsXCImQ2NlZGlsXCI6XCLDh1wiLFwiJkNjZWRpbDtcIjpcIsOHXCIsXCImQ2NpcmM7XCI6XCLEiFwiLFwiJkNjb25pbnQ7XCI6XCLiiLBcIixcIiZDZG90O1wiOlwixIpcIixcIiZDZWRpbGxhO1wiOlwiwrhcIixcIiZDZW50ZXJEb3Q7XCI6XCLCt1wiLFwiJkNmcjtcIjpcIuKErVwiLFwiJkNoaTtcIjpcIs6nXCIsXCImQ2lyY2xlRG90O1wiOlwi4oqZXCIsXCImQ2lyY2xlTWludXM7XCI6XCLiipZcIixcIiZDaXJjbGVQbHVzO1wiOlwi4oqVXCIsXCImQ2lyY2xlVGltZXM7XCI6XCLiipdcIixcIiZDbG9ja3dpc2VDb250b3VySW50ZWdyYWw7XCI6XCLiiLJcIixcIiZDbG9zZUN1cmx5RG91YmxlUXVvdGU7XCI6XCLigJ1cIixcIiZDbG9zZUN1cmx5UXVvdGU7XCI6XCLigJlcIixcIiZDb2xvbjtcIjpcIuKIt1wiLFwiJkNvbG9uZTtcIjpcIuKptFwiLFwiJkNvbmdydWVudDtcIjpcIuKJoVwiLFwiJkNvbmludDtcIjpcIuKIr1wiLFwiJkNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIrlwiLFwiJkNvcGY7XCI6XCLihIJcIixcIiZDb3Byb2R1Y3Q7XCI6XCLiiJBcIixcIiZDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsO1wiOlwi4oizXCIsXCImQ3Jvc3M7XCI6XCLiqK9cIixcIiZDc2NyO1wiOlwi8J2SnlwiLFwiJkN1cDtcIjpcIuKLk1wiLFwiJkN1cENhcDtcIjpcIuKJjVwiLFwiJkREO1wiOlwi4oWFXCIsXCImRERvdHJhaGQ7XCI6XCLipJFcIixcIiZESmN5O1wiOlwi0IJcIixcIiZEU2N5O1wiOlwi0IVcIixcIiZEWmN5O1wiOlwi0I9cIixcIiZEYWdnZXI7XCI6XCLigKFcIixcIiZEYXJyO1wiOlwi4oahXCIsXCImRGFzaHY7XCI6XCLiq6RcIixcIiZEY2Fyb247XCI6XCLEjlwiLFwiJkRjeTtcIjpcItCUXCIsXCImRGVsO1wiOlwi4oiHXCIsXCImRGVsdGE7XCI6XCLOlFwiLFwiJkRmcjtcIjpcIvCdlIdcIixcIiZEaWFjcml0aWNhbEFjdXRlO1wiOlwiwrRcIixcIiZEaWFjcml0aWNhbERvdDtcIjpcIsuZXCIsXCImRGlhY3JpdGljYWxEb3VibGVBY3V0ZTtcIjpcIsudXCIsXCImRGlhY3JpdGljYWxHcmF2ZTtcIjpcImBcIixcIiZEaWFjcml0aWNhbFRpbGRlO1wiOlwiy5xcIixcIiZEaWFtb25kO1wiOlwi4ouEXCIsXCImRGlmZmVyZW50aWFsRDtcIjpcIuKFhlwiLFwiJkRvcGY7XCI6XCLwnZS7XCIsXCImRG90O1wiOlwiwqhcIixcIiZEb3REb3Q7XCI6XCLig5xcIixcIiZEb3RFcXVhbDtcIjpcIuKJkFwiLFwiJkRvdWJsZUNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIr1wiLFwiJkRvdWJsZURvdDtcIjpcIsKoXCIsXCImRG91YmxlRG93bkFycm93O1wiOlwi4oeTXCIsXCImRG91YmxlTGVmdEFycm93O1wiOlwi4oeQXCIsXCImRG91YmxlTGVmdFJpZ2h0QXJyb3c7XCI6XCLih5RcIixcIiZEb3VibGVMZWZ0VGVlO1wiOlwi4qukXCIsXCImRG91YmxlTG9uZ0xlZnRBcnJvdztcIjpcIuKfuFwiLFwiJkRvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvdztcIjpcIuKfulwiLFwiJkRvdWJsZUxvbmdSaWdodEFycm93O1wiOlwi4p+5XCIsXCImRG91YmxlUmlnaHRBcnJvdztcIjpcIuKHklwiLFwiJkRvdWJsZVJpZ2h0VGVlO1wiOlwi4oqoXCIsXCImRG91YmxlVXBBcnJvdztcIjpcIuKHkVwiLFwiJkRvdWJsZVVwRG93bkFycm93O1wiOlwi4oeVXCIsXCImRG91YmxlVmVydGljYWxCYXI7XCI6XCLiiKVcIixcIiZEb3duQXJyb3c7XCI6XCLihpNcIixcIiZEb3duQXJyb3dCYXI7XCI6XCLipJNcIixcIiZEb3duQXJyb3dVcEFycm93O1wiOlwi4oe1XCIsXCImRG93bkJyZXZlO1wiOlwizJFcIixcIiZEb3duTGVmdFJpZ2h0VmVjdG9yO1wiOlwi4qWQXCIsXCImRG93bkxlZnRUZWVWZWN0b3I7XCI6XCLipZ5cIixcIiZEb3duTGVmdFZlY3RvcjtcIjpcIuKGvVwiLFwiJkRvd25MZWZ0VmVjdG9yQmFyO1wiOlwi4qWWXCIsXCImRG93blJpZ2h0VGVlVmVjdG9yO1wiOlwi4qWfXCIsXCImRG93blJpZ2h0VmVjdG9yO1wiOlwi4oeBXCIsXCImRG93blJpZ2h0VmVjdG9yQmFyO1wiOlwi4qWXXCIsXCImRG93blRlZTtcIjpcIuKKpFwiLFwiJkRvd25UZWVBcnJvdztcIjpcIuKGp1wiLFwiJkRvd25hcnJvdztcIjpcIuKHk1wiLFwiJkRzY3I7XCI6XCLwnZKfXCIsXCImRHN0cm9rO1wiOlwixJBcIixcIiZFTkc7XCI6XCLFilwiLFwiJkVUSFwiOlwiw5BcIixcIiZFVEg7XCI6XCLDkFwiLFwiJkVhY3V0ZVwiOlwiw4lcIixcIiZFYWN1dGU7XCI6XCLDiVwiLFwiJkVjYXJvbjtcIjpcIsSaXCIsXCImRWNpcmNcIjpcIsOKXCIsXCImRWNpcmM7XCI6XCLDilwiLFwiJkVjeTtcIjpcItCtXCIsXCImRWRvdDtcIjpcIsSWXCIsXCImRWZyO1wiOlwi8J2UiFwiLFwiJkVncmF2ZVwiOlwiw4hcIixcIiZFZ3JhdmU7XCI6XCLDiFwiLFwiJkVsZW1lbnQ7XCI6XCLiiIhcIixcIiZFbWFjcjtcIjpcIsSSXCIsXCImRW1wdHlTbWFsbFNxdWFyZTtcIjpcIuKXu1wiLFwiJkVtcHR5VmVyeVNtYWxsU3F1YXJlO1wiOlwi4parXCIsXCImRW9nb247XCI6XCLEmFwiLFwiJkVvcGY7XCI6XCLwnZS8XCIsXCImRXBzaWxvbjtcIjpcIs6VXCIsXCImRXF1YWw7XCI6XCLiqbVcIixcIiZFcXVhbFRpbGRlO1wiOlwi4omCXCIsXCImRXF1aWxpYnJpdW07XCI6XCLih4xcIixcIiZFc2NyO1wiOlwi4oSwXCIsXCImRXNpbTtcIjpcIuKps1wiLFwiJkV0YTtcIjpcIs6XXCIsXCImRXVtbFwiOlwiw4tcIixcIiZFdW1sO1wiOlwiw4tcIixcIiZFeGlzdHM7XCI6XCLiiINcIixcIiZFeHBvbmVudGlhbEU7XCI6XCLihYdcIixcIiZGY3k7XCI6XCLQpFwiLFwiJkZmcjtcIjpcIvCdlIlcIixcIiZGaWxsZWRTbWFsbFNxdWFyZTtcIjpcIuKXvFwiLFwiJkZpbGxlZFZlcnlTbWFsbFNxdWFyZTtcIjpcIuKWqlwiLFwiJkZvcGY7XCI6XCLwnZS9XCIsXCImRm9yQWxsO1wiOlwi4oiAXCIsXCImRm91cmllcnRyZjtcIjpcIuKEsVwiLFwiJkZzY3I7XCI6XCLihLFcIixcIiZHSmN5O1wiOlwi0INcIixcIiZHVFwiOlwiPlwiLFwiJkdUO1wiOlwiPlwiLFwiJkdhbW1hO1wiOlwizpNcIixcIiZHYW1tYWQ7XCI6XCLPnFwiLFwiJkdicmV2ZTtcIjpcIsSeXCIsXCImR2NlZGlsO1wiOlwixKJcIixcIiZHY2lyYztcIjpcIsScXCIsXCImR2N5O1wiOlwi0JNcIixcIiZHZG90O1wiOlwixKBcIixcIiZHZnI7XCI6XCLwnZSKXCIsXCImR2c7XCI6XCLii5lcIixcIiZHb3BmO1wiOlwi8J2UvlwiLFwiJkdyZWF0ZXJFcXVhbDtcIjpcIuKJpVwiLFwiJkdyZWF0ZXJFcXVhbExlc3M7XCI6XCLii5tcIixcIiZHcmVhdGVyRnVsbEVxdWFsO1wiOlwi4omnXCIsXCImR3JlYXRlckdyZWF0ZXI7XCI6XCLiqqJcIixcIiZHcmVhdGVyTGVzcztcIjpcIuKJt1wiLFwiJkdyZWF0ZXJTbGFudEVxdWFsO1wiOlwi4qm+XCIsXCImR3JlYXRlclRpbGRlO1wiOlwi4omzXCIsXCImR3NjcjtcIjpcIvCdkqJcIixcIiZHdDtcIjpcIuKJq1wiLFwiJkhBUkRjeTtcIjpcItCqXCIsXCImSGFjZWs7XCI6XCLLh1wiLFwiJkhhdDtcIjpcIl5cIixcIiZIY2lyYztcIjpcIsSkXCIsXCImSGZyO1wiOlwi4oSMXCIsXCImSGlsYmVydFNwYWNlO1wiOlwi4oSLXCIsXCImSG9wZjtcIjpcIuKEjVwiLFwiJkhvcml6b250YWxMaW5lO1wiOlwi4pSAXCIsXCImSHNjcjtcIjpcIuKEi1wiLFwiJkhzdHJvaztcIjpcIsSmXCIsXCImSHVtcERvd25IdW1wO1wiOlwi4omOXCIsXCImSHVtcEVxdWFsO1wiOlwi4omPXCIsXCImSUVjeTtcIjpcItCVXCIsXCImSUpsaWc7XCI6XCLEslwiLFwiJklPY3k7XCI6XCLQgVwiLFwiJklhY3V0ZVwiOlwiw41cIixcIiZJYWN1dGU7XCI6XCLDjVwiLFwiJkljaXJjXCI6XCLDjlwiLFwiJkljaXJjO1wiOlwiw45cIixcIiZJY3k7XCI6XCLQmFwiLFwiJklkb3Q7XCI6XCLEsFwiLFwiJklmcjtcIjpcIuKEkVwiLFwiJklncmF2ZVwiOlwiw4xcIixcIiZJZ3JhdmU7XCI6XCLDjFwiLFwiJkltO1wiOlwi4oSRXCIsXCImSW1hY3I7XCI6XCLEqlwiLFwiJkltYWdpbmFyeUk7XCI6XCLihYhcIixcIiZJbXBsaWVzO1wiOlwi4oeSXCIsXCImSW50O1wiOlwi4oisXCIsXCImSW50ZWdyYWw7XCI6XCLiiKtcIixcIiZJbnRlcnNlY3Rpb247XCI6XCLii4JcIixcIiZJbnZpc2libGVDb21tYTtcIjpcIuKBo1wiLFwiJkludmlzaWJsZVRpbWVzO1wiOlwi4oGiXCIsXCImSW9nb247XCI6XCLErlwiLFwiJklvcGY7XCI6XCLwnZWAXCIsXCImSW90YTtcIjpcIs6ZXCIsXCImSXNjcjtcIjpcIuKEkFwiLFwiJkl0aWxkZTtcIjpcIsSoXCIsXCImSXVrY3k7XCI6XCLQhlwiLFwiJkl1bWxcIjpcIsOPXCIsXCImSXVtbDtcIjpcIsOPXCIsXCImSmNpcmM7XCI6XCLEtFwiLFwiJkpjeTtcIjpcItCZXCIsXCImSmZyO1wiOlwi8J2UjVwiLFwiJkpvcGY7XCI6XCLwnZWBXCIsXCImSnNjcjtcIjpcIvCdkqVcIixcIiZKc2VyY3k7XCI6XCLQiFwiLFwiJkp1a2N5O1wiOlwi0IRcIixcIiZLSGN5O1wiOlwi0KVcIixcIiZLSmN5O1wiOlwi0IxcIixcIiZLYXBwYTtcIjpcIs6aXCIsXCImS2NlZGlsO1wiOlwixLZcIixcIiZLY3k7XCI6XCLQmlwiLFwiJktmcjtcIjpcIvCdlI5cIixcIiZLb3BmO1wiOlwi8J2VglwiLFwiJktzY3I7XCI6XCLwnZKmXCIsXCImTEpjeTtcIjpcItCJXCIsXCImTFRcIjpcIjxcIixcIiZMVDtcIjpcIjxcIixcIiZMYWN1dGU7XCI6XCLEuVwiLFwiJkxhbWJkYTtcIjpcIs6bXCIsXCImTGFuZztcIjpcIuKfqlwiLFwiJkxhcGxhY2V0cmY7XCI6XCLihJJcIixcIiZMYXJyO1wiOlwi4oaeXCIsXCImTGNhcm9uO1wiOlwixL1cIixcIiZMY2VkaWw7XCI6XCLEu1wiLFwiJkxjeTtcIjpcItCbXCIsXCImTGVmdEFuZ2xlQnJhY2tldDtcIjpcIuKfqFwiLFwiJkxlZnRBcnJvdztcIjpcIuKGkFwiLFwiJkxlZnRBcnJvd0JhcjtcIjpcIuKHpFwiLFwiJkxlZnRBcnJvd1JpZ2h0QXJyb3c7XCI6XCLih4ZcIixcIiZMZWZ0Q2VpbGluZztcIjpcIuKMiFwiLFwiJkxlZnREb3VibGVCcmFja2V0O1wiOlwi4p+mXCIsXCImTGVmdERvd25UZWVWZWN0b3I7XCI6XCLipaFcIixcIiZMZWZ0RG93blZlY3RvcjtcIjpcIuKHg1wiLFwiJkxlZnREb3duVmVjdG9yQmFyO1wiOlwi4qWZXCIsXCImTGVmdEZsb29yO1wiOlwi4oyKXCIsXCImTGVmdFJpZ2h0QXJyb3c7XCI6XCLihpRcIixcIiZMZWZ0UmlnaHRWZWN0b3I7XCI6XCLipY5cIixcIiZMZWZ0VGVlO1wiOlwi4oqjXCIsXCImTGVmdFRlZUFycm93O1wiOlwi4oakXCIsXCImTGVmdFRlZVZlY3RvcjtcIjpcIuKlmlwiLFwiJkxlZnRUcmlhbmdsZTtcIjpcIuKKslwiLFwiJkxlZnRUcmlhbmdsZUJhcjtcIjpcIuKnj1wiLFwiJkxlZnRUcmlhbmdsZUVxdWFsO1wiOlwi4oq0XCIsXCImTGVmdFVwRG93blZlY3RvcjtcIjpcIuKlkVwiLFwiJkxlZnRVcFRlZVZlY3RvcjtcIjpcIuKloFwiLFwiJkxlZnRVcFZlY3RvcjtcIjpcIuKGv1wiLFwiJkxlZnRVcFZlY3RvckJhcjtcIjpcIuKlmFwiLFwiJkxlZnRWZWN0b3I7XCI6XCLihrxcIixcIiZMZWZ0VmVjdG9yQmFyO1wiOlwi4qWSXCIsXCImTGVmdGFycm93O1wiOlwi4oeQXCIsXCImTGVmdHJpZ2h0YXJyb3c7XCI6XCLih5RcIixcIiZMZXNzRXF1YWxHcmVhdGVyO1wiOlwi4ouaXCIsXCImTGVzc0Z1bGxFcXVhbDtcIjpcIuKJplwiLFwiJkxlc3NHcmVhdGVyO1wiOlwi4om2XCIsXCImTGVzc0xlc3M7XCI6XCLiqqFcIixcIiZMZXNzU2xhbnRFcXVhbDtcIjpcIuKpvVwiLFwiJkxlc3NUaWxkZTtcIjpcIuKJslwiLFwiJkxmcjtcIjpcIvCdlI9cIixcIiZMbDtcIjpcIuKLmFwiLFwiJkxsZWZ0YXJyb3c7XCI6XCLih5pcIixcIiZMbWlkb3Q7XCI6XCLEv1wiLFwiJkxvbmdMZWZ0QXJyb3c7XCI6XCLin7VcIixcIiZMb25nTGVmdFJpZ2h0QXJyb3c7XCI6XCLin7dcIixcIiZMb25nUmlnaHRBcnJvdztcIjpcIuKftlwiLFwiJkxvbmdsZWZ0YXJyb3c7XCI6XCLin7hcIixcIiZMb25nbGVmdHJpZ2h0YXJyb3c7XCI6XCLin7pcIixcIiZMb25ncmlnaHRhcnJvdztcIjpcIuKfuVwiLFwiJkxvcGY7XCI6XCLwnZWDXCIsXCImTG93ZXJMZWZ0QXJyb3c7XCI6XCLihplcIixcIiZMb3dlclJpZ2h0QXJyb3c7XCI6XCLihphcIixcIiZMc2NyO1wiOlwi4oSSXCIsXCImTHNoO1wiOlwi4oawXCIsXCImTHN0cm9rO1wiOlwixYFcIixcIiZMdDtcIjpcIuKJqlwiLFwiJk1hcDtcIjpcIuKkhVwiLFwiJk1jeTtcIjpcItCcXCIsXCImTWVkaXVtU3BhY2U7XCI6XCLigZ9cIixcIiZNZWxsaW50cmY7XCI6XCLihLNcIixcIiZNZnI7XCI6XCLwnZSQXCIsXCImTWludXNQbHVzO1wiOlwi4oiTXCIsXCImTW9wZjtcIjpcIvCdlYRcIixcIiZNc2NyO1wiOlwi4oSzXCIsXCImTXU7XCI6XCLOnFwiLFwiJk5KY3k7XCI6XCLQilwiLFwiJk5hY3V0ZTtcIjpcIsWDXCIsXCImTmNhcm9uO1wiOlwixYdcIixcIiZOY2VkaWw7XCI6XCLFhVwiLFwiJk5jeTtcIjpcItCdXCIsXCImTmVnYXRpdmVNZWRpdW1TcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVGhpY2tTcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVGhpblNwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVWZXJ5VGhpblNwYWNlO1wiOlwi4oCLXCIsXCImTmVzdGVkR3JlYXRlckdyZWF0ZXI7XCI6XCLiiatcIixcIiZOZXN0ZWRMZXNzTGVzcztcIjpcIuKJqlwiLFwiJk5ld0xpbmU7XCI6XCJcXG5cIixcIiZOZnI7XCI6XCLwnZSRXCIsXCImTm9CcmVhaztcIjpcIuKBoFwiLFwiJk5vbkJyZWFraW5nU3BhY2U7XCI6XCLCoFwiLFwiJk5vcGY7XCI6XCLihJVcIixcIiZOb3Q7XCI6XCLiq6xcIixcIiZOb3RDb25ncnVlbnQ7XCI6XCLiiaJcIixcIiZOb3RDdXBDYXA7XCI6XCLiia1cIixcIiZOb3REb3VibGVWZXJ0aWNhbEJhcjtcIjpcIuKIplwiLFwiJk5vdEVsZW1lbnQ7XCI6XCLiiIlcIixcIiZOb3RFcXVhbDtcIjpcIuKJoFwiLFwiJk5vdEVxdWFsVGlsZGU7XCI6XCLiiYLMuFwiLFwiJk5vdEV4aXN0cztcIjpcIuKIhFwiLFwiJk5vdEdyZWF0ZXI7XCI6XCLiia9cIixcIiZOb3RHcmVhdGVyRXF1YWw7XCI6XCLiibFcIixcIiZOb3RHcmVhdGVyRnVsbEVxdWFsO1wiOlwi4omnzLhcIixcIiZOb3RHcmVhdGVyR3JlYXRlcjtcIjpcIuKJq8y4XCIsXCImTm90R3JlYXRlckxlc3M7XCI6XCLiiblcIixcIiZOb3RHcmVhdGVyU2xhbnRFcXVhbDtcIjpcIuKpvsy4XCIsXCImTm90R3JlYXRlclRpbGRlO1wiOlwi4om1XCIsXCImTm90SHVtcERvd25IdW1wO1wiOlwi4omOzLhcIixcIiZOb3RIdW1wRXF1YWw7XCI6XCLiiY/MuFwiLFwiJk5vdExlZnRUcmlhbmdsZTtcIjpcIuKLqlwiLFwiJk5vdExlZnRUcmlhbmdsZUJhcjtcIjpcIuKnj8y4XCIsXCImTm90TGVmdFRyaWFuZ2xlRXF1YWw7XCI6XCLii6xcIixcIiZOb3RMZXNzO1wiOlwi4omuXCIsXCImTm90TGVzc0VxdWFsO1wiOlwi4omwXCIsXCImTm90TGVzc0dyZWF0ZXI7XCI6XCLiibhcIixcIiZOb3RMZXNzTGVzcztcIjpcIuKJqsy4XCIsXCImTm90TGVzc1NsYW50RXF1YWw7XCI6XCLiqb3MuFwiLFwiJk5vdExlc3NUaWxkZTtcIjpcIuKJtFwiLFwiJk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyO1wiOlwi4qqizLhcIixcIiZOb3ROZXN0ZWRMZXNzTGVzcztcIjpcIuKqocy4XCIsXCImTm90UHJlY2VkZXM7XCI6XCLiioBcIixcIiZOb3RQcmVjZWRlc0VxdWFsO1wiOlwi4qqvzLhcIixcIiZOb3RQcmVjZWRlc1NsYW50RXF1YWw7XCI6XCLii6BcIixcIiZOb3RSZXZlcnNlRWxlbWVudDtcIjpcIuKIjFwiLFwiJk5vdFJpZ2h0VHJpYW5nbGU7XCI6XCLii6tcIixcIiZOb3RSaWdodFRyaWFuZ2xlQmFyO1wiOlwi4qeQzLhcIixcIiZOb3RSaWdodFRyaWFuZ2xlRXF1YWw7XCI6XCLii61cIixcIiZOb3RTcXVhcmVTdWJzZXQ7XCI6XCLiio/MuFwiLFwiJk5vdFNxdWFyZVN1YnNldEVxdWFsO1wiOlwi4ouiXCIsXCImTm90U3F1YXJlU3VwZXJzZXQ7XCI6XCLiipDMuFwiLFwiJk5vdFNxdWFyZVN1cGVyc2V0RXF1YWw7XCI6XCLii6NcIixcIiZOb3RTdWJzZXQ7XCI6XCLiioLig5JcIixcIiZOb3RTdWJzZXRFcXVhbDtcIjpcIuKKiFwiLFwiJk5vdFN1Y2NlZWRzO1wiOlwi4oqBXCIsXCImTm90U3VjY2VlZHNFcXVhbDtcIjpcIuKqsMy4XCIsXCImTm90U3VjY2VlZHNTbGFudEVxdWFsO1wiOlwi4ouhXCIsXCImTm90U3VjY2VlZHNUaWxkZTtcIjpcIuKJv8y4XCIsXCImTm90U3VwZXJzZXQ7XCI6XCLiioPig5JcIixcIiZOb3RTdXBlcnNldEVxdWFsO1wiOlwi4oqJXCIsXCImTm90VGlsZGU7XCI6XCLiiYFcIixcIiZOb3RUaWxkZUVxdWFsO1wiOlwi4omEXCIsXCImTm90VGlsZGVGdWxsRXF1YWw7XCI6XCLiiYdcIixcIiZOb3RUaWxkZVRpbGRlO1wiOlwi4omJXCIsXCImTm90VmVydGljYWxCYXI7XCI6XCLiiKRcIixcIiZOc2NyO1wiOlwi8J2SqVwiLFwiJk50aWxkZVwiOlwiw5FcIixcIiZOdGlsZGU7XCI6XCLDkVwiLFwiJk51O1wiOlwizp1cIixcIiZPRWxpZztcIjpcIsWSXCIsXCImT2FjdXRlXCI6XCLDk1wiLFwiJk9hY3V0ZTtcIjpcIsOTXCIsXCImT2NpcmNcIjpcIsOUXCIsXCImT2NpcmM7XCI6XCLDlFwiLFwiJk9jeTtcIjpcItCeXCIsXCImT2RibGFjO1wiOlwixZBcIixcIiZPZnI7XCI6XCLwnZSSXCIsXCImT2dyYXZlXCI6XCLDklwiLFwiJk9ncmF2ZTtcIjpcIsOSXCIsXCImT21hY3I7XCI6XCLFjFwiLFwiJk9tZWdhO1wiOlwizqlcIixcIiZPbWljcm9uO1wiOlwizp9cIixcIiZPb3BmO1wiOlwi8J2VhlwiLFwiJk9wZW5DdXJseURvdWJsZVF1b3RlO1wiOlwi4oCcXCIsXCImT3BlbkN1cmx5UXVvdGU7XCI6XCLigJhcIixcIiZPcjtcIjpcIuKplFwiLFwiJk9zY3I7XCI6XCLwnZKqXCIsXCImT3NsYXNoXCI6XCLDmFwiLFwiJk9zbGFzaDtcIjpcIsOYXCIsXCImT3RpbGRlXCI6XCLDlVwiLFwiJk90aWxkZTtcIjpcIsOVXCIsXCImT3RpbWVzO1wiOlwi4qi3XCIsXCImT3VtbFwiOlwiw5ZcIixcIiZPdW1sO1wiOlwiw5ZcIixcIiZPdmVyQmFyO1wiOlwi4oC+XCIsXCImT3ZlckJyYWNlO1wiOlwi4o+eXCIsXCImT3ZlckJyYWNrZXQ7XCI6XCLijrRcIixcIiZPdmVyUGFyZW50aGVzaXM7XCI6XCLij5xcIixcIiZQYXJ0aWFsRDtcIjpcIuKIglwiLFwiJlBjeTtcIjpcItCfXCIsXCImUGZyO1wiOlwi8J2Uk1wiLFwiJlBoaTtcIjpcIs6mXCIsXCImUGk7XCI6XCLOoFwiLFwiJlBsdXNNaW51cztcIjpcIsKxXCIsXCImUG9pbmNhcmVwbGFuZTtcIjpcIuKEjFwiLFwiJlBvcGY7XCI6XCLihJlcIixcIiZQcjtcIjpcIuKqu1wiLFwiJlByZWNlZGVzO1wiOlwi4om6XCIsXCImUHJlY2VkZXNFcXVhbDtcIjpcIuKqr1wiLFwiJlByZWNlZGVzU2xhbnRFcXVhbDtcIjpcIuKJvFwiLFwiJlByZWNlZGVzVGlsZGU7XCI6XCLiib5cIixcIiZQcmltZTtcIjpcIuKAs1wiLFwiJlByb2R1Y3Q7XCI6XCLiiI9cIixcIiZQcm9wb3J0aW9uO1wiOlwi4oi3XCIsXCImUHJvcG9ydGlvbmFsO1wiOlwi4oidXCIsXCImUHNjcjtcIjpcIvCdkqtcIixcIiZQc2k7XCI6XCLOqFwiLFwiJlFVT1RcIjonXCInLFwiJlFVT1Q7XCI6J1wiJyxcIiZRZnI7XCI6XCLwnZSUXCIsXCImUW9wZjtcIjpcIuKEmlwiLFwiJlFzY3I7XCI6XCLwnZKsXCIsXCImUkJhcnI7XCI6XCLipJBcIixcIiZSRUdcIjpcIsKuXCIsXCImUkVHO1wiOlwiwq5cIixcIiZSYWN1dGU7XCI6XCLFlFwiLFwiJlJhbmc7XCI6XCLin6tcIixcIiZSYXJyO1wiOlwi4oagXCIsXCImUmFycnRsO1wiOlwi4qSWXCIsXCImUmNhcm9uO1wiOlwixZhcIixcIiZSY2VkaWw7XCI6XCLFllwiLFwiJlJjeTtcIjpcItCgXCIsXCImUmU7XCI6XCLihJxcIixcIiZSZXZlcnNlRWxlbWVudDtcIjpcIuKIi1wiLFwiJlJldmVyc2VFcXVpbGlicml1bTtcIjpcIuKHi1wiLFwiJlJldmVyc2VVcEVxdWlsaWJyaXVtO1wiOlwi4qWvXCIsXCImUmZyO1wiOlwi4oScXCIsXCImUmhvO1wiOlwizqFcIixcIiZSaWdodEFuZ2xlQnJhY2tldDtcIjpcIuKfqVwiLFwiJlJpZ2h0QXJyb3c7XCI6XCLihpJcIixcIiZSaWdodEFycm93QmFyO1wiOlwi4oelXCIsXCImUmlnaHRBcnJvd0xlZnRBcnJvdztcIjpcIuKHhFwiLFwiJlJpZ2h0Q2VpbGluZztcIjpcIuKMiVwiLFwiJlJpZ2h0RG91YmxlQnJhY2tldDtcIjpcIuKfp1wiLFwiJlJpZ2h0RG93blRlZVZlY3RvcjtcIjpcIuKlnVwiLFwiJlJpZ2h0RG93blZlY3RvcjtcIjpcIuKHglwiLFwiJlJpZ2h0RG93blZlY3RvckJhcjtcIjpcIuKllVwiLFwiJlJpZ2h0Rmxvb3I7XCI6XCLijItcIixcIiZSaWdodFRlZTtcIjpcIuKKolwiLFwiJlJpZ2h0VGVlQXJyb3c7XCI6XCLihqZcIixcIiZSaWdodFRlZVZlY3RvcjtcIjpcIuKlm1wiLFwiJlJpZ2h0VHJpYW5nbGU7XCI6XCLiirNcIixcIiZSaWdodFRyaWFuZ2xlQmFyO1wiOlwi4qeQXCIsXCImUmlnaHRUcmlhbmdsZUVxdWFsO1wiOlwi4oq1XCIsXCImUmlnaHRVcERvd25WZWN0b3I7XCI6XCLipY9cIixcIiZSaWdodFVwVGVlVmVjdG9yO1wiOlwi4qWcXCIsXCImUmlnaHRVcFZlY3RvcjtcIjpcIuKGvlwiLFwiJlJpZ2h0VXBWZWN0b3JCYXI7XCI6XCLipZRcIixcIiZSaWdodFZlY3RvcjtcIjpcIuKHgFwiLFwiJlJpZ2h0VmVjdG9yQmFyO1wiOlwi4qWTXCIsXCImUmlnaHRhcnJvdztcIjpcIuKHklwiLFwiJlJvcGY7XCI6XCLihJ1cIixcIiZSb3VuZEltcGxpZXM7XCI6XCLipbBcIixcIiZScmlnaHRhcnJvdztcIjpcIuKHm1wiLFwiJlJzY3I7XCI6XCLihJtcIixcIiZSc2g7XCI6XCLihrFcIixcIiZSdWxlRGVsYXllZDtcIjpcIuKntFwiLFwiJlNIQ0hjeTtcIjpcItCpXCIsXCImU0hjeTtcIjpcItCoXCIsXCImU09GVGN5O1wiOlwi0KxcIixcIiZTYWN1dGU7XCI6XCLFmlwiLFwiJlNjO1wiOlwi4qq8XCIsXCImU2Nhcm9uO1wiOlwixaBcIixcIiZTY2VkaWw7XCI6XCLFnlwiLFwiJlNjaXJjO1wiOlwixZxcIixcIiZTY3k7XCI6XCLQoVwiLFwiJlNmcjtcIjpcIvCdlJZcIixcIiZTaG9ydERvd25BcnJvdztcIjpcIuKGk1wiLFwiJlNob3J0TGVmdEFycm93O1wiOlwi4oaQXCIsXCImU2hvcnRSaWdodEFycm93O1wiOlwi4oaSXCIsXCImU2hvcnRVcEFycm93O1wiOlwi4oaRXCIsXCImU2lnbWE7XCI6XCLOo1wiLFwiJlNtYWxsQ2lyY2xlO1wiOlwi4oiYXCIsXCImU29wZjtcIjpcIvCdlYpcIixcIiZTcXJ0O1wiOlwi4oiaXCIsXCImU3F1YXJlO1wiOlwi4pahXCIsXCImU3F1YXJlSW50ZXJzZWN0aW9uO1wiOlwi4oqTXCIsXCImU3F1YXJlU3Vic2V0O1wiOlwi4oqPXCIsXCImU3F1YXJlU3Vic2V0RXF1YWw7XCI6XCLiipFcIixcIiZTcXVhcmVTdXBlcnNldDtcIjpcIuKKkFwiLFwiJlNxdWFyZVN1cGVyc2V0RXF1YWw7XCI6XCLiipJcIixcIiZTcXVhcmVVbmlvbjtcIjpcIuKKlFwiLFwiJlNzY3I7XCI6XCLwnZKuXCIsXCImU3RhcjtcIjpcIuKLhlwiLFwiJlN1YjtcIjpcIuKLkFwiLFwiJlN1YnNldDtcIjpcIuKLkFwiLFwiJlN1YnNldEVxdWFsO1wiOlwi4oqGXCIsXCImU3VjY2VlZHM7XCI6XCLiibtcIixcIiZTdWNjZWVkc0VxdWFsO1wiOlwi4qqwXCIsXCImU3VjY2VlZHNTbGFudEVxdWFsO1wiOlwi4om9XCIsXCImU3VjY2VlZHNUaWxkZTtcIjpcIuKJv1wiLFwiJlN1Y2hUaGF0O1wiOlwi4oiLXCIsXCImU3VtO1wiOlwi4oiRXCIsXCImU3VwO1wiOlwi4ouRXCIsXCImU3VwZXJzZXQ7XCI6XCLiioNcIixcIiZTdXBlcnNldEVxdWFsO1wiOlwi4oqHXCIsXCImU3Vwc2V0O1wiOlwi4ouRXCIsXCImVEhPUk5cIjpcIsOeXCIsXCImVEhPUk47XCI6XCLDnlwiLFwiJlRSQURFO1wiOlwi4oSiXCIsXCImVFNIY3k7XCI6XCLQi1wiLFwiJlRTY3k7XCI6XCLQplwiLFwiJlRhYjtcIjpcIlxcdFwiLFwiJlRhdTtcIjpcIs6kXCIsXCImVGNhcm9uO1wiOlwixaRcIixcIiZUY2VkaWw7XCI6XCLFolwiLFwiJlRjeTtcIjpcItCiXCIsXCImVGZyO1wiOlwi8J2Ul1wiLFwiJlRoZXJlZm9yZTtcIjpcIuKItFwiLFwiJlRoZXRhO1wiOlwizphcIixcIiZUaGlja1NwYWNlO1wiOlwi4oGf4oCKXCIsXCImVGhpblNwYWNlO1wiOlwi4oCJXCIsXCImVGlsZGU7XCI6XCLiiLxcIixcIiZUaWxkZUVxdWFsO1wiOlwi4omDXCIsXCImVGlsZGVGdWxsRXF1YWw7XCI6XCLiiYVcIixcIiZUaWxkZVRpbGRlO1wiOlwi4omIXCIsXCImVG9wZjtcIjpcIvCdlYtcIixcIiZUcmlwbGVEb3Q7XCI6XCLig5tcIixcIiZUc2NyO1wiOlwi8J2Sr1wiLFwiJlRzdHJvaztcIjpcIsWmXCIsXCImVWFjdXRlXCI6XCLDmlwiLFwiJlVhY3V0ZTtcIjpcIsOaXCIsXCImVWFycjtcIjpcIuKGn1wiLFwiJlVhcnJvY2lyO1wiOlwi4qWJXCIsXCImVWJyY3k7XCI6XCLQjlwiLFwiJlVicmV2ZTtcIjpcIsWsXCIsXCImVWNpcmNcIjpcIsObXCIsXCImVWNpcmM7XCI6XCLDm1wiLFwiJlVjeTtcIjpcItCjXCIsXCImVWRibGFjO1wiOlwixbBcIixcIiZVZnI7XCI6XCLwnZSYXCIsXCImVWdyYXZlXCI6XCLDmVwiLFwiJlVncmF2ZTtcIjpcIsOZXCIsXCImVW1hY3I7XCI6XCLFqlwiLFwiJlVuZGVyQmFyO1wiOlwiX1wiLFwiJlVuZGVyQnJhY2U7XCI6XCLij59cIixcIiZVbmRlckJyYWNrZXQ7XCI6XCLijrVcIixcIiZVbmRlclBhcmVudGhlc2lzO1wiOlwi4o+dXCIsXCImVW5pb247XCI6XCLii4NcIixcIiZVbmlvblBsdXM7XCI6XCLiio5cIixcIiZVb2dvbjtcIjpcIsWyXCIsXCImVW9wZjtcIjpcIvCdlYxcIixcIiZVcEFycm93O1wiOlwi4oaRXCIsXCImVXBBcnJvd0JhcjtcIjpcIuKkklwiLFwiJlVwQXJyb3dEb3duQXJyb3c7XCI6XCLih4VcIixcIiZVcERvd25BcnJvdztcIjpcIuKGlVwiLFwiJlVwRXF1aWxpYnJpdW07XCI6XCLipa5cIixcIiZVcFRlZTtcIjpcIuKKpVwiLFwiJlVwVGVlQXJyb3c7XCI6XCLihqVcIixcIiZVcGFycm93O1wiOlwi4oeRXCIsXCImVXBkb3duYXJyb3c7XCI6XCLih5VcIixcIiZVcHBlckxlZnRBcnJvdztcIjpcIuKGllwiLFwiJlVwcGVyUmlnaHRBcnJvdztcIjpcIuKGl1wiLFwiJlVwc2k7XCI6XCLPklwiLFwiJlVwc2lsb247XCI6XCLOpVwiLFwiJlVyaW5nO1wiOlwixa5cIixcIiZVc2NyO1wiOlwi8J2SsFwiLFwiJlV0aWxkZTtcIjpcIsWoXCIsXCImVXVtbFwiOlwiw5xcIixcIiZVdW1sO1wiOlwiw5xcIixcIiZWRGFzaDtcIjpcIuKKq1wiLFwiJlZiYXI7XCI6XCLiq6tcIixcIiZWY3k7XCI6XCLQklwiLFwiJlZkYXNoO1wiOlwi4oqpXCIsXCImVmRhc2hsO1wiOlwi4qumXCIsXCImVmVlO1wiOlwi4ouBXCIsXCImVmVyYmFyO1wiOlwi4oCWXCIsXCImVmVydDtcIjpcIuKAllwiLFwiJlZlcnRpY2FsQmFyO1wiOlwi4oijXCIsXCImVmVydGljYWxMaW5lO1wiOlwifFwiLFwiJlZlcnRpY2FsU2VwYXJhdG9yO1wiOlwi4p2YXCIsXCImVmVydGljYWxUaWxkZTtcIjpcIuKJgFwiLFwiJlZlcnlUaGluU3BhY2U7XCI6XCLigIpcIixcIiZWZnI7XCI6XCLwnZSZXCIsXCImVm9wZjtcIjpcIvCdlY1cIixcIiZWc2NyO1wiOlwi8J2SsVwiLFwiJlZ2ZGFzaDtcIjpcIuKKqlwiLFwiJldjaXJjO1wiOlwixbRcIixcIiZXZWRnZTtcIjpcIuKLgFwiLFwiJldmcjtcIjpcIvCdlJpcIixcIiZXb3BmO1wiOlwi8J2VjlwiLFwiJldzY3I7XCI6XCLwnZKyXCIsXCImWGZyO1wiOlwi8J2Um1wiLFwiJlhpO1wiOlwizp5cIixcIiZYb3BmO1wiOlwi8J2Vj1wiLFwiJlhzY3I7XCI6XCLwnZKzXCIsXCImWUFjeTtcIjpcItCvXCIsXCImWUljeTtcIjpcItCHXCIsXCImWVVjeTtcIjpcItCuXCIsXCImWWFjdXRlXCI6XCLDnVwiLFwiJllhY3V0ZTtcIjpcIsOdXCIsXCImWWNpcmM7XCI6XCLFtlwiLFwiJlljeTtcIjpcItCrXCIsXCImWWZyO1wiOlwi8J2UnFwiLFwiJllvcGY7XCI6XCLwnZWQXCIsXCImWXNjcjtcIjpcIvCdkrRcIixcIiZZdW1sO1wiOlwixbhcIixcIiZaSGN5O1wiOlwi0JZcIixcIiZaYWN1dGU7XCI6XCLFuVwiLFwiJlpjYXJvbjtcIjpcIsW9XCIsXCImWmN5O1wiOlwi0JdcIixcIiZaZG90O1wiOlwixbtcIixcIiZaZXJvV2lkdGhTcGFjZTtcIjpcIuKAi1wiLFwiJlpldGE7XCI6XCLOllwiLFwiJlpmcjtcIjpcIuKEqFwiLFwiJlpvcGY7XCI6XCLihKRcIixcIiZac2NyO1wiOlwi8J2StVwiLFwiJmFhY3V0ZVwiOlwiw6FcIixcIiZhYWN1dGU7XCI6XCLDoVwiLFwiJmFicmV2ZTtcIjpcIsSDXCIsXCImYWM7XCI6XCLiiL5cIixcIiZhY0U7XCI6XCLiiL7Ms1wiLFwiJmFjZDtcIjpcIuKIv1wiLFwiJmFjaXJjXCI6XCLDolwiLFwiJmFjaXJjO1wiOlwiw6JcIixcIiZhY3V0ZVwiOlwiwrRcIixcIiZhY3V0ZTtcIjpcIsK0XCIsXCImYWN5O1wiOlwi0LBcIixcIiZhZWxpZ1wiOlwiw6ZcIixcIiZhZWxpZztcIjpcIsOmXCIsXCImYWY7XCI6XCLigaFcIixcIiZhZnI7XCI6XCLwnZSeXCIsXCImYWdyYXZlXCI6XCLDoFwiLFwiJmFncmF2ZTtcIjpcIsOgXCIsXCImYWxlZnN5bTtcIjpcIuKEtVwiLFwiJmFsZXBoO1wiOlwi4oS1XCIsXCImYWxwaGE7XCI6XCLOsVwiLFwiJmFtYWNyO1wiOlwixIFcIixcIiZhbWFsZztcIjpcIuKov1wiLFwiJmFtcFwiOlwiJlwiLFwiJmFtcDtcIjpcIiZcIixcIiZhbmQ7XCI6XCLiiKdcIixcIiZhbmRhbmQ7XCI6XCLiqZVcIixcIiZhbmRkO1wiOlwi4qmcXCIsXCImYW5kc2xvcGU7XCI6XCLiqZhcIixcIiZhbmR2O1wiOlwi4qmaXCIsXCImYW5nO1wiOlwi4oigXCIsXCImYW5nZTtcIjpcIuKmpFwiLFwiJmFuZ2xlO1wiOlwi4oigXCIsXCImYW5nbXNkO1wiOlwi4oihXCIsXCImYW5nbXNkYWE7XCI6XCLipqhcIixcIiZhbmdtc2RhYjtcIjpcIuKmqVwiLFwiJmFuZ21zZGFjO1wiOlwi4qaqXCIsXCImYW5nbXNkYWQ7XCI6XCLipqtcIixcIiZhbmdtc2RhZTtcIjpcIuKmrFwiLFwiJmFuZ21zZGFmO1wiOlwi4qatXCIsXCImYW5nbXNkYWc7XCI6XCLipq5cIixcIiZhbmdtc2RhaDtcIjpcIuKmr1wiLFwiJmFuZ3J0O1wiOlwi4oifXCIsXCImYW5ncnR2YjtcIjpcIuKKvlwiLFwiJmFuZ3J0dmJkO1wiOlwi4qadXCIsXCImYW5nc3BoO1wiOlwi4oiiXCIsXCImYW5nc3Q7XCI6XCLDhVwiLFwiJmFuZ3phcnI7XCI6XCLijbxcIixcIiZhb2dvbjtcIjpcIsSFXCIsXCImYW9wZjtcIjpcIvCdlZJcIixcIiZhcDtcIjpcIuKJiFwiLFwiJmFwRTtcIjpcIuKpsFwiLFwiJmFwYWNpcjtcIjpcIuKpr1wiLFwiJmFwZTtcIjpcIuKJilwiLFwiJmFwaWQ7XCI6XCLiiYtcIixcIiZhcG9zO1wiOlwiJ1wiLFwiJmFwcHJveDtcIjpcIuKJiFwiLFwiJmFwcHJveGVxO1wiOlwi4omKXCIsXCImYXJpbmdcIjpcIsOlXCIsXCImYXJpbmc7XCI6XCLDpVwiLFwiJmFzY3I7XCI6XCLwnZK2XCIsXCImYXN0O1wiOlwiKlwiLFwiJmFzeW1wO1wiOlwi4omIXCIsXCImYXN5bXBlcTtcIjpcIuKJjVwiLFwiJmF0aWxkZVwiOlwiw6NcIixcIiZhdGlsZGU7XCI6XCLDo1wiLFwiJmF1bWxcIjpcIsOkXCIsXCImYXVtbDtcIjpcIsOkXCIsXCImYXdjb25pbnQ7XCI6XCLiiLNcIixcIiZhd2ludDtcIjpcIuKokVwiLFwiJmJOb3Q7XCI6XCLiq61cIixcIiZiYWNrY29uZztcIjpcIuKJjFwiLFwiJmJhY2tlcHNpbG9uO1wiOlwiz7ZcIixcIiZiYWNrcHJpbWU7XCI6XCLigLVcIixcIiZiYWNrc2ltO1wiOlwi4oi9XCIsXCImYmFja3NpbWVxO1wiOlwi4ouNXCIsXCImYmFydmVlO1wiOlwi4oq9XCIsXCImYmFyd2VkO1wiOlwi4oyFXCIsXCImYmFyd2VkZ2U7XCI6XCLijIVcIixcIiZiYnJrO1wiOlwi4o61XCIsXCImYmJya3Ricms7XCI6XCLijrZcIixcIiZiY29uZztcIjpcIuKJjFwiLFwiJmJjeTtcIjpcItCxXCIsXCImYmRxdW87XCI6XCLigJ5cIixcIiZiZWNhdXM7XCI6XCLiiLVcIixcIiZiZWNhdXNlO1wiOlwi4oi1XCIsXCImYmVtcHR5djtcIjpcIuKmsFwiLFwiJmJlcHNpO1wiOlwiz7ZcIixcIiZiZXJub3U7XCI6XCLihKxcIixcIiZiZXRhO1wiOlwizrJcIixcIiZiZXRoO1wiOlwi4oS2XCIsXCImYmV0d2VlbjtcIjpcIuKJrFwiLFwiJmJmcjtcIjpcIvCdlJ9cIixcIiZiaWdjYXA7XCI6XCLii4JcIixcIiZiaWdjaXJjO1wiOlwi4pevXCIsXCImYmlnY3VwO1wiOlwi4ouDXCIsXCImYmlnb2RvdDtcIjpcIuKogFwiLFwiJmJpZ29wbHVzO1wiOlwi4qiBXCIsXCImYmlnb3RpbWVzO1wiOlwi4qiCXCIsXCImYmlnc3FjdXA7XCI6XCLiqIZcIixcIiZiaWdzdGFyO1wiOlwi4piFXCIsXCImYmlndHJpYW5nbGVkb3duO1wiOlwi4pa9XCIsXCImYmlndHJpYW5nbGV1cDtcIjpcIuKWs1wiLFwiJmJpZ3VwbHVzO1wiOlwi4qiEXCIsXCImYmlndmVlO1wiOlwi4ouBXCIsXCImYmlnd2VkZ2U7XCI6XCLii4BcIixcIiZia2Fyb3c7XCI6XCLipI1cIixcIiZibGFja2xvemVuZ2U7XCI6XCLip6tcIixcIiZibGFja3NxdWFyZTtcIjpcIuKWqlwiLFwiJmJsYWNrdHJpYW5nbGU7XCI6XCLilrRcIixcIiZibGFja3RyaWFuZ2xlZG93bjtcIjpcIuKWvlwiLFwiJmJsYWNrdHJpYW5nbGVsZWZ0O1wiOlwi4peCXCIsXCImYmxhY2t0cmlhbmdsZXJpZ2h0O1wiOlwi4pa4XCIsXCImYmxhbms7XCI6XCLikKNcIixcIiZibGsxMjtcIjpcIuKWklwiLFwiJmJsazE0O1wiOlwi4paRXCIsXCImYmxrMzQ7XCI6XCLilpNcIixcIiZibG9jaztcIjpcIuKWiFwiLFwiJmJuZTtcIjpcIj3ig6VcIixcIiZibmVxdWl2O1wiOlwi4omh4oOlXCIsXCImYm5vdDtcIjpcIuKMkFwiLFwiJmJvcGY7XCI6XCLwnZWTXCIsXCImYm90O1wiOlwi4oqlXCIsXCImYm90dG9tO1wiOlwi4oqlXCIsXCImYm93dGllO1wiOlwi4ouIXCIsXCImYm94REw7XCI6XCLilZdcIixcIiZib3hEUjtcIjpcIuKVlFwiLFwiJmJveERsO1wiOlwi4pWWXCIsXCImYm94RHI7XCI6XCLilZNcIixcIiZib3hIO1wiOlwi4pWQXCIsXCImYm94SEQ7XCI6XCLilaZcIixcIiZib3hIVTtcIjpcIuKVqVwiLFwiJmJveEhkO1wiOlwi4pWkXCIsXCImYm94SHU7XCI6XCLiladcIixcIiZib3hVTDtcIjpcIuKVnVwiLFwiJmJveFVSO1wiOlwi4pWaXCIsXCImYm94VWw7XCI6XCLilZxcIixcIiZib3hVcjtcIjpcIuKVmVwiLFwiJmJveFY7XCI6XCLilZFcIixcIiZib3hWSDtcIjpcIuKVrFwiLFwiJmJveFZMO1wiOlwi4pWjXCIsXCImYm94VlI7XCI6XCLilaBcIixcIiZib3hWaDtcIjpcIuKVq1wiLFwiJmJveFZsO1wiOlwi4pWiXCIsXCImYm94VnI7XCI6XCLilZ9cIixcIiZib3hib3g7XCI6XCLip4lcIixcIiZib3hkTDtcIjpcIuKVlVwiLFwiJmJveGRSO1wiOlwi4pWSXCIsXCImYm94ZGw7XCI6XCLilJBcIixcIiZib3hkcjtcIjpcIuKUjFwiLFwiJmJveGg7XCI6XCLilIBcIixcIiZib3hoRDtcIjpcIuKVpVwiLFwiJmJveGhVO1wiOlwi4pWoXCIsXCImYm94aGQ7XCI6XCLilKxcIixcIiZib3hodTtcIjpcIuKUtFwiLFwiJmJveG1pbnVzO1wiOlwi4oqfXCIsXCImYm94cGx1cztcIjpcIuKKnlwiLFwiJmJveHRpbWVzO1wiOlwi4oqgXCIsXCImYm94dUw7XCI6XCLilZtcIixcIiZib3h1UjtcIjpcIuKVmFwiLFwiJmJveHVsO1wiOlwi4pSYXCIsXCImYm94dXI7XCI6XCLilJRcIixcIiZib3h2O1wiOlwi4pSCXCIsXCImYm94dkg7XCI6XCLilapcIixcIiZib3h2TDtcIjpcIuKVoVwiLFwiJmJveHZSO1wiOlwi4pWeXCIsXCImYm94dmg7XCI6XCLilLxcIixcIiZib3h2bDtcIjpcIuKUpFwiLFwiJmJveHZyO1wiOlwi4pScXCIsXCImYnByaW1lO1wiOlwi4oC1XCIsXCImYnJldmU7XCI6XCLLmFwiLFwiJmJydmJhclwiOlwiwqZcIixcIiZicnZiYXI7XCI6XCLCplwiLFwiJmJzY3I7XCI6XCLwnZK3XCIsXCImYnNlbWk7XCI6XCLigY9cIixcIiZic2ltO1wiOlwi4oi9XCIsXCImYnNpbWU7XCI6XCLii41cIixcIiZic29sO1wiOlwiXFxcXFwiLFwiJmJzb2xiO1wiOlwi4qeFXCIsXCImYnNvbGhzdWI7XCI6XCLin4hcIixcIiZidWxsO1wiOlwi4oCiXCIsXCImYnVsbGV0O1wiOlwi4oCiXCIsXCImYnVtcDtcIjpcIuKJjlwiLFwiJmJ1bXBFO1wiOlwi4qquXCIsXCImYnVtcGU7XCI6XCLiiY9cIixcIiZidW1wZXE7XCI6XCLiiY9cIixcIiZjYWN1dGU7XCI6XCLEh1wiLFwiJmNhcDtcIjpcIuKIqVwiLFwiJmNhcGFuZDtcIjpcIuKphFwiLFwiJmNhcGJyY3VwO1wiOlwi4qmJXCIsXCImY2FwY2FwO1wiOlwi4qmLXCIsXCImY2FwY3VwO1wiOlwi4qmHXCIsXCImY2FwZG90O1wiOlwi4qmAXCIsXCImY2FwcztcIjpcIuKIqe+4gFwiLFwiJmNhcmV0O1wiOlwi4oGBXCIsXCImY2Fyb247XCI6XCLLh1wiLFwiJmNjYXBzO1wiOlwi4qmNXCIsXCImY2Nhcm9uO1wiOlwixI1cIixcIiZjY2VkaWxcIjpcIsOnXCIsXCImY2NlZGlsO1wiOlwiw6dcIixcIiZjY2lyYztcIjpcIsSJXCIsXCImY2N1cHM7XCI6XCLiqYxcIixcIiZjY3Vwc3NtO1wiOlwi4qmQXCIsXCImY2RvdDtcIjpcIsSLXCIsXCImY2VkaWxcIjpcIsK4XCIsXCImY2VkaWw7XCI6XCLCuFwiLFwiJmNlbXB0eXY7XCI6XCLiprJcIixcIiZjZW50XCI6XCLColwiLFwiJmNlbnQ7XCI6XCLColwiLFwiJmNlbnRlcmRvdDtcIjpcIsK3XCIsXCImY2ZyO1wiOlwi8J2UoFwiLFwiJmNoY3k7XCI6XCLRh1wiLFwiJmNoZWNrO1wiOlwi4pyTXCIsXCImY2hlY2ttYXJrO1wiOlwi4pyTXCIsXCImY2hpO1wiOlwiz4dcIixcIiZjaXI7XCI6XCLil4tcIixcIiZjaXJFO1wiOlwi4qeDXCIsXCImY2lyYztcIjpcIsuGXCIsXCImY2lyY2VxO1wiOlwi4omXXCIsXCImY2lyY2xlYXJyb3dsZWZ0O1wiOlwi4oa6XCIsXCImY2lyY2xlYXJyb3dyaWdodDtcIjpcIuKGu1wiLFwiJmNpcmNsZWRSO1wiOlwiwq5cIixcIiZjaXJjbGVkUztcIjpcIuKTiFwiLFwiJmNpcmNsZWRhc3Q7XCI6XCLiiptcIixcIiZjaXJjbGVkY2lyYztcIjpcIuKKmlwiLFwiJmNpcmNsZWRkYXNoO1wiOlwi4oqdXCIsXCImY2lyZTtcIjpcIuKJl1wiLFwiJmNpcmZuaW50O1wiOlwi4qiQXCIsXCImY2lybWlkO1wiOlwi4quvXCIsXCImY2lyc2NpcjtcIjpcIuKnglwiLFwiJmNsdWJzO1wiOlwi4pmjXCIsXCImY2x1YnN1aXQ7XCI6XCLimaNcIixcIiZjb2xvbjtcIjpcIjpcIixcIiZjb2xvbmU7XCI6XCLiiZRcIixcIiZjb2xvbmVxO1wiOlwi4omUXCIsXCImY29tbWE7XCI6XCIsXCIsXCImY29tbWF0O1wiOlwiQFwiLFwiJmNvbXA7XCI6XCLiiIFcIixcIiZjb21wZm47XCI6XCLiiJhcIixcIiZjb21wbGVtZW50O1wiOlwi4oiBXCIsXCImY29tcGxleGVzO1wiOlwi4oSCXCIsXCImY29uZztcIjpcIuKJhVwiLFwiJmNvbmdkb3Q7XCI6XCLiqa1cIixcIiZjb25pbnQ7XCI6XCLiiK5cIixcIiZjb3BmO1wiOlwi8J2VlFwiLFwiJmNvcHJvZDtcIjpcIuKIkFwiLFwiJmNvcHlcIjpcIsKpXCIsXCImY29weTtcIjpcIsKpXCIsXCImY29weXNyO1wiOlwi4oSXXCIsXCImY3JhcnI7XCI6XCLihrVcIixcIiZjcm9zcztcIjpcIuKcl1wiLFwiJmNzY3I7XCI6XCLwnZK4XCIsXCImY3N1YjtcIjpcIuKrj1wiLFwiJmNzdWJlO1wiOlwi4quRXCIsXCImY3N1cDtcIjpcIuKrkFwiLFwiJmNzdXBlO1wiOlwi4quSXCIsXCImY3Rkb3Q7XCI6XCLii69cIixcIiZjdWRhcnJsO1wiOlwi4qS4XCIsXCImY3VkYXJycjtcIjpcIuKktVwiLFwiJmN1ZXByO1wiOlwi4oueXCIsXCImY3Vlc2M7XCI6XCLii59cIixcIiZjdWxhcnI7XCI6XCLihrZcIixcIiZjdWxhcnJwO1wiOlwi4qS9XCIsXCImY3VwO1wiOlwi4oiqXCIsXCImY3VwYnJjYXA7XCI6XCLiqYhcIixcIiZjdXBjYXA7XCI6XCLiqYZcIixcIiZjdXBjdXA7XCI6XCLiqYpcIixcIiZjdXBkb3Q7XCI6XCLiio1cIixcIiZjdXBvcjtcIjpcIuKphVwiLFwiJmN1cHM7XCI6XCLiiKrvuIBcIixcIiZjdXJhcnI7XCI6XCLihrdcIixcIiZjdXJhcnJtO1wiOlwi4qS8XCIsXCImY3VybHllcXByZWM7XCI6XCLii55cIixcIiZjdXJseWVxc3VjYztcIjpcIuKLn1wiLFwiJmN1cmx5dmVlO1wiOlwi4ouOXCIsXCImY3VybHl3ZWRnZTtcIjpcIuKLj1wiLFwiJmN1cnJlblwiOlwiwqRcIixcIiZjdXJyZW47XCI6XCLCpFwiLFwiJmN1cnZlYXJyb3dsZWZ0O1wiOlwi4oa2XCIsXCImY3VydmVhcnJvd3JpZ2h0O1wiOlwi4oa3XCIsXCImY3V2ZWU7XCI6XCLii45cIixcIiZjdXdlZDtcIjpcIuKLj1wiLFwiJmN3Y29uaW50O1wiOlwi4oiyXCIsXCImY3dpbnQ7XCI6XCLiiLFcIixcIiZjeWxjdHk7XCI6XCLijK1cIixcIiZkQXJyO1wiOlwi4oeTXCIsXCImZEhhcjtcIjpcIuKlpVwiLFwiJmRhZ2dlcjtcIjpcIuKAoFwiLFwiJmRhbGV0aDtcIjpcIuKEuFwiLFwiJmRhcnI7XCI6XCLihpNcIixcIiZkYXNoO1wiOlwi4oCQXCIsXCImZGFzaHY7XCI6XCLiiqNcIixcIiZkYmthcm93O1wiOlwi4qSPXCIsXCImZGJsYWM7XCI6XCLLnVwiLFwiJmRjYXJvbjtcIjpcIsSPXCIsXCImZGN5O1wiOlwi0LRcIixcIiZkZDtcIjpcIuKFhlwiLFwiJmRkYWdnZXI7XCI6XCLigKFcIixcIiZkZGFycjtcIjpcIuKHilwiLFwiJmRkb3RzZXE7XCI6XCLiqbdcIixcIiZkZWdcIjpcIsKwXCIsXCImZGVnO1wiOlwiwrBcIixcIiZkZWx0YTtcIjpcIs60XCIsXCImZGVtcHR5djtcIjpcIuKmsVwiLFwiJmRmaXNodDtcIjpcIuKlv1wiLFwiJmRmcjtcIjpcIvCdlKFcIixcIiZkaGFybDtcIjpcIuKHg1wiLFwiJmRoYXJyO1wiOlwi4oeCXCIsXCImZGlhbTtcIjpcIuKLhFwiLFwiJmRpYW1vbmQ7XCI6XCLii4RcIixcIiZkaWFtb25kc3VpdDtcIjpcIuKZplwiLFwiJmRpYW1zO1wiOlwi4pmmXCIsXCImZGllO1wiOlwiwqhcIixcIiZkaWdhbW1hO1wiOlwiz51cIixcIiZkaXNpbjtcIjpcIuKLslwiLFwiJmRpdjtcIjpcIsO3XCIsXCImZGl2aWRlXCI6XCLDt1wiLFwiJmRpdmlkZTtcIjpcIsO3XCIsXCImZGl2aWRlb250aW1lcztcIjpcIuKLh1wiLFwiJmRpdm9ueDtcIjpcIuKLh1wiLFwiJmRqY3k7XCI6XCLRklwiLFwiJmRsY29ybjtcIjpcIuKMnlwiLFwiJmRsY3JvcDtcIjpcIuKMjVwiLFwiJmRvbGxhcjtcIjpcIiRcIixcIiZkb3BmO1wiOlwi8J2VlVwiLFwiJmRvdDtcIjpcIsuZXCIsXCImZG90ZXE7XCI6XCLiiZBcIixcIiZkb3RlcWRvdDtcIjpcIuKJkVwiLFwiJmRvdG1pbnVzO1wiOlwi4oi4XCIsXCImZG90cGx1cztcIjpcIuKIlFwiLFwiJmRvdHNxdWFyZTtcIjpcIuKKoVwiLFwiJmRvdWJsZWJhcndlZGdlO1wiOlwi4oyGXCIsXCImZG93bmFycm93O1wiOlwi4oaTXCIsXCImZG93bmRvd25hcnJvd3M7XCI6XCLih4pcIixcIiZkb3duaGFycG9vbmxlZnQ7XCI6XCLih4NcIixcIiZkb3duaGFycG9vbnJpZ2h0O1wiOlwi4oeCXCIsXCImZHJia2Fyb3c7XCI6XCLipJBcIixcIiZkcmNvcm47XCI6XCLijJ9cIixcIiZkcmNyb3A7XCI6XCLijIxcIixcIiZkc2NyO1wiOlwi8J2SuVwiLFwiJmRzY3k7XCI6XCLRlVwiLFwiJmRzb2w7XCI6XCLip7ZcIixcIiZkc3Ryb2s7XCI6XCLEkVwiLFwiJmR0ZG90O1wiOlwi4ouxXCIsXCImZHRyaTtcIjpcIuKWv1wiLFwiJmR0cmlmO1wiOlwi4pa+XCIsXCImZHVhcnI7XCI6XCLih7VcIixcIiZkdWhhcjtcIjpcIuKlr1wiLFwiJmR3YW5nbGU7XCI6XCLipqZcIixcIiZkemN5O1wiOlwi0Z9cIixcIiZkemlncmFycjtcIjpcIuKfv1wiLFwiJmVERG90O1wiOlwi4qm3XCIsXCImZURvdDtcIjpcIuKJkVwiLFwiJmVhY3V0ZVwiOlwiw6lcIixcIiZlYWN1dGU7XCI6XCLDqVwiLFwiJmVhc3RlcjtcIjpcIuKprlwiLFwiJmVjYXJvbjtcIjpcIsSbXCIsXCImZWNpcjtcIjpcIuKJllwiLFwiJmVjaXJjXCI6XCLDqlwiLFwiJmVjaXJjO1wiOlwiw6pcIixcIiZlY29sb247XCI6XCLiiZVcIixcIiZlY3k7XCI6XCLRjVwiLFwiJmVkb3Q7XCI6XCLEl1wiLFwiJmVlO1wiOlwi4oWHXCIsXCImZWZEb3Q7XCI6XCLiiZJcIixcIiZlZnI7XCI6XCLwnZSiXCIsXCImZWc7XCI6XCLiqppcIixcIiZlZ3JhdmVcIjpcIsOoXCIsXCImZWdyYXZlO1wiOlwiw6hcIixcIiZlZ3M7XCI6XCLiqpZcIixcIiZlZ3Nkb3Q7XCI6XCLiqphcIixcIiZlbDtcIjpcIuKqmVwiLFwiJmVsaW50ZXJzO1wiOlwi4o+nXCIsXCImZWxsO1wiOlwi4oSTXCIsXCImZWxzO1wiOlwi4qqVXCIsXCImZWxzZG90O1wiOlwi4qqXXCIsXCImZW1hY3I7XCI6XCLEk1wiLFwiJmVtcHR5O1wiOlwi4oiFXCIsXCImZW1wdHlzZXQ7XCI6XCLiiIVcIixcIiZlbXB0eXY7XCI6XCLiiIVcIixcIiZlbXNwMTM7XCI6XCLigIRcIixcIiZlbXNwMTQ7XCI6XCLigIVcIixcIiZlbXNwO1wiOlwi4oCDXCIsXCImZW5nO1wiOlwixYtcIixcIiZlbnNwO1wiOlwi4oCCXCIsXCImZW9nb247XCI6XCLEmVwiLFwiJmVvcGY7XCI6XCLwnZWWXCIsXCImZXBhcjtcIjpcIuKLlVwiLFwiJmVwYXJzbDtcIjpcIuKno1wiLFwiJmVwbHVzO1wiOlwi4qmxXCIsXCImZXBzaTtcIjpcIs61XCIsXCImZXBzaWxvbjtcIjpcIs61XCIsXCImZXBzaXY7XCI6XCLPtVwiLFwiJmVxY2lyYztcIjpcIuKJllwiLFwiJmVxY29sb247XCI6XCLiiZVcIixcIiZlcXNpbTtcIjpcIuKJglwiLFwiJmVxc2xhbnRndHI7XCI6XCLiqpZcIixcIiZlcXNsYW50bGVzcztcIjpcIuKqlVwiLFwiJmVxdWFscztcIjpcIj1cIixcIiZlcXVlc3Q7XCI6XCLiiZ9cIixcIiZlcXVpdjtcIjpcIuKJoVwiLFwiJmVxdWl2REQ7XCI6XCLiqbhcIixcIiZlcXZwYXJzbDtcIjpcIuKnpVwiLFwiJmVyRG90O1wiOlwi4omTXCIsXCImZXJhcnI7XCI6XCLipbFcIixcIiZlc2NyO1wiOlwi4oSvXCIsXCImZXNkb3Q7XCI6XCLiiZBcIixcIiZlc2ltO1wiOlwi4omCXCIsXCImZXRhO1wiOlwizrdcIixcIiZldGhcIjpcIsOwXCIsXCImZXRoO1wiOlwiw7BcIixcIiZldW1sXCI6XCLDq1wiLFwiJmV1bWw7XCI6XCLDq1wiLFwiJmV1cm87XCI6XCLigqxcIixcIiZleGNsO1wiOlwiIVwiLFwiJmV4aXN0O1wiOlwi4oiDXCIsXCImZXhwZWN0YXRpb247XCI6XCLihLBcIixcIiZleHBvbmVudGlhbGU7XCI6XCLihYdcIixcIiZmYWxsaW5nZG90c2VxO1wiOlwi4omSXCIsXCImZmN5O1wiOlwi0YRcIixcIiZmZW1hbGU7XCI6XCLimYBcIixcIiZmZmlsaWc7XCI6XCLvrINcIixcIiZmZmxpZztcIjpcIu+sgFwiLFwiJmZmbGxpZztcIjpcIu+shFwiLFwiJmZmcjtcIjpcIvCdlKNcIixcIiZmaWxpZztcIjpcIu+sgVwiLFwiJmZqbGlnO1wiOlwiZmpcIixcIiZmbGF0O1wiOlwi4pmtXCIsXCImZmxsaWc7XCI6XCLvrIJcIixcIiZmbHRucztcIjpcIuKWsVwiLFwiJmZub2Y7XCI6XCLGklwiLFwiJmZvcGY7XCI6XCLwnZWXXCIsXCImZm9yYWxsO1wiOlwi4oiAXCIsXCImZm9yaztcIjpcIuKLlFwiLFwiJmZvcmt2O1wiOlwi4quZXCIsXCImZnBhcnRpbnQ7XCI6XCLiqI1cIixcIiZmcmFjMTJcIjpcIsK9XCIsXCImZnJhYzEyO1wiOlwiwr1cIixcIiZmcmFjMTM7XCI6XCLihZNcIixcIiZmcmFjMTRcIjpcIsK8XCIsXCImZnJhYzE0O1wiOlwiwrxcIixcIiZmcmFjMTU7XCI6XCLihZVcIixcIiZmcmFjMTY7XCI6XCLihZlcIixcIiZmcmFjMTg7XCI6XCLihZtcIixcIiZmcmFjMjM7XCI6XCLihZRcIixcIiZmcmFjMjU7XCI6XCLihZZcIixcIiZmcmFjMzRcIjpcIsK+XCIsXCImZnJhYzM0O1wiOlwiwr5cIixcIiZmcmFjMzU7XCI6XCLihZdcIixcIiZmcmFjMzg7XCI6XCLihZxcIixcIiZmcmFjNDU7XCI6XCLihZhcIixcIiZmcmFjNTY7XCI6XCLihZpcIixcIiZmcmFjNTg7XCI6XCLihZ1cIixcIiZmcmFjNzg7XCI6XCLihZ5cIixcIiZmcmFzbDtcIjpcIuKBhFwiLFwiJmZyb3duO1wiOlwi4oyiXCIsXCImZnNjcjtcIjpcIvCdkrtcIixcIiZnRTtcIjpcIuKJp1wiLFwiJmdFbDtcIjpcIuKqjFwiLFwiJmdhY3V0ZTtcIjpcIse1XCIsXCImZ2FtbWE7XCI6XCLOs1wiLFwiJmdhbW1hZDtcIjpcIs+dXCIsXCImZ2FwO1wiOlwi4qqGXCIsXCImZ2JyZXZlO1wiOlwixJ9cIixcIiZnY2lyYztcIjpcIsSdXCIsXCImZ2N5O1wiOlwi0LNcIixcIiZnZG90O1wiOlwixKFcIixcIiZnZTtcIjpcIuKJpVwiLFwiJmdlbDtcIjpcIuKLm1wiLFwiJmdlcTtcIjpcIuKJpVwiLFwiJmdlcXE7XCI6XCLiiadcIixcIiZnZXFzbGFudDtcIjpcIuKpvlwiLFwiJmdlcztcIjpcIuKpvlwiLFwiJmdlc2NjO1wiOlwi4qqpXCIsXCImZ2VzZG90O1wiOlwi4qqAXCIsXCImZ2VzZG90bztcIjpcIuKqglwiLFwiJmdlc2RvdG9sO1wiOlwi4qqEXCIsXCImZ2VzbDtcIjpcIuKLm++4gFwiLFwiJmdlc2xlcztcIjpcIuKqlFwiLFwiJmdmcjtcIjpcIvCdlKRcIixcIiZnZztcIjpcIuKJq1wiLFwiJmdnZztcIjpcIuKLmVwiLFwiJmdpbWVsO1wiOlwi4oS3XCIsXCImZ2pjeTtcIjpcItGTXCIsXCImZ2w7XCI6XCLiibdcIixcIiZnbEU7XCI6XCLiqpJcIixcIiZnbGE7XCI6XCLiqqVcIixcIiZnbGo7XCI6XCLiqqRcIixcIiZnbkU7XCI6XCLiialcIixcIiZnbmFwO1wiOlwi4qqKXCIsXCImZ25hcHByb3g7XCI6XCLiqopcIixcIiZnbmU7XCI6XCLiqohcIixcIiZnbmVxO1wiOlwi4qqIXCIsXCImZ25lcXE7XCI6XCLiialcIixcIiZnbnNpbTtcIjpcIuKLp1wiLFwiJmdvcGY7XCI6XCLwnZWYXCIsXCImZ3JhdmU7XCI6XCJgXCIsXCImZ3NjcjtcIjpcIuKEilwiLFwiJmdzaW07XCI6XCLiibNcIixcIiZnc2ltZTtcIjpcIuKqjlwiLFwiJmdzaW1sO1wiOlwi4qqQXCIsXCImZ3RcIjpcIj5cIixcIiZndDtcIjpcIj5cIixcIiZndGNjO1wiOlwi4qqnXCIsXCImZ3RjaXI7XCI6XCLiqbpcIixcIiZndGRvdDtcIjpcIuKLl1wiLFwiJmd0bFBhcjtcIjpcIuKmlVwiLFwiJmd0cXVlc3Q7XCI6XCLiqbxcIixcIiZndHJhcHByb3g7XCI6XCLiqoZcIixcIiZndHJhcnI7XCI6XCLipbhcIixcIiZndHJkb3Q7XCI6XCLii5dcIixcIiZndHJlcWxlc3M7XCI6XCLii5tcIixcIiZndHJlcXFsZXNzO1wiOlwi4qqMXCIsXCImZ3RybGVzcztcIjpcIuKJt1wiLFwiJmd0cnNpbTtcIjpcIuKJs1wiLFwiJmd2ZXJ0bmVxcTtcIjpcIuKJqe+4gFwiLFwiJmd2bkU7XCI6XCLiianvuIBcIixcIiZoQXJyO1wiOlwi4oeUXCIsXCImaGFpcnNwO1wiOlwi4oCKXCIsXCImaGFsZjtcIjpcIsK9XCIsXCImaGFtaWx0O1wiOlwi4oSLXCIsXCImaGFyZGN5O1wiOlwi0YpcIixcIiZoYXJyO1wiOlwi4oaUXCIsXCImaGFycmNpcjtcIjpcIuKliFwiLFwiJmhhcnJ3O1wiOlwi4oatXCIsXCImaGJhcjtcIjpcIuKEj1wiLFwiJmhjaXJjO1wiOlwixKVcIixcIiZoZWFydHM7XCI6XCLimaVcIixcIiZoZWFydHN1aXQ7XCI6XCLimaVcIixcIiZoZWxsaXA7XCI6XCLigKZcIixcIiZoZXJjb247XCI6XCLiirlcIixcIiZoZnI7XCI6XCLwnZSlXCIsXCImaGtzZWFyb3c7XCI6XCLipKVcIixcIiZoa3N3YXJvdztcIjpcIuKkplwiLFwiJmhvYXJyO1wiOlwi4oe/XCIsXCImaG9tdGh0O1wiOlwi4oi7XCIsXCImaG9va2xlZnRhcnJvdztcIjpcIuKGqVwiLFwiJmhvb2tyaWdodGFycm93O1wiOlwi4oaqXCIsXCImaG9wZjtcIjpcIvCdlZlcIixcIiZob3JiYXI7XCI6XCLigJVcIixcIiZoc2NyO1wiOlwi8J2SvVwiLFwiJmhzbGFzaDtcIjpcIuKEj1wiLFwiJmhzdHJvaztcIjpcIsSnXCIsXCImaHlidWxsO1wiOlwi4oGDXCIsXCImaHlwaGVuO1wiOlwi4oCQXCIsXCImaWFjdXRlXCI6XCLDrVwiLFwiJmlhY3V0ZTtcIjpcIsOtXCIsXCImaWM7XCI6XCLigaNcIixcIiZpY2lyY1wiOlwiw65cIixcIiZpY2lyYztcIjpcIsOuXCIsXCImaWN5O1wiOlwi0LhcIixcIiZpZWN5O1wiOlwi0LVcIixcIiZpZXhjbFwiOlwiwqFcIixcIiZpZXhjbDtcIjpcIsKhXCIsXCImaWZmO1wiOlwi4oeUXCIsXCImaWZyO1wiOlwi8J2UplwiLFwiJmlncmF2ZVwiOlwiw6xcIixcIiZpZ3JhdmU7XCI6XCLDrFwiLFwiJmlpO1wiOlwi4oWIXCIsXCImaWlpaW50O1wiOlwi4qiMXCIsXCImaWlpbnQ7XCI6XCLiiK1cIixcIiZpaW5maW47XCI6XCLip5xcIixcIiZpaW90YTtcIjpcIuKEqVwiLFwiJmlqbGlnO1wiOlwixLNcIixcIiZpbWFjcjtcIjpcIsSrXCIsXCImaW1hZ2U7XCI6XCLihJFcIixcIiZpbWFnbGluZTtcIjpcIuKEkFwiLFwiJmltYWdwYXJ0O1wiOlwi4oSRXCIsXCImaW1hdGg7XCI6XCLEsVwiLFwiJmltb2Y7XCI6XCLiirdcIixcIiZpbXBlZDtcIjpcIsa1XCIsXCImaW47XCI6XCLiiIhcIixcIiZpbmNhcmU7XCI6XCLihIVcIixcIiZpbmZpbjtcIjpcIuKInlwiLFwiJmluZmludGllO1wiOlwi4qedXCIsXCImaW5vZG90O1wiOlwixLFcIixcIiZpbnQ7XCI6XCLiiKtcIixcIiZpbnRjYWw7XCI6XCLiirpcIixcIiZpbnRlZ2VycztcIjpcIuKEpFwiLFwiJmludGVyY2FsO1wiOlwi4oq6XCIsXCImaW50bGFyaGs7XCI6XCLiqJdcIixcIiZpbnRwcm9kO1wiOlwi4qi8XCIsXCImaW9jeTtcIjpcItGRXCIsXCImaW9nb247XCI6XCLEr1wiLFwiJmlvcGY7XCI6XCLwnZWaXCIsXCImaW90YTtcIjpcIs65XCIsXCImaXByb2Q7XCI6XCLiqLxcIixcIiZpcXVlc3RcIjpcIsK/XCIsXCImaXF1ZXN0O1wiOlwiwr9cIixcIiZpc2NyO1wiOlwi8J2SvlwiLFwiJmlzaW47XCI6XCLiiIhcIixcIiZpc2luRTtcIjpcIuKLuVwiLFwiJmlzaW5kb3Q7XCI6XCLii7VcIixcIiZpc2lucztcIjpcIuKLtFwiLFwiJmlzaW5zdjtcIjpcIuKLs1wiLFwiJmlzaW52O1wiOlwi4oiIXCIsXCImaXQ7XCI6XCLigaJcIixcIiZpdGlsZGU7XCI6XCLEqVwiLFwiJml1a2N5O1wiOlwi0ZZcIixcIiZpdW1sXCI6XCLDr1wiLFwiJml1bWw7XCI6XCLDr1wiLFwiJmpjaXJjO1wiOlwixLVcIixcIiZqY3k7XCI6XCLQuVwiLFwiJmpmcjtcIjpcIvCdlKdcIixcIiZqbWF0aDtcIjpcIsi3XCIsXCImam9wZjtcIjpcIvCdlZtcIixcIiZqc2NyO1wiOlwi8J2Sv1wiLFwiJmpzZXJjeTtcIjpcItGYXCIsXCImanVrY3k7XCI6XCLRlFwiLFwiJmthcHBhO1wiOlwizrpcIixcIiZrYXBwYXY7XCI6XCLPsFwiLFwiJmtjZWRpbDtcIjpcIsS3XCIsXCIma2N5O1wiOlwi0LpcIixcIiZrZnI7XCI6XCLwnZSoXCIsXCIma2dyZWVuO1wiOlwixLhcIixcIiZraGN5O1wiOlwi0YVcIixcIiZramN5O1wiOlwi0ZxcIixcIiZrb3BmO1wiOlwi8J2VnFwiLFwiJmtzY3I7XCI6XCLwnZOAXCIsXCImbEFhcnI7XCI6XCLih5pcIixcIiZsQXJyO1wiOlwi4oeQXCIsXCImbEF0YWlsO1wiOlwi4qSbXCIsXCImbEJhcnI7XCI6XCLipI5cIixcIiZsRTtcIjpcIuKJplwiLFwiJmxFZztcIjpcIuKqi1wiLFwiJmxIYXI7XCI6XCLipaJcIixcIiZsYWN1dGU7XCI6XCLEulwiLFwiJmxhZW1wdHl2O1wiOlwi4qa0XCIsXCImbGFncmFuO1wiOlwi4oSSXCIsXCImbGFtYmRhO1wiOlwizrtcIixcIiZsYW5nO1wiOlwi4p+oXCIsXCImbGFuZ2Q7XCI6XCLippFcIixcIiZsYW5nbGU7XCI6XCLin6hcIixcIiZsYXA7XCI6XCLiqoVcIixcIiZsYXF1b1wiOlwiwqtcIixcIiZsYXF1bztcIjpcIsKrXCIsXCImbGFycjtcIjpcIuKGkFwiLFwiJmxhcnJiO1wiOlwi4oekXCIsXCImbGFycmJmcztcIjpcIuKkn1wiLFwiJmxhcnJmcztcIjpcIuKknVwiLFwiJmxhcnJoaztcIjpcIuKGqVwiLFwiJmxhcnJscDtcIjpcIuKGq1wiLFwiJmxhcnJwbDtcIjpcIuKkuVwiLFwiJmxhcnJzaW07XCI6XCLipbNcIixcIiZsYXJydGw7XCI6XCLihqJcIixcIiZsYXQ7XCI6XCLiqqtcIixcIiZsYXRhaWw7XCI6XCLipJlcIixcIiZsYXRlO1wiOlwi4qqtXCIsXCImbGF0ZXM7XCI6XCLiqq3vuIBcIixcIiZsYmFycjtcIjpcIuKkjFwiLFwiJmxiYnJrO1wiOlwi4p2yXCIsXCImbGJyYWNlO1wiOlwie1wiLFwiJmxicmFjaztcIjpcIltcIixcIiZsYnJrZTtcIjpcIuKmi1wiLFwiJmxicmtzbGQ7XCI6XCLipo9cIixcIiZsYnJrc2x1O1wiOlwi4qaNXCIsXCImbGNhcm9uO1wiOlwixL5cIixcIiZsY2VkaWw7XCI6XCLEvFwiLFwiJmxjZWlsO1wiOlwi4oyIXCIsXCImbGN1YjtcIjpcIntcIixcIiZsY3k7XCI6XCLQu1wiLFwiJmxkY2E7XCI6XCLipLZcIixcIiZsZHF1bztcIjpcIuKAnFwiLFwiJmxkcXVvcjtcIjpcIuKAnlwiLFwiJmxkcmRoYXI7XCI6XCLipadcIixcIiZsZHJ1c2hhcjtcIjpcIuKli1wiLFwiJmxkc2g7XCI6XCLihrJcIixcIiZsZTtcIjpcIuKJpFwiLFwiJmxlZnRhcnJvdztcIjpcIuKGkFwiLFwiJmxlZnRhcnJvd3RhaWw7XCI6XCLihqJcIixcIiZsZWZ0aGFycG9vbmRvd247XCI6XCLihr1cIixcIiZsZWZ0aGFycG9vbnVwO1wiOlwi4oa8XCIsXCImbGVmdGxlZnRhcnJvd3M7XCI6XCLih4dcIixcIiZsZWZ0cmlnaHRhcnJvdztcIjpcIuKGlFwiLFwiJmxlZnRyaWdodGFycm93cztcIjpcIuKHhlwiLFwiJmxlZnRyaWdodGhhcnBvb25zO1wiOlwi4oeLXCIsXCImbGVmdHJpZ2h0c3F1aWdhcnJvdztcIjpcIuKGrVwiLFwiJmxlZnR0aHJlZXRpbWVzO1wiOlwi4ouLXCIsXCImbGVnO1wiOlwi4ouaXCIsXCImbGVxO1wiOlwi4omkXCIsXCImbGVxcTtcIjpcIuKJplwiLFwiJmxlcXNsYW50O1wiOlwi4qm9XCIsXCImbGVzO1wiOlwi4qm9XCIsXCImbGVzY2M7XCI6XCLiqqhcIixcIiZsZXNkb3Q7XCI6XCLiqb9cIixcIiZsZXNkb3RvO1wiOlwi4qqBXCIsXCImbGVzZG90b3I7XCI6XCLiqoNcIixcIiZsZXNnO1wiOlwi4oua77iAXCIsXCImbGVzZ2VzO1wiOlwi4qqTXCIsXCImbGVzc2FwcHJveDtcIjpcIuKqhVwiLFwiJmxlc3Nkb3Q7XCI6XCLii5ZcIixcIiZsZXNzZXFndHI7XCI6XCLii5pcIixcIiZsZXNzZXFxZ3RyO1wiOlwi4qqLXCIsXCImbGVzc2d0cjtcIjpcIuKJtlwiLFwiJmxlc3NzaW07XCI6XCLiibJcIixcIiZsZmlzaHQ7XCI6XCLipbxcIixcIiZsZmxvb3I7XCI6XCLijIpcIixcIiZsZnI7XCI6XCLwnZSpXCIsXCImbGc7XCI6XCLiibZcIixcIiZsZ0U7XCI6XCLiqpFcIixcIiZsaGFyZDtcIjpcIuKGvVwiLFwiJmxoYXJ1O1wiOlwi4oa8XCIsXCImbGhhcnVsO1wiOlwi4qWqXCIsXCImbGhibGs7XCI6XCLiloRcIixcIiZsamN5O1wiOlwi0ZlcIixcIiZsbDtcIjpcIuKJqlwiLFwiJmxsYXJyO1wiOlwi4oeHXCIsXCImbGxjb3JuZXI7XCI6XCLijJ5cIixcIiZsbGhhcmQ7XCI6XCLipatcIixcIiZsbHRyaTtcIjpcIuKXulwiLFwiJmxtaWRvdDtcIjpcIsWAXCIsXCImbG1vdXN0O1wiOlwi4o6wXCIsXCImbG1vdXN0YWNoZTtcIjpcIuKOsFwiLFwiJmxuRTtcIjpcIuKJqFwiLFwiJmxuYXA7XCI6XCLiqolcIixcIiZsbmFwcHJveDtcIjpcIuKqiVwiLFwiJmxuZTtcIjpcIuKqh1wiLFwiJmxuZXE7XCI6XCLiqodcIixcIiZsbmVxcTtcIjpcIuKJqFwiLFwiJmxuc2ltO1wiOlwi4oumXCIsXCImbG9hbmc7XCI6XCLin6xcIixcIiZsb2FycjtcIjpcIuKHvVwiLFwiJmxvYnJrO1wiOlwi4p+mXCIsXCImbG9uZ2xlZnRhcnJvdztcIjpcIuKftVwiLFwiJmxvbmdsZWZ0cmlnaHRhcnJvdztcIjpcIuKft1wiLFwiJmxvbmdtYXBzdG87XCI6XCLin7xcIixcIiZsb25ncmlnaHRhcnJvdztcIjpcIuKftlwiLFwiJmxvb3BhcnJvd2xlZnQ7XCI6XCLihqtcIixcIiZsb29wYXJyb3dyaWdodDtcIjpcIuKGrFwiLFwiJmxvcGFyO1wiOlwi4qaFXCIsXCImbG9wZjtcIjpcIvCdlZ1cIixcIiZsb3BsdXM7XCI6XCLiqK1cIixcIiZsb3RpbWVzO1wiOlwi4qi0XCIsXCImbG93YXN0O1wiOlwi4oiXXCIsXCImbG93YmFyO1wiOlwiX1wiLFwiJmxvejtcIjpcIuKXilwiLFwiJmxvemVuZ2U7XCI6XCLil4pcIixcIiZsb3pmO1wiOlwi4qerXCIsXCImbHBhcjtcIjpcIihcIixcIiZscGFybHQ7XCI6XCLippNcIixcIiZscmFycjtcIjpcIuKHhlwiLFwiJmxyY29ybmVyO1wiOlwi4oyfXCIsXCImbHJoYXI7XCI6XCLih4tcIixcIiZscmhhcmQ7XCI6XCLipa1cIixcIiZscm07XCI6XCLigI5cIixcIiZscnRyaTtcIjpcIuKKv1wiLFwiJmxzYXF1bztcIjpcIuKAuVwiLFwiJmxzY3I7XCI6XCLwnZOBXCIsXCImbHNoO1wiOlwi4oawXCIsXCImbHNpbTtcIjpcIuKJslwiLFwiJmxzaW1lO1wiOlwi4qqNXCIsXCImbHNpbWc7XCI6XCLiqo9cIixcIiZsc3FiO1wiOlwiW1wiLFwiJmxzcXVvO1wiOlwi4oCYXCIsXCImbHNxdW9yO1wiOlwi4oCaXCIsXCImbHN0cm9rO1wiOlwixYJcIixcIiZsdFwiOlwiPFwiLFwiJmx0O1wiOlwiPFwiLFwiJmx0Y2M7XCI6XCLiqqZcIixcIiZsdGNpcjtcIjpcIuKpuVwiLFwiJmx0ZG90O1wiOlwi4ouWXCIsXCImbHRocmVlO1wiOlwi4ouLXCIsXCImbHRpbWVzO1wiOlwi4ouJXCIsXCImbHRsYXJyO1wiOlwi4qW2XCIsXCImbHRxdWVzdDtcIjpcIuKpu1wiLFwiJmx0clBhcjtcIjpcIuKmllwiLFwiJmx0cmk7XCI6XCLil4NcIixcIiZsdHJpZTtcIjpcIuKKtFwiLFwiJmx0cmlmO1wiOlwi4peCXCIsXCImbHVyZHNoYXI7XCI6XCLipYpcIixcIiZsdXJ1aGFyO1wiOlwi4qWmXCIsXCImbHZlcnRuZXFxO1wiOlwi4omo77iAXCIsXCImbHZuRTtcIjpcIuKJqO+4gFwiLFwiJm1ERG90O1wiOlwi4oi6XCIsXCImbWFjclwiOlwiwq9cIixcIiZtYWNyO1wiOlwiwq9cIixcIiZtYWxlO1wiOlwi4pmCXCIsXCImbWFsdDtcIjpcIuKcoFwiLFwiJm1hbHRlc2U7XCI6XCLinKBcIixcIiZtYXA7XCI6XCLihqZcIixcIiZtYXBzdG87XCI6XCLihqZcIixcIiZtYXBzdG9kb3duO1wiOlwi4oanXCIsXCImbWFwc3RvbGVmdDtcIjpcIuKGpFwiLFwiJm1hcHN0b3VwO1wiOlwi4oalXCIsXCImbWFya2VyO1wiOlwi4pauXCIsXCImbWNvbW1hO1wiOlwi4qipXCIsXCImbWN5O1wiOlwi0LxcIixcIiZtZGFzaDtcIjpcIuKAlFwiLFwiJm1lYXN1cmVkYW5nbGU7XCI6XCLiiKFcIixcIiZtZnI7XCI6XCLwnZSqXCIsXCImbWhvO1wiOlwi4oSnXCIsXCImbWljcm9cIjpcIsK1XCIsXCImbWljcm87XCI6XCLCtVwiLFwiJm1pZDtcIjpcIuKIo1wiLFwiJm1pZGFzdDtcIjpcIipcIixcIiZtaWRjaXI7XCI6XCLiq7BcIixcIiZtaWRkb3RcIjpcIsK3XCIsXCImbWlkZG90O1wiOlwiwrdcIixcIiZtaW51cztcIjpcIuKIklwiLFwiJm1pbnVzYjtcIjpcIuKKn1wiLFwiJm1pbnVzZDtcIjpcIuKIuFwiLFwiJm1pbnVzZHU7XCI6XCLiqKpcIixcIiZtbGNwO1wiOlwi4qubXCIsXCImbWxkcjtcIjpcIuKAplwiLFwiJm1ucGx1cztcIjpcIuKIk1wiLFwiJm1vZGVscztcIjpcIuKKp1wiLFwiJm1vcGY7XCI6XCLwnZWeXCIsXCImbXA7XCI6XCLiiJNcIixcIiZtc2NyO1wiOlwi8J2TglwiLFwiJm1zdHBvcztcIjpcIuKIvlwiLFwiJm11O1wiOlwizrxcIixcIiZtdWx0aW1hcDtcIjpcIuKKuFwiLFwiJm11bWFwO1wiOlwi4oq4XCIsXCImbkdnO1wiOlwi4ouZzLhcIixcIiZuR3Q7XCI6XCLiiavig5JcIixcIiZuR3R2O1wiOlwi4omrzLhcIixcIiZuTGVmdGFycm93O1wiOlwi4oeNXCIsXCImbkxlZnRyaWdodGFycm93O1wiOlwi4oeOXCIsXCImbkxsO1wiOlwi4ouYzLhcIixcIiZuTHQ7XCI6XCLiiarig5JcIixcIiZuTHR2O1wiOlwi4omqzLhcIixcIiZuUmlnaHRhcnJvdztcIjpcIuKHj1wiLFwiJm5WRGFzaDtcIjpcIuKKr1wiLFwiJm5WZGFzaDtcIjpcIuKKrlwiLFwiJm5hYmxhO1wiOlwi4oiHXCIsXCImbmFjdXRlO1wiOlwixYRcIixcIiZuYW5nO1wiOlwi4oig4oOSXCIsXCImbmFwO1wiOlwi4omJXCIsXCImbmFwRTtcIjpcIuKpsMy4XCIsXCImbmFwaWQ7XCI6XCLiiYvMuFwiLFwiJm5hcG9zO1wiOlwixYlcIixcIiZuYXBwcm94O1wiOlwi4omJXCIsXCImbmF0dXI7XCI6XCLima5cIixcIiZuYXR1cmFsO1wiOlwi4pmuXCIsXCImbmF0dXJhbHM7XCI6XCLihJVcIixcIiZuYnNwXCI6XCLCoFwiLFwiJm5ic3A7XCI6XCLCoFwiLFwiJm5idW1wO1wiOlwi4omOzLhcIixcIiZuYnVtcGU7XCI6XCLiiY/MuFwiLFwiJm5jYXA7XCI6XCLiqYNcIixcIiZuY2Fyb247XCI6XCLFiFwiLFwiJm5jZWRpbDtcIjpcIsWGXCIsXCImbmNvbmc7XCI6XCLiiYdcIixcIiZuY29uZ2RvdDtcIjpcIuKprcy4XCIsXCImbmN1cDtcIjpcIuKpglwiLFwiJm5jeTtcIjpcItC9XCIsXCImbmRhc2g7XCI6XCLigJNcIixcIiZuZTtcIjpcIuKJoFwiLFwiJm5lQXJyO1wiOlwi4oeXXCIsXCImbmVhcmhrO1wiOlwi4qSkXCIsXCImbmVhcnI7XCI6XCLihpdcIixcIiZuZWFycm93O1wiOlwi4oaXXCIsXCImbmVkb3Q7XCI6XCLiiZDMuFwiLFwiJm5lcXVpdjtcIjpcIuKJolwiLFwiJm5lc2VhcjtcIjpcIuKkqFwiLFwiJm5lc2ltO1wiOlwi4omCzLhcIixcIiZuZXhpc3Q7XCI6XCLiiIRcIixcIiZuZXhpc3RzO1wiOlwi4oiEXCIsXCImbmZyO1wiOlwi8J2Uq1wiLFwiJm5nRTtcIjpcIuKJp8y4XCIsXCImbmdlO1wiOlwi4omxXCIsXCImbmdlcTtcIjpcIuKJsVwiLFwiJm5nZXFxO1wiOlwi4omnzLhcIixcIiZuZ2Vxc2xhbnQ7XCI6XCLiqb7MuFwiLFwiJm5nZXM7XCI6XCLiqb7MuFwiLFwiJm5nc2ltO1wiOlwi4om1XCIsXCImbmd0O1wiOlwi4omvXCIsXCImbmd0cjtcIjpcIuKJr1wiLFwiJm5oQXJyO1wiOlwi4oeOXCIsXCImbmhhcnI7XCI6XCLihq5cIixcIiZuaHBhcjtcIjpcIuKrslwiLFwiJm5pO1wiOlwi4oiLXCIsXCImbmlzO1wiOlwi4ou8XCIsXCImbmlzZDtcIjpcIuKLulwiLFwiJm5pdjtcIjpcIuKIi1wiLFwiJm5qY3k7XCI6XCLRmlwiLFwiJm5sQXJyO1wiOlwi4oeNXCIsXCImbmxFO1wiOlwi4ommzLhcIixcIiZubGFycjtcIjpcIuKGmlwiLFwiJm5sZHI7XCI6XCLigKVcIixcIiZubGU7XCI6XCLiibBcIixcIiZubGVmdGFycm93O1wiOlwi4oaaXCIsXCImbmxlZnRyaWdodGFycm93O1wiOlwi4oauXCIsXCImbmxlcTtcIjpcIuKJsFwiLFwiJm5sZXFxO1wiOlwi4ommzLhcIixcIiZubGVxc2xhbnQ7XCI6XCLiqb3MuFwiLFwiJm5sZXM7XCI6XCLiqb3MuFwiLFwiJm5sZXNzO1wiOlwi4omuXCIsXCImbmxzaW07XCI6XCLiibRcIixcIiZubHQ7XCI6XCLiia5cIixcIiZubHRyaTtcIjpcIuKLqlwiLFwiJm5sdHJpZTtcIjpcIuKLrFwiLFwiJm5taWQ7XCI6XCLiiKRcIixcIiZub3BmO1wiOlwi8J2Vn1wiLFwiJm5vdFwiOlwiwqxcIixcIiZub3Q7XCI6XCLCrFwiLFwiJm5vdGluO1wiOlwi4oiJXCIsXCImbm90aW5FO1wiOlwi4ou5zLhcIixcIiZub3RpbmRvdDtcIjpcIuKLtcy4XCIsXCImbm90aW52YTtcIjpcIuKIiVwiLFwiJm5vdGludmI7XCI6XCLii7dcIixcIiZub3RpbnZjO1wiOlwi4ou2XCIsXCImbm90bmk7XCI6XCLiiIxcIixcIiZub3RuaXZhO1wiOlwi4oiMXCIsXCImbm90bml2YjtcIjpcIuKLvlwiLFwiJm5vdG5pdmM7XCI6XCLii71cIixcIiZucGFyO1wiOlwi4oimXCIsXCImbnBhcmFsbGVsO1wiOlwi4oimXCIsXCImbnBhcnNsO1wiOlwi4qu94oOlXCIsXCImbnBhcnQ7XCI6XCLiiILMuFwiLFwiJm5wb2xpbnQ7XCI6XCLiqJRcIixcIiZucHI7XCI6XCLiioBcIixcIiZucHJjdWU7XCI6XCLii6BcIixcIiZucHJlO1wiOlwi4qqvzLhcIixcIiZucHJlYztcIjpcIuKKgFwiLFwiJm5wcmVjZXE7XCI6XCLiqq/MuFwiLFwiJm5yQXJyO1wiOlwi4oePXCIsXCImbnJhcnI7XCI6XCLihptcIixcIiZucmFycmM7XCI6XCLipLPMuFwiLFwiJm5yYXJydztcIjpcIuKGncy4XCIsXCImbnJpZ2h0YXJyb3c7XCI6XCLihptcIixcIiZucnRyaTtcIjpcIuKLq1wiLFwiJm5ydHJpZTtcIjpcIuKLrVwiLFwiJm5zYztcIjpcIuKKgVwiLFwiJm5zY2N1ZTtcIjpcIuKLoVwiLFwiJm5zY2U7XCI6XCLiqrDMuFwiLFwiJm5zY3I7XCI6XCLwnZODXCIsXCImbnNob3J0bWlkO1wiOlwi4oikXCIsXCImbnNob3J0cGFyYWxsZWw7XCI6XCLiiKZcIixcIiZuc2ltO1wiOlwi4omBXCIsXCImbnNpbWU7XCI6XCLiiYRcIixcIiZuc2ltZXE7XCI6XCLiiYRcIixcIiZuc21pZDtcIjpcIuKIpFwiLFwiJm5zcGFyO1wiOlwi4oimXCIsXCImbnNxc3ViZTtcIjpcIuKLolwiLFwiJm5zcXN1cGU7XCI6XCLii6NcIixcIiZuc3ViO1wiOlwi4oqEXCIsXCImbnN1YkU7XCI6XCLiq4XMuFwiLFwiJm5zdWJlO1wiOlwi4oqIXCIsXCImbnN1YnNldDtcIjpcIuKKguKDklwiLFwiJm5zdWJzZXRlcTtcIjpcIuKKiFwiLFwiJm5zdWJzZXRlcXE7XCI6XCLiq4XMuFwiLFwiJm5zdWNjO1wiOlwi4oqBXCIsXCImbnN1Y2NlcTtcIjpcIuKqsMy4XCIsXCImbnN1cDtcIjpcIuKKhVwiLFwiJm5zdXBFO1wiOlwi4quGzLhcIixcIiZuc3VwZTtcIjpcIuKKiVwiLFwiJm5zdXBzZXQ7XCI6XCLiioPig5JcIixcIiZuc3Vwc2V0ZXE7XCI6XCLiiolcIixcIiZuc3Vwc2V0ZXFxO1wiOlwi4quGzLhcIixcIiZudGdsO1wiOlwi4om5XCIsXCImbnRpbGRlXCI6XCLDsVwiLFwiJm50aWxkZTtcIjpcIsOxXCIsXCImbnRsZztcIjpcIuKJuFwiLFwiJm50cmlhbmdsZWxlZnQ7XCI6XCLii6pcIixcIiZudHJpYW5nbGVsZWZ0ZXE7XCI6XCLii6xcIixcIiZudHJpYW5nbGVyaWdodDtcIjpcIuKLq1wiLFwiJm50cmlhbmdsZXJpZ2h0ZXE7XCI6XCLii61cIixcIiZudTtcIjpcIs69XCIsXCImbnVtO1wiOlwiI1wiLFwiJm51bWVybztcIjpcIuKEllwiLFwiJm51bXNwO1wiOlwi4oCHXCIsXCImbnZEYXNoO1wiOlwi4oqtXCIsXCImbnZIYXJyO1wiOlwi4qSEXCIsXCImbnZhcDtcIjpcIuKJjeKDklwiLFwiJm52ZGFzaDtcIjpcIuKKrFwiLFwiJm52Z2U7XCI6XCLiiaXig5JcIixcIiZudmd0O1wiOlwiPuKDklwiLFwiJm52aW5maW47XCI6XCLip55cIixcIiZudmxBcnI7XCI6XCLipIJcIixcIiZudmxlO1wiOlwi4omk4oOSXCIsXCImbnZsdDtcIjpcIjzig5JcIixcIiZudmx0cmllO1wiOlwi4oq04oOSXCIsXCImbnZyQXJyO1wiOlwi4qSDXCIsXCImbnZydHJpZTtcIjpcIuKKteKDklwiLFwiJm52c2ltO1wiOlwi4oi84oOSXCIsXCImbndBcnI7XCI6XCLih5ZcIixcIiZud2FyaGs7XCI6XCLipKNcIixcIiZud2FycjtcIjpcIuKGllwiLFwiJm53YXJyb3c7XCI6XCLihpZcIixcIiZud25lYXI7XCI6XCLipKdcIixcIiZvUztcIjpcIuKTiFwiLFwiJm9hY3V0ZVwiOlwiw7NcIixcIiZvYWN1dGU7XCI6XCLDs1wiLFwiJm9hc3Q7XCI6XCLiiptcIixcIiZvY2lyO1wiOlwi4oqaXCIsXCImb2NpcmNcIjpcIsO0XCIsXCImb2NpcmM7XCI6XCLDtFwiLFwiJm9jeTtcIjpcItC+XCIsXCImb2Rhc2g7XCI6XCLiip1cIixcIiZvZGJsYWM7XCI6XCLFkVwiLFwiJm9kaXY7XCI6XCLiqLhcIixcIiZvZG90O1wiOlwi4oqZXCIsXCImb2Rzb2xkO1wiOlwi4qa8XCIsXCImb2VsaWc7XCI6XCLFk1wiLFwiJm9mY2lyO1wiOlwi4qa/XCIsXCImb2ZyO1wiOlwi8J2UrFwiLFwiJm9nb247XCI6XCLLm1wiLFwiJm9ncmF2ZVwiOlwiw7JcIixcIiZvZ3JhdmU7XCI6XCLDslwiLFwiJm9ndDtcIjpcIuKngVwiLFwiJm9oYmFyO1wiOlwi4qa1XCIsXCImb2htO1wiOlwizqlcIixcIiZvaW50O1wiOlwi4oiuXCIsXCImb2xhcnI7XCI6XCLihrpcIixcIiZvbGNpcjtcIjpcIuKmvlwiLFwiJm9sY3Jvc3M7XCI6XCLiprtcIixcIiZvbGluZTtcIjpcIuKAvlwiLFwiJm9sdDtcIjpcIuKngFwiLFwiJm9tYWNyO1wiOlwixY1cIixcIiZvbWVnYTtcIjpcIs+JXCIsXCImb21pY3JvbjtcIjpcIs6/XCIsXCImb21pZDtcIjpcIuKmtlwiLFwiJm9taW51cztcIjpcIuKKllwiLFwiJm9vcGY7XCI6XCLwnZWgXCIsXCImb3BhcjtcIjpcIuKmt1wiLFwiJm9wZXJwO1wiOlwi4qa5XCIsXCImb3BsdXM7XCI6XCLiipVcIixcIiZvcjtcIjpcIuKIqFwiLFwiJm9yYXJyO1wiOlwi4oa7XCIsXCImb3JkO1wiOlwi4qmdXCIsXCImb3JkZXI7XCI6XCLihLRcIixcIiZvcmRlcm9mO1wiOlwi4oS0XCIsXCImb3JkZlwiOlwiwqpcIixcIiZvcmRmO1wiOlwiwqpcIixcIiZvcmRtXCI6XCLCulwiLFwiJm9yZG07XCI6XCLCulwiLFwiJm9yaWdvZjtcIjpcIuKKtlwiLFwiJm9yb3I7XCI6XCLiqZZcIixcIiZvcnNsb3BlO1wiOlwi4qmXXCIsXCImb3J2O1wiOlwi4qmbXCIsXCImb3NjcjtcIjpcIuKEtFwiLFwiJm9zbGFzaFwiOlwiw7hcIixcIiZvc2xhc2g7XCI6XCLDuFwiLFwiJm9zb2w7XCI6XCLiiphcIixcIiZvdGlsZGVcIjpcIsO1XCIsXCImb3RpbGRlO1wiOlwiw7VcIixcIiZvdGltZXM7XCI6XCLiipdcIixcIiZvdGltZXNhcztcIjpcIuKotlwiLFwiJm91bWxcIjpcIsO2XCIsXCImb3VtbDtcIjpcIsO2XCIsXCImb3ZiYXI7XCI6XCLijL1cIixcIiZwYXI7XCI6XCLiiKVcIixcIiZwYXJhXCI6XCLCtlwiLFwiJnBhcmE7XCI6XCLCtlwiLFwiJnBhcmFsbGVsO1wiOlwi4oilXCIsXCImcGFyc2ltO1wiOlwi4quzXCIsXCImcGFyc2w7XCI6XCLiq71cIixcIiZwYXJ0O1wiOlwi4oiCXCIsXCImcGN5O1wiOlwi0L9cIixcIiZwZXJjbnQ7XCI6XCIlXCIsXCImcGVyaW9kO1wiOlwiLlwiLFwiJnBlcm1pbDtcIjpcIuKAsFwiLFwiJnBlcnA7XCI6XCLiiqVcIixcIiZwZXJ0ZW5rO1wiOlwi4oCxXCIsXCImcGZyO1wiOlwi8J2UrVwiLFwiJnBoaTtcIjpcIs+GXCIsXCImcGhpdjtcIjpcIs+VXCIsXCImcGhtbWF0O1wiOlwi4oSzXCIsXCImcGhvbmU7XCI6XCLimI5cIixcIiZwaTtcIjpcIs+AXCIsXCImcGl0Y2hmb3JrO1wiOlwi4ouUXCIsXCImcGl2O1wiOlwiz5ZcIixcIiZwbGFuY2s7XCI6XCLihI9cIixcIiZwbGFuY2toO1wiOlwi4oSOXCIsXCImcGxhbmt2O1wiOlwi4oSPXCIsXCImcGx1cztcIjpcIitcIixcIiZwbHVzYWNpcjtcIjpcIuKoo1wiLFwiJnBsdXNiO1wiOlwi4oqeXCIsXCImcGx1c2NpcjtcIjpcIuKoolwiLFwiJnBsdXNkbztcIjpcIuKIlFwiLFwiJnBsdXNkdTtcIjpcIuKopVwiLFwiJnBsdXNlO1wiOlwi4qmyXCIsXCImcGx1c21uXCI6XCLCsVwiLFwiJnBsdXNtbjtcIjpcIsKxXCIsXCImcGx1c3NpbTtcIjpcIuKoplwiLFwiJnBsdXN0d287XCI6XCLiqKdcIixcIiZwbTtcIjpcIsKxXCIsXCImcG9pbnRpbnQ7XCI6XCLiqJVcIixcIiZwb3BmO1wiOlwi8J2VoVwiLFwiJnBvdW5kXCI6XCLCo1wiLFwiJnBvdW5kO1wiOlwiwqNcIixcIiZwcjtcIjpcIuKJulwiLFwiJnByRTtcIjpcIuKqs1wiLFwiJnByYXA7XCI6XCLiqrdcIixcIiZwcmN1ZTtcIjpcIuKJvFwiLFwiJnByZTtcIjpcIuKqr1wiLFwiJnByZWM7XCI6XCLiibpcIixcIiZwcmVjYXBwcm94O1wiOlwi4qq3XCIsXCImcHJlY2N1cmx5ZXE7XCI6XCLiibxcIixcIiZwcmVjZXE7XCI6XCLiqq9cIixcIiZwcmVjbmFwcHJveDtcIjpcIuKquVwiLFwiJnByZWNuZXFxO1wiOlwi4qq1XCIsXCImcHJlY25zaW07XCI6XCLii6hcIixcIiZwcmVjc2ltO1wiOlwi4om+XCIsXCImcHJpbWU7XCI6XCLigLJcIixcIiZwcmltZXM7XCI6XCLihJlcIixcIiZwcm5FO1wiOlwi4qq1XCIsXCImcHJuYXA7XCI6XCLiqrlcIixcIiZwcm5zaW07XCI6XCLii6hcIixcIiZwcm9kO1wiOlwi4oiPXCIsXCImcHJvZmFsYXI7XCI6XCLijK5cIixcIiZwcm9mbGluZTtcIjpcIuKMklwiLFwiJnByb2ZzdXJmO1wiOlwi4oyTXCIsXCImcHJvcDtcIjpcIuKInVwiLFwiJnByb3B0bztcIjpcIuKInVwiLFwiJnByc2ltO1wiOlwi4om+XCIsXCImcHJ1cmVsO1wiOlwi4oqwXCIsXCImcHNjcjtcIjpcIvCdk4VcIixcIiZwc2k7XCI6XCLPiFwiLFwiJnB1bmNzcDtcIjpcIuKAiFwiLFwiJnFmcjtcIjpcIvCdlK5cIixcIiZxaW50O1wiOlwi4qiMXCIsXCImcW9wZjtcIjpcIvCdlaJcIixcIiZxcHJpbWU7XCI6XCLigZdcIixcIiZxc2NyO1wiOlwi8J2ThlwiLFwiJnF1YXRlcm5pb25zO1wiOlwi4oSNXCIsXCImcXVhdGludDtcIjpcIuKollwiLFwiJnF1ZXN0O1wiOlwiP1wiLFwiJnF1ZXN0ZXE7XCI6XCLiiZ9cIixcIiZxdW90XCI6J1wiJyxcIiZxdW90O1wiOidcIicsXCImckFhcnI7XCI6XCLih5tcIixcIiZyQXJyO1wiOlwi4oeSXCIsXCImckF0YWlsO1wiOlwi4qScXCIsXCImckJhcnI7XCI6XCLipI9cIixcIiZySGFyO1wiOlwi4qWkXCIsXCImcmFjZTtcIjpcIuKIvcyxXCIsXCImcmFjdXRlO1wiOlwixZVcIixcIiZyYWRpYztcIjpcIuKImlwiLFwiJnJhZW1wdHl2O1wiOlwi4qazXCIsXCImcmFuZztcIjpcIuKfqVwiLFwiJnJhbmdkO1wiOlwi4qaSXCIsXCImcmFuZ2U7XCI6XCLipqVcIixcIiZyYW5nbGU7XCI6XCLin6lcIixcIiZyYXF1b1wiOlwiwrtcIixcIiZyYXF1bztcIjpcIsK7XCIsXCImcmFycjtcIjpcIuKGklwiLFwiJnJhcnJhcDtcIjpcIuKltVwiLFwiJnJhcnJiO1wiOlwi4oelXCIsXCImcmFycmJmcztcIjpcIuKkoFwiLFwiJnJhcnJjO1wiOlwi4qSzXCIsXCImcmFycmZzO1wiOlwi4qSeXCIsXCImcmFycmhrO1wiOlwi4oaqXCIsXCImcmFycmxwO1wiOlwi4oasXCIsXCImcmFycnBsO1wiOlwi4qWFXCIsXCImcmFycnNpbTtcIjpcIuKltFwiLFwiJnJhcnJ0bDtcIjpcIuKGo1wiLFwiJnJhcnJ3O1wiOlwi4oadXCIsXCImcmF0YWlsO1wiOlwi4qSaXCIsXCImcmF0aW87XCI6XCLiiLZcIixcIiZyYXRpb25hbHM7XCI6XCLihJpcIixcIiZyYmFycjtcIjpcIuKkjVwiLFwiJnJiYnJrO1wiOlwi4p2zXCIsXCImcmJyYWNlO1wiOlwifVwiLFwiJnJicmFjaztcIjpcIl1cIixcIiZyYnJrZTtcIjpcIuKmjFwiLFwiJnJicmtzbGQ7XCI6XCLipo5cIixcIiZyYnJrc2x1O1wiOlwi4qaQXCIsXCImcmNhcm9uO1wiOlwixZlcIixcIiZyY2VkaWw7XCI6XCLFl1wiLFwiJnJjZWlsO1wiOlwi4oyJXCIsXCImcmN1YjtcIjpcIn1cIixcIiZyY3k7XCI6XCLRgFwiLFwiJnJkY2E7XCI6XCLipLdcIixcIiZyZGxkaGFyO1wiOlwi4qWpXCIsXCImcmRxdW87XCI6XCLigJ1cIixcIiZyZHF1b3I7XCI6XCLigJ1cIixcIiZyZHNoO1wiOlwi4oazXCIsXCImcmVhbDtcIjpcIuKEnFwiLFwiJnJlYWxpbmU7XCI6XCLihJtcIixcIiZyZWFscGFydDtcIjpcIuKEnFwiLFwiJnJlYWxzO1wiOlwi4oSdXCIsXCImcmVjdDtcIjpcIuKWrVwiLFwiJnJlZ1wiOlwiwq5cIixcIiZyZWc7XCI6XCLCrlwiLFwiJnJmaXNodDtcIjpcIuKlvVwiLFwiJnJmbG9vcjtcIjpcIuKMi1wiLFwiJnJmcjtcIjpcIvCdlK9cIixcIiZyaGFyZDtcIjpcIuKHgVwiLFwiJnJoYXJ1O1wiOlwi4oeAXCIsXCImcmhhcnVsO1wiOlwi4qWsXCIsXCImcmhvO1wiOlwiz4FcIixcIiZyaG92O1wiOlwiz7FcIixcIiZyaWdodGFycm93O1wiOlwi4oaSXCIsXCImcmlnaHRhcnJvd3RhaWw7XCI6XCLihqNcIixcIiZyaWdodGhhcnBvb25kb3duO1wiOlwi4oeBXCIsXCImcmlnaHRoYXJwb29udXA7XCI6XCLih4BcIixcIiZyaWdodGxlZnRhcnJvd3M7XCI6XCLih4RcIixcIiZyaWdodGxlZnRoYXJwb29ucztcIjpcIuKHjFwiLFwiJnJpZ2h0cmlnaHRhcnJvd3M7XCI6XCLih4lcIixcIiZyaWdodHNxdWlnYXJyb3c7XCI6XCLihp1cIixcIiZyaWdodHRocmVldGltZXM7XCI6XCLii4xcIixcIiZyaW5nO1wiOlwiy5pcIixcIiZyaXNpbmdkb3RzZXE7XCI6XCLiiZNcIixcIiZybGFycjtcIjpcIuKHhFwiLFwiJnJsaGFyO1wiOlwi4oeMXCIsXCImcmxtO1wiOlwi4oCPXCIsXCImcm1vdXN0O1wiOlwi4o6xXCIsXCImcm1vdXN0YWNoZTtcIjpcIuKOsVwiLFwiJnJubWlkO1wiOlwi4quuXCIsXCImcm9hbmc7XCI6XCLin61cIixcIiZyb2FycjtcIjpcIuKHvlwiLFwiJnJvYnJrO1wiOlwi4p+nXCIsXCImcm9wYXI7XCI6XCLipoZcIixcIiZyb3BmO1wiOlwi8J2Vo1wiLFwiJnJvcGx1cztcIjpcIuKorlwiLFwiJnJvdGltZXM7XCI6XCLiqLVcIixcIiZycGFyO1wiOlwiKVwiLFwiJnJwYXJndDtcIjpcIuKmlFwiLFwiJnJwcG9saW50O1wiOlwi4qiSXCIsXCImcnJhcnI7XCI6XCLih4lcIixcIiZyc2FxdW87XCI6XCLigLpcIixcIiZyc2NyO1wiOlwi8J2Th1wiLFwiJnJzaDtcIjpcIuKGsVwiLFwiJnJzcWI7XCI6XCJdXCIsXCImcnNxdW87XCI6XCLigJlcIixcIiZyc3F1b3I7XCI6XCLigJlcIixcIiZydGhyZWU7XCI6XCLii4xcIixcIiZydGltZXM7XCI6XCLii4pcIixcIiZydHJpO1wiOlwi4pa5XCIsXCImcnRyaWU7XCI6XCLiirVcIixcIiZydHJpZjtcIjpcIuKWuFwiLFwiJnJ0cmlsdHJpO1wiOlwi4qeOXCIsXCImcnVsdWhhcjtcIjpcIuKlqFwiLFwiJnJ4O1wiOlwi4oSeXCIsXCImc2FjdXRlO1wiOlwixZtcIixcIiZzYnF1bztcIjpcIuKAmlwiLFwiJnNjO1wiOlwi4om7XCIsXCImc2NFO1wiOlwi4qq0XCIsXCImc2NhcDtcIjpcIuKquFwiLFwiJnNjYXJvbjtcIjpcIsWhXCIsXCImc2NjdWU7XCI6XCLiib1cIixcIiZzY2U7XCI6XCLiqrBcIixcIiZzY2VkaWw7XCI6XCLFn1wiLFwiJnNjaXJjO1wiOlwixZ1cIixcIiZzY25FO1wiOlwi4qq2XCIsXCImc2NuYXA7XCI6XCLiqrpcIixcIiZzY25zaW07XCI6XCLii6lcIixcIiZzY3BvbGludDtcIjpcIuKok1wiLFwiJnNjc2ltO1wiOlwi4om/XCIsXCImc2N5O1wiOlwi0YFcIixcIiZzZG90O1wiOlwi4ouFXCIsXCImc2RvdGI7XCI6XCLiiqFcIixcIiZzZG90ZTtcIjpcIuKpplwiLFwiJnNlQXJyO1wiOlwi4oeYXCIsXCImc2VhcmhrO1wiOlwi4qSlXCIsXCImc2VhcnI7XCI6XCLihphcIixcIiZzZWFycm93O1wiOlwi4oaYXCIsXCImc2VjdFwiOlwiwqdcIixcIiZzZWN0O1wiOlwiwqdcIixcIiZzZW1pO1wiOlwiO1wiLFwiJnNlc3dhcjtcIjpcIuKkqVwiLFwiJnNldG1pbnVzO1wiOlwi4oiWXCIsXCImc2V0bW47XCI6XCLiiJZcIixcIiZzZXh0O1wiOlwi4py2XCIsXCImc2ZyO1wiOlwi8J2UsFwiLFwiJnNmcm93bjtcIjpcIuKMolwiLFwiJnNoYXJwO1wiOlwi4pmvXCIsXCImc2hjaGN5O1wiOlwi0YlcIixcIiZzaGN5O1wiOlwi0YhcIixcIiZzaG9ydG1pZDtcIjpcIuKIo1wiLFwiJnNob3J0cGFyYWxsZWw7XCI6XCLiiKVcIixcIiZzaHlcIjpcIsKtXCIsXCImc2h5O1wiOlwiwq1cIixcIiZzaWdtYTtcIjpcIs+DXCIsXCImc2lnbWFmO1wiOlwiz4JcIixcIiZzaWdtYXY7XCI6XCLPglwiLFwiJnNpbTtcIjpcIuKIvFwiLFwiJnNpbWRvdDtcIjpcIuKpqlwiLFwiJnNpbWU7XCI6XCLiiYNcIixcIiZzaW1lcTtcIjpcIuKJg1wiLFwiJnNpbWc7XCI6XCLiqp5cIixcIiZzaW1nRTtcIjpcIuKqoFwiLFwiJnNpbWw7XCI6XCLiqp1cIixcIiZzaW1sRTtcIjpcIuKqn1wiLFwiJnNpbW5lO1wiOlwi4omGXCIsXCImc2ltcGx1cztcIjpcIuKopFwiLFwiJnNpbXJhcnI7XCI6XCLipbJcIixcIiZzbGFycjtcIjpcIuKGkFwiLFwiJnNtYWxsc2V0bWludXM7XCI6XCLiiJZcIixcIiZzbWFzaHA7XCI6XCLiqLNcIixcIiZzbWVwYXJzbDtcIjpcIuKnpFwiLFwiJnNtaWQ7XCI6XCLiiKNcIixcIiZzbWlsZTtcIjpcIuKMo1wiLFwiJnNtdDtcIjpcIuKqqlwiLFwiJnNtdGU7XCI6XCLiqqxcIixcIiZzbXRlcztcIjpcIuKqrO+4gFwiLFwiJnNvZnRjeTtcIjpcItGMXCIsXCImc29sO1wiOlwiL1wiLFwiJnNvbGI7XCI6XCLip4RcIixcIiZzb2xiYXI7XCI6XCLijL9cIixcIiZzb3BmO1wiOlwi8J2VpFwiLFwiJnNwYWRlcztcIjpcIuKZoFwiLFwiJnNwYWRlc3VpdDtcIjpcIuKZoFwiLFwiJnNwYXI7XCI6XCLiiKVcIixcIiZzcWNhcDtcIjpcIuKKk1wiLFwiJnNxY2FwcztcIjpcIuKKk++4gFwiLFwiJnNxY3VwO1wiOlwi4oqUXCIsXCImc3FjdXBzO1wiOlwi4oqU77iAXCIsXCImc3FzdWI7XCI6XCLiio9cIixcIiZzcXN1YmU7XCI6XCLiipFcIixcIiZzcXN1YnNldDtcIjpcIuKKj1wiLFwiJnNxc3Vic2V0ZXE7XCI6XCLiipFcIixcIiZzcXN1cDtcIjpcIuKKkFwiLFwiJnNxc3VwZTtcIjpcIuKKklwiLFwiJnNxc3Vwc2V0O1wiOlwi4oqQXCIsXCImc3FzdXBzZXRlcTtcIjpcIuKKklwiLFwiJnNxdTtcIjpcIuKWoVwiLFwiJnNxdWFyZTtcIjpcIuKWoVwiLFwiJnNxdWFyZjtcIjpcIuKWqlwiLFwiJnNxdWY7XCI6XCLilqpcIixcIiZzcmFycjtcIjpcIuKGklwiLFwiJnNzY3I7XCI6XCLwnZOIXCIsXCImc3NldG1uO1wiOlwi4oiWXCIsXCImc3NtaWxlO1wiOlwi4oyjXCIsXCImc3N0YXJmO1wiOlwi4ouGXCIsXCImc3RhcjtcIjpcIuKYhlwiLFwiJnN0YXJmO1wiOlwi4piFXCIsXCImc3RyYWlnaHRlcHNpbG9uO1wiOlwiz7VcIixcIiZzdHJhaWdodHBoaTtcIjpcIs+VXCIsXCImc3RybnM7XCI6XCLCr1wiLFwiJnN1YjtcIjpcIuKKglwiLFwiJnN1YkU7XCI6XCLiq4VcIixcIiZzdWJkb3Q7XCI6XCLiqr1cIixcIiZzdWJlO1wiOlwi4oqGXCIsXCImc3ViZWRvdDtcIjpcIuKrg1wiLFwiJnN1Ym11bHQ7XCI6XCLiq4FcIixcIiZzdWJuRTtcIjpcIuKri1wiLFwiJnN1Ym5lO1wiOlwi4oqKXCIsXCImc3VicGx1cztcIjpcIuKqv1wiLFwiJnN1YnJhcnI7XCI6XCLipblcIixcIiZzdWJzZXQ7XCI6XCLiioJcIixcIiZzdWJzZXRlcTtcIjpcIuKKhlwiLFwiJnN1YnNldGVxcTtcIjpcIuKrhVwiLFwiJnN1YnNldG5lcTtcIjpcIuKKilwiLFwiJnN1YnNldG5lcXE7XCI6XCLiq4tcIixcIiZzdWJzaW07XCI6XCLiq4dcIixcIiZzdWJzdWI7XCI6XCLiq5VcIixcIiZzdWJzdXA7XCI6XCLiq5NcIixcIiZzdWNjO1wiOlwi4om7XCIsXCImc3VjY2FwcHJveDtcIjpcIuKquFwiLFwiJnN1Y2NjdXJseWVxO1wiOlwi4om9XCIsXCImc3VjY2VxO1wiOlwi4qqwXCIsXCImc3VjY25hcHByb3g7XCI6XCLiqrpcIixcIiZzdWNjbmVxcTtcIjpcIuKqtlwiLFwiJnN1Y2Nuc2ltO1wiOlwi4oupXCIsXCImc3VjY3NpbTtcIjpcIuKJv1wiLFwiJnN1bTtcIjpcIuKIkVwiLFwiJnN1bmc7XCI6XCLimapcIixcIiZzdXAxXCI6XCLCuVwiLFwiJnN1cDE7XCI6XCLCuVwiLFwiJnN1cDJcIjpcIsKyXCIsXCImc3VwMjtcIjpcIsKyXCIsXCImc3VwM1wiOlwiwrNcIixcIiZzdXAzO1wiOlwiwrNcIixcIiZzdXA7XCI6XCLiioNcIixcIiZzdXBFO1wiOlwi4quGXCIsXCImc3VwZG90O1wiOlwi4qq+XCIsXCImc3VwZHN1YjtcIjpcIuKrmFwiLFwiJnN1cGU7XCI6XCLiiodcIixcIiZzdXBlZG90O1wiOlwi4quEXCIsXCImc3VwaHNvbDtcIjpcIuKfiVwiLFwiJnN1cGhzdWI7XCI6XCLiq5dcIixcIiZzdXBsYXJyO1wiOlwi4qW7XCIsXCImc3VwbXVsdDtcIjpcIuKrglwiLFwiJnN1cG5FO1wiOlwi4quMXCIsXCImc3VwbmU7XCI6XCLiiotcIixcIiZzdXBwbHVzO1wiOlwi4quAXCIsXCImc3Vwc2V0O1wiOlwi4oqDXCIsXCImc3Vwc2V0ZXE7XCI6XCLiiodcIixcIiZzdXBzZXRlcXE7XCI6XCLiq4ZcIixcIiZzdXBzZXRuZXE7XCI6XCLiiotcIixcIiZzdXBzZXRuZXFxO1wiOlwi4quMXCIsXCImc3Vwc2ltO1wiOlwi4quIXCIsXCImc3Vwc3ViO1wiOlwi4quUXCIsXCImc3Vwc3VwO1wiOlwi4quWXCIsXCImc3dBcnI7XCI6XCLih5lcIixcIiZzd2FyaGs7XCI6XCLipKZcIixcIiZzd2FycjtcIjpcIuKGmVwiLFwiJnN3YXJyb3c7XCI6XCLihplcIixcIiZzd253YXI7XCI6XCLipKpcIixcIiZzemxpZ1wiOlwiw59cIixcIiZzemxpZztcIjpcIsOfXCIsXCImdGFyZ2V0O1wiOlwi4oyWXCIsXCImdGF1O1wiOlwiz4RcIixcIiZ0YnJrO1wiOlwi4o60XCIsXCImdGNhcm9uO1wiOlwixaVcIixcIiZ0Y2VkaWw7XCI6XCLFo1wiLFwiJnRjeTtcIjpcItGCXCIsXCImdGRvdDtcIjpcIuKDm1wiLFwiJnRlbHJlYztcIjpcIuKMlVwiLFwiJnRmcjtcIjpcIvCdlLFcIixcIiZ0aGVyZTQ7XCI6XCLiiLRcIixcIiZ0aGVyZWZvcmU7XCI6XCLiiLRcIixcIiZ0aGV0YTtcIjpcIs64XCIsXCImdGhldGFzeW07XCI6XCLPkVwiLFwiJnRoZXRhdjtcIjpcIs+RXCIsXCImdGhpY2thcHByb3g7XCI6XCLiiYhcIixcIiZ0aGlja3NpbTtcIjpcIuKIvFwiLFwiJnRoaW5zcDtcIjpcIuKAiVwiLFwiJnRoa2FwO1wiOlwi4omIXCIsXCImdGhrc2ltO1wiOlwi4oi8XCIsXCImdGhvcm5cIjpcIsO+XCIsXCImdGhvcm47XCI6XCLDvlwiLFwiJnRpbGRlO1wiOlwiy5xcIixcIiZ0aW1lc1wiOlwiw5dcIixcIiZ0aW1lcztcIjpcIsOXXCIsXCImdGltZXNiO1wiOlwi4oqgXCIsXCImdGltZXNiYXI7XCI6XCLiqLFcIixcIiZ0aW1lc2Q7XCI6XCLiqLBcIixcIiZ0aW50O1wiOlwi4oitXCIsXCImdG9lYTtcIjpcIuKkqFwiLFwiJnRvcDtcIjpcIuKKpFwiLFwiJnRvcGJvdDtcIjpcIuKMtlwiLFwiJnRvcGNpcjtcIjpcIuKrsVwiLFwiJnRvcGY7XCI6XCLwnZWlXCIsXCImdG9wZm9yaztcIjpcIuKrmlwiLFwiJnRvc2E7XCI6XCLipKlcIixcIiZ0cHJpbWU7XCI6XCLigLRcIixcIiZ0cmFkZTtcIjpcIuKEolwiLFwiJnRyaWFuZ2xlO1wiOlwi4pa1XCIsXCImdHJpYW5nbGVkb3duO1wiOlwi4pa/XCIsXCImdHJpYW5nbGVsZWZ0O1wiOlwi4peDXCIsXCImdHJpYW5nbGVsZWZ0ZXE7XCI6XCLiirRcIixcIiZ0cmlhbmdsZXE7XCI6XCLiiZxcIixcIiZ0cmlhbmdsZXJpZ2h0O1wiOlwi4pa5XCIsXCImdHJpYW5nbGVyaWdodGVxO1wiOlwi4oq1XCIsXCImdHJpZG90O1wiOlwi4pesXCIsXCImdHJpZTtcIjpcIuKJnFwiLFwiJnRyaW1pbnVzO1wiOlwi4qi6XCIsXCImdHJpcGx1cztcIjpcIuKouVwiLFwiJnRyaXNiO1wiOlwi4qeNXCIsXCImdHJpdGltZTtcIjpcIuKou1wiLFwiJnRycGV6aXVtO1wiOlwi4o+iXCIsXCImdHNjcjtcIjpcIvCdk4lcIixcIiZ0c2N5O1wiOlwi0YZcIixcIiZ0c2hjeTtcIjpcItGbXCIsXCImdHN0cm9rO1wiOlwixadcIixcIiZ0d2l4dDtcIjpcIuKJrFwiLFwiJnR3b2hlYWRsZWZ0YXJyb3c7XCI6XCLihp5cIixcIiZ0d29oZWFkcmlnaHRhcnJvdztcIjpcIuKGoFwiLFwiJnVBcnI7XCI6XCLih5FcIixcIiZ1SGFyO1wiOlwi4qWjXCIsXCImdWFjdXRlXCI6XCLDulwiLFwiJnVhY3V0ZTtcIjpcIsO6XCIsXCImdWFycjtcIjpcIuKGkVwiLFwiJnVicmN5O1wiOlwi0Z5cIixcIiZ1YnJldmU7XCI6XCLFrVwiLFwiJnVjaXJjXCI6XCLDu1wiLFwiJnVjaXJjO1wiOlwiw7tcIixcIiZ1Y3k7XCI6XCLRg1wiLFwiJnVkYXJyO1wiOlwi4oeFXCIsXCImdWRibGFjO1wiOlwixbFcIixcIiZ1ZGhhcjtcIjpcIuKlrlwiLFwiJnVmaXNodDtcIjpcIuKlvlwiLFwiJnVmcjtcIjpcIvCdlLJcIixcIiZ1Z3JhdmVcIjpcIsO5XCIsXCImdWdyYXZlO1wiOlwiw7lcIixcIiZ1aGFybDtcIjpcIuKGv1wiLFwiJnVoYXJyO1wiOlwi4oa+XCIsXCImdWhibGs7XCI6XCLiloBcIixcIiZ1bGNvcm47XCI6XCLijJxcIixcIiZ1bGNvcm5lcjtcIjpcIuKMnFwiLFwiJnVsY3JvcDtcIjpcIuKMj1wiLFwiJnVsdHJpO1wiOlwi4pe4XCIsXCImdW1hY3I7XCI6XCLFq1wiLFwiJnVtbFwiOlwiwqhcIixcIiZ1bWw7XCI6XCLCqFwiLFwiJnVvZ29uO1wiOlwixbNcIixcIiZ1b3BmO1wiOlwi8J2VplwiLFwiJnVwYXJyb3c7XCI6XCLihpFcIixcIiZ1cGRvd25hcnJvdztcIjpcIuKGlVwiLFwiJnVwaGFycG9vbmxlZnQ7XCI6XCLihr9cIixcIiZ1cGhhcnBvb25yaWdodDtcIjpcIuKGvlwiLFwiJnVwbHVzO1wiOlwi4oqOXCIsXCImdXBzaTtcIjpcIs+FXCIsXCImdXBzaWg7XCI6XCLPklwiLFwiJnVwc2lsb247XCI6XCLPhVwiLFwiJnVwdXBhcnJvd3M7XCI6XCLih4hcIixcIiZ1cmNvcm47XCI6XCLijJ1cIixcIiZ1cmNvcm5lcjtcIjpcIuKMnVwiLFwiJnVyY3JvcDtcIjpcIuKMjlwiLFwiJnVyaW5nO1wiOlwixa9cIixcIiZ1cnRyaTtcIjpcIuKXuVwiLFwiJnVzY3I7XCI6XCLwnZOKXCIsXCImdXRkb3Q7XCI6XCLii7BcIixcIiZ1dGlsZGU7XCI6XCLFqVwiLFwiJnV0cmk7XCI6XCLilrVcIixcIiZ1dHJpZjtcIjpcIuKWtFwiLFwiJnV1YXJyO1wiOlwi4oeIXCIsXCImdXVtbFwiOlwiw7xcIixcIiZ1dW1sO1wiOlwiw7xcIixcIiZ1d2FuZ2xlO1wiOlwi4qanXCIsXCImdkFycjtcIjpcIuKHlVwiLFwiJnZCYXI7XCI6XCLiq6hcIixcIiZ2QmFydjtcIjpcIuKrqVwiLFwiJnZEYXNoO1wiOlwi4oqoXCIsXCImdmFuZ3J0O1wiOlwi4qacXCIsXCImdmFyZXBzaWxvbjtcIjpcIs+1XCIsXCImdmFya2FwcGE7XCI6XCLPsFwiLFwiJnZhcm5vdGhpbmc7XCI6XCLiiIVcIixcIiZ2YXJwaGk7XCI6XCLPlVwiLFwiJnZhcnBpO1wiOlwiz5ZcIixcIiZ2YXJwcm9wdG87XCI6XCLiiJ1cIixcIiZ2YXJyO1wiOlwi4oaVXCIsXCImdmFycmhvO1wiOlwiz7FcIixcIiZ2YXJzaWdtYTtcIjpcIs+CXCIsXCImdmFyc3Vic2V0bmVxO1wiOlwi4oqK77iAXCIsXCImdmFyc3Vic2V0bmVxcTtcIjpcIuKri++4gFwiLFwiJnZhcnN1cHNldG5lcTtcIjpcIuKKi++4gFwiLFwiJnZhcnN1cHNldG5lcXE7XCI6XCLiq4zvuIBcIixcIiZ2YXJ0aGV0YTtcIjpcIs+RXCIsXCImdmFydHJpYW5nbGVsZWZ0O1wiOlwi4oqyXCIsXCImdmFydHJpYW5nbGVyaWdodDtcIjpcIuKKs1wiLFwiJnZjeTtcIjpcItCyXCIsXCImdmRhc2g7XCI6XCLiiqJcIixcIiZ2ZWU7XCI6XCLiiKhcIixcIiZ2ZWViYXI7XCI6XCLiirtcIixcIiZ2ZWVlcTtcIjpcIuKJmlwiLFwiJnZlbGxpcDtcIjpcIuKLrlwiLFwiJnZlcmJhcjtcIjpcInxcIixcIiZ2ZXJ0O1wiOlwifFwiLFwiJnZmcjtcIjpcIvCdlLNcIixcIiZ2bHRyaTtcIjpcIuKKslwiLFwiJnZuc3ViO1wiOlwi4oqC4oOSXCIsXCImdm5zdXA7XCI6XCLiioPig5JcIixcIiZ2b3BmO1wiOlwi8J2Vp1wiLFwiJnZwcm9wO1wiOlwi4oidXCIsXCImdnJ0cmk7XCI6XCLiirNcIixcIiZ2c2NyO1wiOlwi8J2Ti1wiLFwiJnZzdWJuRTtcIjpcIuKri++4gFwiLFwiJnZzdWJuZTtcIjpcIuKKiu+4gFwiLFwiJnZzdXBuRTtcIjpcIuKrjO+4gFwiLFwiJnZzdXBuZTtcIjpcIuKKi++4gFwiLFwiJnZ6aWd6YWc7XCI6XCLipppcIixcIiZ3Y2lyYztcIjpcIsW1XCIsXCImd2VkYmFyO1wiOlwi4qmfXCIsXCImd2VkZ2U7XCI6XCLiiKdcIixcIiZ3ZWRnZXE7XCI6XCLiiZlcIixcIiZ3ZWllcnA7XCI6XCLihJhcIixcIiZ3ZnI7XCI6XCLwnZS0XCIsXCImd29wZjtcIjpcIvCdlahcIixcIiZ3cDtcIjpcIuKEmFwiLFwiJndyO1wiOlwi4omAXCIsXCImd3JlYXRoO1wiOlwi4omAXCIsXCImd3NjcjtcIjpcIvCdk4xcIixcIiZ4Y2FwO1wiOlwi4ouCXCIsXCImeGNpcmM7XCI6XCLil69cIixcIiZ4Y3VwO1wiOlwi4ouDXCIsXCImeGR0cmk7XCI6XCLilr1cIixcIiZ4ZnI7XCI6XCLwnZS1XCIsXCImeGhBcnI7XCI6XCLin7pcIixcIiZ4aGFycjtcIjpcIuKft1wiLFwiJnhpO1wiOlwizr5cIixcIiZ4bEFycjtcIjpcIuKfuFwiLFwiJnhsYXJyO1wiOlwi4p+1XCIsXCImeG1hcDtcIjpcIuKfvFwiLFwiJnhuaXM7XCI6XCLii7tcIixcIiZ4b2RvdDtcIjpcIuKogFwiLFwiJnhvcGY7XCI6XCLwnZWpXCIsXCImeG9wbHVzO1wiOlwi4qiBXCIsXCImeG90aW1lO1wiOlwi4qiCXCIsXCImeHJBcnI7XCI6XCLin7lcIixcIiZ4cmFycjtcIjpcIuKftlwiLFwiJnhzY3I7XCI6XCLwnZONXCIsXCImeHNxY3VwO1wiOlwi4qiGXCIsXCImeHVwbHVzO1wiOlwi4qiEXCIsXCImeHV0cmk7XCI6XCLilrNcIixcIiZ4dmVlO1wiOlwi4ouBXCIsXCImeHdlZGdlO1wiOlwi4ouAXCIsXCImeWFjdXRlXCI6XCLDvVwiLFwiJnlhY3V0ZTtcIjpcIsO9XCIsXCImeWFjeTtcIjpcItGPXCIsXCImeWNpcmM7XCI6XCLFt1wiLFwiJnljeTtcIjpcItGLXCIsXCImeWVuXCI6XCLCpVwiLFwiJnllbjtcIjpcIsKlXCIsXCImeWZyO1wiOlwi8J2UtlwiLFwiJnlpY3k7XCI6XCLRl1wiLFwiJnlvcGY7XCI6XCLwnZWqXCIsXCImeXNjcjtcIjpcIvCdk45cIixcIiZ5dWN5O1wiOlwi0Y5cIixcIiZ5dW1sXCI6XCLDv1wiLFwiJnl1bWw7XCI6XCLDv1wiLFwiJnphY3V0ZTtcIjpcIsW6XCIsXCImemNhcm9uO1wiOlwixb5cIixcIiZ6Y3k7XCI6XCLQt1wiLFwiJnpkb3Q7XCI6XCLFvFwiLFwiJnplZXRyZjtcIjpcIuKEqFwiLFwiJnpldGE7XCI6XCLOtlwiLFwiJnpmcjtcIjpcIvCdlLdcIixcIiZ6aGN5O1wiOlwi0LZcIixcIiZ6aWdyYXJyO1wiOlwi4oedXCIsXCImem9wZjtcIjpcIvCdlatcIixcIiZ6c2NyO1wiOlwi8J2Tj1wiLFwiJnp3ajtcIjpcIuKAjVwiLFwiJnp3bmo7XCI6XCLigIxcIn0sY2hhcmFjdGVyczp7XCLDhlwiOlwiJkFFbGlnO1wiLFwiJlwiOlwiJmFtcDtcIixcIsOBXCI6XCImQWFjdXRlO1wiLFwixIJcIjpcIiZBYnJldmU7XCIsXCLDglwiOlwiJkFjaXJjO1wiLFwi0JBcIjpcIiZBY3k7XCIsXCLwnZSEXCI6XCImQWZyO1wiLFwiw4BcIjpcIiZBZ3JhdmU7XCIsXCLOkVwiOlwiJkFscGhhO1wiLFwixIBcIjpcIiZBbWFjcjtcIixcIuKpk1wiOlwiJkFuZDtcIixcIsSEXCI6XCImQW9nb247XCIsXCLwnZS4XCI6XCImQW9wZjtcIixcIuKBoVwiOlwiJmFmO1wiLFwiw4VcIjpcIiZhbmdzdDtcIixcIvCdkpxcIjpcIiZBc2NyO1wiLFwi4omUXCI6XCImY29sb25lcTtcIixcIsODXCI6XCImQXRpbGRlO1wiLFwiw4RcIjpcIiZBdW1sO1wiLFwi4oiWXCI6XCImc3NldG1uO1wiLFwi4qunXCI6XCImQmFydjtcIixcIuKMhlwiOlwiJmRvdWJsZWJhcndlZGdlO1wiLFwi0JFcIjpcIiZCY3k7XCIsXCLiiLVcIjpcIiZiZWNhdXNlO1wiLFwi4oSsXCI6XCImYmVybm91O1wiLFwizpJcIjpcIiZCZXRhO1wiLFwi8J2UhVwiOlwiJkJmcjtcIixcIvCdlLlcIjpcIiZCb3BmO1wiLFwiy5hcIjpcIiZicmV2ZTtcIixcIuKJjlwiOlwiJmJ1bXA7XCIsXCLQp1wiOlwiJkNIY3k7XCIsXCLCqVwiOlwiJmNvcHk7XCIsXCLEhlwiOlwiJkNhY3V0ZTtcIixcIuKLklwiOlwiJkNhcDtcIixcIuKFhVwiOlwiJkREO1wiLFwi4oStXCI6XCImQ2ZyO1wiLFwixIxcIjpcIiZDY2Fyb247XCIsXCLDh1wiOlwiJkNjZWRpbDtcIixcIsSIXCI6XCImQ2NpcmM7XCIsXCLiiLBcIjpcIiZDY29uaW50O1wiLFwixIpcIjpcIiZDZG90O1wiLFwiwrhcIjpcIiZjZWRpbDtcIixcIsK3XCI6XCImbWlkZG90O1wiLFwizqdcIjpcIiZDaGk7XCIsXCLiiplcIjpcIiZvZG90O1wiLFwi4oqWXCI6XCImb21pbnVzO1wiLFwi4oqVXCI6XCImb3BsdXM7XCIsXCLiipdcIjpcIiZvdGltZXM7XCIsXCLiiLJcIjpcIiZjd2NvbmludDtcIixcIuKAnVwiOlwiJnJkcXVvcjtcIixcIuKAmVwiOlwiJnJzcXVvcjtcIixcIuKIt1wiOlwiJlByb3BvcnRpb247XCIsXCLiqbRcIjpcIiZDb2xvbmU7XCIsXCLiiaFcIjpcIiZlcXVpdjtcIixcIuKIr1wiOlwiJkRvdWJsZUNvbnRvdXJJbnRlZ3JhbDtcIixcIuKIrlwiOlwiJm9pbnQ7XCIsXCLihIJcIjpcIiZjb21wbGV4ZXM7XCIsXCLiiJBcIjpcIiZjb3Byb2Q7XCIsXCLiiLNcIjpcIiZhd2NvbmludDtcIixcIuKor1wiOlwiJkNyb3NzO1wiLFwi8J2SnlwiOlwiJkNzY3I7XCIsXCLii5NcIjpcIiZDdXA7XCIsXCLiiY1cIjpcIiZhc3ltcGVxO1wiLFwi4qSRXCI6XCImRERvdHJhaGQ7XCIsXCLQglwiOlwiJkRKY3k7XCIsXCLQhVwiOlwiJkRTY3k7XCIsXCLQj1wiOlwiJkRaY3k7XCIsXCLigKFcIjpcIiZkZGFnZ2VyO1wiLFwi4oahXCI6XCImRGFycjtcIixcIuKrpFwiOlwiJkRvdWJsZUxlZnRUZWU7XCIsXCLEjlwiOlwiJkRjYXJvbjtcIixcItCUXCI6XCImRGN5O1wiLFwi4oiHXCI6XCImbmFibGE7XCIsXCLOlFwiOlwiJkRlbHRhO1wiLFwi8J2Uh1wiOlwiJkRmcjtcIixcIsK0XCI6XCImYWN1dGU7XCIsXCLLmVwiOlwiJmRvdDtcIixcIsudXCI6XCImZGJsYWM7XCIsXCJgXCI6XCImZ3JhdmU7XCIsXCLLnFwiOlwiJnRpbGRlO1wiLFwi4ouEXCI6XCImZGlhbW9uZDtcIixcIuKFhlwiOlwiJmRkO1wiLFwi8J2Uu1wiOlwiJkRvcGY7XCIsXCLCqFwiOlwiJnVtbDtcIixcIuKDnFwiOlwiJkRvdERvdDtcIixcIuKJkFwiOlwiJmVzZG90O1wiLFwi4oeTXCI6XCImZEFycjtcIixcIuKHkFwiOlwiJmxBcnI7XCIsXCLih5RcIjpcIiZpZmY7XCIsXCLin7hcIjpcIiZ4bEFycjtcIixcIuKfulwiOlwiJnhoQXJyO1wiLFwi4p+5XCI6XCImeHJBcnI7XCIsXCLih5JcIjpcIiZyQXJyO1wiLFwi4oqoXCI6XCImdkRhc2g7XCIsXCLih5FcIjpcIiZ1QXJyO1wiLFwi4oeVXCI6XCImdkFycjtcIixcIuKIpVwiOlwiJnNwYXI7XCIsXCLihpNcIjpcIiZkb3duYXJyb3c7XCIsXCLipJNcIjpcIiZEb3duQXJyb3dCYXI7XCIsXCLih7VcIjpcIiZkdWFycjtcIixcIsyRXCI6XCImRG93bkJyZXZlO1wiLFwi4qWQXCI6XCImRG93bkxlZnRSaWdodFZlY3RvcjtcIixcIuKlnlwiOlwiJkRvd25MZWZ0VGVlVmVjdG9yO1wiLFwi4oa9XCI6XCImbGhhcmQ7XCIsXCLipZZcIjpcIiZEb3duTGVmdFZlY3RvckJhcjtcIixcIuKln1wiOlwiJkRvd25SaWdodFRlZVZlY3RvcjtcIixcIuKHgVwiOlwiJnJpZ2h0aGFycG9vbmRvd247XCIsXCLipZdcIjpcIiZEb3duUmlnaHRWZWN0b3JCYXI7XCIsXCLiiqRcIjpcIiZ0b3A7XCIsXCLihqdcIjpcIiZtYXBzdG9kb3duO1wiLFwi8J2Sn1wiOlwiJkRzY3I7XCIsXCLEkFwiOlwiJkRzdHJvaztcIixcIsWKXCI6XCImRU5HO1wiLFwiw5BcIjpcIiZFVEg7XCIsXCLDiVwiOlwiJkVhY3V0ZTtcIixcIsSaXCI6XCImRWNhcm9uO1wiLFwiw4pcIjpcIiZFY2lyYztcIixcItCtXCI6XCImRWN5O1wiLFwixJZcIjpcIiZFZG90O1wiLFwi8J2UiFwiOlwiJkVmcjtcIixcIsOIXCI6XCImRWdyYXZlO1wiLFwi4oiIXCI6XCImaXNpbnY7XCIsXCLEklwiOlwiJkVtYWNyO1wiLFwi4pe7XCI6XCImRW1wdHlTbWFsbFNxdWFyZTtcIixcIuKWq1wiOlwiJkVtcHR5VmVyeVNtYWxsU3F1YXJlO1wiLFwixJhcIjpcIiZFb2dvbjtcIixcIvCdlLxcIjpcIiZFb3BmO1wiLFwizpVcIjpcIiZFcHNpbG9uO1wiLFwi4qm1XCI6XCImRXF1YWw7XCIsXCLiiYJcIjpcIiZlc2ltO1wiLFwi4oeMXCI6XCImcmxoYXI7XCIsXCLihLBcIjpcIiZleHBlY3RhdGlvbjtcIixcIuKps1wiOlwiJkVzaW07XCIsXCLOl1wiOlwiJkV0YTtcIixcIsOLXCI6XCImRXVtbDtcIixcIuKIg1wiOlwiJmV4aXN0O1wiLFwi4oWHXCI6XCImZXhwb25lbnRpYWxlO1wiLFwi0KRcIjpcIiZGY3k7XCIsXCLwnZSJXCI6XCImRmZyO1wiLFwi4pe8XCI6XCImRmlsbGVkU21hbGxTcXVhcmU7XCIsXCLilqpcIjpcIiZzcXVmO1wiLFwi8J2UvVwiOlwiJkZvcGY7XCIsXCLiiIBcIjpcIiZmb3JhbGw7XCIsXCLihLFcIjpcIiZGc2NyO1wiLFwi0INcIjpcIiZHSmN5O1wiLFwiPlwiOlwiJmd0O1wiLFwizpNcIjpcIiZHYW1tYTtcIixcIs+cXCI6XCImR2FtbWFkO1wiLFwixJ5cIjpcIiZHYnJldmU7XCIsXCLEolwiOlwiJkdjZWRpbDtcIixcIsScXCI6XCImR2NpcmM7XCIsXCLQk1wiOlwiJkdjeTtcIixcIsSgXCI6XCImR2RvdDtcIixcIvCdlIpcIjpcIiZHZnI7XCIsXCLii5lcIjpcIiZnZ2c7XCIsXCLwnZS+XCI6XCImR29wZjtcIixcIuKJpVwiOlwiJmdlcTtcIixcIuKLm1wiOlwiJmd0cmVxbGVzcztcIixcIuKJp1wiOlwiJmdlcXE7XCIsXCLiqqJcIjpcIiZHcmVhdGVyR3JlYXRlcjtcIixcIuKJt1wiOlwiJmd0cmxlc3M7XCIsXCLiqb5cIjpcIiZnZXM7XCIsXCLiibNcIjpcIiZndHJzaW07XCIsXCLwnZKiXCI6XCImR3NjcjtcIixcIuKJq1wiOlwiJmdnO1wiLFwi0KpcIjpcIiZIQVJEY3k7XCIsXCLLh1wiOlwiJmNhcm9uO1wiLFwiXlwiOlwiJkhhdDtcIixcIsSkXCI6XCImSGNpcmM7XCIsXCLihIxcIjpcIiZQb2luY2FyZXBsYW5lO1wiLFwi4oSLXCI6XCImaGFtaWx0O1wiLFwi4oSNXCI6XCImcXVhdGVybmlvbnM7XCIsXCLilIBcIjpcIiZib3hoO1wiLFwixKZcIjpcIiZIc3Ryb2s7XCIsXCLiiY9cIjpcIiZidW1wZXE7XCIsXCLQlVwiOlwiJklFY3k7XCIsXCLEslwiOlwiJklKbGlnO1wiLFwi0IFcIjpcIiZJT2N5O1wiLFwiw41cIjpcIiZJYWN1dGU7XCIsXCLDjlwiOlwiJkljaXJjO1wiLFwi0JhcIjpcIiZJY3k7XCIsXCLEsFwiOlwiJklkb3Q7XCIsXCLihJFcIjpcIiZpbWFncGFydDtcIixcIsOMXCI6XCImSWdyYXZlO1wiLFwixKpcIjpcIiZJbWFjcjtcIixcIuKFiFwiOlwiJmlpO1wiLFwi4oisXCI6XCImSW50O1wiLFwi4oirXCI6XCImaW50O1wiLFwi4ouCXCI6XCImeGNhcDtcIixcIuKBo1wiOlwiJmljO1wiLFwi4oGiXCI6XCImaXQ7XCIsXCLErlwiOlwiJklvZ29uO1wiLFwi8J2VgFwiOlwiJklvcGY7XCIsXCLOmVwiOlwiJklvdGE7XCIsXCLihJBcIjpcIiZpbWFnbGluZTtcIixcIsSoXCI6XCImSXRpbGRlO1wiLFwi0IZcIjpcIiZJdWtjeTtcIixcIsOPXCI6XCImSXVtbDtcIixcIsS0XCI6XCImSmNpcmM7XCIsXCLQmVwiOlwiJkpjeTtcIixcIvCdlI1cIjpcIiZKZnI7XCIsXCLwnZWBXCI6XCImSm9wZjtcIixcIvCdkqVcIjpcIiZKc2NyO1wiLFwi0IhcIjpcIiZKc2VyY3k7XCIsXCLQhFwiOlwiJkp1a2N5O1wiLFwi0KVcIjpcIiZLSGN5O1wiLFwi0IxcIjpcIiZLSmN5O1wiLFwizppcIjpcIiZLYXBwYTtcIixcIsS2XCI6XCImS2NlZGlsO1wiLFwi0JpcIjpcIiZLY3k7XCIsXCLwnZSOXCI6XCImS2ZyO1wiLFwi8J2VglwiOlwiJktvcGY7XCIsXCLwnZKmXCI6XCImS3NjcjtcIixcItCJXCI6XCImTEpjeTtcIixcIjxcIjpcIiZsdDtcIixcIsS5XCI6XCImTGFjdXRlO1wiLFwizptcIjpcIiZMYW1iZGE7XCIsXCLin6pcIjpcIiZMYW5nO1wiLFwi4oSSXCI6XCImbGFncmFuO1wiLFwi4oaeXCI6XCImdHdvaGVhZGxlZnRhcnJvdztcIixcIsS9XCI6XCImTGNhcm9uO1wiLFwixLtcIjpcIiZMY2VkaWw7XCIsXCLQm1wiOlwiJkxjeTtcIixcIuKfqFwiOlwiJmxhbmdsZTtcIixcIuKGkFwiOlwiJnNsYXJyO1wiLFwi4oekXCI6XCImbGFycmI7XCIsXCLih4ZcIjpcIiZscmFycjtcIixcIuKMiFwiOlwiJmxjZWlsO1wiLFwi4p+mXCI6XCImbG9icms7XCIsXCLipaFcIjpcIiZMZWZ0RG93blRlZVZlY3RvcjtcIixcIuKHg1wiOlwiJmRvd25oYXJwb29ubGVmdDtcIixcIuKlmVwiOlwiJkxlZnREb3duVmVjdG9yQmFyO1wiLFwi4oyKXCI6XCImbGZsb29yO1wiLFwi4oaUXCI6XCImbGVmdHJpZ2h0YXJyb3c7XCIsXCLipY5cIjpcIiZMZWZ0UmlnaHRWZWN0b3I7XCIsXCLiiqNcIjpcIiZkYXNodjtcIixcIuKGpFwiOlwiJm1hcHN0b2xlZnQ7XCIsXCLipZpcIjpcIiZMZWZ0VGVlVmVjdG9yO1wiLFwi4oqyXCI6XCImdmx0cmk7XCIsXCLip49cIjpcIiZMZWZ0VHJpYW5nbGVCYXI7XCIsXCLiirRcIjpcIiZ0cmlhbmdsZWxlZnRlcTtcIixcIuKlkVwiOlwiJkxlZnRVcERvd25WZWN0b3I7XCIsXCLipaBcIjpcIiZMZWZ0VXBUZWVWZWN0b3I7XCIsXCLihr9cIjpcIiZ1cGhhcnBvb25sZWZ0O1wiLFwi4qWYXCI6XCImTGVmdFVwVmVjdG9yQmFyO1wiLFwi4oa8XCI6XCImbGhhcnU7XCIsXCLipZJcIjpcIiZMZWZ0VmVjdG9yQmFyO1wiLFwi4ouaXCI6XCImbGVzc2VxZ3RyO1wiLFwi4ommXCI6XCImbGVxcTtcIixcIuKJtlwiOlwiJmxnO1wiLFwi4qqhXCI6XCImTGVzc0xlc3M7XCIsXCLiqb1cIjpcIiZsZXM7XCIsXCLiibJcIjpcIiZsc2ltO1wiLFwi8J2Uj1wiOlwiJkxmcjtcIixcIuKLmFwiOlwiJkxsO1wiLFwi4oeaXCI6XCImbEFhcnI7XCIsXCLEv1wiOlwiJkxtaWRvdDtcIixcIuKftVwiOlwiJnhsYXJyO1wiLFwi4p+3XCI6XCImeGhhcnI7XCIsXCLin7ZcIjpcIiZ4cmFycjtcIixcIvCdlYNcIjpcIiZMb3BmO1wiLFwi4oaZXCI6XCImc3dhcnJvdztcIixcIuKGmFwiOlwiJnNlYXJyb3c7XCIsXCLihrBcIjpcIiZsc2g7XCIsXCLFgVwiOlwiJkxzdHJvaztcIixcIuKJqlwiOlwiJmxsO1wiLFwi4qSFXCI6XCImTWFwO1wiLFwi0JxcIjpcIiZNY3k7XCIsXCLigZ9cIjpcIiZNZWRpdW1TcGFjZTtcIixcIuKEs1wiOlwiJnBobW1hdDtcIixcIvCdlJBcIjpcIiZNZnI7XCIsXCLiiJNcIjpcIiZtcDtcIixcIvCdlYRcIjpcIiZNb3BmO1wiLFwizpxcIjpcIiZNdTtcIixcItCKXCI6XCImTkpjeTtcIixcIsWDXCI6XCImTmFjdXRlO1wiLFwixYdcIjpcIiZOY2Fyb247XCIsXCLFhVwiOlwiJk5jZWRpbDtcIixcItCdXCI6XCImTmN5O1wiLFwi4oCLXCI6XCImWmVyb1dpZHRoU3BhY2U7XCIsXCJcXG5cIjpcIiZOZXdMaW5lO1wiLFwi8J2UkVwiOlwiJk5mcjtcIixcIuKBoFwiOlwiJk5vQnJlYWs7XCIsXCLCoFwiOlwiJm5ic3A7XCIsXCLihJVcIjpcIiZuYXR1cmFscztcIixcIuKrrFwiOlwiJk5vdDtcIixcIuKJolwiOlwiJm5lcXVpdjtcIixcIuKJrVwiOlwiJk5vdEN1cENhcDtcIixcIuKIplwiOlwiJm5zcGFyO1wiLFwi4oiJXCI6XCImbm90aW52YTtcIixcIuKJoFwiOlwiJm5lO1wiLFwi4omCzLhcIjpcIiZuZXNpbTtcIixcIuKIhFwiOlwiJm5leGlzdHM7XCIsXCLiia9cIjpcIiZuZ3RyO1wiLFwi4omxXCI6XCImbmdlcTtcIixcIuKJp8y4XCI6XCImbmdlcXE7XCIsXCLiiavMuFwiOlwiJm5HdHY7XCIsXCLiiblcIjpcIiZudGdsO1wiLFwi4qm+zLhcIjpcIiZuZ2VzO1wiLFwi4om1XCI6XCImbmdzaW07XCIsXCLiiY7MuFwiOlwiJm5idW1wO1wiLFwi4omPzLhcIjpcIiZuYnVtcGU7XCIsXCLii6pcIjpcIiZudHJpYW5nbGVsZWZ0O1wiLFwi4qePzLhcIjpcIiZOb3RMZWZ0VHJpYW5nbGVCYXI7XCIsXCLii6xcIjpcIiZudHJpYW5nbGVsZWZ0ZXE7XCIsXCLiia5cIjpcIiZubHQ7XCIsXCLiibBcIjpcIiZubGVxO1wiLFwi4om4XCI6XCImbnRsZztcIixcIuKJqsy4XCI6XCImbkx0djtcIixcIuKpvcy4XCI6XCImbmxlcztcIixcIuKJtFwiOlwiJm5sc2ltO1wiLFwi4qqizLhcIjpcIiZOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlcjtcIixcIuKqocy4XCI6XCImTm90TmVzdGVkTGVzc0xlc3M7XCIsXCLiioBcIjpcIiZucHJlYztcIixcIuKqr8y4XCI6XCImbnByZWNlcTtcIixcIuKLoFwiOlwiJm5wcmN1ZTtcIixcIuKIjFwiOlwiJm5vdG5pdmE7XCIsXCLii6tcIjpcIiZudHJpYW5nbGVyaWdodDtcIixcIuKnkMy4XCI6XCImTm90UmlnaHRUcmlhbmdsZUJhcjtcIixcIuKLrVwiOlwiJm50cmlhbmdsZXJpZ2h0ZXE7XCIsXCLiio/MuFwiOlwiJk5vdFNxdWFyZVN1YnNldDtcIixcIuKLolwiOlwiJm5zcXN1YmU7XCIsXCLiipDMuFwiOlwiJk5vdFNxdWFyZVN1cGVyc2V0O1wiLFwi4oujXCI6XCImbnNxc3VwZTtcIixcIuKKguKDklwiOlwiJnZuc3ViO1wiLFwi4oqIXCI6XCImbnN1YnNldGVxO1wiLFwi4oqBXCI6XCImbnN1Y2M7XCIsXCLiqrDMuFwiOlwiJm5zdWNjZXE7XCIsXCLii6FcIjpcIiZuc2NjdWU7XCIsXCLiib/MuFwiOlwiJk5vdFN1Y2NlZWRzVGlsZGU7XCIsXCLiioPig5JcIjpcIiZ2bnN1cDtcIixcIuKKiVwiOlwiJm5zdXBzZXRlcTtcIixcIuKJgVwiOlwiJm5zaW07XCIsXCLiiYRcIjpcIiZuc2ltZXE7XCIsXCLiiYdcIjpcIiZuY29uZztcIixcIuKJiVwiOlwiJm5hcHByb3g7XCIsXCLiiKRcIjpcIiZuc21pZDtcIixcIvCdkqlcIjpcIiZOc2NyO1wiLFwiw5FcIjpcIiZOdGlsZGU7XCIsXCLOnVwiOlwiJk51O1wiLFwixZJcIjpcIiZPRWxpZztcIixcIsOTXCI6XCImT2FjdXRlO1wiLFwiw5RcIjpcIiZPY2lyYztcIixcItCeXCI6XCImT2N5O1wiLFwixZBcIjpcIiZPZGJsYWM7XCIsXCLwnZSSXCI6XCImT2ZyO1wiLFwiw5JcIjpcIiZPZ3JhdmU7XCIsXCLFjFwiOlwiJk9tYWNyO1wiLFwizqlcIjpcIiZvaG07XCIsXCLOn1wiOlwiJk9taWNyb247XCIsXCLwnZWGXCI6XCImT29wZjtcIixcIuKAnFwiOlwiJmxkcXVvO1wiLFwi4oCYXCI6XCImbHNxdW87XCIsXCLiqZRcIjpcIiZPcjtcIixcIvCdkqpcIjpcIiZPc2NyO1wiLFwiw5hcIjpcIiZPc2xhc2g7XCIsXCLDlVwiOlwiJk90aWxkZTtcIixcIuKot1wiOlwiJk90aW1lcztcIixcIsOWXCI6XCImT3VtbDtcIixcIuKAvlwiOlwiJm9saW5lO1wiLFwi4o+eXCI6XCImT3ZlckJyYWNlO1wiLFwi4o60XCI6XCImdGJyaztcIixcIuKPnFwiOlwiJk92ZXJQYXJlbnRoZXNpcztcIixcIuKIglwiOlwiJnBhcnQ7XCIsXCLQn1wiOlwiJlBjeTtcIixcIvCdlJNcIjpcIiZQZnI7XCIsXCLOplwiOlwiJlBoaTtcIixcIs6gXCI6XCImUGk7XCIsXCLCsVwiOlwiJnBtO1wiLFwi4oSZXCI6XCImcHJpbWVzO1wiLFwi4qq7XCI6XCImUHI7XCIsXCLiibpcIjpcIiZwcmVjO1wiLFwi4qqvXCI6XCImcHJlY2VxO1wiLFwi4om8XCI6XCImcHJlY2N1cmx5ZXE7XCIsXCLiib5cIjpcIiZwcnNpbTtcIixcIuKAs1wiOlwiJlByaW1lO1wiLFwi4oiPXCI6XCImcHJvZDtcIixcIuKInVwiOlwiJnZwcm9wO1wiLFwi8J2Sq1wiOlwiJlBzY3I7XCIsXCLOqFwiOlwiJlBzaTtcIiwnXCInOlwiJnF1b3Q7XCIsXCLwnZSUXCI6XCImUWZyO1wiLFwi4oSaXCI6XCImcmF0aW9uYWxzO1wiLFwi8J2SrFwiOlwiJlFzY3I7XCIsXCLipJBcIjpcIiZkcmJrYXJvdztcIixcIsKuXCI6XCImcmVnO1wiLFwixZRcIjpcIiZSYWN1dGU7XCIsXCLin6tcIjpcIiZSYW5nO1wiLFwi4oagXCI6XCImdHdvaGVhZHJpZ2h0YXJyb3c7XCIsXCLipJZcIjpcIiZSYXJydGw7XCIsXCLFmFwiOlwiJlJjYXJvbjtcIixcIsWWXCI6XCImUmNlZGlsO1wiLFwi0KBcIjpcIiZSY3k7XCIsXCLihJxcIjpcIiZyZWFscGFydDtcIixcIuKIi1wiOlwiJm5pdjtcIixcIuKHi1wiOlwiJmxyaGFyO1wiLFwi4qWvXCI6XCImZHVoYXI7XCIsXCLOoVwiOlwiJlJobztcIixcIuKfqVwiOlwiJnJhbmdsZTtcIixcIuKGklwiOlwiJnNyYXJyO1wiLFwi4oelXCI6XCImcmFycmI7XCIsXCLih4RcIjpcIiZybGFycjtcIixcIuKMiVwiOlwiJnJjZWlsO1wiLFwi4p+nXCI6XCImcm9icms7XCIsXCLipZ1cIjpcIiZSaWdodERvd25UZWVWZWN0b3I7XCIsXCLih4JcIjpcIiZkb3duaGFycG9vbnJpZ2h0O1wiLFwi4qWVXCI6XCImUmlnaHREb3duVmVjdG9yQmFyO1wiLFwi4oyLXCI6XCImcmZsb29yO1wiLFwi4oqiXCI6XCImdmRhc2g7XCIsXCLihqZcIjpcIiZtYXBzdG87XCIsXCLipZtcIjpcIiZSaWdodFRlZVZlY3RvcjtcIixcIuKKs1wiOlwiJnZydHJpO1wiLFwi4qeQXCI6XCImUmlnaHRUcmlhbmdsZUJhcjtcIixcIuKKtVwiOlwiJnRyaWFuZ2xlcmlnaHRlcTtcIixcIuKlj1wiOlwiJlJpZ2h0VXBEb3duVmVjdG9yO1wiLFwi4qWcXCI6XCImUmlnaHRVcFRlZVZlY3RvcjtcIixcIuKGvlwiOlwiJnVwaGFycG9vbnJpZ2h0O1wiLFwi4qWUXCI6XCImUmlnaHRVcFZlY3RvckJhcjtcIixcIuKHgFwiOlwiJnJpZ2h0aGFycG9vbnVwO1wiLFwi4qWTXCI6XCImUmlnaHRWZWN0b3JCYXI7XCIsXCLihJ1cIjpcIiZyZWFscztcIixcIuKlsFwiOlwiJlJvdW5kSW1wbGllcztcIixcIuKHm1wiOlwiJnJBYXJyO1wiLFwi4oSbXCI6XCImcmVhbGluZTtcIixcIuKGsVwiOlwiJnJzaDtcIixcIuKntFwiOlwiJlJ1bGVEZWxheWVkO1wiLFwi0KlcIjpcIiZTSENIY3k7XCIsXCLQqFwiOlwiJlNIY3k7XCIsXCLQrFwiOlwiJlNPRlRjeTtcIixcIsWaXCI6XCImU2FjdXRlO1wiLFwi4qq8XCI6XCImU2M7XCIsXCLFoFwiOlwiJlNjYXJvbjtcIixcIsWeXCI6XCImU2NlZGlsO1wiLFwixZxcIjpcIiZTY2lyYztcIixcItChXCI6XCImU2N5O1wiLFwi8J2UllwiOlwiJlNmcjtcIixcIuKGkVwiOlwiJnVwYXJyb3c7XCIsXCLOo1wiOlwiJlNpZ21hO1wiLFwi4oiYXCI6XCImY29tcGZuO1wiLFwi8J2VilwiOlwiJlNvcGY7XCIsXCLiiJpcIjpcIiZyYWRpYztcIixcIuKWoVwiOlwiJnNxdWFyZTtcIixcIuKKk1wiOlwiJnNxY2FwO1wiLFwi4oqPXCI6XCImc3FzdWJzZXQ7XCIsXCLiipFcIjpcIiZzcXN1YnNldGVxO1wiLFwi4oqQXCI6XCImc3FzdXBzZXQ7XCIsXCLiipJcIjpcIiZzcXN1cHNldGVxO1wiLFwi4oqUXCI6XCImc3FjdXA7XCIsXCLwnZKuXCI6XCImU3NjcjtcIixcIuKLhlwiOlwiJnNzdGFyZjtcIixcIuKLkFwiOlwiJlN1YnNldDtcIixcIuKKhlwiOlwiJnN1YnNldGVxO1wiLFwi4om7XCI6XCImc3VjYztcIixcIuKqsFwiOlwiJnN1Y2NlcTtcIixcIuKJvVwiOlwiJnN1Y2NjdXJseWVxO1wiLFwi4om/XCI6XCImc3VjY3NpbTtcIixcIuKIkVwiOlwiJnN1bTtcIixcIuKLkVwiOlwiJlN1cHNldDtcIixcIuKKg1wiOlwiJnN1cHNldDtcIixcIuKKh1wiOlwiJnN1cHNldGVxO1wiLFwiw55cIjpcIiZUSE9STjtcIixcIuKEolwiOlwiJnRyYWRlO1wiLFwi0ItcIjpcIiZUU0hjeTtcIixcItCmXCI6XCImVFNjeTtcIixcIlxcdFwiOlwiJlRhYjtcIixcIs6kXCI6XCImVGF1O1wiLFwixaRcIjpcIiZUY2Fyb247XCIsXCLFolwiOlwiJlRjZWRpbDtcIixcItCiXCI6XCImVGN5O1wiLFwi8J2Ul1wiOlwiJlRmcjtcIixcIuKItFwiOlwiJnRoZXJlZm9yZTtcIixcIs6YXCI6XCImVGhldGE7XCIsXCLigZ/igIpcIjpcIiZUaGlja1NwYWNlO1wiLFwi4oCJXCI6XCImdGhpbnNwO1wiLFwi4oi8XCI6XCImdGhrc2ltO1wiLFwi4omDXCI6XCImc2ltZXE7XCIsXCLiiYVcIjpcIiZjb25nO1wiLFwi4omIXCI6XCImdGhrYXA7XCIsXCLwnZWLXCI6XCImVG9wZjtcIixcIuKDm1wiOlwiJnRkb3Q7XCIsXCLwnZKvXCI6XCImVHNjcjtcIixcIsWmXCI6XCImVHN0cm9rO1wiLFwiw5pcIjpcIiZVYWN1dGU7XCIsXCLihp9cIjpcIiZVYXJyO1wiLFwi4qWJXCI6XCImVWFycm9jaXI7XCIsXCLQjlwiOlwiJlVicmN5O1wiLFwixaxcIjpcIiZVYnJldmU7XCIsXCLDm1wiOlwiJlVjaXJjO1wiLFwi0KNcIjpcIiZVY3k7XCIsXCLFsFwiOlwiJlVkYmxhYztcIixcIvCdlJhcIjpcIiZVZnI7XCIsXCLDmVwiOlwiJlVncmF2ZTtcIixcIsWqXCI6XCImVW1hY3I7XCIsXzpcIiZsb3diYXI7XCIsXCLij59cIjpcIiZVbmRlckJyYWNlO1wiLFwi4o61XCI6XCImYmJyaztcIixcIuKPnVwiOlwiJlVuZGVyUGFyZW50aGVzaXM7XCIsXCLii4NcIjpcIiZ4Y3VwO1wiLFwi4oqOXCI6XCImdXBsdXM7XCIsXCLFslwiOlwiJlVvZ29uO1wiLFwi8J2VjFwiOlwiJlVvcGY7XCIsXCLipJJcIjpcIiZVcEFycm93QmFyO1wiLFwi4oeFXCI6XCImdWRhcnI7XCIsXCLihpVcIjpcIiZ2YXJyO1wiLFwi4qWuXCI6XCImdWRoYXI7XCIsXCLiiqVcIjpcIiZwZXJwO1wiLFwi4oalXCI6XCImbWFwc3RvdXA7XCIsXCLihpZcIjpcIiZud2Fycm93O1wiLFwi4oaXXCI6XCImbmVhcnJvdztcIixcIs+SXCI6XCImdXBzaWg7XCIsXCLOpVwiOlwiJlVwc2lsb247XCIsXCLFrlwiOlwiJlVyaW5nO1wiLFwi8J2SsFwiOlwiJlVzY3I7XCIsXCLFqFwiOlwiJlV0aWxkZTtcIixcIsOcXCI6XCImVXVtbDtcIixcIuKKq1wiOlwiJlZEYXNoO1wiLFwi4qurXCI6XCImVmJhcjtcIixcItCSXCI6XCImVmN5O1wiLFwi4oqpXCI6XCImVmRhc2g7XCIsXCLiq6ZcIjpcIiZWZGFzaGw7XCIsXCLii4FcIjpcIiZ4dmVlO1wiLFwi4oCWXCI6XCImVmVydDtcIixcIuKIo1wiOlwiJnNtaWQ7XCIsXCJ8XCI6XCImdmVydDtcIixcIuKdmFwiOlwiJlZlcnRpY2FsU2VwYXJhdG9yO1wiLFwi4omAXCI6XCImd3JlYXRoO1wiLFwi4oCKXCI6XCImaGFpcnNwO1wiLFwi8J2UmVwiOlwiJlZmcjtcIixcIvCdlY1cIjpcIiZWb3BmO1wiLFwi8J2SsVwiOlwiJlZzY3I7XCIsXCLiiqpcIjpcIiZWdmRhc2g7XCIsXCLFtFwiOlwiJldjaXJjO1wiLFwi4ouAXCI6XCImeHdlZGdlO1wiLFwi8J2UmlwiOlwiJldmcjtcIixcIvCdlY5cIjpcIiZXb3BmO1wiLFwi8J2SslwiOlwiJldzY3I7XCIsXCLwnZSbXCI6XCImWGZyO1wiLFwizp5cIjpcIiZYaTtcIixcIvCdlY9cIjpcIiZYb3BmO1wiLFwi8J2Ss1wiOlwiJlhzY3I7XCIsXCLQr1wiOlwiJllBY3k7XCIsXCLQh1wiOlwiJllJY3k7XCIsXCLQrlwiOlwiJllVY3k7XCIsXCLDnVwiOlwiJllhY3V0ZTtcIixcIsW2XCI6XCImWWNpcmM7XCIsXCLQq1wiOlwiJlljeTtcIixcIvCdlJxcIjpcIiZZZnI7XCIsXCLwnZWQXCI6XCImWW9wZjtcIixcIvCdkrRcIjpcIiZZc2NyO1wiLFwixbhcIjpcIiZZdW1sO1wiLFwi0JZcIjpcIiZaSGN5O1wiLFwixblcIjpcIiZaYWN1dGU7XCIsXCLFvVwiOlwiJlpjYXJvbjtcIixcItCXXCI6XCImWmN5O1wiLFwixbtcIjpcIiZaZG90O1wiLFwizpZcIjpcIiZaZXRhO1wiLFwi4oSoXCI6XCImemVldHJmO1wiLFwi4oSkXCI6XCImaW50ZWdlcnM7XCIsXCLwnZK1XCI6XCImWnNjcjtcIixcIsOhXCI6XCImYWFjdXRlO1wiLFwixINcIjpcIiZhYnJldmU7XCIsXCLiiL5cIjpcIiZtc3Rwb3M7XCIsXCLiiL7Ms1wiOlwiJmFjRTtcIixcIuKIv1wiOlwiJmFjZDtcIixcIsOiXCI6XCImYWNpcmM7XCIsXCLQsFwiOlwiJmFjeTtcIixcIsOmXCI6XCImYWVsaWc7XCIsXCLwnZSeXCI6XCImYWZyO1wiLFwiw6BcIjpcIiZhZ3JhdmU7XCIsXCLihLVcIjpcIiZhbGVwaDtcIixcIs6xXCI6XCImYWxwaGE7XCIsXCLEgVwiOlwiJmFtYWNyO1wiLFwi4qi/XCI6XCImYW1hbGc7XCIsXCLiiKdcIjpcIiZ3ZWRnZTtcIixcIuKplVwiOlwiJmFuZGFuZDtcIixcIuKpnFwiOlwiJmFuZGQ7XCIsXCLiqZhcIjpcIiZhbmRzbG9wZTtcIixcIuKpmlwiOlwiJmFuZHY7XCIsXCLiiKBcIjpcIiZhbmdsZTtcIixcIuKmpFwiOlwiJmFuZ2U7XCIsXCLiiKFcIjpcIiZtZWFzdXJlZGFuZ2xlO1wiLFwi4qaoXCI6XCImYW5nbXNkYWE7XCIsXCLipqlcIjpcIiZhbmdtc2RhYjtcIixcIuKmqlwiOlwiJmFuZ21zZGFjO1wiLFwi4qarXCI6XCImYW5nbXNkYWQ7XCIsXCLipqxcIjpcIiZhbmdtc2RhZTtcIixcIuKmrVwiOlwiJmFuZ21zZGFmO1wiLFwi4qauXCI6XCImYW5nbXNkYWc7XCIsXCLipq9cIjpcIiZhbmdtc2RhaDtcIixcIuKIn1wiOlwiJmFuZ3J0O1wiLFwi4oq+XCI6XCImYW5ncnR2YjtcIixcIuKmnVwiOlwiJmFuZ3J0dmJkO1wiLFwi4oiiXCI6XCImYW5nc3BoO1wiLFwi4o28XCI6XCImYW5nemFycjtcIixcIsSFXCI6XCImYW9nb247XCIsXCLwnZWSXCI6XCImYW9wZjtcIixcIuKpsFwiOlwiJmFwRTtcIixcIuKpr1wiOlwiJmFwYWNpcjtcIixcIuKJilwiOlwiJmFwcHJveGVxO1wiLFwi4omLXCI6XCImYXBpZDtcIixcIidcIjpcIiZhcG9zO1wiLFwiw6VcIjpcIiZhcmluZztcIixcIvCdkrZcIjpcIiZhc2NyO1wiLFwiKlwiOlwiJm1pZGFzdDtcIixcIsOjXCI6XCImYXRpbGRlO1wiLFwiw6RcIjpcIiZhdW1sO1wiLFwi4qiRXCI6XCImYXdpbnQ7XCIsXCLiq61cIjpcIiZiTm90O1wiLFwi4omMXCI6XCImYmNvbmc7XCIsXCLPtlwiOlwiJmJlcHNpO1wiLFwi4oC1XCI6XCImYnByaW1lO1wiLFwi4oi9XCI6XCImYnNpbTtcIixcIuKLjVwiOlwiJmJzaW1lO1wiLFwi4oq9XCI6XCImYmFydmVlO1wiLFwi4oyFXCI6XCImYmFyd2VkZ2U7XCIsXCLijrZcIjpcIiZiYnJrdGJyaztcIixcItCxXCI6XCImYmN5O1wiLFwi4oCeXCI6XCImbGRxdW9yO1wiLFwi4qawXCI6XCImYmVtcHR5djtcIixcIs6yXCI6XCImYmV0YTtcIixcIuKEtlwiOlwiJmJldGg7XCIsXCLiiaxcIjpcIiZ0d2l4dDtcIixcIvCdlJ9cIjpcIiZiZnI7XCIsXCLil69cIjpcIiZ4Y2lyYztcIixcIuKogFwiOlwiJnhvZG90O1wiLFwi4qiBXCI6XCImeG9wbHVzO1wiLFwi4qiCXCI6XCImeG90aW1lO1wiLFwi4qiGXCI6XCImeHNxY3VwO1wiLFwi4piFXCI6XCImc3RhcmY7XCIsXCLilr1cIjpcIiZ4ZHRyaTtcIixcIuKWs1wiOlwiJnh1dHJpO1wiLFwi4qiEXCI6XCImeHVwbHVzO1wiLFwi4qSNXCI6XCImcmJhcnI7XCIsXCLip6tcIjpcIiZsb3pmO1wiLFwi4pa0XCI6XCImdXRyaWY7XCIsXCLilr5cIjpcIiZkdHJpZjtcIixcIuKXglwiOlwiJmx0cmlmO1wiLFwi4pa4XCI6XCImcnRyaWY7XCIsXCLikKNcIjpcIiZibGFuaztcIixcIuKWklwiOlwiJmJsazEyO1wiLFwi4paRXCI6XCImYmxrMTQ7XCIsXCLilpNcIjpcIiZibGszNDtcIixcIuKWiFwiOlwiJmJsb2NrO1wiLFwiPeKDpVwiOlwiJmJuZTtcIixcIuKJoeKDpVwiOlwiJmJuZXF1aXY7XCIsXCLijJBcIjpcIiZibm90O1wiLFwi8J2Vk1wiOlwiJmJvcGY7XCIsXCLii4hcIjpcIiZib3d0aWU7XCIsXCLilZdcIjpcIiZib3hETDtcIixcIuKVlFwiOlwiJmJveERSO1wiLFwi4pWWXCI6XCImYm94RGw7XCIsXCLilZNcIjpcIiZib3hEcjtcIixcIuKVkFwiOlwiJmJveEg7XCIsXCLilaZcIjpcIiZib3hIRDtcIixcIuKVqVwiOlwiJmJveEhVO1wiLFwi4pWkXCI6XCImYm94SGQ7XCIsXCLiladcIjpcIiZib3hIdTtcIixcIuKVnVwiOlwiJmJveFVMO1wiLFwi4pWaXCI6XCImYm94VVI7XCIsXCLilZxcIjpcIiZib3hVbDtcIixcIuKVmVwiOlwiJmJveFVyO1wiLFwi4pWRXCI6XCImYm94VjtcIixcIuKVrFwiOlwiJmJveFZIO1wiLFwi4pWjXCI6XCImYm94Vkw7XCIsXCLilaBcIjpcIiZib3hWUjtcIixcIuKVq1wiOlwiJmJveFZoO1wiLFwi4pWiXCI6XCImYm94Vmw7XCIsXCLilZ9cIjpcIiZib3hWcjtcIixcIuKniVwiOlwiJmJveGJveDtcIixcIuKVlVwiOlwiJmJveGRMO1wiLFwi4pWSXCI6XCImYm94ZFI7XCIsXCLilJBcIjpcIiZib3hkbDtcIixcIuKUjFwiOlwiJmJveGRyO1wiLFwi4pWlXCI6XCImYm94aEQ7XCIsXCLilahcIjpcIiZib3hoVTtcIixcIuKUrFwiOlwiJmJveGhkO1wiLFwi4pS0XCI6XCImYm94aHU7XCIsXCLiip9cIjpcIiZtaW51c2I7XCIsXCLiip5cIjpcIiZwbHVzYjtcIixcIuKKoFwiOlwiJnRpbWVzYjtcIixcIuKVm1wiOlwiJmJveHVMO1wiLFwi4pWYXCI6XCImYm94dVI7XCIsXCLilJhcIjpcIiZib3h1bDtcIixcIuKUlFwiOlwiJmJveHVyO1wiLFwi4pSCXCI6XCImYm94djtcIixcIuKVqlwiOlwiJmJveHZIO1wiLFwi4pWhXCI6XCImYm94dkw7XCIsXCLilZ5cIjpcIiZib3h2UjtcIixcIuKUvFwiOlwiJmJveHZoO1wiLFwi4pSkXCI6XCImYm94dmw7XCIsXCLilJxcIjpcIiZib3h2cjtcIixcIsKmXCI6XCImYnJ2YmFyO1wiLFwi8J2St1wiOlwiJmJzY3I7XCIsXCLigY9cIjpcIiZic2VtaTtcIixcIlxcXFxcIjpcIiZic29sO1wiLFwi4qeFXCI6XCImYnNvbGI7XCIsXCLin4hcIjpcIiZic29saHN1YjtcIixcIuKAolwiOlwiJmJ1bGxldDtcIixcIuKqrlwiOlwiJmJ1bXBFO1wiLFwixIdcIjpcIiZjYWN1dGU7XCIsXCLiiKlcIjpcIiZjYXA7XCIsXCLiqYRcIjpcIiZjYXBhbmQ7XCIsXCLiqYlcIjpcIiZjYXBicmN1cDtcIixcIuKpi1wiOlwiJmNhcGNhcDtcIixcIuKph1wiOlwiJmNhcGN1cDtcIixcIuKpgFwiOlwiJmNhcGRvdDtcIixcIuKIqe+4gFwiOlwiJmNhcHM7XCIsXCLigYFcIjpcIiZjYXJldDtcIixcIuKpjVwiOlwiJmNjYXBzO1wiLFwixI1cIjpcIiZjY2Fyb247XCIsXCLDp1wiOlwiJmNjZWRpbDtcIixcIsSJXCI6XCImY2NpcmM7XCIsXCLiqYxcIjpcIiZjY3VwcztcIixcIuKpkFwiOlwiJmNjdXBzc207XCIsXCLEi1wiOlwiJmNkb3Q7XCIsXCLiprJcIjpcIiZjZW1wdHl2O1wiLFwiwqJcIjpcIiZjZW50O1wiLFwi8J2UoFwiOlwiJmNmcjtcIixcItGHXCI6XCImY2hjeTtcIixcIuKck1wiOlwiJmNoZWNrbWFyaztcIixcIs+HXCI6XCImY2hpO1wiLFwi4peLXCI6XCImY2lyO1wiLFwi4qeDXCI6XCImY2lyRTtcIixcIsuGXCI6XCImY2lyYztcIixcIuKJl1wiOlwiJmNpcmU7XCIsXCLihrpcIjpcIiZvbGFycjtcIixcIuKGu1wiOlwiJm9yYXJyO1wiLFwi4pOIXCI6XCImb1M7XCIsXCLiiptcIjpcIiZvYXN0O1wiLFwi4oqaXCI6XCImb2NpcjtcIixcIuKKnVwiOlwiJm9kYXNoO1wiLFwi4qiQXCI6XCImY2lyZm5pbnQ7XCIsXCLiq69cIjpcIiZjaXJtaWQ7XCIsXCLip4JcIjpcIiZjaXJzY2lyO1wiLFwi4pmjXCI6XCImY2x1YnN1aXQ7XCIsXCI6XCI6XCImY29sb247XCIsXCIsXCI6XCImY29tbWE7XCIsXCJAXCI6XCImY29tbWF0O1wiLFwi4oiBXCI6XCImY29tcGxlbWVudDtcIixcIuKprVwiOlwiJmNvbmdkb3Q7XCIsXCLwnZWUXCI6XCImY29wZjtcIixcIuKEl1wiOlwiJmNvcHlzcjtcIixcIuKGtVwiOlwiJmNyYXJyO1wiLFwi4pyXXCI6XCImY3Jvc3M7XCIsXCLwnZK4XCI6XCImY3NjcjtcIixcIuKrj1wiOlwiJmNzdWI7XCIsXCLiq5FcIjpcIiZjc3ViZTtcIixcIuKrkFwiOlwiJmNzdXA7XCIsXCLiq5JcIjpcIiZjc3VwZTtcIixcIuKLr1wiOlwiJmN0ZG90O1wiLFwi4qS4XCI6XCImY3VkYXJybDtcIixcIuKktVwiOlwiJmN1ZGFycnI7XCIsXCLii55cIjpcIiZjdXJseWVxcHJlYztcIixcIuKLn1wiOlwiJmN1cmx5ZXFzdWNjO1wiLFwi4oa2XCI6XCImY3VydmVhcnJvd2xlZnQ7XCIsXCLipL1cIjpcIiZjdWxhcnJwO1wiLFwi4oiqXCI6XCImY3VwO1wiLFwi4qmIXCI6XCImY3VwYnJjYXA7XCIsXCLiqYZcIjpcIiZjdXBjYXA7XCIsXCLiqYpcIjpcIiZjdXBjdXA7XCIsXCLiio1cIjpcIiZjdXBkb3Q7XCIsXCLiqYVcIjpcIiZjdXBvcjtcIixcIuKIqu+4gFwiOlwiJmN1cHM7XCIsXCLihrdcIjpcIiZjdXJ2ZWFycm93cmlnaHQ7XCIsXCLipLxcIjpcIiZjdXJhcnJtO1wiLFwi4ouOXCI6XCImY3V2ZWU7XCIsXCLii49cIjpcIiZjdXdlZDtcIixcIsKkXCI6XCImY3VycmVuO1wiLFwi4oixXCI6XCImY3dpbnQ7XCIsXCLijK1cIjpcIiZjeWxjdHk7XCIsXCLipaVcIjpcIiZkSGFyO1wiLFwi4oCgXCI6XCImZGFnZ2VyO1wiLFwi4oS4XCI6XCImZGFsZXRoO1wiLFwi4oCQXCI6XCImaHlwaGVuO1wiLFwi4qSPXCI6XCImckJhcnI7XCIsXCLEj1wiOlwiJmRjYXJvbjtcIixcItC0XCI6XCImZGN5O1wiLFwi4oeKXCI6XCImZG93bmRvd25hcnJvd3M7XCIsXCLiqbdcIjpcIiZlRERvdDtcIixcIsKwXCI6XCImZGVnO1wiLFwizrRcIjpcIiZkZWx0YTtcIixcIuKmsVwiOlwiJmRlbXB0eXY7XCIsXCLipb9cIjpcIiZkZmlzaHQ7XCIsXCLwnZShXCI6XCImZGZyO1wiLFwi4pmmXCI6XCImZGlhbXM7XCIsXCLPnVwiOlwiJmdhbW1hZDtcIixcIuKLslwiOlwiJmRpc2luO1wiLFwiw7dcIjpcIiZkaXZpZGU7XCIsXCLii4dcIjpcIiZkaXZvbng7XCIsXCLRklwiOlwiJmRqY3k7XCIsXCLijJ5cIjpcIiZsbGNvcm5lcjtcIixcIuKMjVwiOlwiJmRsY3JvcDtcIiwkOlwiJmRvbGxhcjtcIixcIvCdlZVcIjpcIiZkb3BmO1wiLFwi4omRXCI6XCImZURvdDtcIixcIuKIuFwiOlwiJm1pbnVzZDtcIixcIuKIlFwiOlwiJnBsdXNkbztcIixcIuKKoVwiOlwiJnNkb3RiO1wiLFwi4oyfXCI6XCImbHJjb3JuZXI7XCIsXCLijIxcIjpcIiZkcmNyb3A7XCIsXCLwnZK5XCI6XCImZHNjcjtcIixcItGVXCI6XCImZHNjeTtcIixcIuKntlwiOlwiJmRzb2w7XCIsXCLEkVwiOlwiJmRzdHJvaztcIixcIuKLsVwiOlwiJmR0ZG90O1wiLFwi4pa/XCI6XCImdHJpYW5nbGVkb3duO1wiLFwi4qamXCI6XCImZHdhbmdsZTtcIixcItGfXCI6XCImZHpjeTtcIixcIuKfv1wiOlwiJmR6aWdyYXJyO1wiLFwiw6lcIjpcIiZlYWN1dGU7XCIsXCLiqa5cIjpcIiZlYXN0ZXI7XCIsXCLEm1wiOlwiJmVjYXJvbjtcIixcIuKJllwiOlwiJmVxY2lyYztcIixcIsOqXCI6XCImZWNpcmM7XCIsXCLiiZVcIjpcIiZlcWNvbG9uO1wiLFwi0Y1cIjpcIiZlY3k7XCIsXCLEl1wiOlwiJmVkb3Q7XCIsXCLiiZJcIjpcIiZmYWxsaW5nZG90c2VxO1wiLFwi8J2UolwiOlwiJmVmcjtcIixcIuKqmlwiOlwiJmVnO1wiLFwiw6hcIjpcIiZlZ3JhdmU7XCIsXCLiqpZcIjpcIiZlcXNsYW50Z3RyO1wiLFwi4qqYXCI6XCImZWdzZG90O1wiLFwi4qqZXCI6XCImZWw7XCIsXCLij6dcIjpcIiZlbGludGVycztcIixcIuKEk1wiOlwiJmVsbDtcIixcIuKqlVwiOlwiJmVxc2xhbnRsZXNzO1wiLFwi4qqXXCI6XCImZWxzZG90O1wiLFwixJNcIjpcIiZlbWFjcjtcIixcIuKIhVwiOlwiJnZhcm5vdGhpbmc7XCIsXCLigIRcIjpcIiZlbXNwMTM7XCIsXCLigIVcIjpcIiZlbXNwMTQ7XCIsXCLigINcIjpcIiZlbXNwO1wiLFwixYtcIjpcIiZlbmc7XCIsXCLigIJcIjpcIiZlbnNwO1wiLFwixJlcIjpcIiZlb2dvbjtcIixcIvCdlZZcIjpcIiZlb3BmO1wiLFwi4ouVXCI6XCImZXBhcjtcIixcIuKno1wiOlwiJmVwYXJzbDtcIixcIuKpsVwiOlwiJmVwbHVzO1wiLFwizrVcIjpcIiZlcHNpbG9uO1wiLFwiz7VcIjpcIiZ2YXJlcHNpbG9uO1wiLFwiPVwiOlwiJmVxdWFscztcIixcIuKJn1wiOlwiJnF1ZXN0ZXE7XCIsXCLiqbhcIjpcIiZlcXVpdkREO1wiLFwi4qelXCI6XCImZXF2cGFyc2w7XCIsXCLiiZNcIjpcIiZyaXNpbmdkb3RzZXE7XCIsXCLipbFcIjpcIiZlcmFycjtcIixcIuKEr1wiOlwiJmVzY3I7XCIsXCLOt1wiOlwiJmV0YTtcIixcIsOwXCI6XCImZXRoO1wiLFwiw6tcIjpcIiZldW1sO1wiLFwi4oKsXCI6XCImZXVybztcIixcIiFcIjpcIiZleGNsO1wiLFwi0YRcIjpcIiZmY3k7XCIsXCLimYBcIjpcIiZmZW1hbGU7XCIsXCLvrINcIjpcIiZmZmlsaWc7XCIsXCLvrIBcIjpcIiZmZmxpZztcIixcIu+shFwiOlwiJmZmbGxpZztcIixcIvCdlKNcIjpcIiZmZnI7XCIsXCLvrIFcIjpcIiZmaWxpZztcIixmajpcIiZmamxpZztcIixcIuKZrVwiOlwiJmZsYXQ7XCIsXCLvrIJcIjpcIiZmbGxpZztcIixcIuKWsVwiOlwiJmZsdG5zO1wiLFwixpJcIjpcIiZmbm9mO1wiLFwi8J2Vl1wiOlwiJmZvcGY7XCIsXCLii5RcIjpcIiZwaXRjaGZvcms7XCIsXCLiq5lcIjpcIiZmb3JrdjtcIixcIuKojVwiOlwiJmZwYXJ0aW50O1wiLFwiwr1cIjpcIiZoYWxmO1wiLFwi4oWTXCI6XCImZnJhYzEzO1wiLFwiwrxcIjpcIiZmcmFjMTQ7XCIsXCLihZVcIjpcIiZmcmFjMTU7XCIsXCLihZlcIjpcIiZmcmFjMTY7XCIsXCLihZtcIjpcIiZmcmFjMTg7XCIsXCLihZRcIjpcIiZmcmFjMjM7XCIsXCLihZZcIjpcIiZmcmFjMjU7XCIsXCLCvlwiOlwiJmZyYWMzNDtcIixcIuKFl1wiOlwiJmZyYWMzNTtcIixcIuKFnFwiOlwiJmZyYWMzODtcIixcIuKFmFwiOlwiJmZyYWM0NTtcIixcIuKFmlwiOlwiJmZyYWM1NjtcIixcIuKFnVwiOlwiJmZyYWM1ODtcIixcIuKFnlwiOlwiJmZyYWM3ODtcIixcIuKBhFwiOlwiJmZyYXNsO1wiLFwi4oyiXCI6XCImc2Zyb3duO1wiLFwi8J2Su1wiOlwiJmZzY3I7XCIsXCLiqoxcIjpcIiZndHJlcXFsZXNzO1wiLFwix7VcIjpcIiZnYWN1dGU7XCIsXCLOs1wiOlwiJmdhbW1hO1wiLFwi4qqGXCI6XCImZ3RyYXBwcm94O1wiLFwixJ9cIjpcIiZnYnJldmU7XCIsXCLEnVwiOlwiJmdjaXJjO1wiLFwi0LNcIjpcIiZnY3k7XCIsXCLEoVwiOlwiJmdkb3Q7XCIsXCLiqqlcIjpcIiZnZXNjYztcIixcIuKqgFwiOlwiJmdlc2RvdDtcIixcIuKqglwiOlwiJmdlc2RvdG87XCIsXCLiqoRcIjpcIiZnZXNkb3RvbDtcIixcIuKLm++4gFwiOlwiJmdlc2w7XCIsXCLiqpRcIjpcIiZnZXNsZXM7XCIsXCLwnZSkXCI6XCImZ2ZyO1wiLFwi4oS3XCI6XCImZ2ltZWw7XCIsXCLRk1wiOlwiJmdqY3k7XCIsXCLiqpJcIjpcIiZnbEU7XCIsXCLiqqVcIjpcIiZnbGE7XCIsXCLiqqRcIjpcIiZnbGo7XCIsXCLiialcIjpcIiZnbmVxcTtcIixcIuKqilwiOlwiJmduYXBwcm94O1wiLFwi4qqIXCI6XCImZ25lcTtcIixcIuKLp1wiOlwiJmduc2ltO1wiLFwi8J2VmFwiOlwiJmdvcGY7XCIsXCLihIpcIjpcIiZnc2NyO1wiLFwi4qqOXCI6XCImZ3NpbWU7XCIsXCLiqpBcIjpcIiZnc2ltbDtcIixcIuKqp1wiOlwiJmd0Y2M7XCIsXCLiqbpcIjpcIiZndGNpcjtcIixcIuKLl1wiOlwiJmd0cmRvdDtcIixcIuKmlVwiOlwiJmd0bFBhcjtcIixcIuKpvFwiOlwiJmd0cXVlc3Q7XCIsXCLipbhcIjpcIiZndHJhcnI7XCIsXCLiianvuIBcIjpcIiZndm5FO1wiLFwi0YpcIjpcIiZoYXJkY3k7XCIsXCLipYhcIjpcIiZoYXJyY2lyO1wiLFwi4oatXCI6XCImbGVmdHJpZ2h0c3F1aWdhcnJvdztcIixcIuKEj1wiOlwiJnBsYW5rdjtcIixcIsSlXCI6XCImaGNpcmM7XCIsXCLimaVcIjpcIiZoZWFydHN1aXQ7XCIsXCLigKZcIjpcIiZtbGRyO1wiLFwi4oq5XCI6XCImaGVyY29uO1wiLFwi8J2UpVwiOlwiJmhmcjtcIixcIuKkpVwiOlwiJnNlYXJoaztcIixcIuKkplwiOlwiJnN3YXJoaztcIixcIuKHv1wiOlwiJmhvYXJyO1wiLFwi4oi7XCI6XCImaG9tdGh0O1wiLFwi4oapXCI6XCImbGFycmhrO1wiLFwi4oaqXCI6XCImcmFycmhrO1wiLFwi8J2VmVwiOlwiJmhvcGY7XCIsXCLigJVcIjpcIiZob3JiYXI7XCIsXCLwnZK9XCI6XCImaHNjcjtcIixcIsSnXCI6XCImaHN0cm9rO1wiLFwi4oGDXCI6XCImaHlidWxsO1wiLFwiw61cIjpcIiZpYWN1dGU7XCIsXCLDrlwiOlwiJmljaXJjO1wiLFwi0LhcIjpcIiZpY3k7XCIsXCLQtVwiOlwiJmllY3k7XCIsXCLCoVwiOlwiJmlleGNsO1wiLFwi8J2UplwiOlwiJmlmcjtcIixcIsOsXCI6XCImaWdyYXZlO1wiLFwi4qiMXCI6XCImcWludDtcIixcIuKIrVwiOlwiJnRpbnQ7XCIsXCLip5xcIjpcIiZpaW5maW47XCIsXCLihKlcIjpcIiZpaW90YTtcIixcIsSzXCI6XCImaWpsaWc7XCIsXCLEq1wiOlwiJmltYWNyO1wiLFwixLFcIjpcIiZpbm9kb3Q7XCIsXCLiirdcIjpcIiZpbW9mO1wiLFwixrVcIjpcIiZpbXBlZDtcIixcIuKEhVwiOlwiJmluY2FyZTtcIixcIuKInlwiOlwiJmluZmluO1wiLFwi4qedXCI6XCImaW5maW50aWU7XCIsXCLiirpcIjpcIiZpbnRlcmNhbDtcIixcIuKol1wiOlwiJmludGxhcmhrO1wiLFwi4qi8XCI6XCImaXByb2Q7XCIsXCLRkVwiOlwiJmlvY3k7XCIsXCLEr1wiOlwiJmlvZ29uO1wiLFwi8J2VmlwiOlwiJmlvcGY7XCIsXCLOuVwiOlwiJmlvdGE7XCIsXCLCv1wiOlwiJmlxdWVzdDtcIixcIvCdkr5cIjpcIiZpc2NyO1wiLFwi4ou5XCI6XCImaXNpbkU7XCIsXCLii7VcIjpcIiZpc2luZG90O1wiLFwi4ou0XCI6XCImaXNpbnM7XCIsXCLii7NcIjpcIiZpc2luc3Y7XCIsXCLEqVwiOlwiJml0aWxkZTtcIixcItGWXCI6XCImaXVrY3k7XCIsXCLDr1wiOlwiJml1bWw7XCIsXCLEtVwiOlwiJmpjaXJjO1wiLFwi0LlcIjpcIiZqY3k7XCIsXCLwnZSnXCI6XCImamZyO1wiLFwiyLdcIjpcIiZqbWF0aDtcIixcIvCdlZtcIjpcIiZqb3BmO1wiLFwi8J2Sv1wiOlwiJmpzY3I7XCIsXCLRmFwiOlwiJmpzZXJjeTtcIixcItGUXCI6XCImanVrY3k7XCIsXCLOulwiOlwiJmthcHBhO1wiLFwiz7BcIjpcIiZ2YXJrYXBwYTtcIixcIsS3XCI6XCIma2NlZGlsO1wiLFwi0LpcIjpcIiZrY3k7XCIsXCLwnZSoXCI6XCIma2ZyO1wiLFwixLhcIjpcIiZrZ3JlZW47XCIsXCLRhVwiOlwiJmtoY3k7XCIsXCLRnFwiOlwiJmtqY3k7XCIsXCLwnZWcXCI6XCIma29wZjtcIixcIvCdk4BcIjpcIiZrc2NyO1wiLFwi4qSbXCI6XCImbEF0YWlsO1wiLFwi4qSOXCI6XCImbEJhcnI7XCIsXCLiqotcIjpcIiZsZXNzZXFxZ3RyO1wiLFwi4qWiXCI6XCImbEhhcjtcIixcIsS6XCI6XCImbGFjdXRlO1wiLFwi4qa0XCI6XCImbGFlbXB0eXY7XCIsXCLOu1wiOlwiJmxhbWJkYTtcIixcIuKmkVwiOlwiJmxhbmdkO1wiLFwi4qqFXCI6XCImbGVzc2FwcHJveDtcIixcIsKrXCI6XCImbGFxdW87XCIsXCLipJ9cIjpcIiZsYXJyYmZzO1wiLFwi4qSdXCI6XCImbGFycmZzO1wiLFwi4oarXCI6XCImbG9vcGFycm93bGVmdDtcIixcIuKkuVwiOlwiJmxhcnJwbDtcIixcIuKls1wiOlwiJmxhcnJzaW07XCIsXCLihqJcIjpcIiZsZWZ0YXJyb3d0YWlsO1wiLFwi4qqrXCI6XCImbGF0O1wiLFwi4qSZXCI6XCImbGF0YWlsO1wiLFwi4qqtXCI6XCImbGF0ZTtcIixcIuKqre+4gFwiOlwiJmxhdGVzO1wiLFwi4qSMXCI6XCImbGJhcnI7XCIsXCLinbJcIjpcIiZsYmJyaztcIixcIntcIjpcIiZsY3ViO1wiLFwiW1wiOlwiJmxzcWI7XCIsXCLipotcIjpcIiZsYnJrZTtcIixcIuKmj1wiOlwiJmxicmtzbGQ7XCIsXCLipo1cIjpcIiZsYnJrc2x1O1wiLFwixL5cIjpcIiZsY2Fyb247XCIsXCLEvFwiOlwiJmxjZWRpbDtcIixcItC7XCI6XCImbGN5O1wiLFwi4qS2XCI6XCImbGRjYTtcIixcIuKlp1wiOlwiJmxkcmRoYXI7XCIsXCLipYtcIjpcIiZsZHJ1c2hhcjtcIixcIuKGslwiOlwiJmxkc2g7XCIsXCLiiaRcIjpcIiZsZXE7XCIsXCLih4dcIjpcIiZsbGFycjtcIixcIuKLi1wiOlwiJmx0aHJlZTtcIixcIuKqqFwiOlwiJmxlc2NjO1wiLFwi4qm/XCI6XCImbGVzZG90O1wiLFwi4qqBXCI6XCImbGVzZG90bztcIixcIuKqg1wiOlwiJmxlc2RvdG9yO1wiLFwi4oua77iAXCI6XCImbGVzZztcIixcIuKqk1wiOlwiJmxlc2dlcztcIixcIuKLllwiOlwiJmx0ZG90O1wiLFwi4qW8XCI6XCImbGZpc2h0O1wiLFwi8J2UqVwiOlwiJmxmcjtcIixcIuKqkVwiOlwiJmxnRTtcIixcIuKlqlwiOlwiJmxoYXJ1bDtcIixcIuKWhFwiOlwiJmxoYmxrO1wiLFwi0ZlcIjpcIiZsamN5O1wiLFwi4qWrXCI6XCImbGxoYXJkO1wiLFwi4pe6XCI6XCImbGx0cmk7XCIsXCLFgFwiOlwiJmxtaWRvdDtcIixcIuKOsFwiOlwiJmxtb3VzdGFjaGU7XCIsXCLiiahcIjpcIiZsbmVxcTtcIixcIuKqiVwiOlwiJmxuYXBwcm94O1wiLFwi4qqHXCI6XCImbG5lcTtcIixcIuKLplwiOlwiJmxuc2ltO1wiLFwi4p+sXCI6XCImbG9hbmc7XCIsXCLih71cIjpcIiZsb2FycjtcIixcIuKfvFwiOlwiJnhtYXA7XCIsXCLihqxcIjpcIiZyYXJybHA7XCIsXCLipoVcIjpcIiZsb3BhcjtcIixcIvCdlZ1cIjpcIiZsb3BmO1wiLFwi4qitXCI6XCImbG9wbHVzO1wiLFwi4qi0XCI6XCImbG90aW1lcztcIixcIuKIl1wiOlwiJmxvd2FzdDtcIixcIuKXilwiOlwiJmxvemVuZ2U7XCIsXCIoXCI6XCImbHBhcjtcIixcIuKmk1wiOlwiJmxwYXJsdDtcIixcIuKlrVwiOlwiJmxyaGFyZDtcIixcIuKAjlwiOlwiJmxybTtcIixcIuKKv1wiOlwiJmxydHJpO1wiLFwi4oC5XCI6XCImbHNhcXVvO1wiLFwi8J2TgVwiOlwiJmxzY3I7XCIsXCLiqo1cIjpcIiZsc2ltZTtcIixcIuKqj1wiOlwiJmxzaW1nO1wiLFwi4oCaXCI6XCImc2JxdW87XCIsXCLFglwiOlwiJmxzdHJvaztcIixcIuKqplwiOlwiJmx0Y2M7XCIsXCLiqblcIjpcIiZsdGNpcjtcIixcIuKLiVwiOlwiJmx0aW1lcztcIixcIuKltlwiOlwiJmx0bGFycjtcIixcIuKpu1wiOlwiJmx0cXVlc3Q7XCIsXCLippZcIjpcIiZsdHJQYXI7XCIsXCLil4NcIjpcIiZ0cmlhbmdsZWxlZnQ7XCIsXCLipYpcIjpcIiZsdXJkc2hhcjtcIixcIuKlplwiOlwiJmx1cnVoYXI7XCIsXCLiiajvuIBcIjpcIiZsdm5FO1wiLFwi4oi6XCI6XCImbUREb3Q7XCIsXCLCr1wiOlwiJnN0cm5zO1wiLFwi4pmCXCI6XCImbWFsZTtcIixcIuKcoFwiOlwiJm1hbHRlc2U7XCIsXCLilq5cIjpcIiZtYXJrZXI7XCIsXCLiqKlcIjpcIiZtY29tbWE7XCIsXCLQvFwiOlwiJm1jeTtcIixcIuKAlFwiOlwiJm1kYXNoO1wiLFwi8J2UqlwiOlwiJm1mcjtcIixcIuKEp1wiOlwiJm1obztcIixcIsK1XCI6XCImbWljcm87XCIsXCLiq7BcIjpcIiZtaWRjaXI7XCIsXCLiiJJcIjpcIiZtaW51cztcIixcIuKoqlwiOlwiJm1pbnVzZHU7XCIsXCLiq5tcIjpcIiZtbGNwO1wiLFwi4oqnXCI6XCImbW9kZWxzO1wiLFwi8J2VnlwiOlwiJm1vcGY7XCIsXCLwnZOCXCI6XCImbXNjcjtcIixcIs68XCI6XCImbXU7XCIsXCLiirhcIjpcIiZtdW1hcDtcIixcIuKLmcy4XCI6XCImbkdnO1wiLFwi4omr4oOSXCI6XCImbkd0O1wiLFwi4oeNXCI6XCImbmxBcnI7XCIsXCLih45cIjpcIiZuaEFycjtcIixcIuKLmMy4XCI6XCImbkxsO1wiLFwi4omq4oOSXCI6XCImbkx0O1wiLFwi4oePXCI6XCImbnJBcnI7XCIsXCLiiq9cIjpcIiZuVkRhc2g7XCIsXCLiiq5cIjpcIiZuVmRhc2g7XCIsXCLFhFwiOlwiJm5hY3V0ZTtcIixcIuKIoOKDklwiOlwiJm5hbmc7XCIsXCLiqbDMuFwiOlwiJm5hcEU7XCIsXCLiiYvMuFwiOlwiJm5hcGlkO1wiLFwixYlcIjpcIiZuYXBvcztcIixcIuKZrlwiOlwiJm5hdHVyYWw7XCIsXCLiqYNcIjpcIiZuY2FwO1wiLFwixYhcIjpcIiZuY2Fyb247XCIsXCLFhlwiOlwiJm5jZWRpbDtcIixcIuKprcy4XCI6XCImbmNvbmdkb3Q7XCIsXCLiqYJcIjpcIiZuY3VwO1wiLFwi0L1cIjpcIiZuY3k7XCIsXCLigJNcIjpcIiZuZGFzaDtcIixcIuKHl1wiOlwiJm5lQXJyO1wiLFwi4qSkXCI6XCImbmVhcmhrO1wiLFwi4omQzLhcIjpcIiZuZWRvdDtcIixcIuKkqFwiOlwiJnRvZWE7XCIsXCLwnZSrXCI6XCImbmZyO1wiLFwi4oauXCI6XCImbmxlZnRyaWdodGFycm93O1wiLFwi4quyXCI6XCImbmhwYXI7XCIsXCLii7xcIjpcIiZuaXM7XCIsXCLii7pcIjpcIiZuaXNkO1wiLFwi0ZpcIjpcIiZuamN5O1wiLFwi4ommzLhcIjpcIiZubGVxcTtcIixcIuKGmlwiOlwiJm5sZWZ0YXJyb3c7XCIsXCLigKVcIjpcIiZubGRyO1wiLFwi8J2Vn1wiOlwiJm5vcGY7XCIsXCLCrFwiOlwiJm5vdDtcIixcIuKLucy4XCI6XCImbm90aW5FO1wiLFwi4ou1zLhcIjpcIiZub3RpbmRvdDtcIixcIuKLt1wiOlwiJm5vdGludmI7XCIsXCLii7ZcIjpcIiZub3RpbnZjO1wiLFwi4ou+XCI6XCImbm90bml2YjtcIixcIuKLvVwiOlwiJm5vdG5pdmM7XCIsXCLiq73ig6VcIjpcIiZucGFyc2w7XCIsXCLiiILMuFwiOlwiJm5wYXJ0O1wiLFwi4qiUXCI6XCImbnBvbGludDtcIixcIuKGm1wiOlwiJm5yaWdodGFycm93O1wiLFwi4qSzzLhcIjpcIiZucmFycmM7XCIsXCLihp3MuFwiOlwiJm5yYXJydztcIixcIvCdk4NcIjpcIiZuc2NyO1wiLFwi4oqEXCI6XCImbnN1YjtcIixcIuKrhcy4XCI6XCImbnN1YnNldGVxcTtcIixcIuKKhVwiOlwiJm5zdXA7XCIsXCLiq4bMuFwiOlwiJm5zdXBzZXRlcXE7XCIsXCLDsVwiOlwiJm50aWxkZTtcIixcIs69XCI6XCImbnU7XCIsXCIjXCI6XCImbnVtO1wiLFwi4oSWXCI6XCImbnVtZXJvO1wiLFwi4oCHXCI6XCImbnVtc3A7XCIsXCLiiq1cIjpcIiZudkRhc2g7XCIsXCLipIRcIjpcIiZudkhhcnI7XCIsXCLiiY3ig5JcIjpcIiZudmFwO1wiLFwi4oqsXCI6XCImbnZkYXNoO1wiLFwi4oml4oOSXCI6XCImbnZnZTtcIixcIj7ig5JcIjpcIiZudmd0O1wiLFwi4qeeXCI6XCImbnZpbmZpbjtcIixcIuKkglwiOlwiJm52bEFycjtcIixcIuKJpOKDklwiOlwiJm52bGU7XCIsXCI84oOSXCI6XCImbnZsdDtcIixcIuKKtOKDklwiOlwiJm52bHRyaWU7XCIsXCLipINcIjpcIiZudnJBcnI7XCIsXCLiirXig5JcIjpcIiZudnJ0cmllO1wiLFwi4oi84oOSXCI6XCImbnZzaW07XCIsXCLih5ZcIjpcIiZud0FycjtcIixcIuKko1wiOlwiJm53YXJoaztcIixcIuKkp1wiOlwiJm53bmVhcjtcIixcIsOzXCI6XCImb2FjdXRlO1wiLFwiw7RcIjpcIiZvY2lyYztcIixcItC+XCI6XCImb2N5O1wiLFwixZFcIjpcIiZvZGJsYWM7XCIsXCLiqLhcIjpcIiZvZGl2O1wiLFwi4qa8XCI6XCImb2Rzb2xkO1wiLFwixZNcIjpcIiZvZWxpZztcIixcIuKmv1wiOlwiJm9mY2lyO1wiLFwi8J2UrFwiOlwiJm9mcjtcIixcIsubXCI6XCImb2dvbjtcIixcIsOyXCI6XCImb2dyYXZlO1wiLFwi4qeBXCI6XCImb2d0O1wiLFwi4qa1XCI6XCImb2hiYXI7XCIsXCLipr5cIjpcIiZvbGNpcjtcIixcIuKmu1wiOlwiJm9sY3Jvc3M7XCIsXCLip4BcIjpcIiZvbHQ7XCIsXCLFjVwiOlwiJm9tYWNyO1wiLFwiz4lcIjpcIiZvbWVnYTtcIixcIs6/XCI6XCImb21pY3JvbjtcIixcIuKmtlwiOlwiJm9taWQ7XCIsXCLwnZWgXCI6XCImb29wZjtcIixcIuKmt1wiOlwiJm9wYXI7XCIsXCLiprlcIjpcIiZvcGVycDtcIixcIuKIqFwiOlwiJnZlZTtcIixcIuKpnVwiOlwiJm9yZDtcIixcIuKEtFwiOlwiJm9zY3I7XCIsXCLCqlwiOlwiJm9yZGY7XCIsXCLCulwiOlwiJm9yZG07XCIsXCLiirZcIjpcIiZvcmlnb2Y7XCIsXCLiqZZcIjpcIiZvcm9yO1wiLFwi4qmXXCI6XCImb3JzbG9wZTtcIixcIuKpm1wiOlwiJm9ydjtcIixcIsO4XCI6XCImb3NsYXNoO1wiLFwi4oqYXCI6XCImb3NvbDtcIixcIsO1XCI6XCImb3RpbGRlO1wiLFwi4qi2XCI6XCImb3RpbWVzYXM7XCIsXCLDtlwiOlwiJm91bWw7XCIsXCLijL1cIjpcIiZvdmJhcjtcIixcIsK2XCI6XCImcGFyYTtcIixcIuKrs1wiOlwiJnBhcnNpbTtcIixcIuKrvVwiOlwiJnBhcnNsO1wiLFwi0L9cIjpcIiZwY3k7XCIsXCIlXCI6XCImcGVyY250O1wiLFwiLlwiOlwiJnBlcmlvZDtcIixcIuKAsFwiOlwiJnBlcm1pbDtcIixcIuKAsVwiOlwiJnBlcnRlbms7XCIsXCLwnZStXCI6XCImcGZyO1wiLFwiz4ZcIjpcIiZwaGk7XCIsXCLPlVwiOlwiJnZhcnBoaTtcIixcIuKYjlwiOlwiJnBob25lO1wiLFwiz4BcIjpcIiZwaTtcIixcIs+WXCI6XCImdmFycGk7XCIsXCLihI5cIjpcIiZwbGFuY2toO1wiLFwiK1wiOlwiJnBsdXM7XCIsXCLiqKNcIjpcIiZwbHVzYWNpcjtcIixcIuKoolwiOlwiJnBsdXNjaXI7XCIsXCLiqKVcIjpcIiZwbHVzZHU7XCIsXCLiqbJcIjpcIiZwbHVzZTtcIixcIuKoplwiOlwiJnBsdXNzaW07XCIsXCLiqKdcIjpcIiZwbHVzdHdvO1wiLFwi4qiVXCI6XCImcG9pbnRpbnQ7XCIsXCLwnZWhXCI6XCImcG9wZjtcIixcIsKjXCI6XCImcG91bmQ7XCIsXCLiqrNcIjpcIiZwckU7XCIsXCLiqrdcIjpcIiZwcmVjYXBwcm94O1wiLFwi4qq5XCI6XCImcHJuYXA7XCIsXCLiqrVcIjpcIiZwcm5FO1wiLFwi4ouoXCI6XCImcHJuc2ltO1wiLFwi4oCyXCI6XCImcHJpbWU7XCIsXCLijK5cIjpcIiZwcm9mYWxhcjtcIixcIuKMklwiOlwiJnByb2ZsaW5lO1wiLFwi4oyTXCI6XCImcHJvZnN1cmY7XCIsXCLiirBcIjpcIiZwcnVyZWw7XCIsXCLwnZOFXCI6XCImcHNjcjtcIixcIs+IXCI6XCImcHNpO1wiLFwi4oCIXCI6XCImcHVuY3NwO1wiLFwi8J2UrlwiOlwiJnFmcjtcIixcIvCdlaJcIjpcIiZxb3BmO1wiLFwi4oGXXCI6XCImcXByaW1lO1wiLFwi8J2ThlwiOlwiJnFzY3I7XCIsXCLiqJZcIjpcIiZxdWF0aW50O1wiLFwiP1wiOlwiJnF1ZXN0O1wiLFwi4qScXCI6XCImckF0YWlsO1wiLFwi4qWkXCI6XCImckhhcjtcIixcIuKIvcyxXCI6XCImcmFjZTtcIixcIsWVXCI6XCImcmFjdXRlO1wiLFwi4qazXCI6XCImcmFlbXB0eXY7XCIsXCLippJcIjpcIiZyYW5nZDtcIixcIuKmpVwiOlwiJnJhbmdlO1wiLFwiwrtcIjpcIiZyYXF1bztcIixcIuKltVwiOlwiJnJhcnJhcDtcIixcIuKkoFwiOlwiJnJhcnJiZnM7XCIsXCLipLNcIjpcIiZyYXJyYztcIixcIuKknlwiOlwiJnJhcnJmcztcIixcIuKlhVwiOlwiJnJhcnJwbDtcIixcIuKltFwiOlwiJnJhcnJzaW07XCIsXCLihqNcIjpcIiZyaWdodGFycm93dGFpbDtcIixcIuKGnVwiOlwiJnJpZ2h0c3F1aWdhcnJvdztcIixcIuKkmlwiOlwiJnJhdGFpbDtcIixcIuKItlwiOlwiJnJhdGlvO1wiLFwi4p2zXCI6XCImcmJicms7XCIsXCJ9XCI6XCImcmN1YjtcIixcIl1cIjpcIiZyc3FiO1wiLFwi4qaMXCI6XCImcmJya2U7XCIsXCLipo5cIjpcIiZyYnJrc2xkO1wiLFwi4qaQXCI6XCImcmJya3NsdTtcIixcIsWZXCI6XCImcmNhcm9uO1wiLFwixZdcIjpcIiZyY2VkaWw7XCIsXCLRgFwiOlwiJnJjeTtcIixcIuKkt1wiOlwiJnJkY2E7XCIsXCLipalcIjpcIiZyZGxkaGFyO1wiLFwi4oazXCI6XCImcmRzaDtcIixcIuKWrVwiOlwiJnJlY3Q7XCIsXCLipb1cIjpcIiZyZmlzaHQ7XCIsXCLwnZSvXCI6XCImcmZyO1wiLFwi4qWsXCI6XCImcmhhcnVsO1wiLFwiz4FcIjpcIiZyaG87XCIsXCLPsVwiOlwiJnZhcnJobztcIixcIuKHiVwiOlwiJnJyYXJyO1wiLFwi4ouMXCI6XCImcnRocmVlO1wiLFwiy5pcIjpcIiZyaW5nO1wiLFwi4oCPXCI6XCImcmxtO1wiLFwi4o6xXCI6XCImcm1vdXN0YWNoZTtcIixcIuKrrlwiOlwiJnJubWlkO1wiLFwi4p+tXCI6XCImcm9hbmc7XCIsXCLih75cIjpcIiZyb2FycjtcIixcIuKmhlwiOlwiJnJvcGFyO1wiLFwi8J2Vo1wiOlwiJnJvcGY7XCIsXCLiqK5cIjpcIiZyb3BsdXM7XCIsXCLiqLVcIjpcIiZyb3RpbWVzO1wiLFwiKVwiOlwiJnJwYXI7XCIsXCLippRcIjpcIiZycGFyZ3Q7XCIsXCLiqJJcIjpcIiZycHBvbGludDtcIixcIuKAulwiOlwiJnJzYXF1bztcIixcIvCdk4dcIjpcIiZyc2NyO1wiLFwi4ouKXCI6XCImcnRpbWVzO1wiLFwi4pa5XCI6XCImdHJpYW5nbGVyaWdodDtcIixcIuKnjlwiOlwiJnJ0cmlsdHJpO1wiLFwi4qWoXCI6XCImcnVsdWhhcjtcIixcIuKEnlwiOlwiJnJ4O1wiLFwixZtcIjpcIiZzYWN1dGU7XCIsXCLiqrRcIjpcIiZzY0U7XCIsXCLiqrhcIjpcIiZzdWNjYXBwcm94O1wiLFwixaFcIjpcIiZzY2Fyb247XCIsXCLFn1wiOlwiJnNjZWRpbDtcIixcIsWdXCI6XCImc2NpcmM7XCIsXCLiqrZcIjpcIiZzdWNjbmVxcTtcIixcIuKqulwiOlwiJnN1Y2NuYXBwcm94O1wiLFwi4oupXCI6XCImc3VjY25zaW07XCIsXCLiqJNcIjpcIiZzY3BvbGludDtcIixcItGBXCI6XCImc2N5O1wiLFwi4ouFXCI6XCImc2RvdDtcIixcIuKpplwiOlwiJnNkb3RlO1wiLFwi4oeYXCI6XCImc2VBcnI7XCIsXCLCp1wiOlwiJnNlY3Q7XCIsXCI7XCI6XCImc2VtaTtcIixcIuKkqVwiOlwiJnRvc2E7XCIsXCLinLZcIjpcIiZzZXh0O1wiLFwi8J2UsFwiOlwiJnNmcjtcIixcIuKZr1wiOlwiJnNoYXJwO1wiLFwi0YlcIjpcIiZzaGNoY3k7XCIsXCLRiFwiOlwiJnNoY3k7XCIsXCLCrVwiOlwiJnNoeTtcIixcIs+DXCI6XCImc2lnbWE7XCIsXCLPglwiOlwiJnZhcnNpZ21hO1wiLFwi4qmqXCI6XCImc2ltZG90O1wiLFwi4qqeXCI6XCImc2ltZztcIixcIuKqoFwiOlwiJnNpbWdFO1wiLFwi4qqdXCI6XCImc2ltbDtcIixcIuKqn1wiOlwiJnNpbWxFO1wiLFwi4omGXCI6XCImc2ltbmU7XCIsXCLiqKRcIjpcIiZzaW1wbHVzO1wiLFwi4qWyXCI6XCImc2ltcmFycjtcIixcIuKos1wiOlwiJnNtYXNocDtcIixcIuKnpFwiOlwiJnNtZXBhcnNsO1wiLFwi4oyjXCI6XCImc3NtaWxlO1wiLFwi4qqqXCI6XCImc210O1wiLFwi4qqsXCI6XCImc210ZTtcIixcIuKqrO+4gFwiOlwiJnNtdGVzO1wiLFwi0YxcIjpcIiZzb2Z0Y3k7XCIsXCIvXCI6XCImc29sO1wiLFwi4qeEXCI6XCImc29sYjtcIixcIuKMv1wiOlwiJnNvbGJhcjtcIixcIvCdlaRcIjpcIiZzb3BmO1wiLFwi4pmgXCI6XCImc3BhZGVzdWl0O1wiLFwi4oqT77iAXCI6XCImc3FjYXBzO1wiLFwi4oqU77iAXCI6XCImc3FjdXBzO1wiLFwi8J2TiFwiOlwiJnNzY3I7XCIsXCLimIZcIjpcIiZzdGFyO1wiLFwi4oqCXCI6XCImc3Vic2V0O1wiLFwi4quFXCI6XCImc3Vic2V0ZXFxO1wiLFwi4qq9XCI6XCImc3ViZG90O1wiLFwi4quDXCI6XCImc3ViZWRvdDtcIixcIuKrgVwiOlwiJnN1Ym11bHQ7XCIsXCLiq4tcIjpcIiZzdWJzZXRuZXFxO1wiLFwi4oqKXCI6XCImc3Vic2V0bmVxO1wiLFwi4qq/XCI6XCImc3VicGx1cztcIixcIuKluVwiOlwiJnN1YnJhcnI7XCIsXCLiq4dcIjpcIiZzdWJzaW07XCIsXCLiq5VcIjpcIiZzdWJzdWI7XCIsXCLiq5NcIjpcIiZzdWJzdXA7XCIsXCLimapcIjpcIiZzdW5nO1wiLFwiwrlcIjpcIiZzdXAxO1wiLFwiwrJcIjpcIiZzdXAyO1wiLFwiwrNcIjpcIiZzdXAzO1wiLFwi4quGXCI6XCImc3Vwc2V0ZXFxO1wiLFwi4qq+XCI6XCImc3VwZG90O1wiLFwi4quYXCI6XCImc3VwZHN1YjtcIixcIuKrhFwiOlwiJnN1cGVkb3Q7XCIsXCLin4lcIjpcIiZzdXBoc29sO1wiLFwi4quXXCI6XCImc3VwaHN1YjtcIixcIuKlu1wiOlwiJnN1cGxhcnI7XCIsXCLiq4JcIjpcIiZzdXBtdWx0O1wiLFwi4quMXCI6XCImc3Vwc2V0bmVxcTtcIixcIuKKi1wiOlwiJnN1cHNldG5lcTtcIixcIuKrgFwiOlwiJnN1cHBsdXM7XCIsXCLiq4hcIjpcIiZzdXBzaW07XCIsXCLiq5RcIjpcIiZzdXBzdWI7XCIsXCLiq5ZcIjpcIiZzdXBzdXA7XCIsXCLih5lcIjpcIiZzd0FycjtcIixcIuKkqlwiOlwiJnN3bndhcjtcIixcIsOfXCI6XCImc3psaWc7XCIsXCLijJZcIjpcIiZ0YXJnZXQ7XCIsXCLPhFwiOlwiJnRhdTtcIixcIsWlXCI6XCImdGNhcm9uO1wiLFwixaNcIjpcIiZ0Y2VkaWw7XCIsXCLRglwiOlwiJnRjeTtcIixcIuKMlVwiOlwiJnRlbHJlYztcIixcIvCdlLFcIjpcIiZ0ZnI7XCIsXCLOuFwiOlwiJnRoZXRhO1wiLFwiz5FcIjpcIiZ2YXJ0aGV0YTtcIixcIsO+XCI6XCImdGhvcm47XCIsXCLDl1wiOlwiJnRpbWVzO1wiLFwi4qixXCI6XCImdGltZXNiYXI7XCIsXCLiqLBcIjpcIiZ0aW1lc2Q7XCIsXCLijLZcIjpcIiZ0b3Bib3Q7XCIsXCLiq7FcIjpcIiZ0b3BjaXI7XCIsXCLwnZWlXCI6XCImdG9wZjtcIixcIuKrmlwiOlwiJnRvcGZvcms7XCIsXCLigLRcIjpcIiZ0cHJpbWU7XCIsXCLilrVcIjpcIiZ1dHJpO1wiLFwi4omcXCI6XCImdHJpZTtcIixcIuKXrFwiOlwiJnRyaWRvdDtcIixcIuKoulwiOlwiJnRyaW1pbnVzO1wiLFwi4qi5XCI6XCImdHJpcGx1cztcIixcIuKnjVwiOlwiJnRyaXNiO1wiLFwi4qi7XCI6XCImdHJpdGltZTtcIixcIuKPolwiOlwiJnRycGV6aXVtO1wiLFwi8J2TiVwiOlwiJnRzY3I7XCIsXCLRhlwiOlwiJnRzY3k7XCIsXCLRm1wiOlwiJnRzaGN5O1wiLFwixadcIjpcIiZ0c3Ryb2s7XCIsXCLipaNcIjpcIiZ1SGFyO1wiLFwiw7pcIjpcIiZ1YWN1dGU7XCIsXCLRnlwiOlwiJnVicmN5O1wiLFwixa1cIjpcIiZ1YnJldmU7XCIsXCLDu1wiOlwiJnVjaXJjO1wiLFwi0YNcIjpcIiZ1Y3k7XCIsXCLFsVwiOlwiJnVkYmxhYztcIixcIuKlvlwiOlwiJnVmaXNodDtcIixcIvCdlLJcIjpcIiZ1ZnI7XCIsXCLDuVwiOlwiJnVncmF2ZTtcIixcIuKWgFwiOlwiJnVoYmxrO1wiLFwi4oycXCI6XCImdWxjb3JuZXI7XCIsXCLijI9cIjpcIiZ1bGNyb3A7XCIsXCLil7hcIjpcIiZ1bHRyaTtcIixcIsWrXCI6XCImdW1hY3I7XCIsXCLFs1wiOlwiJnVvZ29uO1wiLFwi8J2VplwiOlwiJnVvcGY7XCIsXCLPhVwiOlwiJnVwc2lsb247XCIsXCLih4hcIjpcIiZ1dWFycjtcIixcIuKMnVwiOlwiJnVyY29ybmVyO1wiLFwi4oyOXCI6XCImdXJjcm9wO1wiLFwixa9cIjpcIiZ1cmluZztcIixcIuKXuVwiOlwiJnVydHJpO1wiLFwi8J2TilwiOlwiJnVzY3I7XCIsXCLii7BcIjpcIiZ1dGRvdDtcIixcIsWpXCI6XCImdXRpbGRlO1wiLFwiw7xcIjpcIiZ1dW1sO1wiLFwi4qanXCI6XCImdXdhbmdsZTtcIixcIuKrqFwiOlwiJnZCYXI7XCIsXCLiq6lcIjpcIiZ2QmFydjtcIixcIuKmnFwiOlwiJnZhbmdydDtcIixcIuKKiu+4gFwiOlwiJnZzdWJuZTtcIixcIuKri++4gFwiOlwiJnZzdWJuRTtcIixcIuKKi++4gFwiOlwiJnZzdXBuZTtcIixcIuKrjO+4gFwiOlwiJnZzdXBuRTtcIixcItCyXCI6XCImdmN5O1wiLFwi4oq7XCI6XCImdmVlYmFyO1wiLFwi4omaXCI6XCImdmVlZXE7XCIsXCLii65cIjpcIiZ2ZWxsaXA7XCIsXCLwnZSzXCI6XCImdmZyO1wiLFwi8J2Vp1wiOlwiJnZvcGY7XCIsXCLwnZOLXCI6XCImdnNjcjtcIixcIuKmmlwiOlwiJnZ6aWd6YWc7XCIsXCLFtVwiOlwiJndjaXJjO1wiLFwi4qmfXCI6XCImd2VkYmFyO1wiLFwi4omZXCI6XCImd2VkZ2VxO1wiLFwi4oSYXCI6XCImd3A7XCIsXCLwnZS0XCI6XCImd2ZyO1wiLFwi8J2VqFwiOlwiJndvcGY7XCIsXCLwnZOMXCI6XCImd3NjcjtcIixcIvCdlLVcIjpcIiZ4ZnI7XCIsXCLOvlwiOlwiJnhpO1wiLFwi4ou7XCI6XCImeG5pcztcIixcIvCdlalcIjpcIiZ4b3BmO1wiLFwi8J2TjVwiOlwiJnhzY3I7XCIsXCLDvVwiOlwiJnlhY3V0ZTtcIixcItGPXCI6XCImeWFjeTtcIixcIsW3XCI6XCImeWNpcmM7XCIsXCLRi1wiOlwiJnljeTtcIixcIsKlXCI6XCImeWVuO1wiLFwi8J2UtlwiOlwiJnlmcjtcIixcItGXXCI6XCImeWljeTtcIixcIvCdlapcIjpcIiZ5b3BmO1wiLFwi8J2TjlwiOlwiJnlzY3I7XCIsXCLRjlwiOlwiJnl1Y3k7XCIsXCLDv1wiOlwiJnl1bWw7XCIsXCLFulwiOlwiJnphY3V0ZTtcIixcIsW+XCI6XCImemNhcm9uO1wiLFwi0LdcIjpcIiZ6Y3k7XCIsXCLFvFwiOlwiJnpkb3Q7XCIsXCLOtlwiOlwiJnpldGE7XCIsXCLwnZS3XCI6XCImemZyO1wiLFwi0LZcIjpcIiZ6aGN5O1wiLFwi4oedXCI6XCImemlncmFycjtcIixcIvCdlatcIjpcIiZ6b3BmO1wiLFwi8J2Tj1wiOlwiJnpzY3I7XCIsXCLigI1cIjpcIiZ6d2o7XCIsXCLigIxcIjpcIiZ6d25qO1wifX19OyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5udW1lcmljVW5pY29kZU1hcD17MDo2NTUzMywxMjg6ODM2NCwxMzA6ODIxOCwxMzE6NDAyLDEzMjo4MjIyLDEzMzo4MjMwLDEzNDo4MjI0LDEzNTo4MjI1LDEzNjo3MTAsMTM3OjgyNDAsMTM4OjM1MiwxMzk6ODI0OSwxNDA6MzM4LDE0MjozODEsMTQ1OjgyMTYsMTQ2OjgyMTcsMTQ3OjgyMjAsMTQ4OjgyMjEsMTQ5OjgyMjYsMTUwOjgyMTEsMTUxOjgyMTIsMTUyOjczMiwxNTM6ODQ4MiwxNTQ6MzUzLDE1NTo4MjUwLDE1NjozMzksMTU4OjM4MiwxNTk6Mzc2fTsiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuZnJvbUNvZGVQb2ludD1TdHJpbmcuZnJvbUNvZGVQb2ludHx8ZnVuY3Rpb24oYXN0cmFsQ29kZVBvaW50KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKChhc3RyYWxDb2RlUG9pbnQtNjU1MzYpLzEwMjQpKzU1Mjk2LChhc3RyYWxDb2RlUG9pbnQtNjU1MzYpJTEwMjQrNTYzMjApfTtleHBvcnRzLmdldENvZGVQb2ludD1TdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0P2Z1bmN0aW9uKGlucHV0LHBvc2l0aW9uKXtyZXR1cm4gaW5wdXQuY29kZVBvaW50QXQocG9zaXRpb24pfTpmdW5jdGlvbihpbnB1dCxwb3NpdGlvbil7cmV0dXJuKGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pLTU1Mjk2KSoxMDI0K2lucHV0LmNoYXJDb2RlQXQocG9zaXRpb24rMSktNTYzMjArNjU1MzZ9O2V4cG9ydHMuaGlnaFN1cnJvZ2F0ZUZyb209NTUyOTY7ZXhwb3J0cy5oaWdoU3Vycm9nYXRlVG89NTYzMTk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vKlxuICBlc2xpbnQtZGlzYWJsZVxuICBuby1jb25zb2xlLFxuICBmdW5jLW5hbWVzXG4qL1xudmFyIG5vcm1hbGl6ZVVybCA9IHJlcXVpcmUoXCIuL25vcm1hbGl6ZS11cmxcIik7XG5cbnZhciBzcmNCeU1vZHVsZUlkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbnZhciBub0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiO1xudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcblxuZnVuY3Rpb24gZGVib3VuY2UoZm4sIHRpbWUpIHtcbiAgdmFyIHRpbWVvdXQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICB2YXIgZnVuY3Rpb25DYWxsID0gZnVuY3Rpb24gZnVuY3Rpb25DYWxsKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH07XG5cbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb25DYWxsLCB0aW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRTY3JpcHRVcmwobW9kdWxlSWQpIHtcbiAgdmFyIHNyYyA9IHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdO1xuXG4gIGlmICghc3JjKSB7XG4gICAgaWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpIHtcbiAgICAgIHNyYyA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuICAgICAgdmFyIGxhc3RTY3JpcHRUYWcgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmIChsYXN0U2NyaXB0VGFnKSB7XG4gICAgICAgIHNyYyA9IGxhc3RTY3JpcHRUYWcuc3JjO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdID0gc3JjO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmaWxlTWFwKSB7XG4gICAgaWYgKCFzcmMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBzcGxpdFJlc3VsdCA9IHNyYy5zcGxpdCgvKFteXFxcXC9dKylcXC5qcyQvKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBzcGxpdFJlc3VsdCAmJiBzcGxpdFJlc3VsdFsxXTtcblxuICAgIGlmICghZmlsZW5hbWUpIHtcbiAgICAgIHJldHVybiBbc3JjLnJlcGxhY2UoXCIuanNcIiwgXCIuY3NzXCIpXTtcbiAgICB9XG5cbiAgICBpZiAoIWZpbGVNYXApIHtcbiAgICAgIHJldHVybiBbc3JjLnJlcGxhY2UoXCIuanNcIiwgXCIuY3NzXCIpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU1hcC5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uIChtYXBSdWxlKSB7XG4gICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIlwiLmNvbmNhdChmaWxlbmFtZSwgXCJcXFxcLmpzJFwiKSwgXCJnXCIpO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVVybChzcmMucmVwbGFjZShyZWcsIFwiXCIuY29uY2F0KG1hcFJ1bGUucmVwbGFjZSgve2ZpbGVOYW1lfS9nLCBmaWxlbmFtZSksIFwiLmNzc1wiKSkpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWwsIHVybCkge1xuICBpZiAoIXVybCkge1xuICAgIGlmICghZWwuaHJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cblxuICAgIHVybCA9IGVsLmhyZWYuc3BsaXQoXCI/XCIpWzBdO1xuICB9XG5cbiAgaWYgKCFpc1VybFJlcXVlc3QodXJsKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChlbC5pc0xvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAvLyBXZSBzZWVtIHRvIGJlIGFib3V0IHRvIHJlcGxhY2UgYSBjc3MgbGluayB0aGF0IGhhc24ndCBsb2FkZWQgeWV0LlxuICAgIC8vIFdlJ3JlIHByb2JhYmx5IGNoYW5naW5nIHRoZSBzYW1lIGZpbGUgbW9yZSB0aGFuIG9uY2UuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCF1cmwgfHwgISh1cmwuaW5kZXhPZihcIi5jc3NcIikgPiAtMSkpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cblxuICBlbC52aXNpdGVkID0gdHJ1ZTtcbiAgdmFyIG5ld0VsID0gZWwuY2xvbmVOb2RlKCk7XG4gIG5ld0VsLmlzTG9hZGVkID0gZmFsc2U7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAobmV3RWwuaXNMb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXdFbC5pc0xvYWRlZCA9IHRydWU7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gIH0pO1xuICBuZXdFbC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChuZXdFbC5pc0xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5ld0VsLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfSk7XG4gIG5ld0VsLmhyZWYgPSBcIlwiLmNvbmNhdCh1cmwsIFwiP1wiKS5jb25jYXQoRGF0ZS5ub3coKSk7XG5cbiAgaWYgKGVsLm5leHRTaWJsaW5nKSB7XG4gICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3RWwsIGVsLm5leHRTaWJsaW5nKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSZWxvYWRVcmwoaHJlZiwgc3JjKSB7XG4gIHZhciByZXQ7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXG4gIGhyZWYgPSBub3JtYWxpemVVcmwoaHJlZiwge1xuICAgIHN0cmlwV1dXOiBmYWxzZVxuICB9KTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuXG4gIHNyYy5zb21lKGZ1bmN0aW9uICh1cmwpIHtcbiAgICBpZiAoaHJlZi5pbmRleE9mKHNyYykgPiAtMSkge1xuICAgICAgcmV0ID0gdXJsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHJlbG9hZFN0eWxlKHNyYykge1xuICBpZiAoIXNyYykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rXCIpO1xuICB2YXIgbG9hZGVkID0gZmFsc2U7XG4gIGZvckVhY2guY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKCFlbC5ocmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9IGdldFJlbG9hZFVybChlbC5ocmVmLCBzcmMpO1xuXG4gICAgaWYgKCFpc1VybFJlcXVlc3QodXJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHVybCkge1xuICAgICAgdXBkYXRlQ3NzKGVsLCB1cmwpO1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbG9hZGVkO1xufVxuXG5mdW5jdGlvbiByZWxvYWRBbGwoKSB7XG4gIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rXCIpO1xuICBmb3JFYWNoLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbCkge1xuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdXBkYXRlQ3NzKGVsKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzVXJsUmVxdWVzdCh1cmwpIHtcbiAgLy8gQW4gVVJMIGlzIG5vdCBhbiByZXF1ZXN0IGlmXG4gIC8vIEl0IGlzIG5vdCBodHRwIG9yIGh0dHBzXG4gIGlmICghL15bYS16QS1aXVthLXpBLVpcXGQrXFwtLl0qOi8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIGlmIChub0RvY3VtZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJubyB3aW5kb3cuZG9jdW1lbnQgZm91bmQsIHdpbGwgbm90IEhNUiBDU1NcIik7XG4gICAgcmV0dXJuIG5vb3A7XG4gIH1cblxuICB2YXIgZ2V0U2NyaXB0U3JjID0gZ2V0Q3VycmVudFNjcmlwdFVybChtb2R1bGVJZCk7XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBzcmMgPSBnZXRTY3JpcHRTcmMob3B0aW9ucy5maWxlbmFtZSk7XG4gICAgdmFyIHJlbG9hZGVkID0gcmVsb2FkU3R5bGUoc3JjKTtcblxuICAgIGlmIChvcHRpb25zLmxvY2Fscykge1xuICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBEZXRlY3RlZCBsb2NhbCBjc3MgbW9kdWxlcy4gUmVsb2FkIGFsbCBjc3NcIik7XG4gICAgICByZWxvYWRBbGwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVsb2FkZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gY3NzIHJlbG9hZCAlc1wiLCBzcmMuam9pbihcIiBcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIFJlbG9hZCBhbGwgY3NzXCIpO1xuICAgICAgcmVsb2FkQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlYm91bmNlKHVwZGF0ZSwgNTApO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWRpc2FibGUgKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVVybChwYXRoQ29tcG9uZW50cykge1xuICByZXR1cm4gcGF0aENvbXBvbmVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgaXRlbSkge1xuICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgY2FzZSBcIi4uXCI6XG4gICAgICAgIGFjY3VtdWxhdG9yLnBvcCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIi5cIjpcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFjY3VtdWxhdG9yLnB1c2goaXRlbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICB9LCBbXSkuam9pbihcIi9cIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybFN0cmluZykge1xuICB1cmxTdHJpbmcgPSB1cmxTdHJpbmcudHJpbSgpO1xuXG4gIGlmICgvXmRhdGE6L2kudGVzdCh1cmxTdHJpbmcpKSB7XG4gICAgcmV0dXJuIHVybFN0cmluZztcbiAgfVxuXG4gIHZhciBwcm90b2NvbCA9IHVybFN0cmluZy5pbmRleE9mKFwiLy9cIikgIT09IC0xID8gdXJsU3RyaW5nLnNwbGl0KFwiLy9cIilbMF0gKyBcIi8vXCIgOiBcIlwiO1xuICB2YXIgY29tcG9uZW50cyA9IHVybFN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAocHJvdG9jb2wsIFwiaVwiKSwgXCJcIikuc3BsaXQoXCIvXCIpO1xuICB2YXIgaG9zdCA9IGNvbXBvbmVudHNbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXC4kLywgXCJcIik7XG4gIGNvbXBvbmVudHNbMF0gPSBcIlwiO1xuICB2YXIgcGF0aCA9IG5vcm1hbGl6ZVVybChjb21wb25lbnRzKTtcbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGg7XG59OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE2NDEzMDMzNzM1MTRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiL1VzZXJzL2ouc2l4L3RoZU9kaW5Qcm9qZWN0L3RvZG8tbGlzdC9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi91dGlscy9sb2cuanNcIjtcblxudmFyIFdlYlNvY2tldENsaWVudCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBmdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQodXJsKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYlNvY2tldENsaWVudCk7XG5cbiAgICB0aGlzLmNsaWVudCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcblxuICAgIHRoaXMuY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihlcnJvcik7XG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoV2ViU29ja2V0Q2xpZW50LCBbe1xuICAgIGtleTogXCJvbk9wZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25PcGVuKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ub3BlbiA9IGY7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJvbkNsb3NlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25jbG9zZSA9IGY7XG4gICAgfSAvLyBjYWxsIGYgd2l0aCB0aGUgbWVzc2FnZSBzdHJpbmcgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25NZXNzYWdlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTWVzc2FnZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBmKGUuZGF0YSk7XG4gICAgICB9O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWJTb2NrZXRDbGllbnQ7XG59KCk7XG5cbmV4cG9ydCB7IFdlYlNvY2tldENsaWVudCBhcyBkZWZhdWx0IH07IiwiLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSwgX193ZWJwYWNrX2hhc2hfXyAqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ3ZWJwYWNrL21vZHVsZVwiIC8+XG5pbXBvcnQgd2VicGFja0hvdExvZyBmcm9tIFwid2VicGFjay9ob3QvbG9nLmpzXCI7XG5pbXBvcnQgc3RyaXBBbnNpIGZyb20gXCIuL21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qc1wiO1xuaW1wb3J0IHBhcnNlVVJMIGZyb20gXCIuL3V0aWxzL3BhcnNlVVJMLmpzXCI7XG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UHJvYmxlbSwgc2hvdywgaGlkZSB9IGZyb20gXCIuL292ZXJsYXkuanNcIjtcbmltcG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcbmltcG9ydCBzZW5kTWVzc2FnZSBmcm9tIFwiLi91dGlscy9zZW5kTWVzc2FnZS5qc1wiO1xuaW1wb3J0IHJlbG9hZEFwcCBmcm9tIFwiLi91dGlscy9yZWxvYWRBcHAuanNcIjtcbmltcG9ydCBjcmVhdGVTb2NrZXRVUkwgZnJvbSBcIi4vdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzXCI7XG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaG90XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxpdmVSZWxvYWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IHsgd2FybmluZ3M/OiBib29sZWFuLCBlcnJvcnM/OiBib29sZWFuIH19IG92ZXJsYXlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbG9nZ2luZ11cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdHVzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzVW5sb2FkaW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3VycmVudEhhc2hcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbcHJldmlvdXNIYXNoXVxuICovXG5cbi8qKlxuICogQHR5cGUge1N0YXR1c31cbiAqL1xuXG52YXIgc3RhdHVzID0ge1xuICBpc1VubG9hZGluZzogZmFsc2UsXG4gIC8vIFRPRE8gV29ya2Fyb3VuZCBmb3Igd2VicGFjayB2NCwgYF9fd2VicGFja19oYXNoX19gIGlzIG5vdCByZXBsYWNlZCB3aXRob3V0IEhvdE1vZHVsZVJlcGxhY2VtZW50XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgY3VycmVudEhhc2g6IHR5cGVvZiBfX3dlYnBhY2tfaGFzaF9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2hhc2hfXyA6IFwiXCJcbn07XG4vKiogQHR5cGUge09wdGlvbnN9ICovXG5cbnZhciBvcHRpb25zID0ge1xuICBob3Q6IGZhbHNlLFxuICBsaXZlUmVsb2FkOiBmYWxzZSxcbiAgcHJvZ3Jlc3M6IGZhbHNlLFxuICBvdmVybGF5OiBmYWxzZVxufTtcbnZhciBwYXJzZWRSZXNvdXJjZVF1ZXJ5ID0gcGFyc2VVUkwoX19yZXNvdXJjZVF1ZXJ5KTtcblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkuaG90ID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIGxvZy5pbmZvKFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLlwiKTtcbn1cblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5saXZlUmVsb2FkID0gdHJ1ZTtcbiAgbG9nLmluZm8oXCJMaXZlIFJlbG9hZGluZyBlbmFibGVkLlwiKTtcbn1cblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZykge1xuICBvcHRpb25zLmxvZ2dpbmcgPSBwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmc7XG59XG5cbmlmICh0eXBlb2YgcGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgb3B0aW9ucy5yZWNvbm5lY3QgPSBOdW1iZXIocGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QpO1xufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWxcbiAqL1xuXG5cbmZ1bmN0aW9uIHNldEFsbExvZ0xldmVsKGxldmVsKSB7XG4gIC8vIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIEhNUiBsb2dnZXIgb3BlcmF0ZSBzZXBhcmF0ZWx5IGZyb20gZGV2IHNlcnZlciBsb2dnZXJcbiAgd2VicGFja0hvdExvZy5zZXRMb2dMZXZlbChsZXZlbCA9PT0gXCJ2ZXJib3NlXCIgfHwgbGV2ZWwgPT09IFwibG9nXCIgPyBcImluZm9cIiA6IGxldmVsKTtcbiAgc2V0TG9nTGV2ZWwobGV2ZWwpO1xufVxuXG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvblNvY2tldE1lc3NhZ2UgPSB7XG4gIGhvdDogZnVuY3Rpb24gaG90KCkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5ob3QgPSB0cnVlO1xuICAgIGxvZy5pbmZvKFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLlwiKTtcbiAgfSxcbiAgbGl2ZVJlbG9hZDogZnVuY3Rpb24gbGl2ZVJlbG9hZCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICAgIGxvZy5pbmZvKFwiTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZC5cIik7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7IC8vIEZpeGVzICMxMDQyLiBvdmVybGF5IGRvZXNuJ3QgY2xlYXIgaWYgZXJyb3JzIGFyZSBmaXhlZCBidXQgd2FybmluZ3MgcmVtYWluLlxuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiAgICovXG4gIGhhc2g6IGZ1bmN0aW9uIGhhc2goX2hhc2gpIHtcbiAgICBzdGF0dXMucHJldmlvdXNIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoO1xuICAgIHN0YXR1cy5jdXJyZW50SGFzaCA9IF9oYXNoO1xuICB9LFxuICBsb2dnaW5nOiBzZXRBbGxMb2dMZXZlbCxcblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgb3ZlcmxheTogZnVuY3Rpb24gb3ZlcmxheSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIHJlY29ubmVjdCh2YWx1ZSkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5yZWNvbm5lY3QgPSB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgcHJvZ3Jlc3M6IGZ1bmN0aW9uIHByb2dyZXNzKHZhbHVlKSB7XG4gICAgb3B0aW9ucy5wcm9ncmVzcyA9IHZhbHVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3sgcGx1Z2luTmFtZT86IHN0cmluZywgcGVyY2VudDogbnVtYmVyLCBtc2c6IHN0cmluZyB9fSBkYXRhXG4gICAqL1xuICBcInByb2dyZXNzLXVwZGF0ZVwiOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSA/IFwiW1wiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUsIFwiXSBcIikgOiBcIlwiKS5jb25jYXQoZGF0YS5wZXJjZW50LCBcIiUgLSBcIikuY29uY2F0KGRhdGEubXNnLCBcIi5cIikpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiUHJvZ3Jlc3NcIiwgZGF0YSk7XG4gIH0sXG4gIFwic3RpbGwtb2tcIjogZnVuY3Rpb24gc3RpbGxPaygpIHtcbiAgICBsb2cuaW5mbyhcIk5vdGhpbmcgY2hhbmdlZC5cIik7XG5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJTdGlsbE9rXCIpO1xuICB9LFxuICBvazogZnVuY3Rpb24gb2soKSB7XG4gICAgc2VuZE1lc3NhZ2UoXCJPa1wiKTtcblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICByZWxvYWRBcHAob3B0aW9ucywgc3RhdHVzKTtcbiAgfSxcbiAgLy8gVE9ETzogcmVtb3ZlIGluIHY1IGluIGZhdm9yIG9mICdzdGF0aWMtY2hhbmdlZCdcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwiY29udGVudC1jaGFuZ2VkXCI6IGZ1bmN0aW9uIGNvbnRlbnRDaGFuZ2VkKGZpbGUpIHtcbiAgICBsb2cuaW5mbyhcIlwiLmNvbmNhdChmaWxlID8gXCJcXFwiXCIuY29uY2F0KGZpbGUsIFwiXFxcIlwiKSA6IFwiQ29udGVudFwiLCBcIiBmcm9tIHN0YXRpYyBkaXJlY3Rvcnkgd2FzIGNoYW5nZWQuIFJlbG9hZGluZy4uLlwiKSk7XG4gICAgc2VsZi5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXJyb3JbXX0gd2FybmluZ3NcbiAgICogQHBhcmFtIHthbnl9IHBhcmFtc1xuICAgKi9cbiAgd2FybmluZ3M6IGZ1bmN0aW9uIHdhcm5pbmdzKF93YXJuaW5ncywgcGFyYW1zKSB7XG4gICAgbG9nLndhcm4oXCJXYXJuaW5ncyB3aGlsZSBjb21waWxpbmcuXCIpO1xuXG4gICAgdmFyIHByaW50YWJsZVdhcm5pbmdzID0gX3dhcm5pbmdzLm1hcChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbSA9IGZvcm1hdFByb2JsZW0oXCJ3YXJuaW5nXCIsIGVycm9yKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG5cbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChoZWFkZXIsIFwiXFxuXCIpLmNvbmNhdChzdHJpcEFuc2koYm9keSkpO1xuICAgIH0pO1xuXG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZVdhcm5pbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cud2FybihwcmludGFibGVXYXJuaW5nc1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG5lZWRTaG93T3ZlcmxheUZvcldhcm5pbmdzID0gdHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJib29sZWFuXCIgPyBvcHRpb25zLm92ZXJsYXkgOiBvcHRpb25zLm92ZXJsYXkgJiYgb3B0aW9ucy5vdmVybGF5Lndhcm5pbmdzO1xuXG4gICAgaWYgKG5lZWRTaG93T3ZlcmxheUZvcldhcm5pbmdzKSB7XG4gICAgICBzaG93KFwid2FybmluZ1wiLCBfd2FybmluZ3MpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnByZXZlbnRSZWxvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZWxvYWRBcHAob3B0aW9ucywgc3RhdHVzKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcblxuICAgIHZhciBwcmludGFibGVFcnJvcnMgPSBfZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbTIgPSBmb3JtYXRQcm9ibGVtKFwiZXJyb3JcIiwgZXJyb3IpLFxuICAgICAgICAgIGhlYWRlciA9IF9mb3JtYXRQcm9ibGVtMi5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuXG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQoaGVhZGVyLCBcIlxcblwiKS5jb25jYXQoc3RyaXBBbnNpKGJvZHkpKTtcbiAgICB9KTtcblxuICAgIHNlbmRNZXNzYWdlKFwiRXJyb3JzXCIsIHByaW50YWJsZUVycm9ycyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG5lZWRTaG93T3ZlcmxheUZvckVycm9ycyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS5lcnJvcnM7XG5cbiAgICBpZiAobmVlZFNob3dPdmVybGF5Rm9yRXJyb3JzKSB7XG4gICAgICBzaG93KFwiZXJyb3JcIiwgX2Vycm9ycyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICAgKi9cbiAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKF9lcnJvcikge1xuICAgIGxvZy5lcnJvcihfZXJyb3IpO1xuICB9LFxuICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgbG9nLmluZm8oXCJEaXNjb25uZWN0ZWQhXCIpO1xuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG52YXIgc29ja2V0VVJMID0gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFJlc291cmNlUXVlcnkpO1xuc29ja2V0KHNvY2tldFVSTCwgb25Tb2NrZXRNZXNzYWdlLCBvcHRpb25zLnJlY29ubmVjdCk7IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cblxuLyoqXG4gKiBDbGllbnQgc3R1YiBmb3IgdGFwYWJsZSBTeW5jQmFpbEhvb2tcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsaWVudFRhcGFibGVTeW5jQmFpbEhvb2soKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbCgpIHt9XG4gIH07XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG52YXIgTG9nVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBlcnJvcjpcbiAgLyoqIEB0eXBlIHtcImVycm9yXCJ9ICovXG4gIFwiZXJyb3JcIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgd2FybjpcbiAgLyoqIEB0eXBlIHtcIndhcm5cIn0gKi9cbiAgXCJ3YXJuXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGluZm86XG4gIC8qKiBAdHlwZSB7XCJpbmZvXCJ9ICovXG4gIFwiaW5mb1wiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBsb2c6XG4gIC8qKiBAdHlwZSB7XCJsb2dcIn0gKi9cbiAgXCJsb2dcIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgZGVidWc6XG4gIC8qKiBAdHlwZSB7XCJkZWJ1Z1wifSAqL1xuICBcImRlYnVnXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHRyYWNlOlxuICAvKiogQHR5cGUge1widHJhY2VcIn0gKi9cbiAgXCJ0cmFjZVwiLFxuICAvLyBubyBhcmd1bWVudHNcbiAgZ3JvdXA6XG4gIC8qKiBAdHlwZSB7XCJncm91cFwifSAqL1xuICBcImdyb3VwXCIsXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBDb2xsYXBzZWQ6XG4gIC8qKiBAdHlwZSB7XCJncm91cENvbGxhcHNlZFwifSAqL1xuICBcImdyb3VwQ29sbGFwc2VkXCIsXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBFbmQ6XG4gIC8qKiBAdHlwZSB7XCJncm91cEVuZFwifSAqL1xuICBcImdyb3VwRW5kXCIsXG4gIC8vIFtsYWJlbF1cbiAgcHJvZmlsZTpcbiAgLyoqIEB0eXBlIHtcInByb2ZpbGVcIn0gKi9cbiAgXCJwcm9maWxlXCIsXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgcHJvZmlsZUVuZDpcbiAgLyoqIEB0eXBlIHtcInByb2ZpbGVFbmRcIn0gKi9cbiAgXCJwcm9maWxlRW5kXCIsXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgdGltZTpcbiAgLyoqIEB0eXBlIHtcInRpbWVcIn0gKi9cbiAgXCJ0aW1lXCIsXG4gIC8vIG5hbWUsIHRpbWUgYXMgW3NlY29uZHMsIG5hbm9zZWNvbmRzXVxuICBjbGVhcjpcbiAgLyoqIEB0eXBlIHtcImNsZWFyXCJ9ICovXG4gIFwiY2xlYXJcIixcbiAgLy8gbm8gYXJndW1lbnRzXG4gIHN0YXR1czpcbiAgLyoqIEB0eXBlIHtcInN0YXR1c1wifSAqL1xuICBcInN0YXR1c1wiIC8vIG1lc3NhZ2UsIGFyZ3VtZW50c1xuXG59KTtcbmV4cG9ydHMuTG9nVHlwZSA9IExvZ1R5cGU7XG4vKiogQHR5cGVkZWYge3R5cGVvZiBMb2dUeXBlW2tleW9mIHR5cGVvZiBMb2dUeXBlXX0gTG9nVHlwZUVudW0gKi9cblxudmFyIExPR19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHJhdyBsb2cgbWV0aG9kXCIpO1xudmFyIFRJTUVSU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHRpbWVzXCIpO1xudmFyIFRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgYWdncmVnYXRlZCB0aW1lc1wiKTtcblxudmFyIFdlYnBhY2tMb2dnZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihMb2dUeXBlRW51bSwgYW55W109KTogdm9pZH0gbG9nIGxvZyBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZyB8IGZ1bmN0aW9uKCk6IHN0cmluZyk6IFdlYnBhY2tMb2dnZXJ9IGdldENoaWxkTG9nZ2VyIGZ1bmN0aW9uIHRvIGNyZWF0ZSBjaGlsZCBsb2dnZXJcbiAgICovXG4gIGZ1bmN0aW9uIFdlYnBhY2tMb2dnZXIobG9nLCBnZXRDaGlsZExvZ2dlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJwYWNrTG9nZ2VyKTtcblxuICAgIHRoaXNbTE9HX1NZTUJPTF0gPSBsb2c7XG4gICAgdGhpcy5nZXRDaGlsZExvZ2dlciA9IGdldENoaWxkTG9nZ2VyO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFdlYnBhY2tMb2dnZXIsIFt7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIndhcm5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gd2FybigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS53YXJuLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmluZm8sIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJsb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9nKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmxvZywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlYnVnXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTVdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmRlYnVnLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXNzZXJ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2VydChhc3NlcnRpb24pIHtcbiAgICAgIGlmICghYXNzZXJ0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiA+IDEgPyBfbGVuNiAtIDEgOiAwKSwgX2tleTYgPSAxOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5NiAtIDFdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYWNlKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRyYWNlLCBbXCJUcmFjZVwiXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmNsZWFyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXR1cygpIHtcbiAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNyksIF9rZXk3ID0gMDsgX2tleTcgPCBfbGVuNzsgX2tleTcrKykge1xuICAgICAgICBhcmdzW19rZXk3XSA9IGFyZ3VtZW50c1tfa2V5N107XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5zdGF0dXMsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJncm91cFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW44ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuOCksIF9rZXk4ID0gMDsgX2tleTggPCBfbGVuODsgX2tleTgrKykge1xuICAgICAgICBhcmdzW19rZXk4XSA9IGFyZ3VtZW50c1tfa2V5OF07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwQ29sbGFwc2VkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwQ29sbGFwc2VkKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjkgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW45KSwgX2tleTkgPSAwOyBfa2V5OSA8IF9sZW45OyBfa2V5OSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTldID0gYXJndW1lbnRzW19rZXk5XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwQ29sbGFwc2VkLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBFbmQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMTAgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4xMCksIF9rZXkxMCA9IDA7IF9rZXkxMCA8IF9sZW4xMDsgX2tleTEwKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MTBdID0gYXJndW1lbnRzW19rZXkxMF07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cEVuZCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByb2ZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvZmlsZShsYWJlbCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnByb2ZpbGUsIFtsYWJlbF0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGVFbmQobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlRW5kLCBbbGFiZWxdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lKGxhYmVsKSB7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfU1lNQk9MXSB8fCBuZXcgTWFwKCk7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLnNldChsYWJlbCwgcHJvY2Vzcy5ocnRpbWUoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVMb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUxvZyhsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVMb2coKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUVuZChsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVFbmQoKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZShsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVBZ2dyZWdhdGUoKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKGN1cnJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGltZVsxXSArIGN1cnJlbnRbMV0gPiAxZTkpIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF0gKyAxO1xuICAgICAgICAgIHRpbWVbMV0gPSB0aW1lWzFdIC0gMWU5ICsgY3VycmVudFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF07XG4gICAgICAgICAgdGltZVsxXSArPSBjdXJyZW50WzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5zZXQobGFiZWwsIHRpbWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGVFbmQobGFiZWwpIHtcbiAgICAgIGlmICh0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdmFyIHRpbWUgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWJwYWNrTG9nZ2VyO1xufSgpO1xuXG5leHBvcnRzLkxvZ2dlciA9IFdlYnBhY2tMb2dnZXI7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gICAgTG9nVHlwZSA9IF9yZXF1aXJlLkxvZ1R5cGU7XG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJUeXBlc30gRmlsdGVyVHlwZXMgKi9cblxuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuL0xvZ2dlclwiKS5Mb2dUeXBlRW51bX0gTG9nVHlwZUVudW0gKi9cblxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSBGaWx0ZXJGdW5jdGlvbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExvZ2dlckNvbnNvbGVcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKTogdm9pZH0gY2xlYXJcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKTogdm9pZH0gdHJhY2VcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBpbmZvXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gbG9nXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gd2FyblxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGVycm9yXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGRlYnVnXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwQ29sbGFwc2VkXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHN0YXR1c1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBwcm9maWxlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHByb2ZpbGVFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gbG9nVGltZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTG9nZ2VyT3B0aW9uc1xuICogQHByb3BlcnR5IHtmYWxzZXx0cnVlfFwibm9uZVwifFwiZXJyb3JcInxcIndhcm5cInxcImluZm9cInxcImxvZ1wifFwidmVyYm9zZVwifSBsZXZlbCBsb2dsZXZlbFxuICogQHByb3BlcnR5IHtGaWx0ZXJUeXBlc3xib29sZWFufSBkZWJ1ZyBmaWx0ZXIgZm9yIGRlYnVnIGxvZ2dpbmdcbiAqIEBwcm9wZXJ0eSB7TG9nZ2VyQ29uc29sZX0gY29uc29sZSB0aGUgY29uc29sZSB0byBsb2cgdG9cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7RmlsdGVySXRlbVR5cGVzfSBpdGVtIGFuIGlucHV0IGl0ZW1cbiAqIEByZXR1cm5zIHtGaWx0ZXJGdW5jdGlvbn0gZmlsdGVyIGZ1bmN0aW9uXG4gKi9cblxuXG52YXIgZmlsdGVyVG9GdW5jdGlvbiA9IGZ1bmN0aW9uIGZpbHRlclRvRnVuY3Rpb24oaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIltcXFxcXFxcXC9dXCIuY29uY2F0KGl0ZW0ucmVwbGFjZSggLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgL1stW1xcXXt9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIiksIFwiKFtcXFxcXFxcXC9dfCR8IXxcXFxcPylcIikpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiByZWdFeHAudGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBpdGVtLnRlc3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiBpdGVtLnRlc3QoaWRlbnQpO1xuICAgIH07XG4gIH1cblxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9O1xuICB9XG59O1xuLyoqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5cblxudmFyIExvZ0xldmVsID0ge1xuICBub25lOiA2LFxuICBmYWxzZTogNixcbiAgZXJyb3I6IDUsXG4gIHdhcm46IDQsXG4gIGluZm86IDMsXG4gIGxvZzogMixcbiAgdHJ1ZTogMixcbiAgdmVyYm9zZTogMVxufTtcbi8qKlxuICogQHBhcmFtIHtMb2dnZXJPcHRpb25zfSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0XG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBMb2dUeXBlRW51bSwgYW55W10pOiB2b2lkfSBsb2dnaW5nIGZ1bmN0aW9uXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgX3JlZiRsZXZlbCA9IF9yZWYubGV2ZWwsXG4gICAgICBsZXZlbCA9IF9yZWYkbGV2ZWwgPT09IHZvaWQgMCA/IFwiaW5mb1wiIDogX3JlZiRsZXZlbCxcbiAgICAgIF9yZWYkZGVidWcgPSBfcmVmLmRlYnVnLFxuICAgICAgZGVidWcgPSBfcmVmJGRlYnVnID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkZGVidWcsXG4gICAgICBjb25zb2xlID0gX3JlZi5jb25zb2xlO1xuICB2YXIgZGVidWdGaWx0ZXJzID0gdHlwZW9mIGRlYnVnID09PSBcImJvb2xlYW5cIiA/IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlYnVnO1xuICB9XSA6XG4gIC8qKiBAdHlwZSB7RmlsdGVySXRlbVR5cGVzW119ICovXG4gIFtdLmNvbmNhdChkZWJ1ZykubWFwKGZpbHRlclRvRnVuY3Rpb24pO1xuICAvKiogQHR5cGUge251bWJlcn0gKi9cblxuICB2YXIgbG9nbGV2ZWwgPSBMb2dMZXZlbFtcIlwiLmNvbmNhdChsZXZlbCldIHx8IDA7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAgICogQHBhcmFtIHtMb2dUeXBlRW51bX0gdHlwZSB0eXBlIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHBhcmFtIHthbnlbXX0gYXJncyBhcmd1bWVudHMgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG5cbiAgdmFyIGxvZ2dlciA9IGZ1bmN0aW9uIGxvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKSB7XG4gICAgdmFyIGxhYmVsZWRBcmdzID0gZnVuY3Rpb24gbGFiZWxlZEFyZ3MoKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzKSkge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncy5zbGljZSgxKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXVwiKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIExvZ1R5cGUuZGVidWc6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5sb2c6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5pbmZvOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5lcnJvcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmVycm9yKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS50cmFjZTpcbiAgICAgICAgaWYgKCFkZWJ1ZykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcblxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwudmVyYm9zZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIC8vIGZhbGxzIHRocm91Z2hcblxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXAgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmdyb3VwLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBFbmQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cEVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUudGltZTpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgICB2YXIgbXMgPSBhcmdzWzFdICogMTAwMCArIGFyZ3NbMl0gLyAxMDAwMDAwO1xuICAgICAgICAgIHZhciBtc2cgPSBcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSwgXCI6IFwiKS5jb25jYXQobXMsIFwiIG1zXCIpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmxvZ1RpbWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2dUaW1lKG1zZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGU6XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnByb2ZpbGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGUuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUucHJvZmlsZUVuZDpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUucHJvZmlsZUVuZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5jbGVhcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5zdGF0dXM6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnN0YXR1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIExvZ1R5cGUgXCIuY29uY2F0KHR5cGUpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxvZ2dlcjtcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbnZhciBTeW5jQmFpbEhvb2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB0YXBhYmxlL2xpYi9TeW5jQmFpbEhvb2sgKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvU3luY0JhaWxIb29rRmFrZS5qc1wiKTtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Mb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiKSxcbiAgICBMb2dnZXIgPSBfcmVxdWlyZS5Mb2dnZXI7XG5cbnZhciBjcmVhdGVDb25zb2xlTG9nZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9jcmVhdGVDb25zb2xlTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCIpO1xuLyoqIEB0eXBlIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9ICovXG5cblxudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyA9IHtcbiAgbGV2ZWw6IFwiaW5mb1wiLFxuICBkZWJ1ZzogZmFsc2UsXG4gIGNvbnNvbGU6IGNvbnNvbGVcbn07XG52YXIgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICogQHJldHVybnMge0xvZ2dlcn0gYSBsb2dnZXJcbiAqL1xuXG5leHBvcnRzLmdldExvZ2dlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBuZXcgTG9nZ2VyKGZ1bmN0aW9uICh0eXBlLCBhcmdzKSB7XG4gICAgaWYgKGV4cG9ydHMuaG9va3MubG9nLmNhbGwobmFtZSwgdHlwZSwgYXJncykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudERlZmF1bHRMb2dnZXIobmFtZSwgdHlwZSwgYXJncyk7XG4gICAgfVxuICB9LCBmdW5jdGlvbiAoY2hpbGROYW1lKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZ2V0TG9nZ2VyKFwiXCIuY29uY2F0KG5hbWUsIFwiL1wiKS5jb25jYXQoY2hpbGROYW1lKSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9IG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cblxuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcblxuICBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcbn07XG5cbmV4cG9ydHMuaG9va3MgPSB7XG4gIGxvZzogbmV3IFN5bmNCYWlsSG9vayhbXCJvcmlnaW5cIiwgXCJ0eXBlXCIsIFwiYXJnc1wiXSlcbn07XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbiFmdW5jdGlvbigpIHtcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiByZWV4cG9ydCBkZWZhdWx0IGV4cG9ydCBmcm9tIG5hbWVkIG1vZHVsZSAqLyB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXzsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgd2VicGFja19saWJfbG9nZ2luZ19ydW50aW1lX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB3ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanNcIik7XG5cbn0oKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fID0gZXhwb3J0cztcbmZvcih2YXIgaSBpbiBfX3dlYnBhY2tfZXhwb3J0c19fKSBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fW2ldID0gX193ZWJwYWNrX2V4cG9ydHNfX1tpXTtcbmlmKF9fd2VicGFja19leHBvcnRzX18uX19lc01vZHVsZSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gfSkoKVxuOyIsIi8qKioqKiovIChmdW5jdGlvbigpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19fX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBzdHJpcEFuc2k7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIGFuc2lfcmVnZXhfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIGFuc2ktcmVnZXggKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL25vZGVfbW9kdWxlcy9hbnNpLXJlZ2V4L2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiBzdHJpcEFuc2koc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGBzdHJpbmdgLCBnb3QgYFwiLmNvbmNhdCh0eXBlb2Ygc3RyaW5nLCBcImBcIikpO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCgwLGFuc2lfcmVnZXhfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0pKCksICcnKTtcbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvbm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGFuc2lSZWdleDsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG5mdW5jdGlvbiBhbnNpUmVnZXgoKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWYkb25seUZpcnN0ID0gX3JlZi5vbmx5Rmlyc3QsXG4gICAgICBvbmx5Rmlyc3QgPSBfcmVmJG9ubHlGaXJzdCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJG9ubHlGaXJzdDtcblxuICB2YXIgcGF0dGVybiA9IFtcIltcXFxcdTAwMUJcXFxcdTAwOUJdW1tcXFxcXSgpIzs/XSooPzooPzooPzooPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10rKSp8W2EtekEtWlxcXFxkXSsoPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10qKSopP1xcXFx1MDAwNylcIiwgJyg/Oig/OlxcXFxkezEsNH0oPzo7XFxcXGR7MCw0fSkqKT9bXFxcXGRBLVBSLVRaY2YtbnRxcnk9Pjx+XSkpJ10uam9pbignfCcpO1xuICByZXR1cm4gbmV3IFJlZ0V4cChwYXR0ZXJuLCBvbmx5Rmlyc3QgPyB1bmRlZmluZWQgOiAnZycpO1xufVxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4hZnVuY3Rpb24oKSB7XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIHN0cmlwX2Fuc2lfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHN0cmlwLWFuc2kgKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzXCIpO1xuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIF9fd2VicGFja19leHBvcnRzX19bXCJkZWZhdWx0XCJdID0gKHN0cmlwX2Fuc2lfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0pO1xufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBpIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19baV0gPSBfX3dlYnBhY2tfZXhwb3J0c19fW2ldO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiLy8gVGhlIGVycm9yIG92ZXJsYXkgaXMgaW5zcGlyZWQgKGFuZCBtb3N0bHkgY29waWVkKSBmcm9tIENyZWF0ZSBSZWFjdCBBcHAgKGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9va2luY3ViYXRvci9jcmVhdGUtcmVhY3QtYXBwKVxuLy8gVGhleSwgaW4gdHVybiwgZ290IGluc3BpcmVkIGJ5IHdlYnBhY2staG90LW1pZGRsZXdhcmUgKGh0dHBzOi8vZ2l0aHViLmNvbS9nbGVuamFtaW4vd2VicGFjay1ob3QtbWlkZGxld2FyZSkuXG5pbXBvcnQgYW5zaUhUTUwgZnJvbSBcImFuc2ktaHRtbC1jb21tdW5pdHlcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCJodG1sLWVudGl0aWVzXCI7XG52YXIgY29sb3JzID0ge1xuICByZXNldDogW1widHJhbnNwYXJlbnRcIiwgXCJ0cmFuc3BhcmVudFwiXSxcbiAgYmxhY2s6IFwiMTgxODE4XCIsXG4gIHJlZDogXCJFMzYwNDlcIixcbiAgZ3JlZW46IFwiQjNDQjc0XCIsXG4gIHllbGxvdzogXCJGRkQwODBcIixcbiAgYmx1ZTogXCI3Q0FGQzJcIixcbiAgbWFnZW50YTogXCI3RkFDQ0FcIixcbiAgY3lhbjogXCJDM0MyRUZcIixcbiAgbGlnaHRncmV5OiBcIkVCRTdFM1wiLFxuICBkYXJrZ3JleTogXCI2RDc4OTFcIlxufTtcbi8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuXG52YXIgaWZyYW1lQ29udGFpbmVyRWxlbWVudDtcbi8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuXG52YXIgY29udGFpbmVyRWxlbWVudDtcbi8qKiBAdHlwZSB7QXJyYXk8KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkPn0gKi9cblxudmFyIG9uTG9hZFF1ZXVlID0gW107XG5hbnNpSFRNTC5zZXRDb2xvcnMoY29sb3JzKTtcblxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCkge1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5XCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3JjID0gXCJhYm91dDpibGFua1wiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnRvcCA9IDA7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUucmlnaHQgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmJvdHRvbSA9IDA7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMHZ3XCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDB2aFwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnpJbmRleCA9IDk5OTk5OTk5OTk7XG5cbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29udGFpbmVyRWxlbWVudCA9XG4gICAgLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cblxuICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXJFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXktZGl2XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUucmlnaHQgPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYm90dG9tID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDB2d1wiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDB2aFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuODUpXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0U4RThFOFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZm9udEZhbWlseSA9IFwiTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2VcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCJsYXJnZVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUucGFkZGluZyA9IFwiMnJlbVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUubGluZUhlaWdodCA9IFwiMS4yXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtd3JhcFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICB2YXIgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGhlYWRlckVsZW1lbnQuaW5uZXJUZXh0ID0gXCJDb21waWxlZCB3aXRoIHByb2JsZW1zOlwiO1xuICAgIHZhciBjbG9zZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSBcIlhcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwicmlnaHRcIjsgLy8gQHRzLWlnbm9yZVxuXG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLnN0eWxlRmxvYXQgPSBcInJpZ2h0XCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBoaWRlKCk7XG4gICAgfSk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXJFbGVtZW50KTtcbiAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uRWxlbWVudCk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuXG4gICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIG9uTG9hZFF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKG9uTG9hZCkge1xuICAgICAgb25Mb2FkKFxuICAgICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cbiAgICAgIGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIH0pO1xuICAgIG9uTG9hZFF1ZXVlID0gW107XG4gICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cblxuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gbnVsbDtcbiAgfTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xufVxuLyoqXG4gKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZH0gY2FsbGJhY2tcbiAqL1xuXG5cbmZ1bmN0aW9uIGVuc3VyZU92ZXJsYXlFeGlzdHMoY2FsbGJhY2spIHtcbiAgaWYgKGNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAvLyBFdmVyeXRoaW5nIGlzIHJlYWR5LCBjYWxsIHRoZSBjYWxsYmFjayByaWdodCBhd2F5LlxuICAgIGNhbGxiYWNrKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG9uTG9hZFF1ZXVlLnB1c2goY2FsbGJhY2spO1xuXG4gIGlmIChpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVyKCk7XG59IC8vIFN1Y2Nlc3NmdWwgY29tcGlsYXRpb24uXG5cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgaWYgKCFpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIENsZWFuIHVwIGFuZCByZXNldCBpbnRlcm5hbCBzdGF0ZS5cblxuXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nIH19IGl0ZW1cbiAqIEByZXR1cm5zIHt7IGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcgfX1cbiAqL1xuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb2JsZW0odHlwZSwgaXRlbSkge1xuICB2YXIgaGVhZGVyID0gdHlwZSA9PT0gXCJ3YXJuaW5nXCIgPyBcIldBUk5JTkdcIiA6IFwiRVJST1JcIjtcbiAgdmFyIGJvZHkgPSBcIlwiO1xuXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGJvZHkgKz0gaXRlbTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZmlsZSA9IGl0ZW0uZmlsZSB8fCBcIlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcblxuICAgIHZhciBtb2R1bGVOYW1lID0gaXRlbS5tb2R1bGVOYW1lID8gaXRlbS5tb2R1bGVOYW1lLmluZGV4T2YoXCIhXCIpICE9PSAtMSA/IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZS5yZXBsYWNlKC9eKFxcc3xcXFMpKiEvLCBcIlwiKSwgXCIgKFwiKS5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLCBcIilcIikgOiBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUpIDogXCJcIjtcbiAgICB2YXIgbG9jID0gaXRlbS5sb2M7XG4gICAgaGVhZGVyICs9IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUgfHwgZmlsZSA/IFwiIGluIFwiLmNvbmNhdChtb2R1bGVOYW1lID8gXCJcIi5jb25jYXQobW9kdWxlTmFtZSkuY29uY2F0KGZpbGUgPyBcIiAoXCIuY29uY2F0KGZpbGUsIFwiKVwiKSA6IFwiXCIpIDogZmlsZSkuY29uY2F0KGxvYyA/IFwiIFwiLmNvbmNhdChsb2MpIDogXCJcIikgOiBcIlwiKTtcbiAgICBib2R5ICs9IGl0ZW0ubWVzc2FnZSB8fCBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXI6IGhlYWRlcixcbiAgICBib2R5OiBib2R5XG4gIH07XG59IC8vIENvbXBpbGF0aW9uIHdpdGggZXJyb3JzIChlLmcuIHN5bnRheCBlcnJvciBvciBtaXNzaW5nIG1vZHVsZXMpLlxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZyAgfCB7IGZpbGU/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIHNob3codHlwZSwgbWVzc2FnZXMpIHtcbiAgZW5zdXJlT3ZlcmxheUV4aXN0cyhmdW5jdGlvbiAoKSB7XG4gICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgdmFyIGVudHJ5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB2YXIgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbSh0eXBlLCBtZXNzYWdlKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG5cbiAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IGhlYWRlcjtcbiAgICAgIHR5cGVFbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjXCIuY29uY2F0KGNvbG9ycy5yZWQpOyAvLyBNYWtlIGl0IGxvb2sgc2ltaWxhciB0byBvdXIgdGVybWluYWwuXG5cbiAgICAgIHZhciB0ZXh0ID0gYW5zaUhUTUwoZW5jb2RlKGJvZHkpKTtcbiAgICAgIHZhciBtZXNzYWdlVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbWVzc2FnZVRleHROb2RlLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVGV4dE5vZGUpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXG5cbiAgICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZW50cnlFbGVtZW50KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGZvcm1hdFByb2JsZW0sIHNob3csIGhpZGUgfTsiLCIvKiBnbG9iYWwgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gKi9cbmltcG9ydCBXZWJTb2NrZXRDbGllbnQgZnJvbSBcIi4vY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiOyAvLyB0aGlzIFdlYnNvY2tldENsaWVudCBpcyBoZXJlIGFzIGEgZGVmYXVsdCBmYWxsYmFjaywgaW4gY2FzZSB0aGUgY2xpZW50IGlzIG5vdCBpbmplY3RlZFxuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIENsaWVudCA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxudHlwZW9mIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fICE9PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0IDogX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gOiBXZWJTb2NrZXRDbGllbnQ7XG4vKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuXG52YXIgcmV0cmllcyA9IDA7XG52YXIgbWF4UmV0cmllcyA9IDEwO1xudmFyIGNsaWVudCA9IG51bGw7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7eyBbaGFuZGxlcjogc3RyaW5nXTogKGRhdGE/OiBhbnksIHBhcmFtcz86IGFueSkgPT4gYW55IH19IGhhbmRsZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG52YXIgc29ja2V0ID0gZnVuY3Rpb24gaW5pdFNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpIHtcbiAgY2xpZW50ID0gbmV3IENsaWVudCh1cmwpO1xuICBjbGllbnQub25PcGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXRyaWVzID0gMDtcblxuICAgIGlmICh0eXBlb2YgcmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBtYXhSZXRyaWVzID0gcmVjb25uZWN0O1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmV0cmllcyA9PT0gMCkge1xuICAgICAgaGFuZGxlcnMuY2xvc2UoKTtcbiAgICB9IC8vIFRyeSB0byByZWNvbm5lY3QuXG5cblxuICAgIGNsaWVudCA9IG51bGw7IC8vIEFmdGVyIDEwIHJldHJpZXMgc3RvcCB0cnlpbmcsIHRvIHByZXZlbnQgbG9nc3BhbS5cblxuICAgIGlmIChyZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgLy8gRXhwb25lbnRpYWxseSBpbmNyZWFzZSB0aW1lb3V0IHRvIHJlY29ubmVjdC5cbiAgICAgIC8vIFJlc3BlY3RmdWxseSBjb3BpZWQgZnJvbSB0aGUgcGFja2FnZSBgZ290YC5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcbiAgICAgIHZhciByZXRyeUluTXMgPSAxMDAwICogTWF0aC5wb3coMiwgcmV0cmllcykgKyBNYXRoLnJhbmRvbSgpICogMTAwO1xuICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgbG9nLmluZm8oXCJUcnlpbmcgdG8gcmVjb25uZWN0Li4uXCIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpO1xuICAgICAgfSwgcmV0cnlJbk1zKTtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25NZXNzYWdlKFxuICAvKipcbiAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICovXG4gIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgaWYgKGhhbmRsZXJzW21lc3NhZ2UudHlwZV0pIHtcbiAgICAgIGhhbmRsZXJzW21lc3NhZ2UudHlwZV0obWVzc2FnZS5kYXRhLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldDsiLCIvKipcbiAqIEBwYXJhbSB7eyBwcm90b2NvbD86IHN0cmluZywgYXV0aD86IHN0cmluZywgaG9zdG5hbWU/OiBzdHJpbmcsIHBvcnQ/OiBzdHJpbmcsIHBhdGhuYW1lPzogc3RyaW5nLCBzZWFyY2g/OiBzdHJpbmcsIGhhc2g/OiBzdHJpbmcsIHNsYXNoZXM/OiBib29sZWFuIH19IG9ialVSTFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZm9ybWF0KG9ialVSTCkge1xuICB2YXIgcHJvdG9jb2wgPSBvYmpVUkwucHJvdG9jb2wgfHwgXCJcIjtcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gXCI6XCIpIHtcbiAgICBwcm90b2NvbCArPSBcIjpcIjtcbiAgfVxuXG4gIHZhciBhdXRoID0gb2JqVVJMLmF1dGggfHwgXCJcIjtcblxuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksIFwiOlwiKTtcbiAgICBhdXRoICs9IFwiQFwiO1xuICB9XG5cbiAgdmFyIGhvc3QgPSBcIlwiO1xuXG4gIGlmIChvYmpVUkwuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArIChvYmpVUkwuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgPT09IC0xID8gb2JqVVJMLmhvc3RuYW1lIDogXCJbXCIuY29uY2F0KG9ialVSTC5ob3N0bmFtZSwgXCJdXCIpKTtcblxuICAgIGlmIChvYmpVUkwucG9ydCkge1xuICAgICAgaG9zdCArPSBcIjpcIi5jb25jYXQob2JqVVJMLnBvcnQpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwYXRobmFtZSA9IG9ialVSTC5wYXRobmFtZSB8fCBcIlwiO1xuXG4gIGlmIChvYmpVUkwuc2xhc2hlcykge1xuICAgIGhvc3QgPSBcIi8vXCIuY29uY2F0KGhvc3QgfHwgXCJcIik7XG5cbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgICAgcGF0aG5hbWUgPSBcIi9cIi5jb25jYXQocGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSBcIlwiO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IG9ialVSTC5zZWFyY2ggfHwgXCJcIjtcblxuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09IFwiP1wiKSB7XG4gICAgc2VhcmNoID0gXCI/XCIuY29uY2F0KHNlYXJjaCk7XG4gIH1cblxuICB2YXIgaGFzaCA9IG9ialVSTC5oYXNoIHx8IFwiXCI7XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09IFwiI1wiKSB7XG4gICAgaGFzaCA9IFwiI1wiLmNvbmNhdChoYXNoKTtcbiAgfVxuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFwiI1wiLCBcIiUyM1wiKTtcbiAgcmV0dXJuIFwiXCIuY29uY2F0KHByb3RvY29sKS5jb25jYXQoaG9zdCkuY29uY2F0KHBhdGhuYW1lKS5jb25jYXQoc2VhcmNoKS5jb25jYXQoaGFzaCk7XG59XG4vKipcbiAqIEBwYXJhbSB7VVJMICYgeyBmcm9tQ3VycmVudFNjcmlwdD86IGJvb2xlYW4gfX0gcGFyc2VkVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFVSTCkge1xuICB2YXIgaG9zdG5hbWUgPSBwYXJzZWRVUkwuaG9zdG5hbWU7IC8vIE5vZGUuanMgbW9kdWxlIHBhcnNlcyBpdCBhcyBgOjpgXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxTdHJpbmddKWAgcGFyc2VzIGl0IGFzICdbOjpdJ1xuXG4gIHZhciBpc0luQWRkckFueSA9IGhvc3RuYW1lID09PSBcIjAuMC4wLjBcIiB8fCBob3N0bmFtZSA9PT0gXCI6OlwiIHx8IGhvc3RuYW1lID09PSBcIls6Ol1cIjsgLy8gd2h5IGRvIHdlIG5lZWQgdGhpcyBjaGVjaz9cbiAgLy8gaG9zdG5hbWUgbi9hIGZvciBmaWxlIHByb3RvY29sIChleGFtcGxlLCB3aGVuIHVzaW5nIGVsZWN0cm9uLCBpb25pYylcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvcHVsbC8zODRcblxuICBpZiAoaXNJbkFkZHJBbnkgJiYgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAmJiBzZWxmLmxvY2F0aW9uLnByb3RvY29sLmluZGV4T2YoXCJodHRwXCIpID09PSAwKSB7XG4gICAgaG9zdG5hbWUgPSBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lO1xuICB9XG5cbiAgdmFyIHNvY2tldFVSTFByb3RvY29sID0gcGFyc2VkVVJMLnByb3RvY29sIHx8IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7IC8vIFdoZW4gaHR0cHMgaXMgdXNlZCBpbiB0aGUgYXBwLCBzZWN1cmUgd2ViIHNvY2tldHMgYXJlIGFsd2F5cyBuZWNlc3NhcnkgYmVjYXVzZSB0aGUgYnJvd3NlciBkb2Vzbid0IGFjY2VwdCBub24tc2VjdXJlIHdlYiBzb2NrZXRzLlxuXG4gIGlmIChzb2NrZXRVUkxQcm90b2NvbCA9PT0gXCJhdXRvOlwiIHx8IGhvc3RuYW1lICYmIGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcbiAgICBzb2NrZXRVUkxQcm90b2NvbCA9IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG4gIH1cblxuICBzb2NrZXRVUkxQcm90b2NvbCA9IHNvY2tldFVSTFByb3RvY29sLnJlcGxhY2UoL14oPzpodHRwfC4rLWV4dGVuc2lvbnxmaWxlKS9pLCBcIndzXCIpO1xuICB2YXIgc29ja2V0VVJMQXV0aCA9IFwiXCI7IC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgZG9lc24ndCBoYXZlIGBhdXRoYCBwcm9wZXJ0eVxuICAvLyBQYXJzZSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBpbiBjYXNlIHdlIG5lZWQgdGhlbVxuXG4gIGlmIChwYXJzZWRVUkwudXNlcm5hbWUpIHtcbiAgICBzb2NrZXRVUkxBdXRoID0gcGFyc2VkVVJMLnVzZXJuYW1lOyAvLyBTaW5jZSBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uIGRvZXMgbm90IGFsbG93IGVtcHR5IHVzZXJuYW1lLFxuICAgIC8vIHdlIG9ubHkgaW5jbHVkZSBwYXNzd29yZCBpZiB0aGUgdXNlcm5hbWUgaXMgbm90IGVtcHR5LlxuXG4gICAgaWYgKHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgLy8gUmVzdWx0OiA8dXNlcm5hbWU+OjxwYXNzd29yZD5cbiAgICAgIHNvY2tldFVSTEF1dGggPSBzb2NrZXRVUkxBdXRoLmNvbmNhdChcIjpcIiwgcGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICB9XG4gIH0gLy8gSW4gY2FzZSB0aGUgaG9zdCBpcyBhIHJhdyBJUHY2IGFkZHJlc3MsIGl0IGNhbiBiZSBlbmNsb3NlZCBpblxuICAvLyB0aGUgYnJhY2tldHMgYXMgdGhlIGJyYWNrZXRzIGFyZSBuZWVkZWQgaW4gdGhlIGZpbmFsIFVSTCBzdHJpbmcuXG4gIC8vIE5lZWQgdG8gcmVtb3ZlIHRob3NlIGFzIHVybC5mb3JtYXQgYmxpbmRseSBhZGRzIGl0cyBvd24gc2V0IG9mIGJyYWNrZXRzXG4gIC8vIGlmIHRoZSBob3N0IHN0cmluZyBjb250YWlucyBjb2xvbnMuIFRoYXQgd291bGQgbGVhZCB0byBub24td29ya2luZ1xuICAvLyBkb3VibGUgYnJhY2tldHMgKGUuZy4gW1s6Ol1dKSBob3N0XG4gIC8vXG4gIC8vIEFsbCBvZiB0aGVzZSB3ZWIgc29ja2V0IHVybCBwYXJhbXMgYXJlIG9wdGlvbmFsbHkgcGFzc2VkIGluIHRocm91Z2ggcmVzb3VyY2VRdWVyeSxcbiAgLy8gc28gd2UgbmVlZCB0byBmYWxsIGJhY2sgdG8gdGhlIGRlZmF1bHQgaWYgdGhleSBhcmUgbm90IHByb3ZpZGVkXG5cblxuICB2YXIgc29ja2V0VVJMSG9zdG5hbWUgPSAoaG9zdG5hbWUgfHwgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcImxvY2FsaG9zdFwiKS5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvLCBcIiQxXCIpO1xuICB2YXIgc29ja2V0VVJMUG9ydCA9IHBhcnNlZFVSTC5wb3J0O1xuXG4gIGlmICghc29ja2V0VVJMUG9ydCB8fCBzb2NrZXRVUkxQb3J0ID09PSBcIjBcIikge1xuICAgIHNvY2tldFVSTFBvcnQgPSBzZWxmLmxvY2F0aW9uLnBvcnQ7XG4gIH0gLy8gSWYgcGF0aCBpcyBwcm92aWRlZCBpdCdsbCBiZSBwYXNzZWQgaW4gdmlhIHRoZSByZXNvdXJjZVF1ZXJ5IGFzIGFcbiAgLy8gcXVlcnkgcGFyYW0gc28gaXQgaGFzIHRvIGJlIHBhcnNlZCBvdXQgb2YgdGhlIHF1ZXJ5c3RyaW5nIGluIG9yZGVyIGZvciB0aGVcbiAgLy8gY2xpZW50IHRvIG9wZW4gdGhlIHNvY2tldCB0byB0aGUgY29ycmVjdCBsb2NhdGlvbi5cblxuXG4gIHZhciBzb2NrZXRVUkxQYXRobmFtZSA9IFwiL3dzXCI7XG5cbiAgaWYgKHBhcnNlZFVSTC5wYXRobmFtZSAmJiAhcGFyc2VkVVJMLmZyb21DdXJyZW50U2NyaXB0KSB7XG4gICAgc29ja2V0VVJMUGF0aG5hbWUgPSBwYXJzZWRVUkwucGF0aG5hbWU7XG4gIH1cblxuICByZXR1cm4gZm9ybWF0KHtcbiAgICBwcm90b2NvbDogc29ja2V0VVJMUHJvdG9jb2wsXG4gICAgYXV0aDogc29ja2V0VVJMQXV0aCxcbiAgICBob3N0bmFtZTogc29ja2V0VVJMSG9zdG5hbWUsXG4gICAgcG9ydDogc29ja2V0VVJMUG9ydCxcbiAgICBwYXRobmFtZTogc29ja2V0VVJMUGF0aG5hbWUsXG4gICAgc2xhc2hlczogdHJ1ZVxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU29ja2V0VVJMOyIsIi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSgpIHtcbiAgLy8gYGRvY3VtZW50LmN1cnJlbnRTY3JpcHRgIGlzIHRoZSBtb3N0IGFjY3VyYXRlIHdheSB0byBmaW5kIHRoZSBjdXJyZW50IHNjcmlwdCxcbiAgLy8gYnV0IGlzIG5vdCBzdXBwb3J0ZWQgaW4gYWxsIGJyb3dzZXJzLlxuICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfSAvLyBGYWxsYmFjayB0byBnZXR0aW5nIGFsbCBzY3JpcHRzIHJ1bm5pbmcgaW4gdGhlIGRvY3VtZW50LlxuXG5cbiAgdmFyIHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQuc2NyaXB0cyB8fCBbXTtcbiAgdmFyIHNjcmlwdEVsZW1lbnRzV2l0aFNyYyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChzY3JpcHRFbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0pO1xuXG4gIGlmIChzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoID4gMCkge1xuICAgIHZhciBjdXJyZW50U2NyaXB0ID0gc2NyaXB0RWxlbWVudHNXaXRoU3JjW3NjcmlwdEVsZW1lbnRzV2l0aFNyYy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0gLy8gRmFpbCBhcyB0aGVyZSB3YXMgbm8gc2NyaXB0IHRvIHVzZS5cblxuXG4gIHRocm93IG5ldyBFcnJvcihcIlt3ZWJwYWNrLWRldi1zZXJ2ZXJdIEZhaWxlZCB0byBnZXQgY3VycmVudCBzY3JpcHQgc291cmNlLlwiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZTsiLCJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi9tb2R1bGVzL2xvZ2dlci9pbmRleC5qc1wiO1xudmFyIG5hbWUgPSBcIndlYnBhY2stZGV2LXNlcnZlclwiOyAvLyBkZWZhdWx0IGxldmVsIGlzIHNldCBvbiB0aGUgY2xpZW50IHNpZGUsIHNvIGl0IGRvZXMgbm90IG5lZWRcbi8vIHRvIGJlIHNldCBieSB0aGUgQ0xJIG9yIEFQSVxuXG52YXIgZGVmYXVsdExldmVsID0gXCJpbmZvXCI7IC8vIG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcblxuLyoqXG4gKiBAcGFyYW0ge2ZhbHNlIHwgdHJ1ZSB8IFwibm9uZVwiIHwgXCJlcnJvclwiIHwgXCJ3YXJuXCIgfCBcImluZm9cIiB8IFwibG9nXCIgfCBcInZlcmJvc2VcIn0gbGV2ZWxcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIHNldExvZ0xldmVsKGxldmVsKSB7XG4gIGxvZ2dlci5jb25maWd1cmVEZWZhdWx0TG9nZ2VyKHtcbiAgICBsZXZlbDogbGV2ZWxcbiAgfSk7XG59XG5cbnNldExvZ0xldmVsKGRlZmF1bHRMZXZlbCk7XG52YXIgbG9nID0gbG9nZ2VyLmdldExvZ2dlcihuYW1lKTtcbmV4cG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfTsiLCJpbXBvcnQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSBmcm9tIFwiLi9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzXCI7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZVF1ZXJ5XG4gKiBAcmV0dXJucyB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIH19XG4gKi9cblxuZnVuY3Rpb24gcGFyc2VVUkwocmVzb3VyY2VRdWVyeSkge1xuICAvKiogQHR5cGUge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIH19ICovXG4gIHZhciBvcHRpb25zID0ge307XG5cbiAgaWYgKHR5cGVvZiByZXNvdXJjZVF1ZXJ5ID09PSBcInN0cmluZ1wiICYmIHJlc291cmNlUXVlcnkgIT09IFwiXCIpIHtcbiAgICB2YXIgc2VhcmNoUGFyYW1zID0gcmVzb3VyY2VRdWVyeS5zdWJzdHIoMSkuc3BsaXQoXCImXCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFyY2hQYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYWlyID0gc2VhcmNoUGFyYW1zW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgIG9wdGlvbnNbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEVsc2UsIGdldCB0aGUgdXJsIGZyb20gdGhlIDxzY3JpcHQ+IHRoaXMgZmlsZSB3YXMgY2FsbGVkIHdpdGguXG4gICAgdmFyIHNjcmlwdFNvdXJjZSA9IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UoKTtcbiAgICB2YXIgc2NyaXB0U291cmNlVVJMO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciBgYmFzZVVSTGAgd2l0aCBgd2luZG93LmxvY2F0aW9uLmhyZWZgLFxuICAgICAgLy8gaXMgdG8gYWxsb3cgcGFyc2luZyBvZiBwYXRoLXJlbGF0aXZlIG9yIHByb3RvY29sLXJlbGF0aXZlIFVSTHMsXG4gICAgICAvLyBhbmQgd2lsbCBoYXZlIG5vIGVmZmVjdCBpZiBgc2NyaXB0U291cmNlYCBpcyBhIGZ1bGx5IHZhbGlkIFVSTC5cbiAgICAgIHNjcmlwdFNvdXJjZVVSTCA9IG5ldyBVUkwoc2NyaXB0U291cmNlLCBzZWxmLmxvY2F0aW9uLmhyZWYpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7Ly8gVVJMIHBhcnNpbmcgZmFpbGVkLCBkbyBub3RoaW5nLlxuICAgICAgLy8gV2Ugd2lsbCBzdGlsbCBwcm9jZWVkIHRvIHNlZSBpZiB3ZSBjYW4gcmVjb3ZlciB1c2luZyBgcmVzb3VyY2VRdWVyeWBcbiAgICB9XG5cbiAgICBpZiAoc2NyaXB0U291cmNlVVJMKSB7XG4gICAgICBvcHRpb25zID0gc2NyaXB0U291cmNlVVJMO1xuICAgICAgb3B0aW9ucy5mcm9tQ3VycmVudFNjcmlwdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlVVJMOyIsImltcG9ydCBob3RFbWl0dGVyIGZyb20gXCJ3ZWJwYWNrL2hvdC9lbWl0dGVyLmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2cuanNcIjtcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuT3B0aW9uc30gT3B0aW9uc1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9pbmRleFwiKS5TdGF0dXN9IFN0YXR1c1xuXG4vKipcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHBhcmFtIHtTdGF0dXN9IHN0YXR1c1xuICovXG5cbmZ1bmN0aW9uIHJlbG9hZEFwcChfcmVmLCBzdGF0dXMpIHtcbiAgdmFyIGhvdCA9IF9yZWYuaG90LFxuICAgICAgbGl2ZVJlbG9hZCA9IF9yZWYubGl2ZVJlbG9hZDtcblxuICBpZiAoc3RhdHVzLmlzVW5sb2FkaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoLFxuICAgICAgcHJldmlvdXNIYXNoID0gc3RhdHVzLnByZXZpb3VzSGFzaDtcbiAgdmFyIGlzSW5pdGlhbCA9IGN1cnJlbnRIYXNoLmluZGV4T2YoXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICBwcmV2aW91c0hhc2gpID49IDA7XG5cbiAgaWYgKGlzSW5pdGlhbCkge1xuICAgIHJldHVybjtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtXaW5kb3d9IHJvb3RXaW5kb3dcbiAgICogQHBhcmFtIHtudW1iZXJ9IGludGVydmFsSWRcbiAgICovXG5cblxuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWxvYWRpbmcuLi5cIik7XG4gICAgcm9vdFdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSBzZWxmLmxvY2F0aW9uLnNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYWxsb3dUb0hvdCA9IHNlYXJjaC5pbmRleE9mKFwid2VicGFjay1kZXYtc2VydmVyLWhvdD1mYWxzZVwiKSA9PT0gLTE7XG4gIHZhciBhbGxvd1RvTGl2ZVJlbG9hZCA9IHNlYXJjaC5pbmRleE9mKFwid2VicGFjay1kZXYtc2VydmVyLWxpdmUtcmVsb2FkPWZhbHNlXCIpID09PSAtMTtcblxuICBpZiAoaG90ICYmIGFsbG93VG9Ib3QpIHtcbiAgICBsb2cuaW5mbyhcIkFwcCBob3QgdXBkYXRlLi4uXCIpO1xuICAgIGhvdEVtaXR0ZXIuZW1pdChcIndlYnBhY2tIb3RVcGRhdGVcIiwgc3RhdHVzLmN1cnJlbnRIYXNoKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLndpbmRvdykge1xuICAgICAgLy8gYnJvYWRjYXN0IHVwZGF0ZSB0byB3aW5kb3dcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoXCJ3ZWJwYWNrSG90VXBkYXRlXCIuY29uY2F0KHN0YXR1cy5jdXJyZW50SGFzaCksIFwiKlwiKTtcbiAgICB9XG4gIH0gLy8gYWxsb3cgcmVmcmVzaGluZyB0aGUgcGFnZSBvbmx5IGlmIGxpdmVSZWxvYWQgaXNuJ3QgZGlzYWJsZWRcbiAgZWxzZSBpZiAobGl2ZVJlbG9hZCAmJiBhbGxvd1RvTGl2ZVJlbG9hZCkge1xuICAgIHZhciByb290V2luZG93ID0gc2VsZjsgLy8gdXNlIHBhcmVudCB3aW5kb3cgZm9yIHJlbG9hZCAoaW4gY2FzZSB3ZSdyZSBpbiBhbiBpZnJhbWUgd2l0aCBubyB2YWxpZCBzcmMpXG5cbiAgICB2YXIgaW50ZXJ2YWxJZCA9IHNlbGYuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHJvb3RXaW5kb3cubG9jYXRpb24ucHJvdG9jb2wgIT09IFwiYWJvdXQ6XCIpIHtcbiAgICAgICAgLy8gcmVsb2FkIGltbWVkaWF0ZWx5IGlmIHByb3RvY29sIGlzIHZhbGlkXG4gICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFdpbmRvdyA9IHJvb3RXaW5kb3cucGFyZW50O1xuXG4gICAgICAgIGlmIChyb290V2luZG93LnBhcmVudCA9PT0gcm9vdFdpbmRvdykge1xuICAgICAgICAgIC8vIGlmIHBhcmVudCBlcXVhbHMgY3VycmVudCB3aW5kb3cgd2UndmUgcmVhY2hlZCB0aGUgcm9vdCB3aGljaCB3b3VsZCBjb250aW51ZSBmb3JldmVyLCBzbyB0cmlnZ2VyIGEgcmVsb2FkIGFueXdheXNcbiAgICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbG9hZEFwcDsiLCIvKiBnbG9iYWwgX19yZXNvdXJjZVF1ZXJ5IFdvcmtlckdsb2JhbFNjb3BlICovXG4vLyBTZW5kIG1lc3NhZ2VzIHRvIHRoZSBvdXRzaWRlLCBzbyBwbHVnaW5zIGNhbiBjb25zdW1lIGl0LlxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge2FueX0gW2RhdGFdXG4gKi9cbmZ1bmN0aW9uIHNlbmRNc2codHlwZSwgZGF0YSkge1xuICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSkpKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIndlYnBhY2tcIi5jb25jYXQodHlwZSksXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgXCIqXCIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlbmRNc2c7IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8qIGdsb2JhbHMgX193ZWJwYWNrX2hhc2hfXyAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcblx0dmFyIGxhc3RIYXNoO1xuXHR2YXIgdXBUb0RhdGUgPSBmdW5jdGlvbiB1cFRvRGF0ZSgpIHtcblx0XHRyZXR1cm4gbGFzdEhhc2guaW5kZXhPZihfX3dlYnBhY2tfaGFzaF9fKSA+PSAwO1xuXHR9O1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXHR2YXIgY2hlY2sgPSBmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRtb2R1bGUuaG90XG5cdFx0XHQuY2hlY2sodHJ1ZSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRpZiAoIXVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIENhbm5vdCBmaW5kIHVwZGF0ZS4gTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiKTtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gKFByb2JhYmx5IGJlY2F1c2Ugb2YgcmVzdGFydGluZyB0aGUgd2VicGFjay1kZXYtc2VydmVyKVwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF1cFRvRGF0ZSgpKSB7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlcXVpcmUoXCIuL2xvZy1hcHBseS1yZXN1bHRcIikodXBkYXRlZE1vZHVsZXMsIHVwZGF0ZWRNb2R1bGVzKTtcblxuXHRcdFx0XHRpZiAodXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBBcHAgaXMgdXAgdG8gZGF0ZS5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0gbW9kdWxlLmhvdC5zdGF0dXMoKTtcblx0XHRcdFx0aWYgKFtcImFib3J0XCIsIFwiZmFpbFwiXS5pbmRleE9mKHN0YXR1cykgPj0gMCkge1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSBDYW5ub3QgYXBwbHkgdXBkYXRlLiBOZWVkIHRvIGRvIGEgZnVsbCByZWxvYWQhXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFVwZGF0ZSBmYWlsZWQ6IFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fTtcblx0dmFyIGhvdEVtaXR0ZXIgPSByZXF1aXJlKFwiLi9lbWl0dGVyXCIpO1xuXHRob3RFbWl0dGVyLm9uKFwid2VicGFja0hvdFVwZGF0ZVwiLCBmdW5jdGlvbiAoY3VycmVudEhhc2gpIHtcblx0XHRsYXN0SGFzaCA9IGN1cnJlbnRIYXNoO1xuXHRcdGlmICghdXBUb0RhdGUoKSAmJiBtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImlkbGVcIikge1xuXHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIENoZWNraW5nIGZvciB1cGRhdGVzIG9uIHRoZSBzZXJ2ZXIuLi5cIik7XG5cdFx0XHRjaGVjaygpO1xuXHRcdH1cblx0fSk7XG5cdGxvZyhcImluZm9cIiwgXCJbSE1SXSBXYWl0aW5nIGZvciB1cGRhdGUgc2lnbmFsIGZyb20gV0RTLi4uXCIpO1xufSBlbHNlIHtcblx0dGhyb3cgbmV3IEVycm9yKFwiW0hNUl0gSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBkaXNhYmxlZC5cIik7XG59XG4iLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbm1vZHVsZS5leHBvcnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVwZGF0ZWRNb2R1bGVzLCByZW5ld2VkTW9kdWxlcykge1xuXHR2YXIgdW5hY2NlcHRlZE1vZHVsZXMgPSB1cGRhdGVkTW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0cmV0dXJuIHJlbmV3ZWRNb2R1bGVzICYmIHJlbmV3ZWRNb2R1bGVzLmluZGV4T2YobW9kdWxlSWQpIDwgMDtcblx0fSk7XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cblx0aWYgKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcblx0XHRsb2coXG5cdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiAoVGhleSB3b3VsZCBuZWVkIGEgZnVsbCByZWxvYWQhKVwiXG5cdFx0KTtcblx0XHR1bmFjY2VwdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gTm90aGluZyBob3QgdXBkYXRlZC5cIik7XG5cdH0gZWxzZSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZWQgbW9kdWxlczpcIik7XG5cdFx0cmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdGlmICh0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIgJiYgbW9kdWxlSWQuaW5kZXhPZihcIiFcIikgIT09IC0xKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IG1vZHVsZUlkLnNwbGl0KFwiIVwiKTtcblx0XHRcdFx0bG9nLmdyb3VwQ29sbGFwc2VkKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgcGFydHMucG9wKCkpO1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHRcdGxvZy5ncm91cEVuZChcImluZm9cIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dmFyIG51bWJlcklkcyA9IHJlbmV3ZWRNb2R1bGVzLmV2ZXJ5KGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJudW1iZXJcIjtcblx0XHR9KTtcblx0XHRpZiAobnVtYmVySWRzKVxuXHRcdFx0bG9nKFxuXHRcdFx0XHRcImluZm9cIixcblx0XHRcdFx0J1tITVJdIENvbnNpZGVyIHVzaW5nIHRoZSBvcHRpbWl6YXRpb24ubW9kdWxlSWRzOiBcIm5hbWVkXCIgZm9yIG1vZHVsZSBuYW1lcy4nXG5cdFx0XHQpO1xuXHR9XG59O1xuIiwidmFyIGxvZ0xldmVsID0gXCJpbmZvXCI7XG5cbmZ1bmN0aW9uIGR1bW15KCkge31cblxuZnVuY3Rpb24gc2hvdWxkTG9nKGxldmVsKSB7XG5cdHZhciBzaG91bGRMb2cgPVxuXHRcdChsb2dMZXZlbCA9PT0gXCJpbmZvXCIgJiYgbGV2ZWwgPT09IFwiaW5mb1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcIndhcm5pbmdcIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIiwgXCJlcnJvclwiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcImVycm9yXCIpO1xuXHRyZXR1cm4gc2hvdWxkTG9nO1xufVxuXG5mdW5jdGlvbiBsb2dHcm91cChsb2dGbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0XHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdFx0bG9nRm4obXNnKTtcblx0XHR9XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRpZiAobGV2ZWwgPT09IFwiaW5mb1wiKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwid2FybmluZ1wiKSB7XG5cdFx0XHRjb25zb2xlLndhcm4obXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcImVycm9yXCIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHR9XG5cdH1cbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGlucyAqL1xudmFyIGdyb3VwID0gY29uc29sZS5ncm91cCB8fCBkdW1teTtcbnZhciBncm91cENvbGxhcHNlZCA9IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgfHwgZHVtbXk7XG52YXIgZ3JvdXBFbmQgPSBjb25zb2xlLmdyb3VwRW5kIHx8IGR1bW15O1xuLyogZXNsaW50LWVuYWJsZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnMgKi9cblxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcblxubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcblx0bG9nTGV2ZWwgPSBsZXZlbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmZvcm1hdEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHR2YXIgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuXHR2YXIgc3RhY2sgPSBlcnIuc3RhY2s7XG5cdGlmICghc3RhY2spIHtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSBlbHNlIGlmIChzdGFjay5pbmRleE9mKG1lc3NhZ2UpIDwgMCkge1xuXHRcdHJldHVybiBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBzdGFjaztcblx0fVxufTtcbiIsImltcG9ydCAnLi4vY3NzL3N0eWxlLnNjc3MnO1xuZnVuY3Rpb24gY29tcG9uZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RyeScpO1xuICAgIC8vIExvZGFzaCwgY3VycmVudGx5IGluY2x1ZGVkIHZpYSBhIHNjcmlwdCwgaXMgcmVxdWlyZWQgZm9yIHRoaXMgbGluZSB0byB3b3JrXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSAnSGVsbG8gd2VicGFjayc7XG4gIFxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG4gIFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGNhY2hlZE1vZHVsZS5lcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBjYWNoZWRNb2R1bGUuZXJyb3I7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHRyeSB7XG5cdFx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uaS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHsgaGFuZGxlcihleGVjT3B0aW9ucyk7IH0pO1xuXHRcdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0XHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXHR9IGNhdGNoKGUpIHtcblx0XHRtb2R1bGUuZXJyb3IgPSBlO1xuXHRcdHRocm93IGU7XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBleGVjdXRpb24gaW50ZXJjZXB0b3Jcbl9fd2VicGFja19yZXF1aXJlX18uaSA9IFtdO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFsbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uaHUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiB1bmRlZmluZWQ7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1yRiA9ICgpID0+IChcImluZGV4LlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYmMxYzVjODk5YzUwZjNhOGM1MzNcIikiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ0b2RvLWxpc3Q6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0O1xuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgY3VycmVudE1vZHVsZURhdGEgPSB7fTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jO1xuXG4vLyBtb2R1bGUgYW5kIHJlcXVpcmUgY3JlYXRpb25cbnZhciBjdXJyZW50Q2hpbGRNb2R1bGU7XG52YXIgY3VycmVudFBhcmVudHMgPSBbXTtcblxuLy8gc3RhdHVzXG52YXIgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzID0gW107XG52YXIgY3VycmVudFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4vLyB3aGlsZSBkb3dubG9hZGluZ1xudmFyIGJsb2NraW5nUHJvbWlzZXM7XG5cbi8vIFRoZSB1cGRhdGUgaW5mb1xudmFyIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzO1xudmFyIHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuXHRcdGRhdGE6IGN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuXHR9O1xuXHRjdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG5cdHJldHVybiBob3Q7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhuZXdTdGF0dXMpIHtcblx0Y3VycmVudFN0YXR1cyA9IG5ld1N0YXR1cztcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcblx0XHRyZXN1bHRzW2ldID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cyk7XG59XG5cbmZ1bmN0aW9uIHRyYWNrQmxvY2tpbmdQcm9taXNlKHByb21pc2UpIHtcblx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRzZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuXHRcdFx0YmxvY2tpbmdQcm9taXNlcy5wdXNoKHByb21pc2UpO1xuXHRcdFx0d2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRibG9ja2luZ1Byb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pIHtcblx0aWYgKGJsb2NraW5nUHJvbWlzZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZm4oKTtcblx0dmFyIGJsb2NrZXIgPSBibG9ja2luZ1Byb21pc2VzO1xuXHRibG9ja2luZ1Byb21pc2VzID0gW107XG5cdHJldHVybiBQcm9taXNlLmFsbChibG9ja2VyKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaG90Q2hlY2soYXBwbHlPblVwZGF0ZSkge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcblx0fVxuXHRyZXR1cm4gc2V0U3RhdHVzKFwiY2hlY2tcIilcblx0XHQudGhlbihfX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZSkge1xuXHRcdFx0aWYgKCF1cGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhhcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpLnRoZW4oXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicHJlcGFyZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHVwZGF0ZWRNb2R1bGVzID0gW107XG5cdFx0XHRcdGJsb2NraW5nUHJvbWlzZXMgPSBbXTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDKS5yZWR1Y2UoZnVuY3Rpb24gKFxuXHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRrZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yQ1trZXldKFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUuYyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlLnIsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5tLFxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZWRNb2R1bGVzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2VzO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0W10pXG5cdFx0XHRcdCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChhcHBseU9uVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KGFwcGx5T25VcGRhdGUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB1cGRhdGVkTW9kdWxlcztcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwicmVhZHlcIikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxBcHBseShvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cblx0dmFyIHJlc3VsdHMgPSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycy5tYXAoZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0XHRyZXR1cm4gaGFuZGxlcihvcHRpb25zKTtcblx0fSk7XG5cdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gdW5kZWZpbmVkO1xuXG5cdHZhciBlcnJvcnMgPSByZXN1bHRzXG5cdFx0Lm1hcChmdW5jdGlvbiAocikge1xuXHRcdFx0cmV0dXJuIHIuZXJyb3I7XG5cdFx0fSlcblx0XHQuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJhYm9ydFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuXHR2YXIgZGlzcG9zZVByb21pc2UgPSBzZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuXG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5kaXNwb3NlKSByZXN1bHQuZGlzcG9zZSgpO1xuXHR9KTtcblxuXHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG5cdHZhciBhcHBseVByb21pc2UgPSBzZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuXHR2YXIgZXJyb3I7XG5cdHZhciByZXBvcnRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcblx0fTtcblxuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5hcHBseSkge1xuXHRcdFx0dmFyIG1vZHVsZXMgPSByZXN1bHQuYXBwbHkocmVwb3J0RXJyb3IpO1xuXHRcdFx0aWYgKG1vZHVsZXMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gobW9kdWxlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChbZGlzcG9zZVByb21pc2UsIGFwcGx5UHJvbWlzZV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG5cdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiZmFpbFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChsaXN0KSB7XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBsaXN0O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImlkbGVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG5cdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRpZiAoIWN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzKSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmwgKyBcIi4uLy4uL1wiOyIsInZhciBjcmVhdGVTdHlsZXNoZWV0ID0gKGNodW5rSWQsIGZ1bGxocmVmLCByZXNvbHZlLCByZWplY3QpID0+IHtcblx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdHZhciBvbkxpbmtDb21wbGV0ZSA9IChldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcy5cblx0XHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG51bGw7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJykge1xuXHRcdFx0cmVzb2x2ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5jb2RlID0gXCJDU1NfQ0hVTktfTE9BRF9GQUlMRURcIjtcblx0XHRcdGVyci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0ZXJyLnJlcXVlc3QgPSByZWFsSHJlZjtcblx0XHRcdGxpbmtUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsaW5rVGFnKVxuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9XG5cdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gb25MaW5rQ29tcGxldGU7XG5cdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuXG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cdHJldHVybiBsaW5rVGFnO1xufTtcbnZhciBmaW5kU3R5bGVzaGVldCA9IChocmVmLCBmdWxsaHJlZikgPT4ge1xuXHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gdGFnO1xuXHR9XG5cdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuXHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHRhZztcblx0fVxufTtcbnZhciBsb2FkU3R5bGVzaGVldCA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0aWYoZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIHJlc29sdmUsIHJlamVjdCk7XG5cdH0pO1xufVxuLy8gbm8gY2h1bmsgbG9hZGluZ1xuXG52YXIgb2xkVGFncyA9IFtdO1xudmFyIG5ld1RhZ3MgPSBbXTtcbnZhciBhcHBseUhhbmRsZXIgPSAob3B0aW9ucykgPT4ge1xuXHRyZXR1cm4geyBkaXNwb3NlOiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG9sZFRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBvbGRUYWcgPSBvbGRUYWdzW2ldO1xuXHRcdFx0aWYob2xkVGFnLnBhcmVudE5vZGUpIG9sZFRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZFRhZyk7XG5cdFx0fVxuXHRcdG9sZFRhZ3MubGVuZ3RoID0gMDtcblx0fSwgYXBwbHk6ICgpID0+IHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbmV3VGFncy5sZW5ndGg7IGkrKykgbmV3VGFnc1tpXS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRuZXdUYWdzLmxlbmd0aCA9IDA7XG5cdH0gfTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5taW5pQ3NzID0gKGNodW5rSWRzLCByZW1vdmVkQ2h1bmtzLCByZW1vdmVkTW9kdWxlcywgcHJvbWlzZXMsIGFwcGx5SGFuZGxlcnMsIHVwZGF0ZWRNb2R1bGVzTGlzdCkgPT4ge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y2h1bmtJZHMuZm9yRWFjaCgoY2h1bmtJZCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdHZhciBvbGRUYWcgPSBmaW5kU3R5bGVzaGVldChocmVmLCBmdWxsaHJlZik7XG5cdFx0aWYoIW9sZFRhZykgcmV0dXJuO1xuXHRcdHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHRhZyA9IGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsICgpID0+IHtcblx0XHRcdFx0dGFnLmFzID0gXCJzdHlsZVwiO1xuXHRcdFx0XHR0YWcucmVsID0gXCJwcmVsb2FkXCI7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0sIHJlamVjdCk7XG5cdFx0XHRvbGRUYWdzLnB1c2gob2xkVGFnKTtcblx0XHRcdG5ld1RhZ3MucHVzaCh0YWcpO1xuXHRcdH0pKTtcblx0fSk7XG59IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG52YXIgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdDtcbnZhciB3YWl0aW5nVXBkYXRlUmVzb2x2ZXMgPSB7fTtcbmZ1bmN0aW9uIGxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gcmVzb2x2ZTtcblx0XHQvLyBzdGFydCB1cGRhdGUgY2h1bmsgbG9hZGluZ1xuXHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmh1KGNodW5rSWQpO1xuXHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHRcdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkXG5cdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBob3QgdXBkYXRlIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkKTtcblx0fSk7XG59XG5cbnNlbGZbXCJ3ZWJwYWNrSG90VXBkYXRldG9kb19saXN0XCJdID0gKGNodW5rSWQsIG1vcmVNb2R1bGVzLCBydW50aW1lKSA9PiB7XG5cdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHRpZihjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0KSBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBjdXJyZW50VXBkYXRlUnVudGltZS5wdXNoKHJ1bnRpbWUpO1xuXHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0oKTtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdH1cbn07XG5cbnZhciBjdXJyZW50VXBkYXRlQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGU7XG52YXIgY3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZVJ1bnRpbWU7XG5mdW5jdGlvbiBhcHBseUhhbmRsZXIob3B0aW9ucykge1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSBkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0gdW5kZWZpbmVkO1xuXHRmdW5jdGlvbiBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHModXBkYXRlTW9kdWxlSWQpIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGFpbjogW2lkXSxcblx0XHRcdFx0aWQ6IGlkXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG5cdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG5cdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdGlmIChcblx0XHRcdFx0IW1vZHVsZSB8fFxuXHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG5cdFx0XHQpXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcblx0XHRcdFx0dmFyIHBhcmVudCA9IF9fd2VicGFja19yZXF1aXJlX18uY1twYXJlbnRJZF07XG5cdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcblx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuXHRcdFx0XHRxdWV1ZS5wdXNoKHtcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuXHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuXHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG5cdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuXHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuXHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG5cdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cblx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZShtb2R1bGUpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIG1vZHVsZS5pZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuXHRcdCk7XG5cdH07XG5cblx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gY3VycmVudFVwZGF0ZSkge1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0XHR2YXIgbmV3TW9kdWxlRmFjdG9yeSA9IGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdO1xuXHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmIChuZXdNb2R1bGVGYWN0b3J5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyhtb2R1bGVJZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cblx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG5cdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG5cdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcblx0XHRcdH1cblx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXJyb3I6IGFib3J0RXJyb3Jcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChkb0FwcGx5KSB7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gbmV3TW9kdWxlRmFjdG9yeTtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG5cdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGN1cnJlbnRVcGRhdGUgPSB1bmRlZmluZWQ7XG5cblx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuXHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG5cdGZvciAodmFyIGogPSAwOyBqIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbal07XG5cdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRpZiAoXG5cdFx0XHRtb2R1bGUgJiZcblx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgfHwgbW9kdWxlLmhvdC5fbWFpbikgJiZcblx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcblx0XHRcdGFwcGxpZWRVcGRhdGVbb3V0ZGF0ZWRNb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuXHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcblx0XHRcdCFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWRcblx0XHQpIHtcblx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0bW9kdWxlOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRyZXF1aXJlOiBtb2R1bGUuaG90Ll9yZXF1aXJlU2VsZixcblx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcblxuXHRyZXR1cm4ge1xuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdH0pO1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHZhciBpZHg7XG5cdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdHZhciBkYXRhID0ge307XG5cblx0XHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG5cdFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRkaXNwb3NlSGFuZGxlcnNbal0uY2FsbChudWxsLCBkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckRbbW9kdWxlSWRdID0gZGF0YTtcblxuXHRcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuXHRcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuXHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuXHRcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG5cdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuXHRcdFx0dmFyIGRlcGVuZGVuY3k7XG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhcHBseTogZnVuY3Rpb24gKHJlcG9ydEVycm9yKSB7XG5cdFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcblx0XHRcdGZvciAodmFyIHVwZGF0ZU1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhhcHBsaWVkVXBkYXRlLCB1cGRhdGVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bdXBkYXRlTW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVt1cGRhdGVNb2R1bGVJZF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcnVuIG5ldyBydW50aW1lIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFVwZGF0ZVJ1bnRpbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWVbaV0oX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0dmFyIGFjY2VwdENhbGxiYWNrID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoYWNjZXB0Q2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoYWNjZXB0Q2FsbGJhY2spICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goYWNjZXB0Q2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnMucHVzaChlcnJvckhhbmRsZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcy5wdXNoKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGNhbGxiYWNrcy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrc1trXS5jYWxsKG51bGwsIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBlcnJvckhhbmRsZXJzW2tdID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnNba10oZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba11cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgbyA9IDA7IG8gPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBvKyspIHtcblx0XHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbb107XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGl0ZW0ucmVxdWlyZShtb2R1bGVJZCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZTogX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH1cblx0fTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1ySS5qc29ucCA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgYXBwbHlIYW5kbGVycykge1xuXHRpZiAoIWN1cnJlbnRVcGRhdGUpIHtcblx0XHRjdXJyZW50VXBkYXRlID0ge307XG5cdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IFtdO1xuXHRcdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHR9XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gX193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXTtcblx0fVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5qc29ucCA9IGZ1bmN0aW9uIChcblx0Y2h1bmtJZHMsXG5cdHJlbW92ZWRDaHVua3MsXG5cdHJlbW92ZWRNb2R1bGVzLFxuXHRwcm9taXNlcyxcblx0YXBwbHlIYW5kbGVycyxcblx0dXBkYXRlZE1vZHVsZXNMaXN0XG4pIHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB7fTtcblx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSByZW1vdmVkQ2h1bmtzO1xuXHRjdXJyZW50VXBkYXRlID0gcmVtb3ZlZE1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHRcdG9ialtrZXldID0gZmFsc2U7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwge30pO1xuXHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0aWYgKFxuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpKTtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdH1cblx0fSk7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXIgPSBmdW5jdGlvbiAoY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rcyAmJlxuXHRcdFx0XHQhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGVDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0XHQpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkpO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0gPSAoKSA9PiB7XG5cdGlmICh0eXBlb2YgZmV0Y2ggPT09IFwidW5kZWZpbmVkXCIpIHRocm93IG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydDogbmVlZCBmZXRjaCBBUElcIik7XG5cdHJldHVybiBmZXRjaChfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYoKSkudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuOyAvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG5cdFx0aWYoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIG1hbmlmZXN0IFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0fSk7XG59O1xuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiIiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2luZGV4LmpzP3Byb3RvY29sPXdzJTNBJmhvc3RuYW1lPTAuMC4wLjAmcG9ydD00MDAwJnBhdGhuYW1lPSUyRndzJmxvZ2dpbmc9aW5mbyZyZWNvbm5lY3Q9MTBcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZGV2LXNlcnZlci5qc1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2Fzc2V0L2pzL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9