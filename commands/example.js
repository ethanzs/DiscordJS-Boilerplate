/* 
        +--------------------------------------------------+
        |                    Example                       |
        +--------------------------------------------------+
*/
module.exports = {
  name: 'example',
  description: 'I am an example command!',
  async execute(message, args) {
    message.channel.send(`I am an example command!`);
  },
};