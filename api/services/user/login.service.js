const pool = require("./../../../config/database");


module.exports = {
    loginService: (data, callback) => {

        pool.query(`select * from users where email=?`, [data.email],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }

            });

    }
}