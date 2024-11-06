import { useState } from "react";
import axios from "axios";
import styles from "./inflation.module.css";

const InflationCalculator = () => {
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [inflationRate, setInflationRate] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    if (!oldPrice || !newPrice) {
      setError("Both old and new price are required.");
      return;
    }

    try {
      const response = await axios.post("https://calculator-back.vercel.app/api/inflation", {
        oldPrice: Number(oldPrice),
        newPrice: Number(newPrice),
      });

      setInflationRate(response.data.inflationRate);
      setError("");
    } catch (error) {
      setError(
        "Error calculating inflation rate: " +
          (error.response?.data?.error || error.message)
      );
      setInflationRate(null);
    }
  };

  const clearInput = () => {
    setOldPrice("");
    setNewPrice("");
    setInflationRate(null);
    setError("");
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.leftSection}>
        <h2>Inflation Rate Calculator</h2>
        <p>
          This calculator helps you determine the inflation rate based on the
          old and new prices of a product.
        </p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.inputField}>
          <label>Old Price</label>
          <input
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            placeholder="e.g. 100"
          />
        </div>

        <div className={styles.inputField}>
          <label>New Price</label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="e.g. 120"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.calculate} onClick={handleCalculate}>
            Calculate
          </button>
          <button className={styles.clear} onClick={clearInput}>
            Clear
          </button>
        </div>

        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}
        {inflationRate !== null && (
          <div className={styles.resultContainer}>
            <h4>Inflation Rate: {inflationRate}%</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default InflationCalculator;
