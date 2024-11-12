const bedrock = require('bedrock-protocol')

const bot = bedrock.createClient({
  host: 'azurite.magmanode.com',  // Endereço IP do servidor
  port: 30578,                   // Porta padrão do Minecraft Bedrock
  username: 'Entidade 303'          // Nome de usuário do bot
});

bot.on('join', () => {
  console.log('Bot entrou no servidor!');
});

bot.on('text', (packet) => {
  // Recebe mensagens de chat
  console.log(`Chat: ${packet.source_name}: ${packet.message}`);
  if (packet.message === '!ping') {
    bot.write('text', {
      type: 'chat',
      needs_translation: false,
      source_name: bot.options.username,
      xuid: '',
      platform_chat_id: '',
      message: 'Pong!'
    });
  }
});

bot.on('end', () => {
  console.log('Bot desconectado do servidor');
});

bot.on('error', (err) => {
  console.error('Erro no bot:', err);
});
