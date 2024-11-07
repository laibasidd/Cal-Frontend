import { useState } from "react";
import axios from "axios";

import styles from './age.module.css'

const AgeCalculator = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = async () => {
    setError("");
    setAge(null);

    if (!year || !month || !day) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://calculator-back.vercel.app/api/age/calculate",
        {
          year,
          month,
          day,
        }
      );

      setAge(response.data.age);
    } catch (error) {
      setError(error.response?.data?.error || "Error calculating age");
    }
  };

  const clearInput = () => {
    setYear("");
    setMonth("");
    setDay("");
    setAge(null);
    setError("");
  };

  return (
    <div className={styles.calculatorcontainer}>
      <div className={styles.leftsection}>
        <h2>Age Calculator</h2>
        <p>
          This tool helps you calculate your exact age by entering your date of
          birth.
        </p>
      </div>
      {/* <div className={styles.rightsection}> */}
      <div className={styles.calculator}>
        <input
          type="number"
          placeholder="Year (YYYY)"
          value={year}
          className={`${styles.inputfield}`}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Month (1-12)"
          value={month}
          className={`${styles.inputfield}`}
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Day (1-31)"
          value={day}
          className={`${styles.inputfield}`}
          onChange={(e) => setDay(e.target.value)}
        />
        <button onClick={calculateAge} className={styles.button}>
          Calculate Age
        </button>
        <button onClick={clearInput} className={styles.button}>
          Clear
        </button>
        {error && <div className={styles.errormessage}>{error}</div>}
        {age !== null && (
          <div className={styles.ageresult}>Your Age: {age} years</div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;   





