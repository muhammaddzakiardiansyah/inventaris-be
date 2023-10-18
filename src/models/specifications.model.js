const db = require('../../helpers/dbConnection');
const { v4: uuidv4 } = require('uuid');

const specificationsModel = {
    get : (req, res) => {
        return new Promise((resolve, reject) => {
            db.query('select * from specifications', (err, result) => {
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
            db.query(`select * from specifications where id='${id}'`, (err, result) => {
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
    add : ({name, spec, laboratory_id}) => {
        return new Promise((resolve, reject) => {
            db.query(`insert into specifications (id, name, spec, laboratory_id) values ($1,$2,$3,$4) returning *`, [uuidv4(), name, spec, laboratory_id], (err, result) => {
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
        const {name, spec, laboratory_id, id} = request;
        return new Promise((resolve, reject) => {
            db.query(`select * from specifications where id='${id}'`, (err, resultGet) => {
                console.log(err)
                if(err) {
                    return reject({
                        status: 400,
                        message: `failed get data ${err}`,
                    });
                } else {
                    db.query(`update specifications set name='${name || resultGet[0].name}', spec='${spec || resultGet[0].spec}', laboratory_id='${laboratory_id || resultGet[0].laboratory_id}', created_at='now()', updated_at='now()' where id='${id}' returning *`, (err, result) => {
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
            db.query(`delete from specifications where id='${id}'`, (err, result) => {
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

module.exports = specificationsModel;