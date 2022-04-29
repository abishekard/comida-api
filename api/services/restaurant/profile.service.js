const database = require("./../../../config/database");

const getProfileDataService = (partner_id, callback) => {
    database.query(
        "select name,address,email,mobile,profile_image,shop_name,shop_image,open_time,close_time,available,rating,aadhar_number,gst_number,aadhar_front,aadhar_back,speciality from partner where id = ?", [partner_id],
        (error, result, field) => {
            if (error) callback(error);
            else callback(null, JSON.parse(JSON.stringify(result[0])));
        }
    );
};

module.exports = { getProfileDataService };