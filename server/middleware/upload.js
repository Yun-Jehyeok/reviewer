const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const config = require('../config/index');

const { S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } = config;

AWS.config.update({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

const uploadS3 = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'fukinfriends',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `feed/${file.originalname}_${new Date().valueOf()}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = uploadS3;
