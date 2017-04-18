# ThreadedFunction

The `ThreadedFunction` library is a simple wrapper around HTML5 web workers. Given a pure function, the library wraps the function and spawns a new `Worker` thread and executes the function. If the environment doesn't support `Worker`s, it falls back to executing on the main JS thread.

## Installation

Just install the package through `npm` or `yarn`:

`npm install --save threaded-function` or `yarn add threaded-function`

## Usage

To use the library, just create an instance of the class like this:

`const myThreadedFunction = new ThreadedFunction(originalFunction);`

And then to call your wrapped function, just run:

`myThreadedFunction.execute(param1, param2);`

On the `execute` call, `ThreadedFunction` will create a new `Worker` and run your provided pure function with the params you passed in. Super simple!
