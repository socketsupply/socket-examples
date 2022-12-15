// @ts-check
'use strict'

import Tonic from '@socketsupply/tonic'
import addTest from '@socketsupply/ssc-test'
import * as fs from '@socketsupply/io/fs.js'
import * as os from '@socketsupply/io/os.js'

class AppContainer extends Tonic {
    constructor() {
        super()
        this.id = 'root'
        this.state = { n: 0 }
    }

    static async create () {
        const container = new AppContainer()
        let n = 0
        try {
            n = parseInt(await container.read())
        } catch (err) {
            console.log('err reading', err)
        }
        
        container.state = { n }
        return container
    }

    async plus () {
        this.state.n += 1
        await this.write()
        this.reRender()
    }

    read () {
        const filename = os.tmpdir() + '/ssc-test.txt'
        return fs.promises.readFile(filename)
    }

    write () {
        const dir = os.tmpdir()
        const filename = dir + '/ssc-test.txt'
        return fs.promises.writeFile(filename, '' + this.state.n)
    }

    click (ev) {
        if (!ev.target.matches('.plus')) return
        this.plus()
    }

    render () {
        return this.html`
            <p>hello, world</p>
            <p>count: ${'' + this.state.n}</p>
            <div>
                <button class="plus">plus one</button>
            </div>
        `
    }
}

Tonic.add(AppContainer)

window.onload = async () => {
    const app = await AppContainer.create()
    document.body.appendChild(app)
    addTest()
}
