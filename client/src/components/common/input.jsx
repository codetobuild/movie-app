import React from "react";

const Input = (props) => {
  const { type, name, value, label, error, onchange } = props;
  return (
    <div className="from-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type={type}
        className="form-control mb-3"
        value={value}
        onChange={onchange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
