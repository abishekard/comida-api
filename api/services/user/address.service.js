const database = require("./../../../config/database");
const timestamp = require("time-stamp");

module.exports = {
    createrAddressService: (data, callback) => {
        database.query(
            `insert into customeraddresstable
         (address,state,city,local_city,landmark,pincode,locality,latitude,longitude,address_type,user_id,created_at) 
         values(?,?,?,?,?,?,?,?,?,?,?,?)`, [
                data.address,
                data.state,
                data.city,
                data.local_city,
                data.landmark,
                data.pincode,
                data.locality,
                data.latitude,
                data.longitude,
                data.address_type,
                data.user_id,
                timestamp("DD/MM/YYYY HH:mm:ss"),
            ],
            (error, result, fields) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },

    deleteAddressService: (id, callback) => {
        database.query(
            `delete from customeraddresstable where id=?`, [id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    showAddressService: (id, callback) => {
        database.query(
            `select * from customeraddresstable where user_id = ?`, [id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
};