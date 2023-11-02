const db = require('../../helpers/dbConnection');

const items_borrowedModel = {
    get: (req, res) => {
        return new Promise((resolve, reject) => {
            db.query('select * from items_borrowed', (err, result) => {
                if(err) {
                    return reject({
                        message: err,
                        statusCode: 500,
                    })
                } else {
                    return resolve(result.rows)
                }
            });
        });
    }
}

module.exports = items_borrowedModel;