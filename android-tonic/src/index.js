import Tonic from '@socketsupply/tonic'
import * as io from '@socketsupply/io'
import { readFile } from '@socketsupply/io/fs/index.js'

io.ipc.debug.enabled = false

window.io = io

class AppContainer extends Tonic {
  async click (e) {
    const anchor = Tonic.match(e.target, 'a')

    if (anchor) {
      window.system.openExternal(anchor.href)
      e.stopPropagation()
      return
    }
  }
  render () {
    return this.html`
      <img src="images/nav-logo.svg">
      <h3>Read more about Socket SDK for Android at <a href="https://socket-sdk.dev/Android">https://socket-sdk.dev/android</a></h3>
    `
  }
}

window.onload = async () => {
  // init the main component
  Tonic.add(AppContainer)
}

