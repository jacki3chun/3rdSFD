const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('credits')
    .setDescription('Provide a list of all who have contributed to this project'),
  async execute(interaction) {
    const embed = new MessageEmbed()
          .setColor('#0x1a2c78')
          .setTitle('Thank you, the user, for giving this bot the opportunity to serve you. And also...')
          .setAuthor({ name: 'Feel free to reach out if you want to help this become a better tool. For now, we want to say:', url: 'https://discord.gg/fPyTMgpR4X' })
          .addFields(
          )
          .setFooter({ text: 'Got feedback? Join the bot server: https://discord.gg/fPyTMgpR4X', iconURL: 'https://cdn.iconscout.com/icon/free/png-128/discord-3-569463.png' });
    const contributors = {
      'Estile': 'Owner/Data manager',
      'JAcki3 Chun': 'Developer',
    };
    for (const contributor in contributors) {
      const role = contributors[contributor];
       embed.addField(contributor, role, false);
    }

    return interaction.reply({embeds: [embed]});
  },
};
