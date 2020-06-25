import React from 'react';
import Header from './components/Header';
import {BrowserRouter,Route, Switch} from "react-router-dom";
import './App.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Reg from './components/Reg';
import Home from './components/Home';
import Footer from './components/Footer';

const App=()=>{

  return(
    <div className="container">
      <BrowserRouter>

      <Header/>
      
    









<Switch>
 <Route path="/auth" render={()=><Auth/>}></Route>
 <Route path="/dashboard" render={()=><Dashboard/>}></Route>
 <Route path="/reg"  render={()=><Reg/>}></Route>
 <Route exact path="/"  render={()=><Home/>}></Route>
 <Route  path="*" render={()=><div>404 NOT FOUND</div>}/>
 </Switch>

 <Footer/>
</BrowserRouter>
    </div>



  )



}

export default App;
