# ssc example
A minimal example of an app made with `ssc`. This creates a native application binary from source code written in HTML, CSS, and Javascript. This example shows in memory state, and also updates a local file. If you look at the filesystem, in `/tmp/ssc-test` there is a file with content equal to the count in the app.

__Featuring__
* some state is persisted to the filesystem via the [io module](https://github.com/socketsupply/io)
* no 'backend' -- everything happens in a single process. We are able to factor things this way because we `import` the `io` module into our 'frontend' code, so there's no need to think about IPC

## build
Building this app happens in two discrete steps. First we create a single page app by bundling some code with `esbuild`. This is like building a standard browser JS app.

Then we call `ssc build .`. This creates a desktop-specific binary file from the single page JS app we just built. You can run this app without a browser.

This is defined in the `package.json` script `start`:
```js
{
  "scripts": {
    "start": "npm run build && ssc build -r .",
    "build": "mkdir -p public && cp src/index.html public && cp src/style.css public && npm run build-js",
    "build-js": "mkdir -p ./public && esbuild src/index.js --bundle --outfile=public/bundle.js"
  },
}
```
