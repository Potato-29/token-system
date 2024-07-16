import React from "react";

const Button = ({
  btnType = "primary",
  text,
  className = "",
  isDisabled,
  bgColor,
  onClick = () => {},
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${btnType} bg-${bgColor} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
