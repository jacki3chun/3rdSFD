const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Provide a list of terminology useful to read the framedata.'),
  async execute(interaction) {
    const embed = new MessageEmbed()
          .setColor('#0x1a2c78')
          .setTitle('Tekken 7 terminology within the `/frames` command are:')
          // .setAuthor({ name: 'The framedata terms available are:', url: 'https://discord.gg/fPyTMgpR4X' })
          .addFields(
          )
          .setFooter({ text: 'Got feedback? Join the bot server: https://discord.gg/fPyTMgpR4X', iconURL: 'https://cdn.iconscout.com/icon/free/png-128/discord-3-569463.png' });
    const contributors = {
      'BT': 'Back turn',
      'CD': 'Crouch dash',
      'CH': 'Counter hit',
      'CS': 'Crumble state',
      'DBT': 'Dual boot',
      'DES': 'Destructive stance',
      'DFLIP': 'Demon’s flip',
      'FC': 'Full crouch',
      'JG': 'Juggle',
      'KND': 'knock down',
      'N': 'Neutral',
      'NH': 'Normal hit',
      'SBT': 'single boot – flying stance without chainsaws',
      'SSL': 'Side step left',
      'SSR': 'Side step right',
      'SWL': 'Side walk left',
      'SWR': 'Side walk right',
      'TC': 'Toggle crouch (crouching state)',
      'TJ': 'Toggle jump (jumping state)',
      'WR': 'While running',
      'WS': 'While standing'
    };
    for (const contributor in contributors) {
      const role = contributors[contributor];
       embed.addField(contributor, role, false);
    }

    return interaction.reply({embeds: [embed]});
  },
};
