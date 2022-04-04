const database = require("./../../../config/database");

module.exports = {
    setAddressService: (data, callback) => {
        database.query(
            `update partner set address = ?,state=?,
        city=?,pincode=?,latitude=?,
        longitude=?,local_city=? where id = ? `, [
                data.address,
                data.state,
                data.city,
                data.pincode,
                data.latitude,
                data.longitude,
                data.local_city,
                data.id,
            ],
            (error, result, fields) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    setShopDetailSevice: (data, callback) => {
        /* 'shop_name' => 'required',
            'speciality' => 'required',
            'open_time' => 'required',
            'close_time' => 'required',
            'gst_number' => 'required|unique:partner',
            'aadhar_number' => 'required|unique:partner',
            'aadhar_front' => 'required|mimes:png,jpg',
            'aadhar_back' => 'required|mimes:png,jpg',
            'shop_image' => 'required|mimes:png,jpg',
            'id' => 'required' */

        database.query(
            `update partner set shop_name=?,speciality=?,
        open_time=?,close_time=?,gst_number=?,aadhar_number=?,aadhar_front=?,
        aadhar_back,shop_image=? where id =?`, [
                data.shop_name,
                data.speciality,
                data.open_time,
                data.close_time,
                data.gst_number,
                data.aadhar_number,
                data.aadhar_front,
                data.aadhar_back,
                data.shop_image,
                data.id,
            ],
            (error, result, fields) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
};