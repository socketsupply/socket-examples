# ssc hello

A minimal example of an application made with `ssc`.

## develop

Compile and run:
```
ssc compile -r .
```

Compile and run, but just re-bundle the JS, not full re-compile:
```
ssc compile -r -o .
```

## hello world

### 1. setup ssc
We need the `ssc` command installed on our machine, and we need a few config files.

* install `ssc` via the [website](https://sockets.sh/)

* add some config files that tell `ssc` how to build your application. We need `./ssc.config`, and a `package.json`. You can type `ssc init`.

In `package.json`, we have a 'start' script that depends on `ssc`:
```js
{
    "start": "ssc compile -r .",
}
```

### 2. main process and render process
In `build.js`, you will see that we create two files -- one from `src/main/index.js` and one from `src/render/index.js`. The `main` process is the entry point to the application. It is responsible for creating and managing any visual windows.

The render script is equivalent to "client side" JS in a traditional web app. It is run in a browser environment. In this case the browser is your app though, not a normal browser.

We are using `preact` in this example, but **note** that there is not as much of a difference between react and preact here. The smaller file size of preact is not as important since we are making an application binary, not a website.

The `main` JS source code points to our `index.html` file with a `file://` URL:
```js
// a `file` URL to the index.html of our app
const file = path.join(resourcesDirectory, 'index.html')
await system.navigate({ window: 0, value: `file://${file}` })
```

And our `index.html` file has a link to the "client side" JS --

```html
<script src="./bundle.js"></script>
```

Our `build.js` script builds the render file to a location matching the path in the script tag:
```js
  await esbuild.build({
    entryPoints: ['src/render/index.js'],
    bundle: true,
    keepNames: true,
    // minify: true,
    outfile: path.join(target, 'bundle.js'),
    platform: 'browser'
  })
```

`target` above ^ is passed to our build script by `ssc compile .`:
```js
const target = process.argv[2] ? path.resolve(process.argv[2]) : null
```

### 3. the binary
You can call the newly built program by calling the path location produced by the `ssc compile .` command:
```
$ ./dist/mac/ssc-test-dev.app/Contents/MacOS/ssc-hello-dev
```

or compile and run in one step with a command like `ssc compile -r .` (configured here as `npm start`)


## tests
```
npm test -- --test=test.js .
```

### compile tests
The `ssc compile` command takes an argument `--test`. If you pass `--test`, then the app will be compiled with tests, which are defined in `./build.js`

This will build all the test files located in the test directory, here `./test/`. That way we can compile the application, then you can run any of the tests without needing to re-compile. Also, test filenames should not conflict with the application code filenames.

```js
const isTest = process.argv.some(str => str.includes('--test'))
if (isTest) {
  glob('test/*.js', async (err, files) => {
```

### run in test environment
To run a given test, you can pass it's filename to the compiled binary app, or use the flag `-r` in the `ssc compile` command. The application binary looks for an option `--test=filename.js`. Here this is a part of `npm` scripts:

```js
"scripts": {
  "test": "ssc compile -r --test"
},
```

To run the test file we created in `test/test.js`, you would call it like this:
```
npm test -- --test=test.js .
```

Running a test is defined as part of our application's code. If you pass an argument `--test=test.js`, then our app's render process will get that argument, and we append a `script` tag for the given test:

```js
const testArg = process.argv.find(arg => arg.includes('--test='))
if (testArg) {
    const testFile = testArg.replace('--test=', '')
    if (testArg && !testFile) throw new Error('missing test file')
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', testFile)
    document.body.appendChild(script)
}
```
