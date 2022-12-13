# desktop, node, preact
An example of how to use Node APIs from a browser environment. This app shows a button that will cycle through the strings `beep`, `boop`, `blorp`. The state will be written to disk at `~/ssc-beep-data.txt`.

You can look at the file while running this app, and see the text content change as you click the button.

## use
From this directory:
```
npm start
```

`npm start` will run two commands: `npm run build-js && ssc build -r .` 

Building the app happens in two discrete steps. First we build a standard browser app to the `public` directory. We are using `esbuild` to do this. Then `ssc.config` is configured with
```
input: public
output: dist
```

So the command `ssc build .` will the take the browser app in `public`, and build a desktop app to the `dist` folder.

### build

> **Note**
> there is no `build` script in `ssc.config`:

```
#
# Build Settings
#
input: public
output: dist
executable: ssc-hello
```

This means the command `ssc build .` will simply copy the files from the `input` directory to `output`. So in `package.json` we build a single page app to `public`, then `ssc build -r .` copies that app to the right folder in `dist`, where it can be run as a native application.

## structure
In `src/main/index.js`, we import `system` from `ssc-node`. We mutate `system` by writing a function to the `receive` key. This is where we call any node functions -- within the `system.receive` function in the main process. This will get any args passed to `system.send` from the browser side.

In the `main` file:

```js
system.receive = async (command, value) => {
  // read data from disk
  if (value.method && value.method === 'initState') {
      const last = await fns.getLastState()
      return { mode: last }
  }
```

Then on the "browser" side, we can call that function like this:
```js
const res = await window.system.send({ method: 'initState' })
```
