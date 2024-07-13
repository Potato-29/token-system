import React from "react";

const Button = ({
  btnType = "primary",
  text,
  className = "",
  isDisabled,
  bgColor,
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${btnType} bg-${bgColor} ${className}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
