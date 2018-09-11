var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ImageSchema = new mongoose.Schema({
    userId: Number,
    title: String,
    description: String,
    date: Date,
    status: String,
    location: String,
    file: String,
})

ImageSchema.plugin(mongoosePaginate)
const Image = mongoose.model('Image', ImageSchema)

module.exports = Image;