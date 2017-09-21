# reverse-string

> Reverse a string (with Unicode support). 'foo' → 'oof'

[![Build Status](https://travis-ci.org/cedced19/reverse-string.svg)](https://travis-ci.org/cedced19/reverse-string)
[![NPM version](https://badge.fury.io/js/reverse-string.svg)](http://badge.fury.io/js/reverse-string)

This module was inspired by Implementation #1 of [Edd Mann's post](http://eddmann.com/posts/ten-ways-to-reverse-a-string-in-javascript/):
 a high-performance algorithm for string reversal.

## Install

You can use this module in node or in the browser.

For use via [Node.js](http://nodejs.org/):

```
npm install --save reverse-string
```

For use via [Bower](http://bower.io/):

```
bower install reverse-string
```

## Usage

```js
var reverse = require('reverse-string');

reverse('test');
//=> 'tset'
```

## API

### `reverseString(string)`

Returns a reversed string.

#### string

*Required* <br/>
Type: `string`

The string you want to reverse. Allows unicode and latin characters.

## License

MIT @ [Cédric JUNG](https://cedced19.github.io/)


