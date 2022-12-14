// @ts-check
'use strict'
import testContext from '@socketsupply/ssc-test/test-context'
import { dom } from '@socketsupply/test-dom'
import tapzero from 'tapzero'
const { test } = tapzero

testContext(tapzero)

test('example', async t => {
    t.ok('example')

    const hello = await dom.waitForText({
        element: document.body,
        regex: /hello, world/
    })

    t.ok(dom.isElementVisible(hello), 'should find the hello world text')
})
