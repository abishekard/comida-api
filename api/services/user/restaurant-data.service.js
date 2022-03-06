const database = require("./../../../config/database");

module.exports = {
    getAllRestaurantService: (callback) => {
        database.query(
            `select id,shop_name,speciality,shop_image,address,latitude,
        longitude,close_time,open_time,available,rating from partner`, [],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    getProductCategoryWiseService: (id, callback) => {},
    getPartnerInfoService: (id, callback) => {
        database.query(
            `select shop_name,speciality,shop_image,address from partner where id = ?`, [id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
};