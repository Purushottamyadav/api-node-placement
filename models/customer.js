const mongoose=require("mongoose")

const newSchema= new mongoose.Schema({

customer_id:{
    type:String
},
customer_name:{
    type:String
},
email:{
    type:String,
    unique:true
},
balance:{
    type:Number
}


})
module.exports= mongoose.model("customer",newSchema)