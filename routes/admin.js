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
        res.redirect('/admin/')
      }else{
        console.log(err);
      }
    }) //mv move which  is a function in middleware fileUpload
    
  })
})

router.get('/delete-product/:id',(req,res)=>{ //here id is param
  let proId=req.params.id  //proId is product id , value in URL is accessed using req.params (when whe don't use query in URL i.e. ?id=value
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })

})

//Another way of doing
// router.get('/delete-product/',(req,res)=>{ 
//   let proId=req.query.id   // in the case when we use href="/admin/delete-product?id={{this._id}}&name="Samsung"
//   console.log(proId)
//   console.log(req.query.name)
// })

router.get('/edit-product/:id',async (req,res)=>{
  let product= await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})

})

router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image=req.files.Image
      image.mv('./public/product-images/'+id+'.jpg')  

    }
  })
})
module.exports = router;
