import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PopUp = ({data}) => {
  const [close, setClose] = useState(data);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/quiz");
  };
  return (
    <div
      className={`absolute h-screen w-screen flex justify-center items-center ${close ? "block" : "hidden"}`}
    >
      <div className="h-1/5 w-1/5 bg-gray-200 shadow grid grid-cols-1 content-between">
        <div>
          <p className="my-4 text-xl font-bold text-cyan-500 text-center">
            I confirm to give the quiz
          </p>
          <p className="my-4 text-xl font-bold text-cyan-700 text-center">
            Good Luck!
          </p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setClose(false)}
            className="mx-2 px-3 py-2 text-white text-lg bg-red-500 rounded-full text-semibold ease-in-out transition hover:bg-red-700"
          >
            Close
          </button>
          <button
            onClick={handleClick}
            className="mx-2 px-3 py-2 text-white text-lg bg-green-500 rounded-full text-semibold ease-in-out transition hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
