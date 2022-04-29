// @ts-check
'use strict'


const { test } = require('tapzero')

const TestCommon = require('./test-common.js')

// const dom = require('../../../../src/render/test-dom')

test('app-container exists', async (t) => {
  const common = await TestCommon.create()
  try {
    const container = common.container
    t.ok(container)
    t.ok(document.body.contains(container))

    const butIncr = document.querySelector('[data-event="inc"]')
    const butDeploy = document.querySelector('[data-event="deploy"]')

    t.ok(butIncr)
    t.ok(butDeploy)
  } finally {
    await common.close()
  }
})
