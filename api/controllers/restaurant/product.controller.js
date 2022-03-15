const {
    createProductService,
    editProductService,
    showProductService,
    showProductDetailService,
    deleteProductService,
    changeStockService,
} = require("./../../services/restaurant/product.service");

module.exports = {
    createProduct: (req, res) => {},
    editProduct: () => {},
    showProduct: (req, res) => {
        const partner_id = req.body.partner_id;

        showProductService(partner_id, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: error,
                });
            else res.status(200).send(result);
        });
    },
    showProductDetail: (req, res) => {
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
};