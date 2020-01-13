const
    mongoose = require('mongoose')

const Coordinate = require('./../models/coordinate.models');


exports.coordinateList = async (req, res) => {
    const data = await Coordinate.find()

    return res.status(200).json({
        data
    })
}

exports.coordinateListByKec = async (req, res) => {
    var kec = await req.body['data[]']
    if (!Array.isArray(kec)) {
        kec = [kec]
    }

    const data = await Coordinate.aggregate([{
        $match: {
            kec: {
                $in: kec
            }
        }
    }])

    // console.log(data)
    return res.status(200).json({
        data
    })
}

exports.coordinateSearch = async (req, res) => {
    var body = await req.body.search
    if (!Array.isArray(body)) {
        body = body.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
    else {
        body.map((b, i) => {
            body[i] = b.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })
        })
    }


    var data = await Coordinate.find({ Nama_Toko: { $in: body } })

    // await body.map(async (b, i) => {
    //     const d = await Coordinate.find({
    //         'properties.Nama_Toko': {
    //             $regex: new RegExp(b)
    //         }
    //     })

    //     data[i] = d
    // })

    await console.log(data)

    await res.status(200).json({
        message: "OK",
        data
    })
}

exports.coordinateAdd = async (req, res) => {
    try {
        const body = await req.body;
        const file = await req.file;

        const newCoordinate = new Coordinate({
            _id: mongoose.Types.ObjectId(),
            geometry: {
                coordinates: [parseFloat(body.x), parseFloat(body.y)]
            },
            kec: body.kec,
            properties: {
                OBJECTID: mongoose.Types.ObjectId(),
                No_: parseInt(Math.random() * 1000),
                Nama_Toko: body.nama.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }),
                Alamat: body.alamat,
                X: parseFloat(body.x),
                Y: parseFloat(body.y),
                Foto: file.filename
            }
        })

        // console.log(newCoordinate)

        await newCoordinate.save()

        return res.status(201).json({
            message: "Created new Coordinates success !",
            newCoordinate
        })
    }
    catch (err) {
        return res.status(500).json({
            err
        })
    }
}