# curry [![Circle CI][circleci-badge]][circleci-link]

Wrap a function in a function that will repeatedly return a new wrapper function until all expected arguments have been provided.

## Installation

Browser:

```sh
component install ndhoule/curry
```

Node:

```sh
$ npm install curry
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

[circleci-link]: https://circleci.com/gh/ndhoule/curry
[circleci-badge]: https://circleci.com/gh/ndhoule/curry.svg?style=svg&circle-token=21bef10df8d3683fd42d12d162a9c5011884503e