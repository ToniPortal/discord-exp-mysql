const mysql = require('mysql');

const config = require('./config.json');


const connection = mysql.createConnection({ //connection bdd
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected in database! (module discord-exp-");
});




exports.create = function (message) {

    connection.query(`SELECT id FROM accounts WHERE id = '${message.author.id}'`, (err, rows) => {
        console.log(rows)
        if (rows.length == 0) {
            connection.query(`INSERT INTO \`accounts\` VALUES ('${message.author.id}','0');`, (err, rowss) => {
                if (err) throw err;
                return true;
            })
        }

    })



}

exports.add = function (message, amount) {

    connection.query(`UPDATE \`accounts\` SET \`exp\` = '${amount}' WHERE \`accounts\`.\`id\` = '${message.author.id}';`, (err, rows) => {
        if (err) throw err;
        console.log("Update" + rows[0])
    })
}

exports.verify = function (message) {

    connection.query(`SELECT exp FROM \`accounts\` WHERE id = '${message.author.id}';`, (err, rows) => {
        if (err) throw err;
        console.log("Verify" + rows[0])
        if (rows.length == 0) {
            exports.create(message);
            return true;
        } else {
            exports.add(message, Number(rows[0].exp) + 1);
            return false;
        }
    })

}

exports.getexp = function (message) {

    return new Promise(function (resolve) {
        var exp = 0;
        var connection_pool = mysql.createPool({
            host: 'mysql-nootnoot.alwaysdata.net',
            user: 'nootnoot',
            password: 'nerf@akshan',
            database: 'nootnoot_noot'
        });
        connection_pool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            connection.query(`SELECT exp FROM \`accounts\` WHERE id = '${message.author.id}';`, function (err, rows) {
                if (err) {
                    throw err;
                }
                console.log(rows)
                if (rows.length != 0) {
                    exp = Number(rows[0].exp) + 1;
                } else {
                    exp = 0;
                }

                if (rows.length == 0) {
                    exports.create(message);
                } else {
                    console.log("exp" + exp)
                    exports.add(message, exp);
                }

                resolve(exp);
            });
        });
    });
};




/*
    const db = new Database("mongodb://ui2ucdep6kutwkqkhytl:W5Q7aCXQldIjlWiuT3G5@btaxraikjinilhy-mongodb.services.clever-cloud.com:27017/btaxraikjinilhy");
 
    db.connect();
 
    db.on("ready", () => {
        // console.log("Connected to the database");
        doStuff();
    });
 
    // https://pm2.io/docs//plus/guide/custom-metrics/ Metrics
    // https://pm2.io/docs/plus/guide/transaction-tracing/
 
    async function doStuff() {
        // Setting an object in the database:
        // console.log(await db.get(`${message.author.id}`))
 
        expmetric.set(await db.get(`${message.author.id}.exp`))
 
        if (db.has(`${message.author.id}`) == true) {
            await db.set(message.author.id, { image: 0, lvl: 1, exp: 1, lvlup: 50, money: 500 }); //set de la base de données
 
            console.log(await db.get(`${message.author.id}.exp`));
        } else {
            if (await db.get(`${message.author.id}.exp`) == await db.get(`${message.author.id}.lvlup`)) {
                //Montage de niveau
                let lvlupnv = await db.get(`${message.author.id}.lvlup`) / 2;
 
 
                await db.add(`${message.author.id}.exp`, -(await db.get(`${message.author.id}.lvlup`)));
                await db.add(`${message.author.id}.lvl`, 1);
                await db.add(`${message.author.id}.lvlup`, lvlupnv);
 
            } else {
 
                await db.add(`${message.author.id}.exp`, 1);
                console.log(await db.get(`${message.author.id}.exp`));
 
            }
        }
 
    }
    */
