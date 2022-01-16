const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var userSchema = new Schema({
    name:{
        type:String,
        recquired:true
    },
    email:{
        type:String,
        recquired:true
    },
    gender:{
        type:String,
        recquired:true
    },
    status:{
        type:String,
        recquired:true
    }
},{timestamps:true});

const User=new mongoose.model('user',userSchema);
module.exports = User;