const {
    getNewOrderService,
    getProgresOrderService,
    getCompletedOrderService,
    getOrderDetailService,
    queueOrderService,
    dispatchOrderService,
} = require("./../../services/restaurant/order.service");

module.exports = {
    getNewOrder: (req, res) => {
        getNewOrderService(req.params.partner_id, (error, result) => {
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
    getProgressOrder: (req, res) => {
        getProgresOrderService(req.params.partner_id, (error, result) => {
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
    getCompletedOrder: (req, res) => {
        getCompletedOrderService(req.params.partner_id, (error, result) => {
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
    queueOrder: (req, res) => {
        if (req.body.order_id == undefined)
            res.status(400).send({
                status: 400,
                message: "order_id required",
            });
        else
            queueOrderService(req.body.order_id, (error, result) => {
                if (error)
                    res.status(500).send({
                        status: 500,
                        message: error,
                    });
                else
                    res.status(200).send({
                        status: 200,
                        data: "order queued",
                    });
            });
    },
    dispatchOrder: (req, res) => {
        if (req.body.order_id == undefined)
            res.status(400).send({
                status: 400,
                message: "order_id is required",
            });
        else
            dispatchOrderService(req.body.order_id, (error, result) => {
                if (error)
                    res.status(500).send({
                        status: 500,
                        message: error,
                    });
                else
                    res.status(200).send({
                        status: 200,
                        data: "order dispatched",
                    });
            });
    },
};