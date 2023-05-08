const mongoose = require ("mongoose");

const MovieSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    desc:{type:String},
    img:{type:String},
    imgTitle:{type:String},
    imgSm:{type:String},
    trailer:{type:String},
    movie:{type:String},
    limit:{type:Number},
    year:{type:String},
    genre:{type:String},
    linkNetflix:{type:String},
},{timestamps: true}
);

module.exports = mongoose.model("Movie", MovieSchema);