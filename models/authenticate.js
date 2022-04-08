const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const blogSchema= new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true
      }
},{timestamps: true});

const details=mongoose.model('detail',blogSchema);
module.exports= details;