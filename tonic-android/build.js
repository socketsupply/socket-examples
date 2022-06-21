#!/usr/bin/env node
//
// This example script will copy css and other files into the build directory.
// It will also watch for changes and copy them when they are made. As a bonus
// it adds static imports to the css compiler, just for fun.
//
const path = require('path')
const fs = require('fs/promises')

const Minifier = require('clean-css')
const esbuild = require('esbuild')

const minifier = new Minifier({ advanced: true })

const css = async (src, dest) => {
  let str = await fs.readFile(src, 'utf8')
  let RE = /@import ['"]([^'" ]+)['"];/g
  let reqs = []

  str.replace(RE, (_, p) => {
    reqs.push(css(path.resolve(path.dirname(src), p)))
  })

  const data = await Promise.all(reqs)
  str = str.replace(RE, () => data.shift())

  const min = minifier.minify(str)

  if (!dest) return min.styles
  return fs.writeFile(dest, min.styles)
}

const cp = async (a, b) => fs.cp(
  path.resolve(a),
  path.join(b, path.basename(a)),
  { recursive: true, force: true }
)

async function copy (target) {
  //
  // We want compile time @import so we can organize and
  // minify non-component styles.
  //
  await css(
    path.join('src', 'index.css'),
    path.join(target, 'bundle.css')
  )

  //
  // Copy the rest of the files that we care about.
  //
  await cp('src/index.html', target)
  await cp(`src/icons/icon.png`, target)
  await cp('src/images', target)
}

async function main () {
  const params = {
    entryPoints: ['src/index.js'],
    bundle: true,
    keepNames: true,
    format: 'cjs',
    // minify: true,
  }

  //
  // During development, this script will be started by npm and it
  // will be passed the target directory for the build artifacts.
  //
  // During a build, this script will be called by the `op` command.
  // In this case the target directory for the build artifacts will
  // be provided as the argument at index 2.
  //
  let target = process.argv.find(s => s.includes('--watch='))

  if (target) {
    target = path.resolve(target.split('=')[1])

    params.outfile = path.join(target, 'bundle.js')
    esbuild.serve({ servedir: target }, params)
  } else {
    target = path.resolve(process.argv[2])
    params.outfile = path.join(target, 'bundle.js')
    await esbuild.build(params)
  }

  if (!target) {
    console.log('Did not receive the build target path as an argument!')
    process.exit(1)
  }

  copy(target)
}

main()
