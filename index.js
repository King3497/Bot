const bedrock = require('bedrock-protocol')
const client = bedrock.createClient({
  host: 'azurite.magmanode.com',   // optional
  port: 30578,         // optional, default 19132
  username: 'Entidade 303',   // the username you want to join as, optional if online mode
  offline: true       // optional, default false. if true, do not login with Xbox Live. You will not be asked to sign-in if set to true.
})

client.on('text', (packet) => { // Listen for chat messages from the server and echo them back.
  if (packet.source_name != client.username) {
    client.queue('text', {
      type: 'chat', needs_translation: false, source_name: client.username, xuid: '', platform_chat_id: '', filtered_message: '',
      message: `${packet.source_name} said: ${packet.message} on ${new Date().toLocaleString()}`
    })
  }
})
