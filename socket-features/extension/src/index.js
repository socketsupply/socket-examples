import extension from 'socket:extension'

const ext = await extension.load('socket-extension-terminal')

const input = document.querySelector('#input-section')
const code = document.querySelector('#code-section')

const history = []
let historyIndex = 0

input.focus()
input.addEventListener('keydown', async (e) => {
  if (e.key === 'ArrowUp' && history.length > 0) {
    input.value = history[historyIndex]
    historyIndex = Math.min(historyIndex + 1, history.length - 1)
    e.stopPropagation()
    e.preventDefault()
    return
  }
  if (e.key === 'ArrowDown' && history.length > 0) {
    input.value = history[historyIndex]
    historyIndex = Math.max(historyIndex - 1, 0)
    e.stopPropagation()
    e.preventDefault()
    return
  }

  if (e.key !== 'Enter') {
    e.stopPropagation()
    return
  }
  code.textContent += '$ ' + input.value + '\n'
  history.unshift(input.value)
  historyIndex = 0
  await ext.binding.process.spawn({ command: input.value })
  input.value = ''
})

window.addEventListener('data', e => {
  code.textContent += e.detail.data.toString() + '\n'
})
