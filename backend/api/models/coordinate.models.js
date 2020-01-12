const
    mongoose = require('mongoose')

const coordinateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {
        default: "Feature",
        type: String
    },
    id: mongoose.Schema.Types.ObjectId,
    geometry: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: Array,
        }
    },
    kec: {
        type: String,
        required: true
    },
    properties: {
        OBJECTID: {
            required: false,
            type: String,
        },
        No_: {
            required: false,
            type: String
        },
        Nama_Toko: {
            required: true,
            type: String,
        },
        Alamat: {
            required: true,
            type: String,
        },
        X: {
            required: true,
            type: Number,
        },
        Y: {
            required: true,
            type: Number,
        },
        Foto: {
            required: false,
            type: String
        }
    }
})

module.exports = mongoose.model('coordinates', coordinateSchema);