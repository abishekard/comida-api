const database = require("./../../../config/database");

const getOrderDetail = (order_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `select * from customer_order_table where order_id = ? `, [order_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(result[0]);
            }
        );
    });
};
const getOrderItem = (order_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `select * from customer_order_item where order_id = ?`, [order_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(result);
            }
        );
    });
};

module.exports = {
    getNewOrderService: (partner_id, callback) => {
        database.query(
            `select cot.order_id,cot.delivered_address,cot.customer_address_id, cot.status,cot.created_at,cot.total_price,cot.partner_id,coi.item_image
    from customer_order_table cot
    inner join customer_order_item coi
    on cot.order_id = coi.order_id
    and cot.partner_id = ?
    and cot.status = 1
    group by coi.order_id`, [partner_id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    getProgresOrderService: (partner_id, callback) => {
        database.query(
            `select cot.order_id,cot.delivered_address,cot.customer_address_id, cot.status,cot.created_at,cot.total_price,cot.partner_id,coi.item_image
    from customer_order_table cot
    inner join customer_order_item coi
    on cot.order_id = coi.order_id
    and cot.partner_id = ?
    and cot.status in (2,3)
    group by coi.order_id`, [partner_id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    getCompletedOrderService: (partner_id, callback) => {
        database.query(
            `select cot.order_id,cot.delivered_address,cot.customer_address_id, cot.status,cot.created_at,cot.total_price,cot.partner_id,coi.item_image
    from customer_order_table cot
    inner join customer_order_item coi
    on cot.order_id = coi.order_id
    and cot.partner_id = ?
    and cot.status = 4
    group by coi.order_id`, [partner_id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    getOrderDetailService: async(order_id, callback) => {
        const orderDeatail = await getOrderDetail(order_id);
        const orderItems = await getOrderItem(order_id);
        const response = {
            status: 200,
            customer_id: orderDeatail.user_id,
            delivered_address: orderDeatail.delivered_address,
            created_at: orderDeatail.created_at,
            data: orderItems,
        };

        callback(null, response);
    },
    queueOrderService: (order_id, callback) => {
        database.query(
            `update customer_order_table set status=2 where order_id=?`, [order_id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    dispatchOrderService: (order_id, callback) => {
        // TO DO (incomplete)
        database.query(
            `update customer_order_table set status=2 where order_id=?`, [order_id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
        // TO DO (incomplete)
    },
};