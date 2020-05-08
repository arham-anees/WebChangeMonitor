import React from 'react';
import TextField from "@material-ui/core/TextField";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import { Button } from "@material-ui/core";
import {Link } from 'react-router-dom';
import axios from 'axios';
import PasswordField from '../Password/Password';
import '../Login/Login.css';
export default class extends React.Component{
state={
        username: "",
        password: "",
        showPassword: false,
        Submit:false,
    
}
OnSubmit= (event) => {
  this.setState({Submit:true})
 if(this.state.username.length!==0&&this.state.password.length!==0)
 {
  const newTodo = {
    Email:this.state.username,
    Password: this.state.password,
   
  };

  axios.post('http://localhost:4000/online_tutor_db/Login_Admin', newTodo)
  .then(() => console.log("api invoked"))
  .catch(err=>alert(err)); 
 }

        
 
  
   
        event.preventDefault();
};
setUser = (event) => {
    this.setState({ username: event.target.value });
  };
  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  style = {
    width: "100%",
  };
   render()
   {
     
       return(
            <div className="container">
              <div className="login-container">
                <div style={{marginLeft:120,marginBottom:20,fontSize:18}}>Login Fom</div>
                <form className="w-100" onSubmit={this.OnSubmit}>
                  <TextField 
                  id="username" 
                  label="Username"
                  value={this.state.username}
                  onChange={this.setUser}
                   style={this.style} />
                   {this.state.username.length===0&&this.state.Submit===true?<div style={{color:'red',fontSize:11}}>Enter Valid UserName</div>:null}
                  <PasswordField
                    label="Password"
                    name="Password"
                    value={this.state.password}
                    HandleChange={this.setPassword}
                  />
                  {this.state.password.length===0&&this.state.Submit===true?<div style={{color:'red',fontSize:11}}>Enter Valid Password</div>:null}
               <div style={{marginTop:20}}>
               <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3"
              OnSubmit={this.login}
            >
              Login
              <ExitToAppSharpIcon />
            </Button>
                  </div>
                  <br />
                  <div style={{marginLeft:90}}>
                  <Link to="/Register" style={{textDecoration:'none'}}>New here? Sign up first</Link>
                  </div>
                </form>
              </div>
            </div>
       )
   }
}