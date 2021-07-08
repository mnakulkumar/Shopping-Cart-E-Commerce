var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"iPhone 12",
      category:"Mobile",
      description:"This is a Apple Company product",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ceUdO3GEoD_m2FtcwOE5Y8WBIAhP3DNzSQ&usqp=CAU"
    },
    {
      name:"Samsung A52",
      category:"Mobile",
      description:"This is a Samsung Company product",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcwavOBbV-dOKHQQXJtm3kTTEf711qiKspyQ&usqp=CAU"
    },
    {
      name:"Moto G9",
      category:"Mobile",
      description:"This is Lenovo Company product",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT44z2DEfVEnnyWH4_FylCd075USV9u-OD4rg&usqp=CAU"

    },
    {
      name:"Xiaomi ",
      category:"Mobile",
      description:"This is a Chinese Company product",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8CpdjhcCA7IelN6rduRBvnsu88xwm509_w&usqp=CAU"

    },
  ]
  res.render('admin/view-products',{admin:true,products})
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
