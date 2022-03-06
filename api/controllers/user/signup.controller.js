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
            console.log(err);
        } else
            res.send(results);
    });
}

module.exports = signUp;