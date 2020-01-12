const express = require('express'),
    mongoose = require('mongoose'),
    multer = require('multer');


const {
    coordinateList,
    coordinateListByKec,
    coordinateAdd
} = require('./../controllers/coordinate.controllers')

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp_directories/')
    },
    filename: function (req, file, cb) {
        cb(null, Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + file.originalname)
    }
})
var upload = multer({ storage: storage })

router.get('/', coordinateList)
router.post('/', coordinateListByKec)
router.post('/add', upload.single("foto"), coordinateAdd)


module.exports = router;