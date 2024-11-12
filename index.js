const mc = require('minecraft-protocol');

const bot = mc.createClient({
  host: 'azurite.magmanode.com', // Endereço do servidor
  port: 30578,                  // Porta do servidor Java (padrão é 25565)
  username: 'Entidade 303'         // Nome de usuário do bot
});

bot.on('login', () => {
  console.log('Bot conectado ao servidor!');
});

bot.on('chat', (packet) => {
  const message = JSON.parse(packet.message);
  console.log(`Chat: ${message.extra ? message.extra[0].text : message.text}`);
  
  // Responde "Pong!" ao comando "!ping" no chat
  if (message.extra && message.extra[0].text === '!ping') {
    bot.write('chat', { message: 'Pong!' });
  }
});

bot.on('end', () => {
  console.log('Bot desconectado do servidor');
});

bot.on('error', (err) => {
  console.error('Erro no bot:', err);
});
