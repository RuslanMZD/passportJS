import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

const Reg=()=>{
   
   
const [errorDisplay,setErrorDisplay]=useState()
const [successDisplay,setSuccessDisplay]=useState()


   const userRegistr = (event) => {
      event.preventDefault();
         // const formData = new FormData(e.target);

         const form = event.target;



   //  axios.post("http://localhost:4000/account/reg",{name}).then(res=>{
   //          console.log(res)
   //       });
        

        if(!event.target.name.value || event.target.name.value.length<4){
            setErrorDisplay("ВВЕДИ НОРМАЛЬНО ИМЯ");
         
            
        }else if(!event.target.login.value || event.target.login.value.length<4){
         setErrorDisplay("ВВЕДИ НОРМАЛЬНО ЛОГИН")
   
        }else if((!event.target.password.value || event.target.password.value.length<8)){
         setErrorDisplay("ВВЕДИ НОРМАЛЬНО ПАРОЛЬ от 8 СИМВОЛОВ")
        
        }else if(!event.target.email.value){
         setErrorDisplay("ВВЕДИ EMAIL")
        
        }else{
           

         const user={
            name:event.target.name.value,
            email:event.target.email.value,
            login:event.target.login.value,
            password:event.target.password.value
            
         };   
         
      //   let name =event.target.name.value
      //   let email=event.target.email.value
      //   let login=event.target.login.value
      //   let password=event.target.password.value
         


      //        axios.post(`account/reg`,{name,email,login,password}).then(res=>{
      //       console.log(res)
      //    });


          axios.post(`account/reg`,{user}).then(res=>{
           if(res.status==200){
            setSuccessDisplay(res.data.mess);
            
            
           }else{
            setSuccessDisplay("ПОЛЬЗОВАТЕЛЬ НЕ ДОБАВЛЕН")
           }

         });

         
         // console.log(user)
         
     


         form.reset()
         setErrorDisplay(null)
         document.querySelector('#viewError').classList.remove('nonErrorView');
         
       
         }
        

      
      
         


     };

// if(successDisplay==="ПОЛЬЗОВАТЕЛЬ ДОБАВЛЕН"){
//    return <Redirect to="/auth"/>
// }else

return(
 
<div>
 

<h1>Форма Регистрации</h1>
<form onSubmit={userRegistr}>
<input type="text" placeholder="Введите имя" name="name" className="form-control" />
<input type="text" name="login" placeholder="Введите логин" className="form-control"/>
<input type="password" name="password" placeholder="Введите пароль" className="form-control"/>
<input type="email" name="email" placeholder="Введите email" className="form-control"   />
<div  id="viewError" className={errorDisplay ? "alert alert-danger" : "alert alert-success nonErrorView"}  role="alert">{errorDisplay ? errorDisplay : successDisplay}</div>
<button className="btn btn-success" >Зарегестрироваться</button>

</form>



</div>


)


}

export default Reg