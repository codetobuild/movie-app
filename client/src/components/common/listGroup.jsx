import React from "react";

const ListGroup = (props) => {
  const { items, onItemSelect, valueProperty, textProperty, selectedItem } =
    props;
  const className = "list-group-item";

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={
            item._id === selectedItem._id ? className + " active" : className
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
