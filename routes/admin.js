var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products})

  })
  
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product')

})

router.post('/add-product',(req,res)=>{
  // console.log(req.body)
  // console.log(req.files.Image)

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{ //to move images into separate folder
      if(!err){
        res.render
      }else{
        console.log(err);
      }
    }) //mv move which  is a function in middleware fileUpload
    res.render("admin/add-product")
  })
})

module.exports = router;
