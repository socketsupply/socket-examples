# A Socket Runtime desktop example with Node.js backend embedded

This app uses [socket-node](https://github.com/socketsupply/socket-node) as a backend.

# Build instructions

1. Clone the repo.
```bash
git clone git@github.com:socketsupply/socket-examples.git
```
2. Open the Node backend example directory.
```bash
cd by-feature/node-backend-bundled
```
3. Install dependencies using `npm`, `pnpm`, or `yarn`.
```bash
npm i
```
4. Download and install Node.js for your platform. (TODO: only works on macOS at the moment)
```bash
get-node.sh
```
5. Install the Socket SDK compiler following instructions [here](https://socketsupply.co/docs).
6. Build and run the application with either `ssc build -r`, `npm start`, `pnpm start`, or `yarn start`.

To run the app you need to have [Node.js](https://nodejs.org/en/) installed and available in your path.
You can also bundle Node.js with your app. See [this example](../node-backend-bundled/).

### [More examples](../../README.md)
