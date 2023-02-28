const { response } = require('../utils/helpers');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'posh-database.c8ni4hfqtm2t.eu-west-1.rds.amazonaws.com',
    user: 'vietpro',
    password: 'password',
    database: 'posh_db',
})

module.exports.patch = (event, context, callback) => {
    const id = event.pathParameters.id;
    const SQL = `UPDATE item SET starred=? WHERE id=?`;
    pool.query(SQL, [true, id], (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, response(200, results));
    });
}

module.exports.delete = (event, context, callback) => {
    const id = event.pathParameters.id;
    const SQL = `UPDATE item SET starred=? WHERE id=?`;
    pool.query(SQL, [false, id], (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, response(200, results));
    });
}