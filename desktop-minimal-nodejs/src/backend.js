import system from '@socketsupply/ssc-node';

setInterval(() => {
  system.send({
    window: 0,
    event: 'hello',
    value: 'hello',
  });
}, 1000);