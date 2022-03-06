const profieService = require("./../../services/user/profile.service");


const getUserProfile = (req, res) => {

    const userId = req.params.id;
    console.log("....userid...." + userId);
    profieService(userId, (err, results) => {

        if (err) {
            res.json({
                success: 0,
                message: "no user found"
            });
        } else {
            res.json({
                success: 1,
                message: results[0]
            });
        }
    });

}

module.exports = getUserProfile;