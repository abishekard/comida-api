const pool = require("./../../../config/database");

module.exports = {
    getMonthlyDataService: (month, year, callback) => {
        pool.query(
            "select * from customer_order_table where month=? and year=?", [month, year],
            (error, result, field) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else callback(null, result);
            }
        );
    },
};