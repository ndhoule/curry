'use strict';

/**
 * Module dependencies.
 */

var arity = require('arity');

/**
 * Object.prototype.toString reference.
 */

var objToString = Object.prototype.toString;

/**
 * Tests if a value is a number.
 *
 * @name isNumber
 * @api private
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is a number, otherwise `false`.
 */

// TODO: Move to library
var isNumber = function isNumber(val) {
  var type = typeof val;
  return type === 'number' || (type === 'object' && objToString.call(val) === '[object Number]');
};

/**
 * Create a curry wrapper.
 *
 * @name wrapCurry
 * @api private
 * @param {Function} func
 * @param {number} remainingArity
 * @param {Array} previousArgs
 * @return {Function}
 */

var wrapCurry = function wrapCurry(func, remainingArity, previousArgs) {
  return arity(remainingArity, function(/* newArgs */) {
    var newArgs = Array.prototype.slice.call(arguments);
    var newArity = remainingArity - newArgs.length;
    var args = previousArgs.concat(newArgs);

    if (newArity > 0) {
      return wrapCurry(func, newArity, args);
    }

    return func.apply(this, args);
  });
};

/**
 * Accepts a function `func` and returns a new function that, when invoked, will repeatedly return a
 * new wrapper function until all expected arguments have been provided.
 *
 * @name curry
 * @api public
 * @param {Function} func The function to wrap.
 * @param {number} [arity=func.length] The optional desired arity of the return function.
 * @return {Function} A curried function that, when invoked, will return either a new curried
 * function (if not all expected arguments have been provided), or the result of calling `fn`.
 * @example
 * var addThreeItems = function(a, b, c) { return a + b + c; };
 * var curriedAddThreeItems = curry(addThreeItems);
 * curriedAddThreeItems(2)(3)(4);
 * //=> 9
 *
 * var curriedReduce = curry(reduce);
 * var add = function(a, b) { return a + b; };
 * var sumArray = curriedReduce(add, 0);
 * sumArray([1, 2, 3]);
 * //=> 6
 */

var curry = function curry(func, arity) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function but got ' + typeof func);
  }

  arity = isNumber(arity) ? arity : func.length;

  return wrapCurry(func, arity, []);
};

/**
 * Exports.
 */

module.exports = curry;
