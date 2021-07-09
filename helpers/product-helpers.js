// DATABASE OPERATIONS

var db=require('../config/connection')
var collection=require('../config/collections')

module.exports={

    addProduct:(product,callback)=>{  // for admin to add a product
        console.log(product)
        db.get().collection('product').insertOne(product).then((data)=>{
            //console.log(data);
            callback(data.ops[0]._id)

        })
    },

    getAllProducts:()=>{
        return new Promise(async (resolve,reject)=>{
            let products= await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray() //await beacuse we have to wait till the data is fetched from db
            resolve(products)
        })
    }


}