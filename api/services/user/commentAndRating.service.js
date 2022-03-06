const database = require("./../../../config/database");

module.exports = {
    getCommentService: (order_id, callback) => {
        database.query(
            `select * from comment_and_rating where order_id = ?`, [order_id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    setCommentService: (data, callback) => {
        database.query(
            `insert into comment_and_rating 
        (user_id,partner_id,order_id,rating,comment) 
        values(?,?,?,?,?)`, [data.user_id, data.partner_id, data.order_id, data.rating, data.comment],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
};