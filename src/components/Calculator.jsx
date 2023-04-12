import "../assets/styles/calculator.css";

import { useState, useEffect } from "react";

const Calculator = () => {
  const [outputValue, setOutputValue] = useState("0");
  const [outputFallbackValue, setOutputFallbackValue] = useState("0");
  const [fallbackValue, setFallbackValue] = useState("0");

  const addValueToOutput = (val) => {
    if (val === ",") {
      if (outputValue.includes(",")) return;
      return setOutputValue((oldVal) => oldVal + val);
    }
    if (outputValue === "0") return setOutputValue(val);
    if (outputValue !== "0" && outputValue.length < 12)
      return setOutputValue((oldVal) => oldVal + val);
  };

  const removeLastNumberFromOutput = () => {
    if (outputValue.length === 1) setOutputValue("0");
    if (outputValue.length >= 2)
      setOutputValue((oldVal) => oldVal.slice(0, -1));
  };

  const cleanOutputs = () => {
    setFallbackValue("0");
    setOutputValue("0");
    setOutputFallbackValue("0");
  };

  const performMathOperation = (mathSign) => {
    if (mathSign === "=") {
      const evalValue = eval(`${outputFallbackValue}${outputValue}`);
      setOutputFallbackValue(
        `${outputFallbackValue}${outputValue}=${evalValue}`
      );
      setFallbackValue(evalValue);
      return setOutputValue(evalValue);
    }

    const evalValue = eval(`${fallbackValue}${mathSign}${outputValue}`);
    setFallbackValue(`${evalValue}`);
    setOutputFallbackValue(`${evalValue}${mathSign}`);
    setOutputValue("0");
  };

  // useEffect(() => {
  //   console.log(fallbackValue);
  //   console.log(outputValue);
  // }, [fallbackValue, outputValue]);

  return (
    <div className="calculator-window">
      <div className="calculator">
        <div className="calculator__outputs">
          <p>{outputFallbackValue}</p>
          <p>{outputValue}</p>
        </div>
        <div className="calculator__inputs">
          <div>
            <button>%</button>
            <button onClick={cleanOutputs}>C</button>
            <button onClick={removeLastNumberFromOutput}>Back</button>
            <button>/</button>
          </div>
          <div>
            <button
              data-number="7"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              7
            </button>
            <button
              data-number="8"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              8
            </button>
            <button
              data-number="9"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              9
            </button>
            <button onClick={() => performMathOperation("*")}>x</button>
          </div>
          <div>
            <button
              data-number="4"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              4
            </button>
            <button
              data-number="5"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              5
            </button>
            <button
              data-number="6"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              6
            </button>
            <button onClick={() => performMathOperation("-")}>-</button>
          </div>
          <div>
            <button
              data-number="1"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              1
            </button>
            <button
              data-number="2"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              2
            </button>
            <button
              data-number="3"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              3
            </button>

            <button onClick={() => performMathOperation("+")}>+</button>
          </div>
          <div>
            <button>+/-</button>
            <button
              data-number="0"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              0
            </button>
            <button
              data-value=","
              onClick={(e) => {
                addValueToOutput(e.target.dataset.value);
              }}
            >
              ,
            </button>
            <button onClick={() => performMathOperation("=")}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
