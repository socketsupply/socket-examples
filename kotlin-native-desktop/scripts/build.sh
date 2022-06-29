#!/bin/bash

declare output="$1"

function build () {
  kotlinc-js -output "$output/index.js" -libraries "node_modules/kotlin" src/index.kt
  kotlinc-native -output "$output/main" src/main.kt
}

function copyFiles () {
  cp src/index.html "$output" || return $?
  cp -rf node_modules/kotlin "$output" || return $?
}

function main () {
  copyFiles || return $?
  build || return $?
  return 0
}

main "$@"
