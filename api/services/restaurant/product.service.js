const database = require("./../../../config/database");
const timestamp = require("time-stamp");

const getProductCategory = (partner_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `select distinct category from product_table where partner_id = ?`, [partner_id],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(result);
            }
        );
    });
};
const getCategoryItem = (category, partner_id) => {
    return new Promise((resolve, reject) => {
        database.query(
            `select * from product_table where partner_id=? and category=?`, [partner_id, category],
            (error, result, field) => {
                if (error) console.log(error);
                else resolve(result);
            }
        );
    });
};

module.exports = {
    createProductService: (data, item_image, callback) => {
        database.query(
            "insert into product_table (item_name,item_image,price,veg_non_veg,category,price_type,discount,partner_id,in_stock,created_at) values(?,?,?,?,?,?,?,?,?,?)", [
                data.item_name,
                item_image,
                data.item_price,
                data.veg_non_veg,
                data.category,
                data.price_type,
                data.discount,
                data.partner_id,
                1,
                timestamp("YYYY-MM-DD HH:mm:ss"),
            ],
            (error, result, field) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else callback(null, result);
            }
        );
    },
    editProductService: () => {},
    deleteProductService: (product_id, callback) => {
        console.log(product_id);
        database.query(
            `delete from product_table where id = ?`, [product_id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    showProductService: async(partner_id, callback) => {
        const categoryList = await getProductCategory(partner_id);
        console.log(categoryList);
        var response;
        for (var i in categoryList) {
            let temp = {
                category_name: categoryList[i].category,
                category_data: await getCategoryItem(
                    categoryList[i].category,
                    partner_id
                ),
            };
            try {
                response = [...response, temp];
            } catch (e) {
                response = [temp];
            }
        }

        callback(null, response);
    },
    showProductDetailService: (product_id, callback) => {
        database.query(
            `select * from product_table where id = ?`, [product_id],
            (error, result, field) => {
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
    changeStockService: (product_id, in_stock, callback) => {
        console.log(product_id, in_stock);
        database.query(
            `update product_table set in_stock = ? where id = ?`, [in_stock, product_id],
            (error, result, fields) => {
                console.log(error, result);
                if (error) callback(error);
                else callback(null, result);
            }
        );
    },
};