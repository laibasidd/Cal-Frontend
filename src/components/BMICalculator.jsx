import { useState } from "react";
import axios from "axios";
import styles from "./bmi.module.css";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const calculateBMI = async () => {
    setError("");
    setCategory("");

    if (!weight || !height) {
      setError("Both weight and height are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://calculator-back-8ljb.vercel.app/api/bmi/calculate",
        {
          weight: parseFloat(weight),
          height: parseFloat(height),
        }
      );

      setBmi(response.data.bmi);
      setCategory(response.data.category);
    } catch (error) {
      setError(error.response?.data?.error || "Error calculating BMI");
    }
  };

  const clearInput = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
    setError("");
  };

  return (
    <div className={styles.bmiContainer}>
      <div className={styles.bmiText}>
        <h2>BMI Calculator</h2>
        <p>This tool helps you calculate your BMI based on weight and height.</p>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          className={styles.inputField}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (feet)"
          value={height}
          className={styles.inputField}
          onChange={(e) => setHeight(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button onClick={calculateBMI} className={styles.buttonStyle}>
            Calculate BMI
          </button>
          <button onClick={clearInput} className={styles.buttonStyle}>
            Clear
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {bmi && <div className={styles.bmiResult}>Your BMI: {bmi}</div>}
        {category && <div className={styles.bmiResult}>Category: {category}</div>}
      </div>
    </div>
  );
};

export default BMICalculator;
