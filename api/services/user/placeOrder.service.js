const pool = require('./../../../config/database');

const getAddressData = (address_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`select * from customeraddresstable where id=?`, [address_id],
            (error, result, fields) => {
                if (error)
                    console.log(error);
                else {
                    console.log(result);
                    resolve(result[0]);
                }
            });
    });

}
const placeOrder = async(data, callback) => {
    var pIdArray = data.product_id.split(',');
    var quantity = data.quantity.split(',');
    console.log(data.address_id);
    var orderId = data.order_id;
    var addressData = await getAddressData(data.address_id);
    callback(null, addressData);
}

module.exports = placeOrder;