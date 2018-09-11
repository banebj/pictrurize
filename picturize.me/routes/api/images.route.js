var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var ImageController = require('../../controllers/images.controller');


// Map each API to the Controller FUnctions

router.get('/', ImageController.getImages)

// router.get('/indexed/:index', ImageController.getImageOnIndex)

router.post('/', ImageController.createImage)

router.put('/', ImageController.updateImage)

router.delete('/:id', ImageController.removeImage)

router.post('/upload',  ImageController.uploadImage)

router.get('/file/:filename',  ImageController.viewImage)


// Export the Router

module.exports = router;