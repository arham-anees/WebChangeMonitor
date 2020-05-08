import * as React from "react";
import {
  InputAdornment,
  IconButton,
  FormControl,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Visibility, VisibilityOff } from "@material-ui/icons";
export default class Password extends React.Component{

    state={
        showPassword:false
    }
    checkpassword = new RegExp( /^[A-Za-z0-9!@#$%^&*()_]{9,20}$/)
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
      };
    style = {
        width: "100%",
      };
    
      iconStyle = {
        width: "20%",
      };
    render()
    {
        return(
            <React.Fragment>
            <FormControl>
             
              <TextField
                id="passwordField"
                type={this.state.showPassword ? "text" : "password"}
                style={this.style}
                label={this.props.label}
               
                onChange={this.props.HandleChange}
                name={this.props.name}
                error={(!this.checkpassword.test(this.props.value))&&this.props.Submit===true&&this.props.Confirm===true?true:false}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" style={this.iconStyle}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                
              
              />
               {(!this.checkpassword.test(this.props.value))&&this.props.Submit===true&&this.props.emsg===true?<div style={{color:'red',fontSize:11}}>Password Should contain minimum 8 digits</div>:null} 
               
            </FormControl>
           
          </React.Fragment>
        )
    }
}