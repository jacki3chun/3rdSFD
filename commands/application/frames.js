const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('frames')
    .setDescription('Add character name and move, to get a response with all available move data')
    .addStringOption(character =>
  		character.setName('character')
        .setAutocomplete(true)
  			.setDescription('The character name (e.g. Chun-Li, Dudley, Twelve)')
  			.setRequired(true))
    .addStringOption(move =>
  		move.setName('move')
        .setAutocomplete(true)
  			.setDescription('The move input (e.g. Jab, Far Fierce, HCF + Jab)')
  			.setRequired(true)),
  async execute(interaction) {
    const char = interaction.options.getString('character');
    const move = interaction.options.getString('move');
    // Load frame data json.
    fs.readFile("./assets/framedata.json", "utf8", (err, jsonObject) => {
      if (err) {
        // console.log("Error reading file from disk:", err);
        return interaction.reply('Could not load frame data file. Refer to the [Google sheet](https://docs.google.com/spreadsheets/d/1gr_iFfn569JjiSYaFe85HLwoKNmByAUMNovOjmmfYSc/edit?usp=sharing) for the data.');
      }
      try {
        let data = JSON.parse(jsonObject);
        // Capitilize first letter of character name.
        let character = char.charAt(0).toUpperCase() + char.slice(1);
        // If character not found, exit.
        if (data.hasOwnProperty(character) === false) {
          return interaction.reply('Could not find character: ' + character + '. Refer to the [Google sheet](https://docs.google.com/spreadsheets/d/1gr_iFfn569JjiSYaFe85HLwoKNmByAUMNovOjmmfYSc/edit?usp=sharing) for available characters.');
        }
        // Trim extra whitespaces from move.
        let parsedMove = move.trim();
        // let singleButton = false
        // Check if single button passed.
        // if (parsedMove.match(/^[+\-aAbBcCdD() .]+$/g)) {
        //   singleButton = true
        //   // console.log(parsedMove)
        //   // Preppend "far" to return valid value.
        //   // parsedMove = (parsedMove === 'cd' || parsedMove === 'CD') ? parsedMove : 'far ' + parsedMove;
        // }
        // console.log(parsedMove)
        // Convert dots into whitespaces.
        // parsedMove = parsedMove.replace('.', ' ')
        // Trim whitespaces and add caps, turning "236 a" into "236A".
        // if (parsedMove.match(/^[\d+ $+\-aAbBcCdD().]+$/g) ) {
        //   parsedMove = parsedMove.toUpperCase()
        //   parsedMove = parsedMove.replace(' ', '')
        //   // console.log("Is this still useful? " + parsedMove)
        // }
        splitMoves = parsedMove.split(" /");
        parsedMove = splitMoves[0];
        console.log(character)
        console.log(parsedMove)
        // let escapedMoves = ''
        // const moveArray = parsedMove.split(" ")
        // moveArray.forEach((element) => {
        //   // Turn ABCD to uppercase if they are not.
        //   if (element.match(/^[+\-aAbBcCdD() .]+$/g) ) {
        //     element = element.toUpperCase()
        //   }
        //   escapedMoves += element + ' ';
        // });
        // escapedMoves = escapedMoves.trimEnd();
        // If move not found, exit.
        if (data[character].hasOwnProperty(parsedMove) === false) {
          return interaction.reply('Could not find specified move: ' + move + '. Refer to the [Google sheet](https://docs.google.com/spreadsheets/d/1gr_iFfn569JjiSYaFe85HLwoKNmByAUMNovOjmmfYSc/edit?usp=sharing) for available data.');
        }
        let moveData = data[character][parsedMove];
        const startup = (moveData['Startup'] !== null) ? moveData['Startup'].toString() : '-';
        const active = (moveData['Hit'] !== null) ? moveData['Hit'].toString() : '-';
        const recovery = (moveData['Recovery'] !== null) ? moveData['Recovery'].toString() : '-';
        const oh = (moveData['Hit Adv.'] !== null) ? moveData['Hit Adv.'].toString() : '-';
        const ob = (moveData['Blk. Adv.'] !== null) ? moveData['Blk. Adv.'].toString() : '-';
        const coh = (moveData['Cr. Hit Adv.'] !== null) ? moveData['Cr. Hit Adv.'].toString() : '-';
        const cancel = (moveData['Cancel'] !== null) ? moveData['Cancel'].toString() : '-';
        const parry = (moveData['Parry'] !== null) ? moveData['Parry'].toString() : '-';
        const kara_range = (moveData['Kara Range'] !== null) ? moveData['Kara Range'].toString() : '-';
        const throw_range = (moveData['Throw Range'] !== null) ? moveData['Throw Range'].toString() : '-';
        const dmg = (moveData.Damage !== null) ? moveData.Damage.toString() : '-';
        const stun = (moveData['Stun'] !== null) ? moveData['Stun'].toString() : '-';
        const bar_gain_att = (moveData['BarGainAtt'] !== null) ? moveData['BarGainAtt'].toString() : '-';
        const bar_gain_opp = (moveData['BarGainOpp'] !== null) ? moveData['BarGainOpp'].toString() : '-';
        const moveNo = (moveData['MoveNumber'] !== null) ? moveData['MoveNumber'].toString() : '-';
        
        // const guardDmg = (moveData.GUARDDMG !== null) ? moveData.GUARDDMG.toString() : '-';
        // Get lowercase trimmed character name for official site url.
        let lowerCaseChar = character.toLowerCase();
        lowerCaseChar = lowerCaseChar.split(/\s+/).join('');
        // Get character link.
        const charLink = this.getCharacterNumber(character);
        // const charLink = this.getCharacterLink(character);
        // console.log(charNo);
        const embed = new MessageEmbed()
          .setColor('#0x1a2c78')
          .setTitle(character)
          // .setURL('https://rbnorway.org/' + charLink + '-t7-frames/')
          .setAuthor({ name: parsedMove, iconURL: 'https://pbs.twimg.com/profile_images/1150082025673625600/m1VyNZtc_400x400.png', url: 'https://docs.google.com/spreadsheets/d/1gr_iFfn569JjiSYaFe85HLwoKNmByAUMNovOjmmfYSc/edit?usp=sharing' })
          // .setDescription('Move input')
          .setThumbnail('http://ensabahnur.free.fr/BastonNew/ImagesCharacters/'+ character.toLowerCase() + '-stance.gif')
          .addFields(
            { name: 'Startup', value: startup, inline: false },
            { name: 'Active', value: active, inline: false },
            { name: 'Recovery', value: recovery, inline: false },
            { name: 'On hit', value: oh, inline: false },
            { name: 'Crouching On hit', value: coh, inline: false },
            { name: 'On block', value: ob, inline: false },
            { name: 'Cancel', value: cancel, inline: false },
            { name: 'Parry', value: parry, inline: false },
            { name: 'Kara Range', value: kara_range, inline: false },
            { name: 'Throw Range', value: throw_range, inline: false },
            // { name: '\u200B', value: '\u200B' },
            { name: 'Damage', value: dmg, inline: false },
            { name: 'Stun', value: stun, inline: false },
            // { name: '\u200B', value: '\u200B' },
            { name: 'Bar gain Attack', value: bar_gain_att, inline: false },
            { name: 'Bar gain Opp.', value: bar_gain_opp, inline: false },
            // { name: 'Guard damage', value: guardDmg, inline: false },
            // { name: '\u200B', value: '\u200B' },
            // { name: '\u200B', value: '\u200B' },
            // { name: 'Framedata Android app now available!', value: 'https://play.google.com/store/apps/details?id=com.framedata.fof' },
            // { name: 'Patch 1.62:', value: 'DONE!'},
            // { name: '\u200B', value: '\u200B' },
            // { name: 'Inline field title', value: 'Some value here', inline: true },
          )
          .setFooter({ text: 'Got feedback? Join the bot server: https://discord.gg/fPyTMgpR4X', iconURL: 'https://cdn.iconscout.com/icon/free/png-128/discord-3-569463.png' });
        // Conditionally add hitbox link.
        if (moveData['MoveNumber'] !== null) {
          let hitboxLink = charLink + moveNo;
          console.log(hitboxLink);
          embed.addFields({ name: 'Hitbox Viewer', value: hitboxLink, inline: false })
          // embed.addFields({ name: 'Inline field title', value: 'Some value here', inline: true }) : '';
        }
        // (moveData['MoveNumber'] !== null) ? embed.addFields({ name: 'Inline field title', value: 'Some value here', inline: true }) : ''; 
        // Conditionally set GIF if present.
        // (moveData.GIF !== null) ? embed.setImage(moveData.GIF) : embed.addField('No GIF was found for this move', 'Feel free to share a Giphy hosted GIF with the [developers](https://github.com/dens0ne/kofxv_framebot/issues) if you have one.', true);
        // Conditionally set move name if present.
        // (moveData.Name !== null) ? embed.setDescription(moveData.Name) : '';
        return interaction.reply({embeds: [embed]});
      } catch (err) {
        console.log("Error parsing JSON string:", err);
        return interaction.reply('There was an error while processing your request, if the problem persists, contact the bot developers. Refer to the [Google sheet](https://docs.google.com/spreadsheets/d/1gr_iFfn569JjiSYaFe85HLwoKNmByAUMNovOjmmfYSc/edit?usp=sharing) to look for the data.');
      }
    });
  },
  getCharacterNumber: function(character) {
    const charOrder = {
      'Alex': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=1&sMoveType=fd_normals&sAction=w&iMove=',
      'Ryu': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=2&sMoveType=fd_normals&sAction=w&iMove=',
      'Yun': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=3&sMoveType=fd_normals&sAction=w&iMove=',
      'Dudley': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=4&sMoveType=fd_normals&sAction=w&iMove=',
      'Necro': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=5&sMoveType=fd_normals&sAction=w&iMove=',
      'Hugo': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=6&sMoveType=fd_normals&sAction=w&iMove=',
      'Ibuki': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=7&sMoveType=fd_normals&sAction=w&iMove=',
      'Elena': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=8&sMoveType=fd_normals&sAction=w&iMove=',
      'Oro': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=9&sMoveType=fd_normals&sAction=w&iMove=',
      'Yang': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=10&sMoveType=fd_normals&sAction=w&iMove=',
      'Ken': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=11&sMoveType=fd_normals&sAction=w&iMove=',
      'Sean': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=12&sMoveType=fd_normals&sAction=w&iMove=',
      'Urien': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=13&sMoveType=fd_normals&sAction=w&iMove=',
      'Gouki/Akuma': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=14&sMoveType=fd_normals&sAction=w&iMove=',
      'Makoto': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=17&sMoveType=fd_normals&sAction=w&iMove=',
      'Q': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=18&sMoveType=fd_normals&sAction=w&iMove=',
      'Twelve': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=19&sMoveType=fd_normals&sAction=w&iMove=',
      'Remy': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=20&sMoveType=fd_normals&sAction=w&iMove=',
      'Chun-Li': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=16&sMoveType=fd_normals&sAction=w&iMove=',
      'Gill': 'http://ensabahnur.free.fr/BastonNew/hitboxesDisplay.php?sMode=f&iChar=0&sMoveType=fd_normals&sAction=w&iMove='
    };
    return charOrder[character];
  },
  getCharacterLink: function(character) {
    const charLink = {
      'Akuma': 'akuma',
      'Alisa': 'alisa',
      'Anna': 'anna',
      'Armor King': 'armor-king',
      'Asuka': 'asuka',
      'Bob Richards': 'bob',
      'Bryan Fury': 'bryan',
      'Claudio Serafino': 'claudio',
      'Devil Jin': 'devil-jin',
      'Dragunov': 'dragunov',
      'Eddy Gordo': 'eddy',
      'Eliza': 'eliza',
      'Fahkumram': 'fahkumran',
      'Feng Wei': 'feng',
      'Ganryu': 'ganryu',
      'Geese Howard': 'geese',
      'Gigas': 'gigas',
      'Heihachi Mishima': 'heihachi',
      'Hwoarang': 'hwoarang',
      'Jack-7': 'jack7',
      'Jin': 'jin',
      'Josie Rizal': 'josie',
      'Julia Chang': 'julia',
      'Katarina Alvez': 'katarina',
      'Kazumi Mishima': 'kazumi',
      'Kazuya Mishima': 'kazuya',
      'King': 'king',
      'Kuma': 'kuma',
      'Kunimitsu': 'kunimitsu',
      'Lars': 'lars',
      'Law': 'law',
      'Lee Chaolan': 'lee',
      'Lei': 'lei',
      'Leo': 'leo',
      'Leroy': 'leroy',
      'Lidia': 'lidia',
      'Lili': 'lili',
      'Lucky Chloe': 'lucky-chloe',
      'Marduk': 'marduk',
      'Master Raven': 'master-raven',
      'Miguel': 'miguel',
      'Negan': 'negan',
      'Nina': 'nina',
      'Noctis': 'noctis',
      'Paul': 'paul',
      'Shaheen': 'shaheen',
      'Steve': 'steve',
      'Xiaoyu': 'xiaoyu',
      'Yoshimitsu': 'yoshimitsu',
      'Zafina': 'zafina'
      
    };
    return charLink[character];
  }
};