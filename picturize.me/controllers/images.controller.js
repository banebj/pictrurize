// Accessing the Service that we just created

const ImageService = require('../services/images.service')
const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path')
const Grid = require('gridfs-stream');

let conn = mongoose.connection

let gfs = null
conn.once('open', () => {
    Grid.mongo = mongoose.mongo;
    gfs = Grid(conn.db);
})

const storage = require('multer-gridfs-storage')({
    url: 'mongodb://127.0.0.1:27017/picturize',
    file: (req, file) => {
        console.debug(file)
        return {
            filename: 'image_' + Date.now()
        };
    },
    /** With gridfs we can store aditional meta-data along with the file */
    metadata: function (req, file, cb) {
        cb(null, { originalname: file.originalname });
    },
    root: 'fs' //root name for collection to store files into
});

const upload = multer({ //multer settings for single upload
    storage: storage
}).single('file');

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.uploadImage = async function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    });
}

exports.viewImage = async function (req, res, next) {
    gfs.collection('fs'); //set collection name to lookup into
    console.debug(req.params)
    /** First check if file exists */
    gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
        console.debug(files)
        if (!files || files.length === 0) {
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "fs"
        });
        /** set the proper content type */
        res.set('Content-Type', files[0].contentType)
        /** return response */
        return readstream.pipe(res);
    });
}

exports.getImages = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var todos = await ImageService.getImages({}, page, limit)

        // Return the todos list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: todos, message: "Succesfully Images Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.createImage = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        location: req.body.location,
        file: req.body.file
    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdImage = await ImageService.createImage(todo)
        return res.status(201).json({ status: 201, data: createdImage, message: "Succesfully Created ToDo" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Image Creation was Unsuccesfull" })
    }
}

exports.updateImage = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var id = req.body._id;

    console.log(req.body)

    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null,
        location: req.body.location ? req.body.location : null,
        file: req.body.file ? req.body.file : null
    }

    try {
        var updatedImage = await ImageService.updateImage(todo)
        return res.status(200).json({ status: 200, data: updatedImage, message: "Succesfully Updated Tod" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeImage = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await ImageService.deleteImage(id)
        return res.status(204).json({ status: 204, message: "Succesfully Image Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}