import React from "react";

const Button = ({ btnType, text, className, isDisabled }) => {
  return (
    <button className={`btn btn-${btnType} ${className}`} disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;
