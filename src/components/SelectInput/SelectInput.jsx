import React from "react";
import { useController } from "react-hook-form";
import Select from "react-select";

const SelectInput = ({
  placeholder,
  error,
  register,
  className,
  control,
  name,
  options = [{ value: 1, label: "Item 1" }],
}) => {
  const { field } = useController({
    name,
    control,
    rules: { required: "This information is necessary" },
  });

  return (
    <>
      <Select
        styles={{
          //   placeholder: (baseStyles) => ({
          //     ...baseStyles,
          //     color: "#ccc",
          //   }),
          control: (baseStyles) => ({
            ...baseStyles,
            height: "3rem",
            border: `1px solid ${error?.[name] ? "red" : "#ccc"}`,
            borderRadius: ".125rem",
            margin: "6px 0",
          }),
        }}
        {...field}
        placeholder={placeholder}
        name={field.name}
        options={options}
        className={` ${className}`}
      />
      {error && error?.[name] && (
        <p className="text-red-400 text-xs my-1">{error?.[name].message}</p>
      )}
    </>
  );
};

export default SelectInput;
