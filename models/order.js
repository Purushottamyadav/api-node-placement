const mongoose=require("mongoose");
 const orderSchema= new mongoose.Schema({
    customer_id:{
        type:String
    },
    inventory_id:{
        type:String
    },
    item_name:{
        type:String
    },
    quantity:{
        type:Number
    }
 })
 module.exports=mongoose.model("orders",orderSchema);