// @ts-check
'use strict'

const system = window.system

monkeyPatchConsole()

class TestCommon {
  static async create () {
    const c = new TestCommon()
    await c.bootstrap()
    return c
  }

  constructor () {
    this.container = null
  }

  async bootstrap () {
    const Tonic = Reflect.get(window, 'TEST_Tonic')

    /**
     * Since we are setting up a new component we want to
     * reset the global state cached in Tonic
     */
    for (const key of Object.keys(Tonic._states)) {
      delete Tonic._states[key]
    }

    /**
     * @type {new () => import('@socketsupply/tonic')}
     */
    const AppContainer = Reflect.get(window, 'TEST_AppContainer')

    this.container = new AppContainer()
    this.container.id = 'app-container'

    document.body.appendChild(this.container)

    /**
     * Wait for an async render() to hopefully complete.
     */
    await sleep(1)
  }

  close () {
    if (this.container && document.body.contains(this.container)) {
      document.body.removeChild(this.container)
    }

    this.container = null
  }
}
module.exports = TestCommon

async function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function monkeyPatchConsole () {
  const oldLog = console.log
  console.log = hookLog

  let counter = 1
  window.addEventListener('error', handleWindowError)
  window.addEventListener('unhandledrejection', handleWindowUnhandled)

  /**
   * @param {ErrorEvent} event
   */
  function handleWindowError (event) {
    const err = {
      counter: counter++,
      message: (event.error || event).message,
      stack: (event.error || event).stack
    }

    system.send({
      api: 'ssc-node',
      method: 'testUncaught',
      arguments: [{
        err: err,
        type: 'error'
      }]
    })
  }

  /**
   * @param {PromiseRejectionEvent} event
   */
  function handleWindowUnhandled (event) {
    const err = {
      counter: counter++,
      message: event.reason.message || event.reason,
      stack: event.reason.stack
    }

    system.send({
      api: 'ssc-node',
      method: 'testUncaught',
      arguments: [{
        err: err,
        type: 'unhandledrejection'
      }]
    })
  }

  /**
   * @param  {...any} args
   */
  function hookLog (...args) {
    oldLog.apply(console, args)
    system.send({
      api: 'ssc-node',
      method: 'testConsole',
      arguments: [{
        args: JSON.stringify(args)
      }]
    })
  }
}
