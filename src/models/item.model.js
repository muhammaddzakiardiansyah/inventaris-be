const db = require('../../helpers/dbConnection');

const itemsModel = {
    get : (req, res) => {
        return new Promise((resolve, reject) => {
            db.query('select * from items', (err, result) => {
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
    }
}

module.exports = itemsModel;