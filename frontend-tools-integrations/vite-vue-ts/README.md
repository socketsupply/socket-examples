# Getting Started with Vite and Socket Runtime

This tutorial will show you how to use [Socket Runtime](https://github.com/socketsupply/socket)
with [Vite](https://vitejs.dev) or update your existing Vite project to use Socket Runtime.

Note: you also can use [Create Socket App](https://github.com/socketsupply/create-socket-app) to create a new
Vue (or React, Svelte, Tonic, etc.) project with Socket Runtime already installed.

First, create a new project with Create React App:

```bash
npx create-vite-app vite-vue-ts --template vue-ts
```

This will create a new project in the `vite-vue-ts` directory.

Install Socket Runtime from npm:

```bash
npm install -S @socketsupply/socket
```

...or build it from source following instructions on the Socket Supply Co. [website](https://socketsupply.co).

Now you should have `ssc` command available in your terminal. Run the `ssc init --config` command to create a new Socket Runtime configuration file:

```bash
ssc init --config
```

This will create a new `socket.ini` file in the root of your project. Open it and edit following lines under
the `[build]` section:

```ini
; ssc will copy everything in this directory to the build output directory.
; This is useful when you want to avoid bundling or want to use tools like
; vite, webpack, rollup, etc. to build your project and then copy output to
; the Socket bundle resources directory.
copy = "dist"

; The name of the program and executable to be output. Can't contain spaces or special characters. Required field.
name = "create-react-app-example"

; The name of the program and executable to be output. Can't contain spaces or special characters. Required field.
name = "vite-vue-ts"

; The binary output path. It's recommended to add this path to .gitignore.
output = "build"

; The build script
script = "npm run build"
```

You also need to change the `build` script in the `package.json` file:

```json
{
  "scripts": {
    "build": "vue-tsc && vite build --base=./ .",
  }
}
```

The `--base=./` option will make sure that all assets are loaded correctly. Resulting Vue application will be copied to the `dist` directory.

The `ssc build` command will build your Vue TypeScript application and create a new executable file in the `build` directory.

Try to run the executable file:

```bash
ssc run # only run the build application
# or
ssc build -r # build and run the application
# see `ssc --help` for more options
```

Congratulations! You have successfully created a new Socket Runtime project with Create React App!

