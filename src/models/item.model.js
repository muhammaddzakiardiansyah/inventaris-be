const db = require('../../helpers/dbConnection');
const { v4: uuidv4 } = require('uuid');

const itemsModel = {
    get : (req, res) => {
        return new Promise((resolve, reject) => {
            db.query('select * from items order by created_at desc', (err, result) => {
                if(err) {
                    return reject({
                        status: 400,
                        message: `the request failed ${err}`
                    });
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },
    detail : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from items where id='${id}'`, (err, result) => {
                if(err) {
                    return reject({
                        status: 400,
                        message: `the request failed ${err}`
                    });
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    },
    add : (request) => {
        return new Promise((resolve, reject) => {
            const { item_code, item_name, registration_number, brand, origin, condition, amount, stock, year_of_purchase, laboratory_id } = request;
            db.query(`insert into items (id, item_code, item_name, registration_number, brand, origin, condition, amount, stock, year_of_purchase, laboratory_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *`, [uuidv4(), item_code, item_name, registration_number, brand, origin, condition, amount, stock, year_of_purchase, laboratory_id], (err, result) => {
                if(err) {
                    return reject({
                        status: 400,
                        message: `the request failed ${err}`
                    })
                } else {
                    return resolve(result.rows);
                }
            });
        });
    },
    edit : (request) => {
        return new Promise((resolve, reject) => {
            const { id, item_code, item_name, registration_number, brand, origin, condition, amount, stock, year_of_purchase, laboratory_id } = request;
            db.query(`select * from items where id='${id}'`, (err, resultGet) => {
                console.log(resultGet);
                if(err) {
                    return reject({
                        status: 400,
                        message: `the request failed ${err}`
                    })
                } else {
                    db.query(`update items set item_code='${item_code || resultGet[0].item_code}', item_name='${item_name || resultGet[0].item_name}', registration_number='${registration_number || resultGet[0].registration_number}', brand='${brand || resultGet[0].brand}', origin='${origin || resultGet[0].origin}', condition='${condition || resultGet[0].condition}', amount='${amount || resultGet[0].amount}', stock='${stock || resultGet[0].stock}', year_of_purchase='${year_of_purchase || resultGet[0].year_of_purchase}', laboratory_id='${laboratory_id || resultGet[0].laboratory_id}' where id='${id}' returning *`, (err, result) => {
                        if(err) {
                            return reject({
                                status: 400,
                                message: `the request failed ${err}`
                            })
                        } else {
                            return resolve(result.rows);
                        }
                    });
                }
            });
        });
    },
    remove : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from items where id='${id}'`, (err, result) => {
                if(err) {
                    return reject({
                        status: 400,
                        message: `the request failed ${err}`
                    });
                } else {
                    return resolve(result.rows)
                }
            })
        })
    }
}

module.exports = itemsModel;