import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

window.addEventListener('process-open', async ({ detail }) => {
  console.log('process-open', detail)
})

window.addEventListener('process-error', async ({ detail }) => {
  console.log('process-error', detail)
})

window.parent.setTitle('React app')

window._ipc.send('process.open')


const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
