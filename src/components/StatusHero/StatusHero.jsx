import React from "react";
import { tokenStatuses } from "../../constants/tokenStatus";
import { IoPerson } from "react-icons/io5";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AiFillStop } from "react-icons/ai";

const StatusHero = ({
  tokenNumber = 0,
  status,
  statusMessage,
  queueLength,
}) => {
  const getBgColor = () => {
    if (status === tokenStatuses.PENDING) {
      return "bg-gradient-to-r from-yellow-400 to-orange-400";
    }
    if (status === tokenStatuses.ON_HOLD) {
      return "bg-gradient-to-r from-orange-400 to-yellow-400";
    }
    if (status === tokenStatuses.SERVING) {
      //   return "bg-gradient-to-r from-lime-400 to-teal-400";
      return "bg-gradient-to-r from-indigo-400 to-cyan-400";
    }
    if (status === tokenStatuses.RESOLVED) {
      return "bg-gradient-to-r from-lime-400 to-teal-400";
    }
    if (status === tokenStatuses.CLOSED) {
      return "bg-gradient-to-r from-red-500 to-red-400";
    }
    if (status === tokenStatuses.CANCELLED) {
      return "bg-gradient-to-r from-slate-400 to-gray-300";
    }
  };

  const displayStatusMessage = (status) => {
    if (status === tokenStatuses.PENDING) {
      return (
        <div className="flex flex-row items-center animate-pulse">
          <IoPerson className="mx-1" />
          <p className="text-sm">{queueLength} waiting in line.</p>
        </div>
      );
    }

    if (status === tokenStatuses.RESOLVED) {
      return (
        <div className="flex flex-row items-center animate-pulse">
          <FaCheckCircle className="mx-1" />
          <p className="text-sm">{statusMessage}</p>
        </div>
      );
    }

    if (status === tokenStatuses.SERVING) {
      return (
        <div className="flex flex-row items-center animate-pulse">
          <FaClock className="mx-1" />
          <p className="text-sm">{statusMessage}</p>
        </div>
      );
    }

    if (status === tokenStatuses.CLOSED) {
      return (
        <div className="flex flex-row items-center animate-pulse">
          <MdCancel className="mx-1" />
          <p className="text-sm">{statusMessage}</p>
        </div>
      );
    }
    if (status === tokenStatuses.CANCELLED) {
      return (
        <div className="flex flex-row items-center animate-pulse">
          <AiFillStop className="mx-1" />
          <p className="text-sm">{statusMessage}</p>
        </div>
      );
    }
  };

  return (
    <div
      className={`py-2 h-[45%] flex flex-col items-center justify-between ${getBgColor()} text-neutral-content`}
    >
      <div>
        <p className="text-xs capitalize font-semibold">{status}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-5xl font-bold">{tokenNumber}</h3>
        {/* <p className="text-xs">{status}</p> */}
      </div>
      {displayStatusMessage(status)}
    </div>
  );
};

export default StatusHero;
