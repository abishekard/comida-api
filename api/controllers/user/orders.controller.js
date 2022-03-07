const {
    getNewOrderService,
    getOrderHistoryService,
    getOrderDetailService,
} = require("./../../services/user/orders.service");

module.exports = {
    getnewOrder: (req, res) => {
        getNewOrderService(req.params.user_id, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    data: result,
                });
        });
    },
    getHistoryOrder: (req, res) => {
        getOrderHistoryService(req.params.user_id, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    data: result,
                });
        });
    },
    getOrderDetail: (req, res) => {
        getOrderDetailService(req.params.order_id, (error, result) => {
            res.status(200).send(result);
        });
    },
};