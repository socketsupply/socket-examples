# op for iOS

## Prerequisites

You will need [Xcode](https://developer.apple.com/xcode/resources/) installed.

# Build instructions

1. Clone the repo.
```bash
git clone git@github.com:socketsupply/op-examples.git
```
2. Open the React desktop example directory.
```bash
cd tonic-ios
```
3. Install npm modules.
```bash
npm i
```
or
```bash
yarn
```
4. Install the Operator Framewort following with `brew`, `apt-get` or `nuget` (we'll publish it soon).

5. Run the application with `npm start` or `yarn start`

## Development

## Debugging

You can run [`lldb`][1] and attach to a process, for example...

```bash
process attach --name TestExample-dev
```

### Logging

To see logs, open `Console.app` (installed on MacOS by default) and in the
right side panel pick <YourSimulatorDeviceName>. You can filter by `op`
to see the logs that your app outputs.

### [More examples](../README.md)
