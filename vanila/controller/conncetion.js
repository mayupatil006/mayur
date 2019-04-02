const express = require('express')
const brands = require('../module/brand')
const category = require('../module/category')
const colgate = require('../module/colgate')
const feedback_answers = require('../module/feedback_answers')
const feedback_questions = require('../module/feedback_questions')
const order = require('../module/order')
const panel_login = require('../module/panel_login')
const product = require('../module/product')
const users = require('../module/user')
const isodate = require("isodate");


//1

module.exports.getbrands= async function(req,res){
//     //res.send('hello')
// brands.find().then(i => {
//          console.log(i)
//         res.json({total:i})
        
//    })
//module.exports.getData = async function(req,res){
    product.findOne({ product_id:10055})
    .populate('brand').exec((err, order) => {
      console.log("Populated order " , order.brand);
      res.json({"message":order.brand})
    })
}

//2
module.exports.getproduct= async function(req,res){
    product.aggregate([{
        $group:{_id:"$category_name",product:{$push:'$$ROOT'}}
    }])
    .then(i => {
         console.log(i)
        res.json({total:i})
        
    })
}
//3
module.exports.getColgate = async function(req,res){
    colgate.find({colgate:user_No}).count()
    .populate('verifedBy').exec((err, panellogin) => {
        console.log("Populated order " , +panellogin);
        res.json({panellogin})
      })
}


//5
module.exports. getTotal= async function(req,res){
//          order.aggregate([{
//             $group:{_id:"$product_name",Myresult:{$sum:1},products:{$push:'$$ROOT'}}
//         }])
//         .then(i => {
//              console.log(i)
//             res.json({total:i})
            
//         })
// }
order.aggregate([
    {
      $lookup:
        {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "orders_details"
        }
   },{
      $limit:10
   },
   {
    $project:
    {
      product:{$arrayElemAt:['$orders_details',0]},
      order_id:1
    }
   },{
     $project:{
       'product.sub_category_name':1
     }
   }
 ]) .then(i => {
                 console.log(i)
                res.json({total:i})
                
            })
}

//4
module.exports.getans = async function(req,res){
    feedback_answers.find({question_id:"5afd527716b2454ec9c0c04f"})
    .populate({
        path:'user_id',
        select:'userId name email mobile'
    }).exec((err,user) => {
        // console.log("Populated order " , +user);
        res.json({user})
      })
}

//6
module.exports.getDate = async function(req,res){
  order.find({created_at : { $gte :("2018-11-01T00:00:00Z"), $lte:("2018-11-21T23:59:59Z")}
  }).then(i => {
    console.log(i)
   res.json({total:i})
   
})
}


//7 and
module.exports.getor = async function(req,res){
  product.find({ $or: [ { quantity: { $gt: 60 } }, { category_name: 'Downloads'} ] } ).then(i=>{
    console.log(i)
    res.json({total:i})
  })

}

//8
module.exports.getand = async function(req,res){
  product.find({ $and: [ { quantity: 0}, { category_name: 'Downloads'} ] } ).then(i=>{
    console.log(i)
    res.json({total:i})
  })

}
//9
module.exports.getnor = async function(req,res){
  order.find({ $nor: [ { status: 'cancelled'}, { feedback_status: true} ] } ).then(i=>{
    console.log(i)
    res.json({total:i})
  })

}