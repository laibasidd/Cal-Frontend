import { useState } from "react";
import axios from "axios";

import styles from "./basic.module.css";
const BasicCal = () => {
  const [input, setInput] = useState("");
  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    "C",
    "=",
    "+",
  ];
  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      handleCalculate();
    } else {
      setInput((prev) => prev + value);
    }
  };
  const handleCalculate = async () => {
    const parts = input.split(/([+\-*/])/);
    if (parts.length < 3) return;
    const num1 = parts[0].trim();
    const operation = mapOperationToValue(parts[1].trim());
    const num2 = parts[2].trim();

    try {
      const response = await axios.post(
        "https://calculator-back-otm1.vercel.app/api/calculator/basic",
        {
          num1: Number(num1),
          num2: Number(num2),
          operation,
        }
      );
      setInput(response.data.result.toString());
    } catch (error) {
      console.error("Error calculating:", error);
      setInput("Error calculating");
    }
  };

  const mapOperationToValue = (operation) => {
    switch (operation) {
      case "+":
        return "add";
      case "-":
        return "subtract";
      case "*":
        return "multiply";
      case "/":
        return "divide";
      default:
        return "";
    }
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculatorText}>
        <h2>Basic Calculator</h2>
        <p>
          simple calculator that allows basic operations like
          addition, subtraction, multiplication, and division.Try it
        </p>
      </div>
      <div className={styles.calculator}>
        <input
          type="text"
          value={input}
          readOnly
          placeholder="0"
          className={styles.calculatorInput}
        />
        <div className={styles.buttonGrid}>
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`${styles.calculatorButton} ${
                btn === "=" ? styles.calculatorEqual : ""
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicCal;