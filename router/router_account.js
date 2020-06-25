const express = require ('express');
const router = express.Router();
const User =require('../models/user-module');
const passport =require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const bcrypt =require('bcryptjs');





router.post("/reg", async (req,res)=>{
    
    let pass=req.body.user.password;
    let passwordHash = await bcrypt.hash(pass,10);  
  

  
    let user =  new User({           //Создаем объект на основании USer из модели
        name:req.body.user.name,
        email:req.body.user.email,
        login:req.body.user.login,
        password:passwordHash
    });

    user.save((err, user) => {
        if (err) {
          console.log('err', err)
        }
        res.json({mess:"ПОЛЬЗОВАТЕЛЬ ДОБАВЛЕН"})
        console.log('ЮЗЕР ЗАРЕГАН', user)
      })
    


});

router.post("/auth", async (req,res)=>{
let loginUser = req.body.login
let passwordUser =req.body.password


let user = await User.findOne({login:loginUser})
console.log(user)
if(user){
    let passProverka=await bcrypt.compare(passwordUser,user.password);
    console.log(passProverka)
    
        if(passProverka){
            let token = jwt.sign({
            userId:user._id,
            login:user.login,
            email:user.email,
            },config.secret,{expiresIn:60*60})

            res.json({mess:"Автоизация пройдена",token:token,user})

        }else{
            res.json({mess:"Не верный пароль"})
        }
}else{
    res.json({mess:"Данный пользователь не найден"})
}













// User.findOne({login:loginUser}, async (err,user)=>{
// if(user==null){
//     console.log("Данный пользователь не найден")
//     res.json({mess:"Данный пользователь не найден"})
// }
// else if(user){
//     let pass= await bcrypt.compare(passwordUser,user.password)
//     if(pass){
//         console.log(user)
      
//        res.json({mess:"Проверка пройдена",user})




//     }else{
//         res.json({mess:"Не верный пароль"})
//     }
// }else{
//     console.log(err)
// }



// })





})







// router.post("/auth",(req,res)=>{
   
//    const  login = req.body.login;
//    const password = req.body.password;

//    User.findOne(login,(err,user)=>{
//         if(err) throw err;
//         if(!user){
//             return res.json({success:false, msg:"USER не найден"}) // success наш параметр, return позволяет выйти из функции если польз-ль не найден
//         }
//         User.comparePass(password,user.password,(err, isMatch)=>{
//             if(err) throw err;
//             if(isMatch){
//                 const token =jwt.sign(user.toJSON(), config.secret,{  // выдаем токен user которого нашли , секретный ключ, параметры время сессии user.toJSON() потка .toJSON() не прописал не заработало данные на передавать не объектом
//                     expiresIn: 3600*24
//                 });
//                 res.json({success:true,msg:"Авториз успешна",token:'JWT' + token, user:   // возаращем ключ авторизации token
//                 {id:user._id,
//                     name:user.name,
//                     login:user.login,
//                     email:user.email
                          
                
                
//                 }});
//             }else{
//                 return res.json({success:false, msg:"PASS не совпадает"})  
//             }
//         })
//    })
   






//     res.send("AUTH СТРАНИЦА")
// })

router.get("/dashboard",passport.authenticate('jwt',{session:false}), (req,res)=>{  // запретили доступ к странице пока сессия false
    res.send("КАБИНЕТ ПОЛЬЗОВАТЕЛЯ")
})

module.exports =router;