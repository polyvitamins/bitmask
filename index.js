var bit = function(bitmask, _) {
	if (this === (function () { return this; })()) {
		if ("function"===typeof bitmask) {
			if ("object"!==typeof bitmask.__bit__) {
				Object.defineProperty(bitmask, '__bit__', {
					enumerable: false,
					writable: false,
					editable: false,
					value: new bit(0, bitmask)
				});

				Object.defineProperty(bitmask, 'bit', {
					enumerable: true,
					configurable: false,
					get: function() {
						return this.__bit__;
					}
				});
			}
			return bitmask.__bit__;
		} else if (arguments.length>1) {
			return new bit(Array.prototype.splice.apply(arguments), false);
		} else {
			return new bit(bitmask instanceof Array ? bit.join(bitmask) : bitmask, _);
		}
	} else {
		this.value = bitmask;
		this._ = _||this;
	}
}

// Create new bitmask
bit.create = function(number) {
	var bitmask = 0;
	Array.prototype.slice.apply(arguments).forEach(function(number) {
		bitmask = bitmask | (1 << number);
	});
	return bitmask;
}

// Define global bitmask
bit.define = function(name, number) {
	!(function() {
		this[name] = 1 << number;
	})(name, number);
}

// Join masks to one
bit.join = function() {
	var result = 0;
	Array.prototype.slice.apply(arguments).forEach(function(mask) {

		result = result | (mask instanceof Array ? bit.join.apply(bit, mask) : mask);
	});
	return result;
}

// Make global
bit.globalize = function() {
	if (!('bit' in Function.prototype))
	Object.defineProperty(Function.prototype, 'bit', {
		enumerable: true,
		configurable: false,
		get: function() {
			if ("object"!==typeof this.__bit__) 
			Object.defineProperty(this, '__bit__', {
				enumerable: false,
				writable: false,
				editable: false,
				value: new bit(0, this)
			});

			return this.__bit__;
		}
	});
	return true;
}

var inc = function(bits) {
	if (arguments.length>1) return this.inc.call(this, Array.prototype.splice.apply(arguments));
	this.value = this.value | (bits instanceof Array ? bit.join(bits) : bits);
	return this._;
};

var exc = function(bits) {
	if (arguments.length>1) return this.exc.call(this, Array.prototype.splice.apply(arguments));
	this.value = this.value ^ (bits instanceof Array ? bit.join(bits) : bits);
	return this._;
};

/*
Test for bitmask present in current. 
*/
var test = function(bits) {
	if (arguments.length===1) {
		if (bits instanceof Array) {
			return this.test.apply(this, bits);
		} else {
			return !!(this.value & bits);
		}
	} else if (arguments.length>1) {
		var result = true, self = this;
		Array.prototype.slice.apply(arguments).forEach(function(mask) {
			if (!(self.value & (mask instanceof Array ? bit.join(mask) : mask))) result = false;
		});
		return result;
	} else {
		return false;
	}
};

var havent = function() {
	return !this.test.apply(this, arguments);
};

bit.prototype = {
	construct: bit,
	// Override to new bitmask
	set: function(mask) {
		if (arguments.length>1) this.set.call(this, Array.prototype.splice.apply(arguments));
		this.value = mask instanceof Array ? bit.join(mask) : mask;
		return this._;
	},
	// Include bitmask
	inc: inc,
	add: inc,
	// Exclude bitmask
	exc: exc,
	exclude: exc,
	remove: exc,
	// Check entry
	test: test,
	have: test,
	// Check failure
	havent: havent,
	without: havent,
	// Check value exclude bits
	is: function(bits) {
		if (arguments.length>1) return this.is.call(this, Array.prototype.splice.apply(arguments));
		return this.value === (bits instanceof Array ? bit.join(bits) : bits);
	},
	// Сheck the full entry mask is false
	not: function(bits) {
		if (arguments.length>1) return this.is.call(this, Array.prototype.splice.apply(arguments));
		return this.value !== (bits instanceof Array ? bit.join(bits) : bits);
	},
	// Inverse current value
	inverse: function() {
		this.value = ~this.value;
		return this._;
	},
	reset: function() {
		this.value = 0;
		return this._;
	}
}





module.exports = bit;