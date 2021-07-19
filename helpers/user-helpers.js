
var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
var objectId = require('mongodb').ObjectID

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10) //await because as nodejs is single threaded ,it will work asynchrously so we we have to wait for password encryption and then next steps should be executed
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.ops[0])
            })
        })        
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user= await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log('login success')
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login failed')
                        resolve({status:false})
                    }
                })

            }else{
                console.log('login failed')
                resolve({status:false})
            }
        })
    },

    addToCart:(proId,userId)=>{
        let proObj={
            item:objectId(proId),
            quantity:1
        }
        return new Promise(async(resolve,reject)=>{
            let userCart= await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)}) 
             // console.log("USER_CART = "+JSON.stringify(userCart))


            if(userCart){ // to check if there is a cart for the given user
                let proExist=userCart.products.findIndex(product=>product.item==proId)//findindex 's product works like "for each" if "0" product is there if "-1" product is not there
                console.log(proExist);
                if(proExist!=-1){ // products array is not empty i.e the given product is already in array, so we should increment the quantity of the given product
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({'products.item':objectId(proId)},
                    {
                        $inc:{'products.$.quantity':1}
                    }
                    ).then(()=>{
                        resolve()
                    })
                }else{ // if the cart doesn't have the product we just added

                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({user:objectId(userId)},
                        {
                            $push:{products:proObj}
                            
                        }
                        
                    ).then((response)=>{
                        resolve()
                    })
                }
            }else{//if there is no cart for the user
                let cartObj={
                    user:objectId(userId),
                    products:[proObj]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },

    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([ //geting cart 
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTION,
                        localField:'item', //projected item in cart
                        foreignField:'_id', //-_id in product collection
                        as:'product'

                    }
                }                
            ]).toArray()
            console.log("~~~~CART ITEMS >>> "+JSON.stringify(cartItems))
            console.log(JSON.stringify(cartItems[0].product) +"\n"+ JSON.stringify(cartItems[1].product)+"\n"+JSON.stringify(cartItems[2].product));
            resolve(cartItems)
        })
    },
    getCartCount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count=0
            let cart=await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
            if(cart){
                count=cart.products.length
            }
            resolve(count)
        })
    }


}




// {
                //     $lookup:{
                //         from:collection.PRODUCT_COLLECTION,// from product collection
                //         let:{proList:'$products'}, // in cart collection
                //         pipeline:[
                //             {
                //                 $match:{
                //                     $expr:{
                //                         $in:['$_id',"$$proList"] //_id is in products collection whereas proList is in cart collection
                //                     }
                //                 }

                //             }
                            
                //         ],
                //         as:'cartItems'

                //     }
                // }