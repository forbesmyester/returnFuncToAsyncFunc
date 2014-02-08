returnFuncToAsyncFunc
=====================

Sometimes you have a function, that you're planning to use within something like `async.waterfall` but it's wrote to be synchronous and returns a value instead of using a callback. This function will accept that function, along with a context and return an asynchronous version of that function
