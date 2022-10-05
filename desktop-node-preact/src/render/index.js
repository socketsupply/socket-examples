// @ts-check
'use strict'

import { render } from 'preact';
import { html } from 'htm/preact';

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
