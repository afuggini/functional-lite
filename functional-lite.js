(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  "use strict";

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var map = function map(f) {
    return function (step) {
      return function (a, c) {
        return step(a, f(c));
      };
    };
  };

  var filter = function filter(predicate) {
    return function (step) {
      return function (a, c) {
        return predicate(c) ? step(a, c) : a;
      };
    };
  };

  var compose = function compose() {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    return function (x) {
      return fns.reduceRight(function (y, f) {
        return f(y);
      }, x);
    };
  };

  var curry = function curry(f) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return function (a) {
        return a.length === f.length ? f.apply(void 0, _toConsumableArray(a)) : curry(f, a);
      }([].concat(_toConsumableArray(arr), args));
    };
  };

  var transduce = curry(function (step, initial, xform, foldable) {
    return foldable.reduce(xform(step), initial);
  });

  var concatArray = function concatArray(a, c) {
    return a.concat([c]);
  };

  var toArray = transduce(concatArray, []);

  var log = function log(v) {
    console.log(v);
    return v;
  };

  return {
    map: map,
    filter: filter,
    compose: compose,
    curry: curry,
    transduce: transduce,
    concatArray: concatArray,
    toArray: toArray,
    log: log
  };
}));