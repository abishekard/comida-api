const {
    getProfileService,
    updateProfileUrlService,
} = require("./../../services/user/profile.service");
const {
    uploadUserProfileImageService,
} = require("./../../services/restaurant/firebaseUpload.service");

const getUserProfile = (req, res) => {
    const userId = req.params.id;
    console.log("....userid...." + userId);
    getProfieService(userId, (err, results) => {
        if (err) {
            res.json({
                success: 0,
                message: "no user found",
            });
        } else {
            res.json({
                success: 1,
                message: results[0],
            });
        }
    });
};

const UpdateProfileImage = (req, res) => {
    const userId = req.params.user_id;
    console.log("....userid...." + userId);
    if (req.file == undefined) {
        res.status(400).send({
            status: 400,
            message: "image field required",
        });
        return;
    }
    uploadUserProfileImageService(req.file, (error, url) => {
        updateProfileUrlService(userId, url, (err, results) => {
            if (err) {
                res.json({
                    success: 0,
                    message: "no user found",
                });
            } else {
                res.json({
                    success: 200,
                    message: results,
                });
            }
        });
    });
};

module.exports = { getUserProfile, UpdateProfileImage };