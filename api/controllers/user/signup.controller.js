const { genSaltSync, hashSync } = require("bcrypt");
const { signUpService } = require("./../../services/user/signup.service");
const { check, validationResult } = require("express-validator");
const pool = require("./../../../config/database");
const validateSignup = () => {
    return [
        check("email").notEmpty().isEmail(),
        check("mobile").notEmpty(),
        check("name").notEmpty(),
        check("password").isLength({ min: 8 }),
    ];
};
const signUp = (req, res) => {
    console.log("res... " + req.body.name);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.array(),
        });
    }
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    signUpService(body, (err, results) => {
        if (err) {
            res.status(500).send({
                status: 500,
                message: error,
            });
        } else
            res.status(200).send({
                status: 200,
                message: "account created",
            });
    });
};

module.exports = { signUp, validateSignup };