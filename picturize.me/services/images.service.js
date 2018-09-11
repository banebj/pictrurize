
var Image = require('../models/image.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List

exports.getImagesOnIndex = async function (filename) {
    try {
        let image = await Image.find({ filename: filename })
        return image;
    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Images')
    }
}
exports.getImages = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var images = await Image.find().sort({ date: -1}).limit(Number(limit))
        // ?.paginate(query, options)
        // Return the todod list that was retured by the mongoose promise
        return images;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Images')
    }
}

exports.createImage = async function (image) {

    // Creating a new Mongoose Object by using the new keyword
    var newImage = new Image({
        title: image.title,
        description: image.description,
        date: new Date(),
        status: image.status,
        location: image.location,
        file: image.file
    })

    try {

        // Saving the Todo 
        var saved = await newImage.save()

        return saved;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating Image")
    }
}

exports.updateImage = async function (image) {
    var id = image.id

    try {
        //Find the old Todo Object by the Id

        var baseImage = await Image.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Image")
    }

    // If no old Todo Object exists return false
    if (!baseImage) {
        return false;
    }

    console.log(baseImage)

    //Edit the Todo Object
    baseImage.title = image.title
    baseImage.description = image.description
    baseImage.status = image.status


    console.log(baseImage)

    try {
        var savedImage = await baseImage.save()
        return savedImage;
    } catch (e) {
        throw Error("And Error occured while updating the Image");
    }
}

exports.deleteImage = async function (id) {

    // Delete the Todo
    try {
        var deleted = await Image.deleteOne({ _id: id })
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Image")
    }
}