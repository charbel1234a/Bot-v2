const readline = require('readline');
const axios = require('axios');

// 🔐 Remplacez cette valeur par votre propre token d'accès de page Facebook
const PAGE_ACCESS_TOKEN = 'VOTRE_TOKEN_D_ACCES_ICI';

// 👤 ID utilisateur cible (PSID)
const PSID_DESTINATAIRE = '61558743213025';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendMessage(message) {
    const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

    const data = {
        recipient: { id: PSID_DESTINATAIRE },
        message: { text: message }
    };

    axios.post(url, data)
        .then(() => {
            console.log(`✅ Message envoyé : "${message}"`);
        })
        .catch(error => {
            console.error('❌ Erreur lors de l\'envoi :', error.response?.data || error.message);
        });
}

console.log('💬 Interface CMD - Envoyez un message via votre bot Facebook');
console.log('👉 Tapez votre message puis appuyez sur [Entrée] (CTRL+C pour quitter)');
rl.setPrompt('> ');
rl.prompt();

rl.on('line', (line) => {
    const message = line.trim();
    if (message.length === 0) {
        console.log("⛔ Message vide. Essayez à nouveau.");
    } else {
        sendMessage(message);
    }
    rl.prompt();
});
