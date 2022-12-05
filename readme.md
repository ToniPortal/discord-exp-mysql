<h1 align="center">discord-exp-mysql</h1>

> A module using discord.js and canvas that allows you to easily make an experience system for your discord bot.
> Background details relevant to understanding what this module does

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://www.npmjs.com/package/discord-exp-mysql)
[![discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/TYDa2eS)


## Links

- [Link of discord Serv](https://discord.com/invite/TYDa2eS)

- [Repo](https://github.com/Bouftout/compagnioncube)

- [Bugs](https://github.com/Bouftout/compagnioncube/issues)

## Usage

Don't forget to modify config.json with your auth mysql(The file is in module)

```js
var expdiscord = require('discord-exp')

client.on('messageCreate', (message) => {
    if (message.author.id === client.user.id || message.author.bot || message.author.equals(client.user)) return;

    let id = message.author.id;

    expdiscord.verify(id)
    if (message.content == "*exp") {
        console.log("Commande exp")

        expdiscord.getexp(id).then(function (result) {

                const embed = {
                    color: 0x0099ff,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL()
                    },
                    title: `**Vous avez :**`,
                    description: `${result} exp`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL(),
                        text: `©ToniPortal`
                    }
                }
               
                return message.channel.send({ embeds: [embed] })

            
        }).catch(function (err) {
            console.log(err, err.stack);
        });

    }

})
```

outputs

![Does](./does.png)

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install discord-exp
```


## Built With

- [Node](https://nodejs.org/fr/)
- [NPM](https://npmjs.org/)
- [Mysql](https://www.npmjs.com/package/mysql)

## Future Updates

- [] A cancas System.

## Author

**ToniPortal**

- Contact discord **ToniPortal#4057**
- [My profile](https://github.com/Bouftout)
- [My email for professional helping](mailto:pastre.toni?subject=Help%for%discord%bot)

## 🤝 Support

Feature requests are welcome!

Give a ⭐️ if you like this project ! 

## Badges  
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  
 