#!/bin/bash
#
# This script provides a copy of node from nodejs.org and verifies its
# integrity against known hashes.
# The hashes are checked in, but the desired version changes, this script will
# obtain the new one and verify its signature.
# This script will do nothing if the archive of node has already been
# downloaded and extracted.

set -ueo  pipefail
DIR=$(dirname -- "${BASH_SOURCE[0]}")
cd -- "$DIR"

VERSION=v18.12.1

SHASUMS=node-$VERSION-sha256sums.txt.asc
if [ ! -f "$SHASUMS" ]; then

  if ! curl -f "https://nodejs.org/dist/$VERSION/SHASUMS256.txt.asc" > "$SHASUMS"; then
    cat "$SHASUMS" >&2
    rm "$SHASUMS"
    exit 1
  fi
  if ! gpg --verify "$SHASUMS"; then
    echo "Signature check for new Node version failed."
    echo "You may need to get the GPG keys for Node.js releasers."
    echo "https://github.com/nodejs/node#verifying-binaries"
    exit 1
  fi
fi

for ARCH in darwin-x64; do

  UNPACKED=node-$VERSION-$ARCH
  if [ ! -d "$UNPACKED" ]; then

    ARCHIVE=node-$VERSION-$ARCH.tar.gz
    if [ ! -f "$ARCHIVE" ]; then
      curl "https://nodejs.org/dist/$VERSION/$ARCHIVE" > "$ARCHIVE"
    fi
    if ! grep -F "$(sha256sum "$ARCHIVE")" "$SHASUMS" > /dev/null; then
      echo "Hash integrity check failed for: $ARCHIVE"
      echo "Expected:"
      grep -F "$ARCHIVE" "$SHASUMS"
      echo "Actual:"
      sha256sum "$ARCHIVE"
      exit 1
    fi

    tar xf "$ARCHIVE"
  fi

done

cp -- "$UNPACKED/bin/node" src/node
# if [ ! -L "npm" ]; then
#   ln -s -- "$UNPACKED/bin/npm"
# fi
