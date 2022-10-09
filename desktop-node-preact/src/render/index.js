// @ts-check
'use strict'

import { render } from 'preact'
import { html } from 'htm/preact'
import { useState, useEffect } from 'preact/hooks'

function Demonstration () {
    const [mode, setMode] = useState(null)

    // component did mount
    // read the last state from disk
    useEffect(() => {
        // @ts-ignore
        window.system.send({ method: 'initState' })
            .then(res => {
                setMode(res.mode)
            })
            .catch(err => console.log('errr', err))
    }, [])

    // this shows how to do IPC API calls
    async function handleClick (ev) {
        ev.preventDefault()
        // @ts-ignore
        const res = await window.system.send({ mode })
        const { mode: newMode } = res
        setMode(newMode)
    }

    return html`<div class="demo">
        <h1>hello, world</h1>
        <p>${mode}</p>
        <button onclick=${handleClick}>button</button>
    </div>`
}

const testArg = process.argv.find(arg => arg.includes('--test='))
if (testArg) {
    const testFile = testArg.replace('--test=', '')
    if (!testFile) throw new Error('missing test file')

    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', testFile)
    document.body.appendChild(script)
}

render(html`<${Demonstration} />`, document.body)
