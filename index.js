const bedrock = require('bedrock-protocol')
const server = bedrock.createServer({
  host: '162.55.199.41',       // optional. host to bind as.
  port: 30578,          // optional
  username: 'Entidade 303',
  version: '1.21.31',   // optional. The server version, latest if not specified. 
})

server.on('connect', client => {
  client.on('join', () => { // The client has joined the server.
    const d = new Date()  // Once client is in the server, send a colorful kick message
    client.disconnect(`Good ${d.getHours() < 12 ? '§emorning§r' : '§3afternoon§r'} :)\n\nMy time is ${d.toLocaleString()} !`)
  })
})
