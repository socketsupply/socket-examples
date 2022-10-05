const path = require('path')
const fs = require('fs/promises')
const esbuild = require('esbuild')
const glob = require('glob')

//
// The output target is passed by the build tool,
// it's where we want to write all of our files.
//
const target = process.argv[2] ? path.resolve(process.argv[2]) : null

if (!target) {
  console.log(' - Did not receive the build target path as an argument')
  process.exit(1)
}

async function main () {
  await esbuild.build({
    entryPoints: ['src/render/index.js'],
    bundle: true,
    keepNames: true,
    // minify: true,
    outfile: path.join(target, 'bundle.js'),
    platform: 'browser'
  })

  await esbuild.build({
    entryPoints: ['src/main/index.js'],
    bundle: true,
    keepNames: true,
    // minify: true,
    format: 'cjs',
    outfile: path.join(target, 'main.js'),
    platform: 'node'
  })

  const debug = process.argv.includes('--debug')

  const isTest = process.argv.some(str => str.includes('--test'))
  if (isTest) {
    glob('test/*.js', async (err, files) => {
      if (err) throw err

      await Promise.all(files.map(file => {
        return esbuild.build({
          entryPoints: [file],
          bundle: true,
          keepNames: true,
          minify: false,
          define: { global: 'window' },
          sourcemap: debug ? 'inline' : undefined,
          // outfile is (target dir + /filename.js)
          outfile: path.join(target, path.basename(file)),
          platform: 'browser'
        })
      }))
    })
  }

  await cp('src/index.html', target)
}

main()

async function cp (a, b) {
  return fs.copyFile(
    path.resolve(a),
    path.join(b, path.basename(a))
  )
}
