returnFuncToAsyncFunc
=====================

Sometimes you have a function, that you're planning to use within something like `async.waterfall` but it's wrote to be synchronous and returns a value instead of using a callback. This function will accept that function, along with a context and return an asynchronous version of that function

Example
-------

```javascript
var Ctx = function() {
    this.x = 123;
};

Ctx.prototype.doIt = function(a, b, c) {
    return { age: a, legs: b[2], name: c.name};
};

var ctx = new Ctx();

var f = returnFuncToAsyncFunc(
    ctx,
    function(a, b, c) {
        return ctx.doIt(a, b, c);
    }
);
f(99, [4,6,2], {name: 'matt'}, function(err, res) {
    console.log([
        "My name is " + res.name,
        "I have " + res.legs + " legs",
        "and am " + res.age + " years old"
    ].join(' '));
});
```
