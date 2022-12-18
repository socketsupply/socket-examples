import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import * as io from '@socketsupply/io'

window.addEventListener('process-open', async ({ detail }) => {
  console.log('process-open', detail)
})

window.addEventListener('process-error', async ({ detail }) => {
  console.log('process-error', detail)
})

// TODO window.parent not working
window.parent.setTitle('React app')

io.ipc.send('process.open')


const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
