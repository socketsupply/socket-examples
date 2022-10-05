// @ts-check
'use strict'

const { system } = require('@socketsupply/ssc-node')
const path = require('path')

async function main () {
    const screen = await system.getScreenSize()

    await system.setSize({
        window: 0,
        height: Math.min(900, screen.height * 0.80),
        width: Math.min(1440, screen.width * 0.80)
    })

    await system.show({ window: 0 })

    await system.setTitle({
        window: 0,
        value: 'wooo'
    })

    const resourcesDirectory = path.dirname(process.argv[1])
    const file = path.join(resourcesDirectory, 'index.html')

    // a `file` URL to the index.html of our app
    await system.navigate({ window: 0, value: `file://${file}` })
}

main().then(null, err => {
    process.nextTick(() => { throw err })
})
