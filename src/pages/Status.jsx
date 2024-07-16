import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../constants/toastOptions";
import { cancelToken, getTokenStatus } from "../services/tokenServices";
import StatusHero from "../components/StatusHero/StatusHero";
import Button from "../components/Button/Button";
import { IoIosWarning } from "react-icons/io";
import { socket } from "../socket";
import Loader from "../components/Loader/Loader";

const Status = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelLoading, setIsCancelLoading] = useState(true);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [queueLength, setQueueLength] = useState(
    window.localStorage.getItem("queueLength") || 0
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const getStatus = async () => {
    setIsLoading(true);
    try {
      const response = await getTokenStatus(id);
      if (response) {
        setTokenInfo(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to get info!", toastOptions);
    }
  };

  const handleCancel = async () => {
    setIsCancelLoading(true);
    try {
      const response = await cancelToken(id);
      if (response) {
        toast.success("Token cancelled!");
        setIsCancelLoading(false);
        navigate("/");
      }
    } catch (error) {
      setIsCancelLoading(false);
      toast.error("Something went wrong!", toastOptions);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function handleQueueUpdate(jsonData) {
      setQueueLength(jsonData.queueLength);
      window.localStorage.setItem("queueLength", jsonData.queueLength);
      console.log("Received data:", jsonData);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("queue", handleQueueUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("queue", handleQueueUpdate);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      {isLoading && <Loader mode="backdrop" size="lg" />}

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
        {tokenInfo.status === "pending" && (
          <Button
            onClick={() => {
              document.getElementById("cancelModal").showModal();
            }}
            text={"Cancel"}
            btnType=""
            className="rounded-full text-white shadow-lg w-1/3 bg-red-400 hover:bg-red-500"
            bgColor={"neutral"}
          />
        )}
      </div>
      <dialog id="cancelModal" class="modal">
        <div class="modal-box">
          <div className="flex flex-row items-center justify-center text-amber-300">
            <IoIosWarning className="text-3xl" />
            &nbsp;
            <h3 class="text-md font-bold text-center">Warning!</h3>
          </div>
          <p class="py-4 pb-2 text-sm">
            Are you sure you want to cancel your token?
          </p>
          <div class="modal-action w-full">
            <form
              method="dialog"
              className="w-full flex flex-row justify-evenly"
            >
              <button class="btn btn-md btn-circle w-1/3 mx-1">Close</button>
              <button
                onClick={handleCancel}
                class="btn btn-md btn-circle text-white btn-error w-1/3 mx-1"
              >
                {isCancelLoading ? <Loader mode="normal" /> : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Status;
