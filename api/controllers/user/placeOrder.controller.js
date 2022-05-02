const placeOrderService = require("./../../services/user/placeOrder.service");
const { check, validationResult } = require("express-validator");
const validatePlaceOrder = () => {
    return [
        check("user_id").notEmpty(),
        check("address").notEmpty(),
        check("product_id").notEmpty(),
        check("quantity").notEmpty(),
        check("total_price").notEmpty(),
        check("partner_id").notEmpty(),
        check("payment_method").notEmpty(),
        check("order_id").notEmpty(),
    ];
};
const placeOrder = (req, res) => {
    console.log(req.body);
    const validationError = validationResult(req);
    if (!validationError.isEmpty())
        res.status(400).send({
            status: 400,
            type: "validation error",
            message: validationError,
        });
    else
        placeOrderService(req.body, (err, result) => {
            if (err) res.send(err);
            else res.send(result);
        });
};

module.exports = {
    placeOrder,
    validatePlaceOrder,
};