import React from "react";

const Like = (props) => {
  let likeIcon = "";
  if (props.movie.like) {
    likeIcon = "Like";
  } else {
    likeIcon = "Dislike";
  }
  return (
    <span
      style={{ cursor: "pointer" }}
      onClick={() => props.onLike(props.movie)}>
      {likeIcon}
    </span>
  );
};

export default Like;
