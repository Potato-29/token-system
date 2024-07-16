import React from "react";

const Loader = ({ mode = "backdrop", size = "md" }) => {
  if (mode === "backdrop") {
    return (
      <div className="h-screen absolute bg-[rgba(254,254,254,0.75)] z-10 w-screen flex justify-center items-center">
        <span class={`loading loading-dots loading-${size}`}></span>
      </div>
    );
  } else {
    return <span class={`loading loading-dots loading-${size}`}></span>;
  }
};

export default Loader;
