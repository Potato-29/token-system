import React from "react";

const TextInput = ({
  placeholder = "Enter text",
  text,
  required = true,
  name,
  type = "text",
  register,
  error,
  className,
}) => {
  return (
    <>
      <input
        {...register(name, {
          required: "This Information is necessary",
        })}
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full max-w-xs my-1 ${
          error?.[name] && "border-red-400"
        } ${className}`}
      />
      {error && error?.[name] && (
        <p className="text-red-400 text-xs my-1">{error?.[name].message}</p>
      )}
    </>
  );
};

export default TextInput;
