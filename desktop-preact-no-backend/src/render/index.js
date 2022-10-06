// @ts-check
'use strict'

import { render } from 'preact';
import { html } from 'htm/preact';

window.resizeTo(
    Math.min(1440, window.screen.width * 0.80),
    Math.min(900, window.screen.height * 0.80)
)

window.parent.setTitle('Data')

function demonstration () {
    return html`<div class="demo">
        <h1>hello, world</h1>
        <a href="/hello">hello</a>
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

render(html`<${demonstration} />`, document.body)
