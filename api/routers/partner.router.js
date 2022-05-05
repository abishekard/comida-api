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
    showAllProduct,
    showProductDetail,
    deleteProduct,
    changeStock,
    validatProduct,
} = require("./../controllers/restaurant/product.controller");
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage });

const {
    signUp,
    validateSignup,
} = require("./../controllers/restaurant/signup.controller");
const {
    logIn,
    validateLogin,
} = require("./../controllers/restaurant/login.controller");
const {
    getProfileData,
} = require("./../controllers/restaurant/profile.controller");
const {
    setAddress,
    validateAddress,
} = require("./../controllers/restaurant/address.controller");
// completed
router.post("/signUp", validateSignup(), signUp);
router.post("/login", validateLogin(), logIn);
router.get("/order/new/:partner_id", getNewOrder);
router.get("/order/progress/:partner_id", getProgressOrder);
router.get("/order/completed/:partner_id", getCompletedOrder);
router.get("/order/detail/:order_id", getOrderDetail);
router.post("/profile/show/:partner_id", getProfileData);
router.post("/set/address", validateAddress(), setAddress);
router.post("/order/queue", queueOrder);
router.post(
    "/product/create",
    upload.single("image"),
    validatProduct(),
    createProduct
);
router.get("/product/show", showProduct);
router.get("/product/show/all", showAllProduct);
router.get("/product/detail/show", showProductDetail);
router.post("/product/delete/:product_id", deleteProduct);
router.post("/product/change/stock", changeStock);
router.post("/order/dispatch", dispatchOrder);
// completed

// TO VALIDATE

// TO VALIDATE

// TO CREATE

router.post("/product/edit", editProduct);

router.post("/patner/set/shop");

// TO CREATE

module.exports = router;