// index.js
const firebaseAdmin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
const { v4: uuidv4 } = require("uuid");

const serviceAccount = require("./../../../public/comida-35ebc-firebase-adminsdk-p7ss8-764e03870d.json");

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://comida-35ebc.appspot.com`);

async function uploadFoodImage(img_file, filename) {
    return new Promise((resolve, reject) => {
        const blob = storageRef.file("product_images/" + filename);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: img_file.mimetype,
            },
        });

        blobStream.on("error", (err) => console.log(err));
        // If all is good and done
        blobStream.on("finish", () => {
            // Assemble the file public URL
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storageRef.name}/o/product_images%2F${filename}?alt=media&file_name=${img_file.originalname}`;
            console.log(publicUrl);
            resolve(publicUrl);
        });

        blobStream.end(img_file.buffer);
    });
}

async function uploadUserProfileImage(img_file, filename) {
    return new Promise((resolve, reject) => {
        const blob = storageRef.file("user_profile_images/" + filename);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: img_file.mimetype,
            },
        });

        blobStream.on("error", (err) => console.log(err));
        // If all is good and done
        blobStream.on("finish", () => {
            // Assemble the file public URL
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storageRef.name}/o/user_profile_images%2F${filename}?alt=media&file_name=${img_file.originalname}`;
            console.log(publicUrl);
            resolve(publicUrl);
        });

        blobStream.end(img_file.buffer);
    });
}

const generateFileName = () => {
    const name1 = "fd_";
    const name2 = "_img_";
    const rand1 = Math.floor(100 + Math.random() * 900);
    const rand2 = Math.floor(100 + Math.random() * 900);
    const rand3 = Math.floor(100 + Math.random() * 900);
    const finalName = name1 + rand1 + "x" + rand2 + name2 + rand3;
    return finalName;
};

module.exports = {
    uploadFoodImageService: async(file, callback) => {
        const fileName = generateFileName() + ".jpg";
        const url = await uploadFoodImage(file, fileName);
        console.log(url);
        callback(null, url);
    },
    uploadUserProfileImageService: async(file, callback) => {
        const fileName = generateFileName() + ".jpg";
        const url = await uploadUserProfileImage(file, fileName);
        console.log(url);
        callback(null, url);
    },
    deleteFoodImageService: (url, callback) => {
        const current_url = new URL(url);
        // get access to URLSearchParams object
        const search_params = current_url.searchParams;
        // get url parameters
        const file_name = search_params.get("file_name");

        storageRef
            .file(`product_images/${file_name}`)
            .delete()
            .then(() => {
                callback(null, "file deleted");
            })
            .catch((err) => {
                callback(err);
            });
    },
};