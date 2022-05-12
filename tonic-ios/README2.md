# op for iOS

To develop for `iOS` you need a macbook.

Before you can use `op` with `ios` you have to compile the `op`
cli with ios enabled

```
cd ~/projects/operatorframework
./bin/bootstrap.sh dev ios
```

## Start (in Simulator)

```sh
op . -ios -simulator -r
```

Running this command can prompt for sudo because xcode needs to install software like build tools & ios Simulator.

## Troubleshooting

### `aclocal / automake: command not found`

To build `op` for ios you need `automake` / `libtool` installed.

```sh
brew install automake
brew install libtool
```

### `xcrun: error: SDK "iphoneos" cannot be located`

You have to configure the xcode command line tools, to do this
you can run the following command

```
sudo xcode-select --switch /Applications/Xcode.app
```

### `fatal error: 'lib/uv/include/uv.h' file not found`

Make sure your local `op` binary has been compiled with `ios`
parameter in `./bin/bootstrap.sh dev ios`, otherwise the uv.h
does not exist.

### `unable to find utility simctl`

You need to have [XCode](https://developer.apple.com/xcode/resources/) installed on your macbook.

### `You have not agreed to the Xcode license agreements, please run 'sudo xcodebuild -license' from within a Terminal window to review and agree to the Xcode license agreements.`

You can run `sudo xcodebuild -license` to agree to the license.
