const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const blogSchema= new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
      token: {
          type: String,
          required: true
      }
},{timestamps: true});

const token=mongoose.model('token',blogSchema);
module.exports= token;