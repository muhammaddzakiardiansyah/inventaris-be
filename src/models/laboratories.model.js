const db = require("../../helpers/dbConnection");
const { v4: uuidv4 } = require('uuid');

const laboratoriesModel = {
    get : (req, res) => {
        return new Promise((resolve, reject) => {
            db.query('select * from laboratories', (err, result) => {
                if(err) {
                    return reject({
                        message : `the request has failed ${err}`,
                    });
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },
    detail : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from laboratories where id='${id}'`, (err, result) => {
                if(err) {
                    return reject({
                        status: 400,
                        message: `failed get data ${err}`,
                    });
                } else {
                    return resolve(result.rows)
                }
            })
        })
    },
    add : ({laboratory_name}) => {
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
    },
    edit : (request) => {
        const {laboratory_name, id} = request;
        return new Promise((resolve, reject) => {
            db.query(`select * from laboratories where id='${id}'`, (err, resultGet) => {
                console.log(err)
                if(err) {
                    return reject({
                        status: 400,
                        message: `failed get data ${err}`,
                    });
                } else {
                    db.query(`update laboratories set laboratory_name='${laboratory_name}', created_at='now()', updated_at='now()' where id='${id}' returning *`, (err, result) => {
                        if(err) {
                            return reject({
                                status: 500,
                                message: `failed edit data ${err}`,
                            });
                        } else {
                            return resolve(result.rows)
                        }
                    });
                }
            });
        });
    },
    remove : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from laboratories where id='${id}'`, (err, result) => {
                if(err) {
                    return reject({
                        status: 400,
                        message: `failed delete data ${err}`
                    });
                } else {
                    return resolve(result.rows);
                }
            });
        });
    }
}

module.exports = laboratoriesModel;