# discord-exp

> A module using discord.js and canvas that allows you to easily make an experience system for your discord bot.
> Background details relevant to understanding what this module does

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

## See Also

My other project in my github page !

## License

MIT