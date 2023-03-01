const { response } = require('../utils/helpers');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'posh-database.c8ni4hfqtm2t.eu-west-1.rds.amazonaws.com',
    user: 'vietpro',
    password: 'password',
    database: 'posh_db',
})

module.exports.get = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const SQL = 'SELECT * FROM item';
    pool.query(SQL, (error, results) => {
        if (error) callback(error);
        callback(null, response(200, results));
    });
};