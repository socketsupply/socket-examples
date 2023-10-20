# Getting Started with Next.js and Socket Runtime

This tutorial will show you how to use [Socket Runtime](https://github.com/socketsupply/socket)
with [Next.js](https://nextjs.org) or update your existing Next project to use Socket Runtime.

**Note:** This example requires un-released Socket Runtime features that will be available in the next release.

## Set up Next.js

First, create a new project with Create Next App:

```bash
npx create-next-app@latest
```

This will create a new project in the directory you choose.

Configure Next to build into a pure static mode:

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export' // This tells next to only build static assets
}

module.exports = nextConfig

```

## Set up Socket Runtime

Install Socket Runtime from npm:

```bash
npm install -S @socketsupply/socket
```

...or build it from source following instractions on the Socket Supply Co. [website](https://socketsupply.co).

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
copy = "out"

; The name of the program and executable to be output. Can't contain spaces or special characters. Required field.
name = "next-socket-app"

; The binary output path. It's recommended to add this path to .gitignore.
output = "build"
```

## Configure dev and build scripts.

Set up the build and watch scripts in package.json.

```json
{
  "name": "next-js",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "watch": "run-p watch:*",
    "watch:next": "next dev",
    "watch:ssc": "ssc build -r --port=3000 .",
    "build": "run-s build:*",
    "build:next": "next build",
    "build:ssc": "ssc build .",
    "start": "npm run watch",
    "test": "run-s test:*",
    "test:lint": "next lint"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "npm-run-all2": "^6.0.6",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest"
  }
}
```

The `run-s` and `run-p` commands in are provided by the `npm-run-all2` development helper and stands for "run series" and "run parallel". The "watch" script runs the socket runtime and the next development server in parallel. The `--port` flag in the `watch:ssc` script loads the next development server running on that port.

The `build` script runs a `next build` followed by a `ssc build .`. Next builds a static version of the app to the `out` directory, and then `ssc` copies those results into the built app bundle, in the `build` directory.

Try to run the executable file:

```bash
npm run watch # run the next development server loaded in ssc
npm run build # build a static next site, and create an app bundle in `build``
```

Congratulations! You have successfully created a new Socket Runtime project with Create Next App!

