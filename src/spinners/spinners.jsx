import React from "react";
import { PropagateLoader } from "react-spinners";

export default function Spinners() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#00c425" size={25} />
      </div>
    </>
  );
}
