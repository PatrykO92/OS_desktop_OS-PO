import "../assets/styles/calculator.css";

import { useState, useEffect } from "react";

const Calculator = ({ lang }) => {
  const [outputValue, setOutputValue] = useState("0");
  const [calculationValue, setCalculationValue] = useState("0");
  const [showErrorMessage, setShowErrorMessage] = useState({
    show: false,
    message: "error",
  });

  const errorHandler = (msg) => {
    setShowErrorMessage({ show: true, message: msg });
    setTimeout(() => setShowErrorMessage({ show: false, message: msg }), 1000);
  };

  const changeToOpositeValue = () => {
    if (outputValue === "0") return;
    const oppositeValue = -Number(outputValue);
    setOutputValue(String(oppositeValue));
  };

  const addValueToOutput = (val) => {
    if (val === ".") {
      if (outputValue.includes(".")) return;
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
    setCalculationValue("0");
    setOutputValue("0");
  };

  const performEvaluationOperation = () => {
    try {
      if (!calculationValue.includes("=")) {
        // eslint-disable-next-line
        const evalValue = eval(`${calculationValue}${outputValue}`);

        if (evalValue === Infinity) {
          errorHandler(lang.calculatorErrorDivide);
          return;
        }
        setCalculationValue(`${calculationValue}${outputValue}=`);
        return setOutputValue(`${evalValue}`);
      }
    } catch (err) {
      errorHandler(lang.calculatorError);
    }
  };

  // Code was rewrote with help of chat-gpt
  const performMathOperation = (mathSign) => {
    if (calculationValue.includes("=")) {
      setCalculationValue(`${outputValue}${mathSign}`);
      return setOutputValue("0");
    }

    if (outputValue === "0") return;

    let newCalculationValue;
    let newOutputValue = "0";

    if (calculationValue === "0") {
      newCalculationValue = `${outputValue}${mathSign}`;
    } else if (mathSign === "%") {
      // eslint-disable-next-line
      const percentageValue = eval(`(${calculationValue}${outputValue})/100`);
      newCalculationValue = `${calculationValue}${percentageValue}${mathSign}=`;
      newOutputValue = `${percentageValue}`;
    } else {
      // eslint-disable-next-line
      const evalValue = eval(`${calculationValue}${outputValue}`);
      newCalculationValue = `${evalValue}${mathSign}`;
    }

    setCalculationValue(newCalculationValue);
    setOutputValue(newOutputValue);
  };

  // Leagacy code, written by me, needed to analyze

  // const performMathOperation = (mathSign) => {
  //   if (!calculationValue.includes("=")) {
  //     if (outputValue === "0" && calculationValue !== "0") {
  //       setCalculationValue((oldVal) => `${oldVal.slice(0, -1)}${mathSign}`);
  //     }

  //     if (outputValue === "0") return;

  //     if (calculationValue === "0") {
  //       setCalculationValue(`${outputValue}${mathSign}`);
  //       return setOutputValue("0");
  //     }

  //     if (mathSign === "%") {
  //
  //       const percentageValue = eval(`(${calculationValue}${outputValue})/100`);
  //       setCalculationValue(
  //         `${calculationValue}${percentageValue}${mathSign}=`
  //       );
  //       return setOutputValue(`${percentageValue}`);
  //     }

  //     if (calculationValue !== "0") {
  //       // eslint-disable-next-line
  //       const evalValue = eval(`${calculationValue}${outputValue}`);
  //       setCalculationValue(`${evalValue}${mathSign}`);
  //       return setOutputValue("0");
  //     }
  //   } else {
  //     setCalculationValue(`${outputValue}${mathSign}`);
  //     return setOutputValue("0");
  //   }
  // };

  useEffect(() => {
    if (calculationValue.includes("NaN") || outputValue.includes("NaN")) {
      cleanOutputs();
      errorHandler(lang.calculatorError);
    }
  }, [outputValue, calculationValue, lang.calculatorError]);

  return (
    <div className="calculator-window">
      {showErrorMessage.show && (
        <div className="calculator-error">{showErrorMessage.message}</div>
      )}

      <div className="calculator">
        <div className="calculator__outputs">
          <p>{calculationValue}</p>
          <p>{outputValue}</p>
        </div>
        <div className="calculator__inputs">
          <div>
            <button onClick={() => performMathOperation("%")}>%</button>
            <button onClick={cleanOutputs}>C</button>
            <button onClick={removeLastNumberFromOutput}>Back</button>
            <button onClick={() => performMathOperation("/")}>/</button>
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
            <button onClick={changeToOpositeValue}>+/-</button>
            <button
              data-number="0"
              onClick={(e) => {
                addValueToOutput(e.target.dataset.number);
              }}
            >
              0
            </button>
            <button
              data-value="."
              onClick={(e) => {
                addValueToOutput(e.target.dataset.value);
              }}
            >
              .
            </button>
            <button onClick={performEvaluationOperation}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
