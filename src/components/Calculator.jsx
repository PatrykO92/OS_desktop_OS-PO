import "../assets/styles/calculator.css";

const Calculator = () => {
  return (
    <div className="calculator-window">
      <div className="calculator">
        <div className="calculator__output">
          <input type="text" />
        </div>
        <div>
          <button>%</button>
          <button>C</button>
          <button>Back</button>
          <button>/</button>
        </div>
        <div>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>x</button>
        </div>
        <div>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>-</button>
        </div>
        <div>
          <button>3</button>
          <button>2</button>
          <button>1</button>
          <button>+</button>
        </div>
        <div>
          <button>+/-</button>
          <button>0</button>
          <button>,</button>
          <button>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
