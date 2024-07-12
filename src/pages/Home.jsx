import React from "react";
import TextInput from "../components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import PhoneInput from "../components/PhoneInput/PhoneInput";
import Button from "../components/Button/Button";
import SelectInput from "../components/SelectInput/SelectInput";
import Checkbox from "../components/Checkbox/Checkbox";
import { createToken } from "../services/tokenServices";

const Home = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm();

  const onSubmit = async (body) => {
    try {
      const response = await createToken(body);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error("something went wrong");
    }
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register}
          error={errors}
          placeholder="Enter your name"
          name="fullName"
        />
        <PhoneInput
          register={register}
          error={errors}
          placeholder="Enter your mobile number"
          name="mobileNumber"
        />
        <SelectInput
          placeholder={"Select a type"}
          control={control}
          name={"tokenType"}
          error={errors}
        />
        <Checkbox
          register={register}
          name="isWhatsApp"
          text={"Get Updates on WhatsApp?"}
        />
        <Button text={"Submit"} btnType="success" />
      </form>
    </div>
  );
};

export default Home;
