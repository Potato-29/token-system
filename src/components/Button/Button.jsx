import React from "react";

const Button = ({
  btnType = "primary",
  text,
  className = "",
  isDisabled,
  bgColor,
}) => {
  return (
    <button
      className={`btn btn-${btnType} bg-${bgColor} ${className}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
