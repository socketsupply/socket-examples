// @ts-check
'use strict'

const { system } = require('@socketsupply/ssc-node')
const path = require('path')
const fs = require('node:fs/promises')
const untildify = require('untildify');

const fns = {
    beeper: async (val) => {
        const { mode } = val
        let newMode = 'beep'
        if (mode === 'beep') newMode = 'boop'
        if (mode === 'boop') newMode = 'blorp'
        if (mode === 'blorp') newMode = 'beep'

        await fs.writeFile(untildify('~/ssc-beep-data.txt'), newMode)

        return newMode
    },

    getLastState: async function () {
        const content = await fs.readFile(
            untildify('~/ssc-beep-data.txt'),
            'utf8'
        )
        return content
    }
}

async function main () {
    //
    // implement a function `system.receive` to expose node APIs to the
    // "front-end" app
    //
    // @ts-ignore
    system.receive = async (command, value) => {
        // command = 'send'
        // value is passed by caller
        if (command !== 'send') {
            return console.log('unexpected command', command)
        }

        if (value && value.restart) {
          await system.restart()
        }

        // read data from disk
        if (value.method && value.method === 'initState') {
            const last = await fns.getLastState()
            return { mode: last }
        }

        //
        // the only other option is to cycle the beeper, so if we haven't
        // returned by now, then we call `beeper`
        // In a real application, you would probably want a more robust
        // protocol for RPC
        //

        // write the data to disk, and get the next state
        const newMode = await fns.beeper(value)

        // in a real application, we would need a way to throw an error
        //   you can use a convention, like always return { data, err } as
        //   the response from this function
        return { received: value, mode: newMode }
    }
}

main().then(null, err => {
    process.nextTick(() => { throw err })
})
