const express=require("express");
const mongoose=require("mongoose")
const app=express();
const port=3000;

const Customer=require("./models/customer");
const Inventory=require("./models/inventorytable");
const Order=require("./models/order");
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/api_web_tech_assignment")
.then(()=>{console.log("connected")}).catch((e)=>{console.log("error",e)})

// To create a new posting
app.post("/customer",(req,res)=>{
    const user= new Customer(req.body)
    user.save()
    .then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(404).send(e)
    })
});
// To get all customer-----
app.get("/customer", async (req,res)=>{
    try{
        const data= await Customer.find({})
        res.send(data)
    }catch(e){
           res.send(e)
    }
    
});

//to add inventory------

app.post("/inventory",(req,res)=>{
    const newitem=new Inventory(req.body)
    newitem.save().then(()=>{
        res.status(201).send(newitem)
    }).catch((e)=>{
        res.send(e)
    })
});

//To get all inventory-----
app.get("/inventory", async(req,res)=>{
try{
    const data= await Inventory.find({})
    res.send(data)
}catch(e){
    res.send(e)
}
});
// to get electronics items------

app.get("/inventory/electronics", async (req,res)=>{

    try{
        const data= await Inventory.find({inventory_type:"ELECTRONICS"})
        res.send(data)
    }catch(e){
        res.send(e)
    }
   
});

// To get furniture items only------
app.get("/inventory/furniture", async (req,res)=>{

    try{
        const data= await Inventory.find({inventory_type:"FURNITURE"})
        res.send(data)
    }catch(e){
        res.send(e)
    }
   
});

// To create a order -------
app.post("/order",async (req,res)=>{
    try{
        const{customer_id,inventory_id,item_name,quantity}=req.body;
        const alldata= await Inventory.findOne({item_name:item_name})

        if(quantity<alldata.available_quantity){
            const newOrder= await Order.create(req.body)
            let remaining_stock=alldata.available_quantity-quantity
            let _id=alldata._id

            const update = await Inventory.findByIdAndUpdate({_id:_id,available_quantity:remaining_stock})

           const updateStock= await Inventory.findOne({item_name:item_name})
            return res.json({status:"Item is in stock",message:"order placed succesfully",data:newOrder})
        }
        else{
            return res.json({status:"out of stock",message:"sorry for now"})
        }


    }catch(e){
        res.send(e)
    }
})






app.listen(port,()=>{console.log(`your app is listining on port ${port}`)})