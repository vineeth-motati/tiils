"use client";
import React from "react";
import Calcy from "./components/Calcy";

type calculatorProps = {
  className?: string;
  [x: string]: any;
};

const Calculator: React.FC<calculatorProps> = ({ className, ...props }) => {
  return (
    <section className="flex w-full rounded-md overflow-auto shadow-customShadow">
      <section className={`flex w-full h-full z-10 ${className}`}>
        <main
          className={`flex h-full w-full flex-col z-10 bg-calc-gradient p-6`}
        >
          Calculator page
          <div className="w-80">
            <Calcy />
          </div>
        </main>
      </section>
    </section>
  );
};

export default Calculator;
