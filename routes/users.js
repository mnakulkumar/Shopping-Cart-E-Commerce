var express = require('express');
var router = express.Router();

/* GET home page. */
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
      name:"Moto G9 Plus",
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
  res.render('index', { products,admin:false });
});

module.exports = router;