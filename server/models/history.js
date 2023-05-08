const mongoose = require ("mongoose");

const HistorySchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    desc:{type:String, unique:true} ,
    img:{type:String},
    trailer:{type:String, unique:true},
    limit:{type:Number},
    year:{type:String},
    genre:{type:String},
    userid:{type:String, require:true},
    
},{timestamps: true}
);

module.exports = mongoose.model("History", HistorySchema);