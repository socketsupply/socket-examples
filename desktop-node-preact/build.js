const path = require('path')
const fs = require('fs/promises')
const esbuild = require('esbuild')
const glob = require('glob')

//
// build a main and render script
//

async function main () {
  await esbuild.build({
    entryPoints: ['src/render/index.js'],
    bundle: true,
    keepNames: true,
    // minify: true,
    outfile: path.join('./public/', 'bundle.js'),
    platform: 'browser'
  })

  await esbuild.build({
    entryPoints: ['src/main/index.js'],
    bundle: true,
    keepNames: true,
    // minify: true,
    format: 'cjs',
    outfile: path.join('./public/', 'main.js'),
    platform: 'node'
  })

  const debug = process.argv.includes('--debug')

  await cp('src/index.html', './public')

  const isTest = process.argv.some(str => str.includes('--test'))

  if (!isTest) return

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
        outfile: path.join('./public/', path.basename(file)),
        platform: 'browser'
      })
    }))
  })
}

main()

async function cp (a, b) {
  return fs.copyFile(
    path.resolve(a),
    path.join(b, path.basename(a))
  )
}
