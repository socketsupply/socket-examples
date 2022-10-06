// @ts-check
'use strict'
const { test } = require('tapzero')
const dom = require('@socketsupply/test-dom')

test('find an element', async t => {
    const el = await dom.waitFor({
        selector: 'a'
    })

    t.ok(dom.isElementVisible(el), 'should find a visible link tag')
})
