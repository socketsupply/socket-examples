import socket from '@socketsupply/socket-node'

socket.on('ping', async (value) => {
  await socket.send({
    window: 0,
    event: 'pong'
  })
})
