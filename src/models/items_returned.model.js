const db = require("../../helpers/dbConnection");
const { v4: uuidv4 } = require('uuid');

const itemsReturnedModel = {
    findAll: (req, res) => {
        return new Promise((resolve, reject) => {
            db.query('select * from items_returned', (error, result) => {
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
            db.query(`select * from items_returned where id='${id}'`, (error, result) => {
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
    create: ({ item_name_borrowed, borrowed_name, item_code, date_returned, confirmation = false }) => {
        return new Promise((resolve, reject) => {
            db.query(`insert into items_returned (id, item_name_borrowed, borrowed_name, item_code, date_returned, confirmation) values ($1,$2,$3,$4,$5,$6) returning *`, [uuidv4(), item_name_borrowed, borrowed_name, item_code, date_returned, confirmation], (error, result) => {
                if(error) {
                    console.log(error);
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
            const { id, item_name_borrowed, borrowed_name, confirmation, item_code, date_returned } = request;
            db.query(`Select * from items_returned where id='${id}'`, (errorGet, resultGet) => {
                if(errorGet) {
                    return reject({
                        message: `failed get, ${errorGet}`,
                        statusCode: 500
                    });
                } else {
                    db.query(`update items_returned set item_name_borrowed='${item_name_borrowed || resultGet.rows[0].item_name_borrowed}', borrowed_name='${borrowed_name || resultGet.rows[0].borrowed_name}', confirmation='${confirmation || resultGet.rows[0].confirmation}', item_code='${item_code || resultGet.rows[0].item_code}', date_returned='${date_returned || resultGet.rows[0].date_returned}', created_at='now()', updated_at='now()' where id='${id}' returning *`, (errorEdit, resultEdit) => {
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
            db.query(`delete from items_returned where id='${id}'`, (error, result) => {
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

module.exports = itemsReturnedModel;