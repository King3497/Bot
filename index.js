const mc = require('minecraft-protocol');
const express = require('express');
const path = require('path');

// Configuração do bot Minecraft
const bot = mc.createClient({
  host: '162.55.199.41', // Endereço do servidor
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

// Configuração do servidor web
const app = express();
const PORT = 3000; // Defina a porta desejada

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal que serve o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor web
app.listen(PORT, () => {
  console.log(`Servidor web iniciado em http://localhost:${PORT}`);
});
