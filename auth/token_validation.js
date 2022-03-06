const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, "qwerty1234", (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "invalid token",
                    });
                } else {
                    req.user_id = decoded.id;
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "unauthorized access",
            });
        }
    },
};