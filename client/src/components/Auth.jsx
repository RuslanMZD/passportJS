import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
const Auth=()=>{

const[errorAutoriz,setErrorAutoriz]=React.useState();
const [token,setToken]=React.useState();


console.log(token)


const userAuth=(event)=>{
event.preventDefault()
const form = event.target;
let login = event.target.login.value;
let password =event.target.password.value;



axios.post(`account/auth`,{login,password}).then(res=>{
    if(res.status==200){
        console.log(res)
        if(res.data.mess==="Автоизация пройдена"){
             
               localStorage.setItem('token',res.data.token);
               localStorage.setItem('user',JSON.stringify(res.data.user));
                setToken(res.data.token)
                setErrorAutoriz(`Добро пожаловать ${res.data.user.login}`)
                
                
        }else{
            
            setErrorAutoriz(res.data.mess)
        }
     
   
    }

// console.log(res)

    
    

  });










}
 if(localStorage.getItem("token")!= null){
return <Redirect to={"/dashboard"}/>
 }

return(
<div>
 

 <h1>Форма Авторизации</h1>
 <form onSubmit={userAuth}>
 <input type="text" name="login" placeholder="Введите логин" className="form-control"/>
 <input type="password" name="password" placeholder="Введите пароль" className="form-control"/>
 <div  id="viewError" className={errorAutoriz ? "alert alert-danger" : "alert alert-success nonErrorView"}  role="alert">{errorAutoriz}</div>
 <button className="btn btn-success" >Войти</button>
 
 </form>
 
 
 
 </div>

)


}

export default Auth