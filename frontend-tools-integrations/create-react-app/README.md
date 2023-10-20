# Getting Started with Create React App and Socket Runtime

This tutorial will show you how to use [Socket Runtime](https://github.com/socketsupply/socket)
with [Create React App](https://create-react-app.dev) or update your existing CRA project to use Socket Runtime.

Note: you also can use [Create Socket App](https://github.com/socketsupply/create-socket-app) to create a new
React (or Svelte, Tonic, Vue, etc.) project with Socket Runtime already installed.

First, create a new project with Create React App:

```bash
npx create-react-app create-react-app
```

This will create a new project in the `create-react-app` directory.

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
; The name of the program and executable to be output. Can't contain spaces or special characters. Required field.
name = "create-react-app-example"

; A directory is where your application's code is located.
copy = "build"

; The binary output path. It's recommended to add this path to .gitignore.
output = "dist"

; The build script
script = npm run build
```

Now either create the `.env` file and set the `PUBLIC_URL` environment variable to `./`:

```env
PUBLIC_URL=./
```

...or add the `homepage` field in the `package.json` file:

```json
  "homepage": "./",
```

The build script will be executed when you run `ssc build` command. It will build your React application
with npm script `build` and set `PUBLIC_URL` environment variable to `./` to make sure that all assets
are loaded correctly (see [Create React App Advanced Configuration](https://create-react-app.dev/docs/advanced-configuration/)). Resulting React application will be copied to the `build` directory.

The `ssc build` command will build your React application and create a new executable file in the `dist` directory.

Try to run the executable file:

```bash
ssc run # only run the build application
# or
ssc build -r # build and run the application
# see `ssc --help` for more options
```

Note for Windows users: you should run these commands in the Windows Terminal or in the PowerShell.

Congratulations! You have successfully created a new Socket Runtime project with Create React App!
