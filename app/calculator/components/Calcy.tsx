// components/Calculator.tsx
import React, { useState } from "react";

const Calcy: React.FC = () => {
  const [answer, setAnswer] = useState<string>("");

  const handleButtonClick = (value: string) => {
    setAnswer((prevAnswer) => prevAnswer + value);
  };

  const handleClear = () => {
    setAnswer("");
  };

  const handleCalculate = () => {
    try {
      setAnswer(eval(answer).toString());
    } catch (error) {
      setAnswer("Error");
    }
  };
  // Define the button labels and their respective classNames
  const buttons = [
    { label: "1", className: "bg-blue-500" },
    { label: "2", className: "bg-blue-500" },
    { label: "3", className: "bg-blue-500" },
    { label: "+", className: "bg-blue-500" },
    { label: "4", className: "bg-blue-500" },
    { label: "5", className: "bg-blue-500" },
    { label: "6", className: "bg-blue-500" },
    { label: "-", className: "bg-blue-500" },
    { label: "7", className: "bg-blue-500" },
    { label: "8", className: "bg-blue-500" },
    { label: "9", className: "bg-blue-500" },
    { label: "*", className: "bg-blue-500" },
    { label: "/", className: "bg-blue-500" },
    { label: "0", className: "bg-blue-500" },
    { label: ".", className: "bg-blue-500" },
    { label: "=", className: "bg-blue-500 col-span-2" },
    { label: "Clear All", className: "bg-red-500 col-span-4" },
  ];
  return (
    <div className="formstyle">
      <input
        id="calc"
        type="text"
        name="answer"
        value={answer}
        readOnly
        className="w-60 bg-green-500 text-white border-3 border-gray-400 rounded-lg p-3 m-5 text-2xl"
      />
      <br />
      <br />
      <div className="grid grid-cols-4 gap-5">
        {buttons.map(({ label, className }, index) => (
          <button
            key={index}
            className={`w-20 text-white border-3 border-gray-400 rounded-lg p-3 text-xl ${className}`}
            onClick={() => {
              if (label === "=") {
                handleCalculate();
              } else if (label === "Clear All") {
                handleClear();
              } else {
                handleButtonClick(label);
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <br />
    </div>
  );
};
export default Calcy;
