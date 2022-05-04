const { loginService } = require("./../../services/user/login.service");

const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const validateLogin = () => {
    return [check("email").notEmpty(), check("password").notEmpty()];
};

const logIn = (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        res.status(400).send({
            status: 400,
            message: validationError,
        });
        return;
    }
    const body = req.body;
    console.log(body);
    loginService(body, (err, results) => {
        if (err) {
            res.send(err);
            return;
        }
        if (!results[0]) {
            res.status(400).send({
                success: 0,
                message: "invalid email or password",
            });
            return;
        }

        console.log(results[0]);
        const passResult = compareSync(body.password, results[0].password);
        if (passResult) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwerty1234");

            return res.json({
                success: 1,
                message: "login successful",
                token: jsontoken,
            });
        } else {
            return res.json({
                success: 0,
                message: "invalid password",
            });
        }
    });
};

module.exports = { logIn, validateLogin };