import app from 'socket:application'
import process from 'socket:process'

init()

async function init() {
  let itemsMac = ''

  if (process.platform === 'darwin') {
    itemsMac = `
      Hide: h + CommandOrControl
      Hide Others: h + Control + Meta
      ---
    `
  }

  const menu = `
    Relay:
      About Relay Chat: _
      Settings...: , + CommandOrControl
      ---
      ${itemsMac}
      Quit: q + CommandOrControl
    ;

    Edit:
      Cut: x + CommandOrControl
      Copy: c + CommandOrControl
      Paste: v + CommandOrControl
      Delete: _
      Select All: a + CommandOrControl
    ;

    Channels:
      Create new channel: _
      Delete current channel: _
    ;

    View:
      Toggle Panel: k + CommandOrControl
    ;

    Upload:
      Attachment...: _
    ;
  `


  await app.setSystemMenu({ index: 0, value: menu })

  window.addEventListener('menuItemSelected', async e => {
    const id = `${e.detail.parent}:${e.detail.title}`
    this.receiveMenuItem(id)
  })
}

function receiveMenuItem (id) {
    switch (id) {
      case 'View:Toggle Panel': {
        const coSplit = document.querySelector('#split-main')
        if (!coSplit) return

        coSplit.toggle('left')
        break
      }

      case 'Relay:Quit': {
        app.exit()
        break
      }
    }
  }
