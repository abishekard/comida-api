const {
    getAllRestaurantService,
    getProductCategoryWiseService,
    getPartnerInfoService,
} = require("./../../services/user/restaurant-data.service");
const {
    getMenuItemCategoryWiseService,
} = require("./../../services/user/menuItems.service");

module.exports = {
    getAllRestaurant: (req, res) => {
        getAllRestaurantService((error, result) => {
            if (error)
                res.status(500).send({
                    status: 200,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    data: result,
                });
        });
    },
    getProductCategoryWise: (req, res) => {
        const partnerId = req.params.partner_id;
        getMenuItemCategoryWiseService(partnerId, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: "database error",
                });
            else
                res.status(200).send({
                    status: 200,
                    data: result,
                });
        });
    },
    getPartnerinfo: (req, res) => {
        const partnerId = req.params.id;
        getPartnerInfoService(partnerId, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 200,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    data: result[0],
                });
        });
    },
};