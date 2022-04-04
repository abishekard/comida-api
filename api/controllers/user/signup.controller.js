const { genSaltSync, hashSync } = require("bcrypt");
const { signUpService } = require("./../../services/user/signup.service");

const pool = require("./../../../config/database");

const signUp = (req, res) => {
    console.log("res... " + req.body.name);
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

module.exports = signUp;