const placeOrderService = require('./../../services/user/placeOrder.service');

const placeOrder = (req, res) => {

    console.log(req.body);

    placeOrderService(req.body, (err, result) => {

        if (err)
            res.send(err);
        else
            res.send(result);
    })
}

module.exports = placeOrder;