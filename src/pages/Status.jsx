import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../constants/toastOptions";
import { getTokenStatus } from "../services/tokenServices";
import StatusHero from "../components/StatusHero/StatusHero";
import Button from "../components/Button/Button";
import { socket } from "../socket";

const Status = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [queueLength, setQueueLength] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("queue", (jsonData) => {
      setQueueLength(jsonData.queueLength);
      console.log("Received data:", jsonData);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <StatusHero
        status={tokenInfo.status}
        statusMessage={tokenInfo.statusMessage}
        tokenNumber={tokenInfo.number}
        queueLength={queueLength}
      />
      <div className="py-3 bg-gray-200 font-bold text-center">Your info</div>
      <div className="bg-gray-100 h-full p-3">
        <div className="w-full flex my-1 flex-row">
          <p className="text-xs font-bold w-1/3">Name: </p>
          <p className="text-xs">{tokenInfo.fullName}</p>
        </div>
        <div className="w-full flex my-1 flex-row">
          <p className="text-xs font-bold w-1/3">Phone: </p>
          <p className="text-xs">{tokenInfo.mobileNumber}</p>
        </div>
        <div className="w-full flex my-1 flex-row">
          <p className="text-xs font-bold w-1/3">Token Type: </p>
          <p className="text-xs"> {tokenInfo.tokenType?.label}</p>
        </div>
        <div className="w-full flex my-1 flex-row">
          <p className="text-xs font-bold w-1/3">Date: </p>
          <p className="text-xs">
            {new Date(tokenInfo.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="bg-gray-200 py-2 flex items-center justify-evenly bottom-0 w-full fixed">
        <Button
          text={"Go Back"}
          btnType=""
          onClick={() => navigate("/")}
          className="rounded-full shadow-lg w-1/3"
          // bgColor={"error"}
        />
        <Button
          text={"Cancel"}
          btnType=""
          className="rounded-full shadow-lg w-1/3 bg-red-400 hover:bg-red-500"
          bgColor={"neutral"}
        />
      </div>
    </div>
  );
};

export default Status;
