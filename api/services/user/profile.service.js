const pool = require("./../../../config/database");
const timestamp = require("time-stamp");

const getProfileService = (id, callback) => {
    console.log(timestamp("DD/MM/YYYY HH:mm:ss"));
    pool.query(
        `select * from users where id = ?`, [id],
        (err, results, fields) => {
            if (err) callback(err);
            else callback(null, results);
        }
    );
};

const updateProfileUrlService = (user_id, profile_image, callback) => {
    pool.query(
        `update users set profile_image=? where id=?`, [profile_image, user_id],
        (err, result, fields) => {
            if (err) callback(err);
            else callback(null, "profile image updated");
        }
    );
};

module.exports = { getProfileService, updateProfileUrlService };