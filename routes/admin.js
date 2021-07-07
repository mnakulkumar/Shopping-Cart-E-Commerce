var express = require('express');
var router = express.Router();

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
  console.log(req.body)
  console.log(req.files.Image)
})

module.exports = router;
