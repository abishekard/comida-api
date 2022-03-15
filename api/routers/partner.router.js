const router = require("express").Router();
const {
    getNewOrder,
    getProgressOrder,
    getCompletedOrder,
    getOrderDetail,
    queueOrder,
    dispatchOrder,
} = require("./../controllers/restaurant/order.controller");
const {
    createProduct,
    editProduct,
    showProduct,
    showProductDetail,
    deleteProduct,
    changeStock,
} = require("./../controllers/restaurant/product.controller");
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage });

// TO VALIDATE
router.get("/order/new/:partner_id", getNewOrder);
router.get("/order/progress/:partner_id", getProgressOrder);
router.get("/order/completed/:partner_id", getCompletedOrder);
router.get("/order/detail/:order_id", getOrderDetail);
router.post("/order/queue", queueOrder);

router.get("/product/show", showProduct);
router.get("/product/detail/show", showProductDetail);
router.post("/product/delete/:product_id", deleteProduct);
router.post("/product/change/stock", changeStock);
// TO VALIDATE

// TO CREATE

router.post("/order/dispatch", dispatchOrder);
router.post("/product/create", upload.single("image"), createProduct);
router.post("/product/edit", editProduct);
// TO CREATE

// TO CREATE

router.post("/patner/get/address");
router.post("/patner/get/shop");
router.post("/patner/profile/show/:partner_id");

// TO CREATE

module.exports = router;