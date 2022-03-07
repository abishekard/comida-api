const database = require("./../../../config/database");

const getOrderData = (order_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `select  partner_id,total_price,status,address_type,
          delivered_address,order_id,otp,comment from customer_order_table where order_id =?`, [order_id],
            (error, result, fields) => {
                if (error) console.log(error);
                else resolve(result[0]);
            }
        );
    });
};
const getPartnerData = (partner_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `select shop_name,shop_image,speciality,address from partner where id=?`, [partner_id],
            (error, result, fields) => {
                if (error) console.log(error);
                else resolve(result[0]);
            }
        );
    });
};
const getOrderItemData = (order_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `select discount, quantity, price, created_at, item_name, item_image,
         price_type from customer_order_item where order_id=?`, [order_id],
            (error, result, fields) => {
                if (error) console.log(error);
                else resolve(result[0]);
            }
        );
    });
};

module.exports = {
    getNewOrderService: (id, callback) => {
        database.query(
            `select cot.order_id,cot.delivered_address,cot.customer_address_id, cot.status,cot.created_at,cot.total_price,cot.partner_id,coi.item_image
        from customer_order_table cot
        inner join customer_order_item coi
        on cot.order_id = coi.order_id
        and cot.user_id = ?
        and cot.status <= 3
        group by coi.order_id`, [id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    getOrderHistoryService: (id, callback) => {
        database.query(
            `select cot.order_id,cot.delivered_address,cot.customer_address_id, cot.status,cot.created_at,cot.total_price,cot.partner_id,coi.item_image
        from customer_order_table cot
        inner join customer_order_item coi
        on cot.order_id = coi.order_id
        and cot.user_id = ?
        and cot.status = 4
        group by coi.order_id `, [id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    getOrderDetailService: async(order_id, callback) => {
        const orderData = await getOrderData(order_id);
        const partnerData = await getPartnerData(orderData.partner_id);
        const orderItemData = await getOrderItemData(order_id);

        callback(null, {
            partner_id: orderData.partner_id,
            status: orderData.status,
            address_type: orderData.address_type,
            otp: orderData.otp,
            delivered_address: orderData.delivered_address,
            order_id: orderData.order_id,
            shop_name: partnerData.shop_name,
            shop_image: partnerData.shop_image,
            speciality: partnerData.speciality,
            shop_address: partnerData.address,
            comment: orderData.comment,
            orders: orderItemData,
        });
    },
};