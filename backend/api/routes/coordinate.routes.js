const express = require('express'),
    mongoose = require('mongoose'),
    multer = require('multer');


const {
    coordinateListByKec,
    coordinateAdd,
    coordinateSearch,
    coordinateList,
    coordinateUpdate,
    deleteCoordinate
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
router.post('/search', coordinateSearch)
router.post('/add', upload.single("foto"), coordinateAdd)

router.patch('/update/:id', coordinateUpdate)
router.delete('/delete/:id', deleteCoordinate)

module.exports = router;