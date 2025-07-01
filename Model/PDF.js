const mongoose = require('mongoose');
const PDFModel = mongoose.Schema({
    name :{type:String},
    pdf :{type:Buffer},
    contentType :{type:String},
    userID:{type:String}
},{timestamps:true});

module.exports = mongoose.model("PDFFile", PDFModel)