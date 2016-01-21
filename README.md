bitmask
--

Tool for manipulating bitmasks

## USAGE

Define your bitmask as global constant:
```js
bit.define('ACCESS_READABLE', 1);
```

Or as local:
```js
var ACCESS_READABLE = bit.create(1);
```

Now you have a special constant with a bitmask. Lets test it:
```js
bit(ACCESS_READABLE).test(ACCESS_READABLE); // true
```

Let create a few other constants:
```js
bit.define('ACCESS_WRITABLE', 2);
bit.define('ACCESS_CREATABLE', 3);
bit.define('ACCESS_SORTABLE', 4);
```

Combine them together, you get a set of options in a one number:
```js
var ACCESS = bit.join(ACCESS_READABLE, ACCESS_READABLE, ACCESS_CREATABLE);
```

Now it's variable contains all options we need. Lets see what options we got:
```js
var isReadable = bit(ACCESS).test(ACCESS_READABLE); // true
var isWritable = bit(ACCESS).test(ACCESS_WRITABLE); // true
var isCreatable = bit(ACCESS).test(ACCESS_CREATABLE); // true
var isSortable = bit(ACCESS).test(ACCESS_SORTABLE); // false
```

Or use native method of comparing:
```js
var isReadable = !!(ACCESS & ACCESS_CREATABLE);
```

Add a new option to an existing mask:
```js
ACCESS = bit(ACCESS).add(ACCESS_SORTABLE);
```

Or remove few:
```js
ACCESS = bit(ACCESS).remove(ACCESS_SORTABLE);
```

Multiple test:
```js
var isFullEditable = bit(ACCESS).test(ACCESS_WRITABLE | ACCESS_CREATABLE | ACCESS_SORTABLE); // false
// or
var isFullEditable = bit(ACCESS).test(ACCESS_WRITABLE, ACCESS_CREATABLE); // true
// or
var isFullEditable = bit(ACCESS).test([ACCESS_WRITABLE, ACCESS_CREATABLE]); // true
```

Check the absence:
```
bit(ACCESS).havent(ACCESS_SORTABLE); // false
```

### Use with functions

Sometimes you need to send with the function some options, but without polluting the arguments. Look up for next example.
```
$mypromise(function(resolve, reject) { });
// By default this function async, we need to make it sync. 
bit.define('MYPROMISE_SYNC', 1);
$mypromise(bit(function(resolve, reject) { }).set(MYPROMISE_SYNC));
```

Inside the $mypromise we use a bit, to get this option.
```
function $mypromise(resolver) {
	if (bit(resolver).test(MYPROMISE_SYNC)) {
		// Make it sync
	} else {
		// Make it async
	}
}
```

### Using prototype patching
You can enable prototype patching. But first you need to enable it.
```
bit.globalize();
```

Ok. Now you can use next method of functions:
```
var resolver = function(resolve, reject) { }.bit.set(MYPROMISE_SYNC);
// Also as tests
resolver.bit.test(MYPROMISE_SYNC);
```

### All methods

#### set([number | array, [number, [...]]])
Override bitmask

#### test([number | array, [number, [...]]])
#### have([number | array, [number, [...]]])
Check for presence of bitmask
```js
bit(GRPUP_MASK).test(ALLOW_WRITE, ALLOW_READ); // true or false
```

#### without([number | array, [number, [...]]])
Same the have, but invert result

#### inc([number | array, [number, [...]]])
#### add([number | array, [number, [...]]])
Append bitmask to existing bitmask

#### exc([number | array, [number, [...]]])
#### exclude([number | array, [number, [...]]])
#### remove([number | array, [number, [...]]])
Exclude bitmask from existing bitmask

#### is([number | array, [number, [...]]])
Test strict equality

#### not([number | array, [number, [...]]])
Strict inequality

#### inverse()
Inverse bitmask (return still object, not new value)

#### reset()
Brings it to zero

## License
MIT, 2016

## Author
Vladimir Kalmykov <vladimirmorulus@gmail.com>

## Run test
```terminal
npm test
```
