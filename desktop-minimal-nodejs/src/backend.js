import system from '@socketsupply/ssc-node';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

for (let n = 0; true; n += 1) {
  system.send({
    window: 0,
    event: 'hello',
    value: `Hello, World! №${n}`,
  });
  await delay(1000);
}
