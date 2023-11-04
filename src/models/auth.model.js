const db = require("../../helpers/dbConnection");
const { v4: uuidv4 } = require("uuid");

const authModel = {
  register: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into users (id, username, password) values ($1,$2,$3) returning *`,
        [uuidv4(), username, password],
        (error, result) => {
          if (error) {
            return reject({
              message: `failed, ${error}`,
              statusCode: 500,
            });
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },
  login: ({ username }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where username='${username}'`,
        (error, result) => {
          if (error) {
            return reject({
              message: `failed, ${error}`,
              statusCode: 500,
            });
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },
};

module.exports = authModel;
