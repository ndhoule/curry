# curry [![CI][ci-badge]][ci-link]

Wrap a function in a function that will repeatedly return a new wrapper function until all expected arguments have been provided.

## Installation

```sh
$ component install ndhoule/curry
$ npm install @ndhoule/curry
```

## API

### `curry(func : Function, arity : number)`

Accepts a function `func` and returns a new function that, when invoked, will repeatedly return a new wrapper function until all expected arguments have been provided.

```javascript
var addThreeItems = function(a, b, c) { return a + b + c; };
var curriedAddThreeItems = curry(addThreeItems);
curriedAddThreeItems(2)(3)(4);
//=> 9

var curriedReduce = curry(reduce);
var add = function(a, b) { return a + b; };
var sumArray = curriedReduce(add, 0);
sumArray([1, 2, 3]);
//=> 6
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/curry
[ci-badge]: https://travis-ci.org/ndhoule/curry.svg?branch=master
