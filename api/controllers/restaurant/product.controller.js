const {
    createProductService,
    editProductService,
    showProductService,
    showAllProductService,
    showProductDetailService,
    deleteProductService,
    changeStockService,
} = require("./../../services/restaurant/product.service");
const {
    uploadFoodImageService,
    deleteFoodImageService,
} = require("./../../services/restaurant/firebaseUpload.service");
const { check, validationResult } = require("express-validator");
const validatProduct = () => {
    return [
        check("item_name").notEmpty(),
        check("item_price").notEmpty(),
        check("veg_non_veg").notEmpty(),
        check("category").notEmpty(),
        check("price_type").notEmpty(),
        check("discount").notEmpty(),
        check("partner_id").notEmpty(),
    ];
};
module.exports = {
    createProduct: (req, res) => {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            res.status(400).send({
                status: 400,
                message: validationError,
            });
            return;
        } else if (req.file == undefined) {
            res.status(400).send({
                status: 400,
                message: "image field required",
            });
            return;
        }
        console.log(req.body);

        uploadFoodImageService(req.file, (error, url) => {
            createProductService(req.body, url, (error, result) => {
                if (error) {
                    res.status(500).send({
                        status: 500,
                        message: "sql error",
                    });
                } else {
                    res.status(200).send({
                        status: 200,
                        data: "food item creted",
                    });
                }
            });
        });
    },
    editProduct: () => {},
    showProduct: (req, res) => {
        if (req.body.partner_id == undefined) {
            res.status(400).send({
                status: 200,
                message: "partner_id required",
            });
            return;
        }
        const partner_id = req.body.partner_id;

        showProductService(partner_id, (error, result) => {
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
    showAllProduct: (req, res) => {
        if (req.body.partner_id == undefined) {
            res.status(400).send({
                status: 200,
                message: "partner_id required",
            });
            return;
        }
        const partner_id = req.body.partner_id;

        showAllProductService(partner_id, (error, result) => {
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
    showProductDetail: (req, res) => {
        if (req.body.product_id == undefined) {
            res.status(400).send({
                status: 200,
                message: "product_id required",
            });
            return;
        }
        showProductDetailService(req.body.product_id, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    data: result[0],
                });
        });
    },
    deleteProduct: (req, res) => {
        deleteProductService(req.params.product_id, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    data: "product deleted",
                });
        });
    },
    changeStock: (req, res) => {
        if (req.body.product_id == undefined) {
            res.status(400).send({
                status: 200,
                message: "product_id required",
            });
            return;
        }
        if (req.body.in_stock == undefined) {
            res.status(400).send({
                status: 200,
                message: "in_stock required",
            });
            return;
        }
        changeStockService(
            req.body.product_id,
            req.body.in_stock,
            (error, result) => {
                if (error)
                    res.status(500).send({
                        status: 500,
                        message: error,
                    });
                else
                    res.status(200).send({
                        status: 200,
                        data: "stock changed",
                    });
            }
        );
    },
    validatProduct,
};