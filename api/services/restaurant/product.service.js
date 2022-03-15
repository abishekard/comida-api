const database = require("./../../../config/database");

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
    createProductService: (data, callback) => {
        /* 'item_name' => 'required',
                    'item_image' => 'required|mimes:png,jpg',
                    'item_price' => 'required',
                    'veg_non_veg' => 'required',
                    'category' => 'required',
                    'price_type' => 'required',
                    'discount' => 'required',
                    'partner_id' => 'required'
                     */
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