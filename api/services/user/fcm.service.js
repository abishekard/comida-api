const database = require("./../../../config/database");

module.exports = {
    storeFcmService: (data, callback) => {
        database.query(
            `update users set fcm = ? where id = ?`, [data.fcm, data.id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
};