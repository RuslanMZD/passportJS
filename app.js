const express =require('express');
const app =  express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport =require('passport');
const path = require('path'); //встроенная бибилиотека в node
const port =4000;
const config =require('./config/db');



app.use(express.static(path.join(__dirname,'file'))); //папка для стат файлов 
app.use(cors()); // Для подключеня сторонних  api Например регистрации через вк
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/account",require('./router/router_account'));
app.use(passport.initialize()); // инициализирует библиотеку
app.use(passport.session());// используем сессии
require('./config/passport')(passport); //экспортируем функцию и передаем ей параметр саму библиотеку  





mongoose.connect(config.db,{ useNewUrlParser: true ,useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{// on обработчик события    console.log("CONNECT BD");
}) 
mongoose.connection.on('error',(err)=>{// on обработчик события
    console.log("ERROR CONNECT BD" + err);
}) 





app.get("/",(req,res)=>{
    res.send("ГЛАВНАЯ СТРАНИЦА")
}) 






app.listen(port,()=>{
    console.log(`SERVER UP ${port}` )
});









