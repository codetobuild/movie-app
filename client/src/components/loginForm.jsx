import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  doSubmit = (e) => {
    // call server
    
    console.log("form submitted!", this.props);
  };

  render() {
    return (
      <div>
        <h1>Login form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSubmitButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
