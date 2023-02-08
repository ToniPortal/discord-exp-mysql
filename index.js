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
    console.log("Connected in database! (module discord-exp-mysql)");
});




exports.create = function (id) {

    connection.query(`SELECT id FROM accounts WHERE id = '${id}'`, (err, rows) => {
        console.log(rows)
        if (rows.length == 0) {
            connection.query(`INSERT INTO \`accounts\` VALUES ('${id}','0');`, (err, rowss) => {
                if (err) throw err;
                return true;
            })
        }

    })



}

exports.add = function (id, amount) {

    connection.query(`UPDATE \`accounts\` SET \`exp\` = '${amount}' WHERE \`accounts\`.\`id\` = '${id}';`, (err, rows) => {
        if (err) throw err;
        console.log("Update" + rows[0])
    })
}

exports.verify = function (id) {

    connection.query(`SELECT exp FROM \`accounts\` WHERE id = '${id}';`, (err, rows) => {
        if (err) throw err;
        console.log("Verify" + rows[0])
        if (rows.length == 0) {
            exports.create(id);
            return true;
        } else {
            exports.add(id, Number(rows[0].exp) + 1);
            return false;
        }
    })

}

exports.getexp = function (id) {

    return new Promise(function (resolve) {
        var exp = 0;
        var connection_pool = mysql.createPool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        });
        connection_pool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            connection.query(`SELECT exp FROM \`accounts\` WHERE id = '${id}';`, function (err, rows) {
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
                    exports.create(id);
                } else {
                    console.log("exp" + exp)
                    exports.add(id, exp);
                }

                resolve(exp);
            });
        });
    });
};