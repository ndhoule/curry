/* global describe, it, beforeEach */

'use strict';

var assert = require('assert');
var curry = require('../');
var sinon = require('sinon');

describe('curry', function() {
  var add, curriedAdd, reduce, curriedReduce;

  beforeEach(function() {
    add = sinon.spy(function(a, b) { return a + b; });
    curriedAdd = curry(add);
    reduce = sinon.spy(function(func, acc, coll) {
      return coll.reduce(func, acc);
    });
    curriedReduce = curry(reduce);
  });

  it('should be a function', function() {
    assert.equal(typeof curry, 'function');
  });

  it('should have an arity of 2', function() {
    assert.equal(curry.length, 2);
  });

  it('should return a new function', function() {
    assert.equal(typeof curriedAdd, 'function');
    assert.notEqual(curriedAdd, add);
    assert.notEqual(curriedAdd, curry);
  });

  it('should set the returned function\'s arity', function() {
    assert.equal(add.length, 2);
    assert.equal(curriedAdd.length, 2);
  });

  it('should set the returned function\'s arity after repeated calls', function() {
    var sum = curriedReduce;

    assert.equal(sum.length, 3);
    sum = curriedReduce(add);
    assert.equal(sum.length, 2);
    sum = sum(0);
    assert.equal(sum.length, 1);
    sum = sum();
    sum = sum();
    sum = sum();
    assert.equal(sum.length, 1);
  });

  it('should allow the user to call the curried function repeatedly without parameters', function() {
    assert.doesNotThrow(function() {
      curriedAdd();
      curriedAdd();
      curriedAdd();
    });
  });

  it('should not change the wrapper\'s arity when called without arguments', function() {
    assert.equal(curriedAdd.length, 2);
    curriedAdd();
    curriedAdd();
    curriedAdd();
    assert.equal(curriedAdd.length, 2);
  });

  it('should repeatedly return a wrapper function until passed its expected number of arguments', function() {
    var originalCurriedAdd = curriedAdd;

    assert.notEqual(curriedAdd(), curriedAdd);
    assert.equal(typeof curriedAdd(), 'function');
    curriedAdd = curriedAdd();
    curriedAdd = curriedAdd();
    curriedAdd = curriedAdd();
    assert.notEqual(curriedAdd, originalCurriedAdd);
    assert.equal(typeof curriedAdd, 'function');
  });

  it('should invoke the function once the expected number of arguments is provided', function() {
    var addOne = curriedAdd(1);

    assert.equal(typeof addOne, 'function');
    assert.equal(typeof addOne(3), 'number');
  });

  it('should allow the user to specify an arity', function() {
    assert.equal(curry(add, 10).length, 10);
  });

  it('should pass excess arguments through to the wrapped function, regardless of arity', function() {
    assert.equal(curriedAdd.length, 2);
    curriedAdd(1, 2, 3, 4, 5);
    assert(add.calledWithExactly(1, 2, 3, 4, 5));
  });

  it('should handle functions of 0 arity', function() {
    var spy = sinon.spy();
    var curriedSpy = curry(spy);
    assert.equal(spy.length, 0);
    assert.equal(curriedSpy.length, 0);

    curriedSpy();
    assert(spy.calledOnce);
    curriedSpy();
    assert(spy.calledTwice);
  });

  it('should handle an arity argument of 0', function() {
    assert.equal(curry(add, 0).length, 0);
  });

  it('should handle negative arities', function() {
    assert.equal(curry(add, -100).length, 0);
  });

  it('should handle a non-integer arity argument gracefully', function() {
    assert.equal(curry(add, 'a').length, add.length);
  });

  it('should throw an error when passed a non-function `func` argument', function() {
    assert.throws(function() { curry('omg'); });
  });
});
