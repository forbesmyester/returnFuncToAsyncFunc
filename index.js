(function (root, factory) { // UMD from https://github.com/umdjs/umd/blob/master/returnExports.js

	"use strict";

	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		root.manip = factory();
	}

}(this, function () {
	
// Author: Matthew Forrester <matt_at_keyboardwritescode.com>
// Copyright: Matthew Forrester
// License: MIT/BSD-style

"use strict";

/**
 * # returnFuncToAsyncFunc()
 * 
 * Sometimes you have a function, that you're planning to use within something
 * like [async.waterfall](https://github.com/caolan/async#waterfall) but it's
 * wrote to be synchronous and returns a value instead of using a callback. This
 * function will accept that function, along with a context and return an 
 * asynchronous version of that function.
 * 
 * ## Parameters
 * 
 * * **@param {?} `ctx`** The context to run the function under.
 * * **@param {Function} `func`** The function to make asynchronous.
 * * **@return {Function}** Asynchronous version of `func`.
 */
return function(ctx, func) {
	return function(/* args, next */ ) {
		var args = Array.prototype.slice.call(arguments, 0),
			next = args.pop();
		next(null, func.apply(ctx, args));
	};
};

}));
