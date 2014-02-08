/*jshint smarttabs:true */
(function (root, factory) {

	"use strict";

	if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory(
			require('expect.js'),
			require('../index.js')
		);
	} else if (typeof define === 'function' && define.amd) {
		return define(['../index.js'], factory.bind(this, expect));
	} else {
		// Browser globals (root is window)
		root.returnExports = factory(expect, root.returnFuncToAsyncFunc);
	}
}(this, function (expect, returnFuncToAsyncFunc) {

"use strict";

describe('returnFuncToAsyncFunc',function() {
	
	it('can work with no args and context', function() {
		
		var Ctx = function() {
			this.x = 123;
		};
		
		var ctx = new Ctx();
		
		var f = returnFuncToAsyncFunc(
			ctx,
			function() {
				expect(this).to.equal(ctx);
				return 'a';
			}
		);
		f(function(err, res) {
			expect(err).to.equal(null);
			expect(res).to.equal('a');
		});
		
	});
	
	it('can work with args', function() {
		
		var f = returnFuncToAsyncFunc(
			undefined,
			function(a, b, c) {
				expect(a).to.equal(99);
				expect(b).to.eql([4,6,2]);
				expect(c).to.eql({name: 'matt'});
				return { age: a, legs: b[2], name: c.name};
			}
		);
		f(99, [4,6,2], {name: 'matt'}, function(err, res) {
			expect(err).to.equal(null);
			expect(res).to.eql({ age: 99, legs: 2, name: 'matt'});
		});
		
	});
	
	it('can do it all together', function() {
		
		var Ctx = function() {
			this.x = 123;
		};
		
		Ctx.prototype.doIt = function(a, b, c) {
			expect(a).to.equal(99);
			expect(b).to.eql([4,6,2]);
			expect(c).to.eql({name: 'matt'});
			return { age: a, legs: b[2], name: c.name};
		};
		
		var ctx = new Ctx();
		
		var f = returnFuncToAsyncFunc(
			ctx,
			function(a, b, c) {
				expect(this).to.equal(ctx);
				return ctx.doIt(a, b, c);
			}
		);
		f(99, [4,6,2], {name: 'matt'}, function(err, res) {
			expect(err).to.equal(null);
			expect(res).to.eql({ age: 99, legs: 2, name: 'matt'});
		});
		
	});
	
});

}));