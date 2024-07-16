import React from "react";
import TextInput from "../components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import PhoneInput from "../components/PhoneInput/PhoneInput";
import Button from "../components/Button/Button";
import SelectInput from "../components/SelectInput/SelectInput";
import Checkbox from "../components/Checkbox/Checkbox";
import { createToken } from "../services/tokenServices";
import { toast } from "react-toastify";
import { toastOptions } from "../constants/toastOptions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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
        toast.success("Token generated successfully", toastOptions);
        navigate(`/status/${response.data._id}`);
      }
    } catch (error) {
      console.error("something went wrong");
      toast.error("Something went wrong!", toastOptions);
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
        <Button
          className="bg-success text-white w-28"
          text={"Submit"}
          btnType="circle"
        />
      </form>
    </div>
  );
};

export default Home;
