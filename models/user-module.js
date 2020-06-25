const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt =require('bcryptjs');


const config =require('../config/db'); // ДЛя чего ?


const UserSchema =new Schema({



name:{
    type:String
},
email:{
    type:String,
    required:true  // required обязательное поле
},

login:{
    type:String,
    required:true  // required обязательное поле
},

password:{
    type:String,
   required:true  // required обязательное поле
}



});




module.exports.getUserByLogin=(login,callback)=>{  //Функция поиска юзера по логину
    const query ={login:login};
    User.findOne(query,callback);
};






module.exports.getUserById=(id,callback)=>{  //Функция поиска юзера по ID
    User.findById(id,callback);
};







// module.exports.addUser=(newUser,callback)=>{  //Функция поиска юзера по ID
//     bcrypt.genSalt(10, (err,salt)=>{          // Хеширование пароля
//         bcrypt.hash(newUser.password, salt,(err,hash)=>{     // Хешируемый объект
//            if(err) throw err;           // ошибки
//            newUser.password =hash;  // Устанавливаем новый хешированный пароль
//             newUser.save(callback)
//         });       
//     });                  

// };



module.exports.comparePass=(passFromUser,userDbPass,callback)=>{
    bcrypt.compare(passFromUser,userDbPass,(err,isMatch)=>{
        if(err) throw err;
        callback(null, isMatch); //если пароли совпадают

    })
}




const User =mongoose.model("User", UserSchema);
module.exports = User;
