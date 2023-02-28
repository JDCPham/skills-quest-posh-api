const { response } = require('../utils/helpers');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'posh-database.c8ni4hfqtm2t.eu-west-1.rds.amazonaws.com',
    user: 'vietpro',
    password: 'password',
    database: 'posh_db',
})

module.exports.get = (event, context, callback) => {
    try {
        const id = event.pathParameters.id;
        const SQL = `SELECT * FROM item WHERE id='${id}'`;
        pool.query(SQL, (error, results) => {
            if (error) return callback(error);
            callback(null, response(200, results));
        });
    } catch (e) {
        callback(e)
    }
   
};

module.exports.post = (event, context, callback) => {
    const body = JSON.parse(event.body);
    const item = {
        title: body.title,
        price: body.price,
        location: body.location,
        date: body.date,
        description: body.description,
    };
    const SQL = `INSERT INTO item SET ?`;
    pool.query(SQL, item, (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, response(201, results));
    });
}

module.exports.delete = (event, context, callback) => {
    const id = event.pathParameters.id;
    const SQL = `DELETE FROM item WHERE id=?`;
    pool.query(SQL, [id], (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, response(200, results));
    });
}