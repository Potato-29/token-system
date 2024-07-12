import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../constants/toastOptions";
import { getTokenStatus } from "../services/tokenServices";
import StatusHero from "../components/StatusHero/StatusHero";
import Button from "../components/Button/Button";

const Status = () => {
  const { id } = useParams();
  const [tokenInfo, setTokenInfo] = useState([]);
  const getStatus = async () => {
    try {
      const response = await getTokenStatus(id);
      if (response) {
        setTokenInfo(response.data);
      }
    } catch (error) {
      toast.error("Failed to get info!", toastOptions);
    }
  };
  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div className="h-full flex flex-col">
      <StatusHero
        status={tokenInfo.status}
        statusMessage={tokenInfo.statusMessage}
        tokenNumber={tokenInfo.number}
      />
      <div className="py-3 bg-gray-200 font-bold text-center">Your info</div>
      <div className="bg-gray-100 h-full p-3">
        <div className="w-full flex flex-row">
          <p className="font-bold w-1/2">Name: </p>
          <p className="my-1">{tokenInfo.fullName}</p>
        </div>
        <div className="w-full flex flex-row">
          <p className="font-bold w-1/2">Phone: </p>
          <p className="my-1">{tokenInfo.mobileNumber}</p>
        </div>
        <div className="w-full flex flex-row">
          <p className="font-bold w-1/2">Token Type: </p>
          <p className="my-1"> {tokenInfo.tokenType?.label}</p>
        </div>
        <div className="w-full flex flex-row">
          <p className="font-bold w-1/2">Date: </p>
          <p className="my-1">
            {new Date(tokenInfo.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="bg-gray-200 py-2 flex items-center justify-evenly bottom-0 w-full fixed">
        <Button
          text={"Go Back"}
          btnType=""
          className="rounded-full shadow-lg w-1/3 hover:bg-red-500"
          bgColor={"error"}
        />
        <Button
          text={"Cancel"}
          btnType=""
          className="rounded-full shadow-lg w-1/3"
          bgColor={"neutral"}
        />
      </div>
    </div>
  );
};

export default Status;
