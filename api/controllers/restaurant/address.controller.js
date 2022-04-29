const {
    setAddressService,
    setShopDetailSevice,
} = require("./../../services/restaurant/address.service");
const { check, validationResult } = require("express-validator");

const validateAddress = () => {
    return [
        check("address").notEmpty(),
        check("state").notEmpty(),
        check("city").notEmpty(),
        check("local_city").notEmpty(),
        check("pincode").notEmpty().isNumeric(),
        check("latitude").notEmpty().isNumeric(),
        check("longitude").notEmpty().isNumeric(),
        check("id").notEmpty().isNumeric(),
    ];
};

const setAddress = (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        res.status(400).send({
            status: 400,
            message: validationError,
        });
        return;
    }

    setAddressService(req.body, (error, result) => {
        if (error)
            res.status(500).send({
                status: 500,
                message: "sql error",
            });
        else
            res.status(200).send({
                status: 200,
                data: "address saved",
            });
    });
};

module.exports = { setAddress, validateAddress };