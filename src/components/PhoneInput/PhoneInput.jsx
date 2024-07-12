import React from "react";

const PhoneInput = ({
  placeholder = "Enter text",
  text,
  required = true,
  name,
  register,
  error,
  className,
}) => {
  const validateNumber = (value) => {
    if (!value || isNaN(value)) {
      return "Please enter a valid number";
    }
    return true; // Validation passed
  };

  return (
    <>
      <input
        {...register(name, {
          required: "This Information is necessary",
          validate: validateNumber,
        })}
        type={"number"}
        placeholder={placeholder}
        className={`input input-bordered w-full max-w-xs my-1 ${
          error?.[name] && "border-red-400"
        } ${className}`}
      />
      {error && error?.[name] && (
        <p className="text-red-400 text-xs my-1">{error?.[name].message}</p>
      )}{" "}
    </>
  );
};

export default PhoneInput;
