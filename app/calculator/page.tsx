import React from "react";
import Calcy from "./components/Calcy";

type calculatorProps = {
  className?: string;
  [x: string]: any;
};

const Calculator: React.FC<calculatorProps> = ({ className, ...props }) => {
  return (
    <main className={`flex h-full w-full flex-col z-10 bg-calc-gradient p-6`}>
      Calculator page
      <Calcy />
    </main>
  );
};

export default Calculator;
