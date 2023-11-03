const db = require('../../helpers/dbConnection');
const { v4: uuidv4 } = require('uuid');


const items_borrowedModel = {
    findAll: (req, res) => {
        return new Promise((resolve, reject) => {
            db.query('select * from items_borrowes', (error, result) => {
                if(error) {
                    return reject({
                        message: `failed, ${error}`,
                        statusCode: 500,
                    })
                } else {
                    return resolve(result.rows)
                }
            });
        });
    },
    findOne: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from items_borrowes where id='${id}'`, (error, result) => {
                if(error) {
                    return reject({
                        message: `failed, ${error}`,
                        statusCode: 500,
                    });
                } else {
                    return resolve(result.rows[0])
                }
            });
        });
    },
    create: ({ item_name_borrowed, borrowed_name, contact, item_code, date_borrowed }) => {
        return new Promise((resolve, reject) => {
            db.query(`insert into items_borrowes (id, item_name_borrowed, borrowed_name, contact, item_code, date_borrowed) values ($1,$2,$3,$4,$5,$6) returning *`, [uuidv4(), item_name_borrowed, borrowed_name, contact, item_code, date_borrowed], (error, result) => {
                if(error) {
                    return reject({
                        message: `failed, ${error}`,
                        statusCode: 500
                    });
                } else {
                    return resolve(result.rows[0])
                }
            });
        });
    },
    edit: (request) => {
        return new Promise((resolve, reject) => {
            const { id, item_name_borrowed, borrowed_name, contact, item_code, date_borrowed } = request;
            db.query(`Select * from items_borrowes where id='${id}'`, (errorGet, resultGet) => {
                if(errorGet) {
                    return reject({
                        message: `failed get, ${errorGet}`,
                        statusCode: 500
                    });
                } else {
                    db.query(`update items_borrowes set item_name_borrowed='${item_name_borrowed || resultGet.rows[0].item_name_borrowed}', borrowed_name='${borrowed_name || resultGet.rows[0].borrowed_name}', contact='${contact || resultGet.rows[0].contact}', item_code='${item_code || resultGet.rows[0].item_code}', date_borrowed='${date_borrowed || resultGet.rows[0].date_borrowed}', created_at='now()', updated_at='now()' where id='${id}' returning *`, (errorEdit, resultEdit) => {
                        if(errorEdit) {
                            return reject({
                                message: `failed update, ${errorEdit}`,
                                statusCode: 500
                            });
                        } else {
                            return resolve(resultEdit.rows)
                        }
                    });
                }
            });
        })
    },
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from items_borrowes where id='${id}'`, (error, result) => {
                if(error) {
                    return reject({
                        message: `failed, ${error}`,
                        statusCode: 500
                    });
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    }
}

module.exports = items_borrowedModel;