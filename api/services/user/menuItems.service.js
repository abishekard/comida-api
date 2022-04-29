const database = require("../../../config/database");

const getCategories = (partner_id) => {
    return new Promise((resolve, rject) => {
        database.query(
            "select distinct category from product_table where partner_id = ?", [partner_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(result);
            }
        );
    });
};
const getCategoryData = (category, partner_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            "select * from product_table where category=? and partner_id = ?", [category, partner_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(result);
            }
        );
    });
};

const getCategoryWiseData = (categories, partner_id) => {
    return new Promise((resolve, reject) => {
        const callback = (menuArray, itemProccesed) => {
            resolve(menuArray);
        };
        var menuArray = [];
        var itemProccesed = 0;
        categories.forEach(async(element) => {
            await getCategoryData(element.category, partner_id).then((item) => {
                const menuData = {
                    category: element.category,
                    category_data: item,
                };
                menuArray.push(menuData);
                itemProccesed = itemProccesed + 1;

                if (itemProccesed == categories.length)
                    callback(menuArray, itemProccesed);
            });
        });
    });
};

const getRestaurantData = (partner_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            "select * from partner where id = ?", [partner_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(result[0]);
            }
        );
    });
};

module.exports = {
    getMenuItemCategoryWiseService: async(partner_id, callback) => {
        const categories = await getCategories(partner_id);
        const menuArray = await getCategoryWiseData(categories, partner_id);
        const restaurantData = await getRestaurantData(partner_id);
        const response = {
            partner_id: restaurantData.id,
            shop_name: restaurantData.shop_name,
            address: restaurantData.address,
            shop_image: restaurantData.shop_image,
            speciality: restaurantData.speciality,
            open_time: restaurantData.open_time,
            close_time: restaurantData.close_time,
            available: restaurantData.available,
            rating: restaurantData.rating,
            data: menuArray,
        };
        callback(null, response);
    },
    getAllMenuItemService: (callback) => {
        database.query(
            "select * from product_table", [],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, JSON.parse(JSON.stringify(result)));
            }
        );
    },
};