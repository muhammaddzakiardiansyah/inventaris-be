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
    perLab : (id) => {
        return new Promise((resolve, reject) => {
            const query = 'laboratories.laboratory_name, items.id, items.item_code, items.item_name, items.registration_number, items.brand, items.origin, items.condition, items.amount, items.stock, items.year_of_purchase, items.laboratory_id';
            db.query(`select ${query} from laboratories right join items on laboratories.id=items.laboratory_id where items.laboratory_id='${id}'`, (err, result) => {
                if(err) {
                    return reject({
                        status: 400,
                        message: `failed get data ${err}`,
                    });
                } else {
                    return resolve(result.rows);
                }
            })
        })
    },
    specPerLab : (id) => {
        return new Promise((resolve, reject) => {
            const query = 'laboratories.laboratory_name, specifications.id, specifications.name, specifications.spec, specifications.laboratory_id';
            db.query(`select ${query} from laboratories right join specifications on laboratories.id=specifications.laboratory_id where specifications.laboratory_id='${id}'`, (err, result) => {
                if(err) {
                    return reject({
                        status: 400,
                        message: `failed get data ${err}`,
                    });
                } else {
                    return resolve(result.rows);
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