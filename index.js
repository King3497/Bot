const mineflayer = require('mineflayer');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Configurações do bot
const bot = mineflayer.createBot({
  host: '162.55.199.41', // IP do servidor Minecraft
  port: 34274,                  // Porta do servidor
  username: 'TV',        // Nome do bot
  version: '1.20',             // Versão do Minecraft (exemplo)
});

// Configurações do servidor web
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuração da pasta de arquivos estáticos (frontend)
app.use(express.static('public'));

// Evento para quando o bot estiver conectado
bot.on('login', () => {
  console.log('Bot conectado ao servidor Minecraft!');
});

// Conexão entre o bot e a interface web
io.on('connection', (socket) => {
  console.log('Cliente conectado à interface web!');

  // Envia uma mensagem do bot para o jogo
  socket.on('sendMessage', (msg) => {
    bot.chat(msg);
  });

  // Envia a posição do bot para o cliente
  setInterval(() => {
    socket.emit('botPosition', bot.entity.position);
  }, 1000);
});

// Inicializa o servidor web na porta 3000
server.listen(3000, () => {
  console.log('Servidor web iniciado na porta 3000');
});
