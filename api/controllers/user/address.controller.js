const {
    createrAddressService,
    deleteAddressService,
    showAddressService,
} = require("./../../services/user/address.service");

const validator = require("validator");

module.exports = {
    createAddress: (req, res) => {
        const data = req.body;
        const validationRule = {
            address: "required",
            state: "required",
            city: "required",
            local_city: "required",
            landmark: "required",
            pincode: "required",
            locality: "required",
            latitued: "required",
            longitude: "required",
            address_type: "required",
        };

        /*  validator(data, validationRule, {}, (err, status) => {
                if (err) {
                    res.status(412).send({
                        status: 412,
                        error: err,
                    });
                } else {
                    next(data);
                }
            }).then(
               
            ); */
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
    },
    deleteAddress: (req, res) => {
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
    },
    showAddress: (req, res) => {
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
    },
};