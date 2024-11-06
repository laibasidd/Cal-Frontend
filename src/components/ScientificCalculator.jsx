import { useState } from "react";
import axios from "axios";
import styles from "./scientific.module.css";

const ScientificCalculator = () => {
  const [expression, setExpression] = useState("");
  const [setError] = useState("");

  const handleButtonClick = (value) => {
    setExpression(expression + value);
  };

  const calculate = async () => {
    try {
      const response = await axios.post(
        "https://calculator-back-8ljb.vercel.app/api/scientific-calculator/calculate",
        { expression }
      );

      setExpression(response.data.result.toString());
    } catch (error) {
      setExpression(
        error.response?.data.error || "Error calculating expression"
      );
    }
  };

  const clearInput = () => {
    setExpression("");
    setError("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h2>Scientific Calculator</h2>
        <p>
          Use this calculator for scientific calculations involving
          trigonometric, logarithmic, and exponential functions.
        </p>
      </div>
      <div className={styles.calculatorSection}>
        <input
          type="text"
          value={expression}
          readOnly
          className={styles.inputField}
          placeholder="0"
        />
        <div className={styles.buttonGrid}>
          <button onClick={() => handleButtonClick("sin(")}>sin</button>
          <button onClick={() => handleButtonClick("cos(")}>cos</button>
          <button onClick={() => handleButtonClick("tan(")}>tan</button>
          <button onClick={() => handleButtonClick("log(")}>log</button>
          <button onClick={clearInput}>AC</button>
          <button onClick={() => handleButtonClick("(")}>(</button>
          <button onClick={() => handleButtonClick(")")}>)</button>
          <button onClick={() => handleButtonClick("^")}>^</button>
          <button onClick={() => handleButtonClick("%")}>%</button>
          <button onClick={() => handleButtonClick("e")}>e</button>
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button onClick={() => handleButtonClick("/")}>/</button>
          <button onClick={() => handleButtonClick("+")}>+</button>
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button onClick={() => handleButtonClick("*")}>*</button>
          <button onClick={() => handleButtonClick("sqrt(")}>√</button>
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")}>2</button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button onClick={() => handleButtonClick("-")}>-</button>
          <button onClick={() => handleButtonClick(".")}>.</button>
          <button onClick={() => handleButtonClick("0")}>0</button>
          <button onClick={() => handleButtonClick("pi")}>π</button>
          <button onClick={calculate} className={styles.equalButton}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
