const database = require("./../../../config/database");
const timestamp = require("time-stamp");
const year = require("year");
const month = require("month");

const getCurrentWeekOfMonth = () => {
    const d = new Date();
    const date = d.getDate();
    const day = d.getDay();
    const weekOfMonth = Math.ceil((date - 1 - day) / 7);
    // console.log(weekOfMonth);
    return weekOfMonth;
};
const getAddressData = (address_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `select * from customeraddresstable where id=?`, [address_id],
            (error, result, fields) => {
                if (error) console.log(error);
                else {
                    // console.log(result);
                    resolve(JSON.parse(JSON.stringify(result[0])));
                }
            }
        );
    });
};
const insertOrderData = (req, addressData, orderId, otp) => {
    return new Promise((resolve, reject) => {
        database.query(
            "insert into customer_order_table (user_id,customer_address_id,created_at,total_price,order_id,partner_id,address_type,delivered_address,lat_lng,status,week,month,year,date,otp,payment_method) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                req.user_id,
                // req.address_id,
                111,
                timestamp("YYYY-MM-DD HH:mm:ss"),
                req.total_price,
                orderId,
                req.partner_id,
                // addressData.address_type,
                "home",
                //addressData.address,
                req.address,
                // addressData.latitude + " " + addressData.longitude,
                "84.3 85.4",
                1,
                getCurrentWeekOfMonth(),
                month("M") + 1,
                year("yyyy"),
                timestamp("YYYY-MM-DD HH:mm:ss"),
                otp,
                req.payment_method,
            ],
            (error, result, field) => {
                if (error) console.log(error);
                else {
                    resolve(true);
                }
            }
        );
    });
};
const getOrderItemDetail = (item_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            "select * from product_table where id=?", [item_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(JSON.parse(JSON.stringify(result[0])));
            }
        );
    });
};
const insertOrderItemMain = async(pIdArray, quantity, order_id) => {
    var i = 0;
    pIdArray.forEach(async(element) => {
        const orderItemDetail = await getOrderItemDetail(element);
        const qnt = quantity[i];
        // console.log(orderItemDetail);
        const inserted = await insertOrderItem(
            orderItemDetail,
            quantity[i],
            order_id,
            element
        );
        i++;
    });
};
const insertOrderItem = (orderItemDetail, qnt, order_id, product_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            "insert into customer_order_item (order_id,product_id,quantity,created_at,item_name,item_image,price_type,price,discount) values(?,?,?,?,?,?,?,?,?)", [
                order_id,
                product_id,
                qnt,
                timestamp("YYYY-MM-DD HH:mm:ss"),
                orderItemDetail.item_name,
                orderItemDetail.item_image,
                orderItemDetail.price_type,
                orderItemDetail.price,
                orderItemDetail.discount,
            ],
            (error, result, field) => {
                if (error) console.log(error);
                else {
                    resolve(result);
                }
            }
        );
    });
};
const getUserData = (user_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            "select * from users where id = ?", [user_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(JSON.parse(JSON.stringify(result[0])));
            }
        );
    });
};
const getRestaurantData = (partner_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            "select * from partner where id = ?", [partner_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(JSON.parse(JSON.stringify(result[0])));
            }
        );
    });
};
/* const getDeliveryBoyData = (delivery_boy_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            "select * from delivery_partner where id = ?", [delivery_boy_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(JSON.parse(JSON.stringify(result[0])));
            }
        );
    });
}; */
const placeOrder = async(data, callback) => {
    var pIdArray = data.product_id.split(",");
    var quantity = data.quantity.split(",");
    const orderId = data.order_id;
    // const addressId = data.address_id;
    // get the user address data using address id
    // var addressData = await getAddressData(data.address_id);
    // generating otp
    const otp = Math.floor(1000 + Math.random() * 9000);
    // inserting order data to customer_order_table
    const dataInserted = await insertOrderData(data, "addressData", orderId, otp);
    // inserting order item data to order_item_table
    insertOrderItemMain(pIdArray, quantity, orderId);
    // getting user and restaurant data for sending notification
    const userData = await getUserData(data.user_id);
    const restaurantData = await getRestaurantData(data.partner_id);

    // sending notification to user pending
    const customerName = userData.name;
    const customerFcmToken = userData.fcm;
    const cutomerNotificationTitle = "Order Confirmed";
    const customerNotificationBody =
        "Dear " +
        userData.Customer_name +
        " , " +
        "Your order with order-Id #" +
        orderId +
        " has been confirmed.";

    //sending notification to resturant pending
    const resutaurant_name = restaurantData.name;
    const restaurantFcmToken = restaurantData.fcm;
    const restaurantNotificationTitle = "New Order Placed";
    const restaurantNotificationBody =
        "Dear " +
        restaurantData.shop_name +
        " , " +
        "You have new order #" +
        orderId +
        " for Rs " +
        data.total_price;

    /*
                              $this->sendOrderNotification($title, $body, $fcmToken);
                              $this->sendConfirmationNotification($CusTitle, $CusBody, $CusFcmToken);
                              return response()->json(['status' => 200, 'orderId' => $orderId]);
                              */

    const response = {
        status: 200,
        order_id: orderId,
    };
    callback(null, response);
};

module.exports = placeOrder;