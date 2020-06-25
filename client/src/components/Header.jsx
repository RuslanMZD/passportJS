import React from 'react';
import '../App.css';
import {NavLink} from "react-router-dom";

const Header=(props)=>{

return(

<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <h5 className="my-0 mr-md-auto font-weight-normal">PASSPORT JS</h5>
  <nav className="my-2 my-md-0 mr-md-3">

    <NavLink className="p-2 text-dark" to="/">Главная</NavLink>
  </nav>
   <NavLink className="btn btn-outline-primary mr-3" to="/reg">РЕГИСТРАЦИЯ</NavLink>
   <NavLink className="btn btn-outline-primary" to="/auth">Авторизация</NavLink>
</div>



)





}



export default Header;