const {
    createrAddressService,
    deleteAddressService,
    showAddressService,
} = require("./../../services/user/address.service");

const { check, validationResult } = require("express-validator");

const validateAddress = () => {
    return [
        check("address").notEmpty(),
        check("state").notEmpty(),
        check("city").notEmpty(),
        check("local_city").notEmpty(),
        check("landmark").notEmpty(),
        check("pincode").notEmpty().isNumeric(),
        check("locality").notEmpty(),
        check("latitude").notEmpty().isNumeric(),
        check("longitude").notEmpty().isNumeric(),
        check("address_type").notEmpty(),
        check("user_id").notEmpty().isNumeric(),
    ];
};

const createAddress = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            status: 400,
            error: errors.array(),
        });

    const data = req.body;
    createrAddressService(data, (error, result) => {
        if (error)
            res.status(500).send({
                status: 500,
                message: error,
            });
        else
            res.status(200).send({
                status: 200,
                message: "address created",
            });
    });
};
const deleteAddress = (req, res) => {
    const userId = req.params.id;

    deleteAddressService(userId, (error, result) => {
        if (error)
            res.status(500).send({
                staus: 500,
                message: error,
            });
        else
            res.status(200).send({
                status: 200,
                message: "addresss deleted",
            });
    });
};
const showAddress = (req, res) => {
    const addressId = req.params.id;
    showAddressService(addressId, (error, result) => {
        if (error)
            res.status(500).send({
                status: 500,
                message: error,
            });
        else
            res.status(200).send({
                staus: 200,
                data: result,
            });
    });
};
module.exports = {
    validateAddress,
    createAddress,
    deleteAddress,
    showAddress,
};