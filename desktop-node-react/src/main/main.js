import system from '@socketsupply/ssc-node';

async function main () {
  const screen = await system.getScreenSize();

  await system.setSize({
    window: 0,
    height: Math.min(900, screen.height * 0.80),
    width: Math.min(1440, screen.width * 0.80),
  });

  await system.setTitle({
    window: 0,
    value: 'React App',
  });

  let counter = 0;

  function increaseCounterAndSendMessage(type) {
    counter += 1;
    system.send({
      window: 0,
      event: 'counter increase',
      value: { counter,type },
    });
    return counter;
  }

  system.receive = async (command, value) => {
    if (command === 'send' && value === 'increase counter') {
      return increaseCounterAndSendMessage('click');
    }
  };

  setInterval(() => {
    increaseCounterAndSendMessage('timer');
  }, 5000);
}

main()
