const pool = require("./../../../config/database");
const timestamp = require("time-stamp");

const getProfile = (id, callback) => {
    console.log(timestamp("DD/MM/YYYY HH:mm:ss"));
    pool.query(
        `select * from users where id = ?`, [id],
        (err, results, fields) => {
            if (err) callback(err);
            else callback(null, results);
        }
    );
};

module.exports = getProfile;