import system from '@socketsupply/ssc-node';

async function main () {
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
