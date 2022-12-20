// @ts-check
'use strict'

import { dom } from '@socketsupply/test-dom'
import { test, GLOBAL_TEST_RUNNER } from 'tapzero'
import '@socketsupply/io/redirectOutput.js'

const pollTimeout = setTimeout(function poll () {
  if (GLOBAL_TEST_RUNNER.completed) {
    clearTimeout(pollTimeout)
    window.__ipc.postMessage('ipc://exit?value=0')
  }

  setTimeout(poll, 500)
}, 500)

test('example', async t => {
    t.ok('example')

    const hello = await dom.waitForText({
        element: document.body,
        regex: /hello, world/
    })

    t.ok(dom.isElementVisible(hello), 'should find the hello world text')
})
