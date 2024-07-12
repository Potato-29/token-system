import React from "react";

const Checkbox = ({ text, register, name, isChecked }) => {
  return (
    <label class="cursor-pointer label">
      <span class="label-text">{text}</span>
      <input
        {...register(name)}
        // checked={isChecked}
        type="checkbox"
        class="checkbox checkbox-success"
      />
    </label>
  );
};

export default Checkbox;
