const {
    signUp,
    validateSignup,
} = require("./../controllers/user/signup.controller");
const logIn = require("./../controllers/user/login.controller");
const getUserProfile = require("./../controllers/user/profile.controller");
const {
    placeOrder,
    validatePlaceOrder,
} = require("./../controllers/user/placeOrder.controller");
const { checkToken } = require("./../../auth/token_validation");
const {
    validateAddress,
    createAddress,
    deleteAddress,
    showAddress,
} = require("./../../api/controllers/user/address.controller");
const {
    getAllRestaurant,
    getProductCategoryWise,
    getPartnerinfo,
} = require("./../controllers/user/restaurant-data.controller");
const {
    getComment,
    setComment,
} = require("./../controllers/user/commentAndRating.controller");
const { storeFcm } = require("./../controllers/user/fcm.controller");
const {
    getnewOrder,
    getHistoryOrder,
    getOrderDetail,
} = require("./../controllers/user/orders.controller");
const router = require("express").Router();

//router.get("/profile/:id", checkToken, getUserProfile);

//completed
router.get("/all-restaurant", getAllRestaurant);
router.get("/partner/info/:id", getPartnerinfo);
router.post("/address/create", validateAddress(), createAddress);
router.post("/address/delete/:id", deleteAddress);
router.get("/address/show/:id", showAddress);
router.get("/profile/show/:id", getUserProfile);

router.get("/orders/new/:user_id", getnewOrder);
router.get("/orders/completed/:user_id", getHistoryOrder);
router.get("/orders/detail/:order_id", getOrderDetail);
router.post("/signup", validateSignup(), signUp);
router.post("/login", logIn);
router.get("/product/category/all/:partner_id", getProductCategoryWise);
router.post("/placeOrder", validatePlaceOrder(), placeOrder);
//completed

// TO DO (validation)

router.post("/comment/set", setComment);
router.get("/comment/get", getComment);
router.post("/store/fcm", storeFcm);

// TO DO (validation)

// TO CREATE

// TO CREATE

module.exports = router;