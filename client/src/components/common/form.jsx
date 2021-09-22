import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const errorResult = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    const error = {};
    if (errorResult.error === null) return null;

    for (let item of errorResult.error.details) {
      error[item.path[0]] = item.message;
    }
    return error;
  };
  validateProperty = (e) => {
    const { name, value } = e.currentTarget;
    const obj = {
      [name]: value,
    };
    const schema = {
      [name]: this.schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    console.log(error);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    // console.error(errors);
    this.setState({ errors: errors || {} });
    if (errors) return; // directly return error

    this.doSubmit();
  };
  handleChange = (e) => {
    const { name, value } = e.currentTarget;

    // update erros message
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e);
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }
    //  update value
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data: data, errors: errors });
  };

  renderSubmitButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary mt-2">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onchange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelect(name, label, error, genres, data) {
    return (
      <div className="form-group">
        <label htmlFor="Genre">{label}</label>
        <select
          name={name}
          id={name}
          className="form-control mb-3"
          onChange={this.handleChange}>
          <option value=""></option>
          {genres.map((item) => (
            <option
              selected={item._id === data.genreId ? true : false}
              value={item._id}
              key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Form;
