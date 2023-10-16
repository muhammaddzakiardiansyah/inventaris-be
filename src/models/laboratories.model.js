const db = require("../../helpers/dbConnection");
const { v4: uuidv4 } = require('uuid');

const laboratoriesModel = {
    get : (req, res) => {
        return new Promise((resolve, reject) => {
            db.query('select * from laboratories', (err, result) => {
                if(err) {
                    return reject({
                        message : 'FILED_GET_DATA',
                        error : err
                    });
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    },
    add : ({laboratory_name}) => {
        console.log(laboratory_name, 'aaaaa')
        return new Promise((resolve, reject) => {
            db.query(`insert into laboratories (id, laboratory_name) values ($1,$2) returning *`, [uuidv4(), laboratory_name], (err, result) => {
                if(err) {
                    return reject({
                        message: 'failed create',
                        error: err
                    });
                } else {
                    return resolve(result.rows);
                }
            });
        });
    }
}

module.exports = laboratoriesModel;