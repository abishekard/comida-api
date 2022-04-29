const {
    getProfileDataService,
} = require("./../../services/restaurant/profile.service");

const getProfileData = (req, res) => {
    const partner_id = req.params.partner_id;

    getProfileDataService(partner_id, (error, result) => {
        if (error)
            res.status(400).send({
                status: 400,
                data: error,
            });
        else
            res.status(200).send({
                status: 200,
                data: result,
            });
    });
};

module.exports = { getProfileData };