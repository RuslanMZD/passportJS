import React from 'react';
import { Redirect } from 'react-router-dom';

const Dashboard=()=>{

    const [storage,setStorage]=React.useState(true)

    const logoutUser =()=>{

        localStorage.clear()
        setStorage(false)

    }


    if(localStorage.getItem("token")== null){
        return <Redirect to={"/auth"}/>
         }
return(
<div className="dashboard">
ЛИЧНЫЙ КАБИНЕТ
<button type="button" className="btn btn-warning" onClick={logoutUser}>ВЫЙТИ</button>

</div>


)


}

export default Dashboard