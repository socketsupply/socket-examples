#!/usr/bin/env node

import path from 'path';
import fs from 'fs/promises';
import esbuild from 'esbuild';

const cp = async (a, b) => fs.cp(
  path.resolve(a),
  path.join(b, path.basename(a)),
  { recursive: true, force: true },
);

const target = path.resolve(process.argv[2])

Promise.all([
  cp('src/index.html', target),
  esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    keepNames: true,
    // minify: true,
    outfile: path.join(target, 'index.js'),
    platform: 'browser'
  })
]);
