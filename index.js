var bit = function() {
	this.value = 0;
}

bit.prototype = {
	construct: bit,
	// Override to new bitmask
	set: function(mask) {
		this.value = mask;
	},
	// Include bitmask
	inc: function(bits) {
		this.value = this.value | bits;
	},
	// Exclude bitmask
	exc: function(bits) {
		this.value = this.value ^ bits;
	},
	// Сheck the entry mask
	test: function(bits) {
		return !!(this.value & bits);
	},
	// Сheck the entry mask is false
	not: function(bits) {
		return !(this.value & bits)
	},
	// Inverse current value
	inverse: function() {
		this.value = ~this.value;
	},
	reset: function() {
		this.value = 0;
	}
}


Object.defineProperty(Function.prototype, 'bit', {
	enumerable: true,
	configurable: false,
	get: function() {
		if ("object"!==typeof this.__bit__) 
		Object.defineProperty(this, '__bit__', {
			enumerable: false,
			writable: false,
			editable: false,
			value: new bit();
		}

		return this.__bit__;
	}
});

Function.prototype.bit = function(bitmask) {
	if ("object"!==typeof this.__bit__) Object.defineProperty(this, '__bit__', {
		enumerable: false,
		writable: true,
		configurable: true,
		value: bitmask
	});
	this.__bit__ = bitmask;
}

Function.prototype.bit.is = function() { return false; }

Function.prototype.mask = function(bitmask) {
	if ("object"!==typeof this.__bit__) return false;
	return subject.__bit__
}

module.exports = bitmask;