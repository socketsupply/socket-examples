const Tonic = require('@socketsupply/tonic')
class AppContainer extends Tonic {
  render () {
    return this.html`
      <img src="images/nav-logo.svg">
      <h3>Read more about Operator Framework for iOS at https://operatorframework.dev/ios</h3>
    `
  }
}

window.onload = async () => {
  // init the main component
  Tonic.add(AppContainer)
}

