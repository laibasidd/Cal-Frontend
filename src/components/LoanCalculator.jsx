
import { useState } from "react";
import axios from "axios";
import styles from "./loan.module.css";
import { Pie } from "react-chartjs-2";

const LoanCalculator = () => {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [termType, setTermType] = useState("years");
  const [loanDetails, setLoanDetails] = useState(null);
  const [error, setError] = useState("");

  const formatAsPKR = (number) => {
    return number.toLocaleString("en-PK", {
      style: "currency",
      currency: "PKR",
    });
  };

  const calculateLoan = async () => {
    setError("");
    setLoanDetails(null);

    if (!amount || !interestRate || !term) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://calculator-back-8ljb.vercel.app/api/loan/calculate",
        {
          amount: parseFloat(amount),
          interestRate: parseFloat(interestRate),
          term: parseFloat(term),
          termType: termType,
        }
      );
      setLoanDetails(response.data);
    } catch (error) {
      setError(error.response?.data.error || "Error calculating loan");
    }
  };

  const clearInput = () => {
    setAmount("");
    setInterestRate("");
    setTerm("");
    setLoanDetails(null);
    setError("");
  };

  const chartData = loanDetails
    ? {
        labels: ["Principal Amount", "Total Interest"],
        datasets: [
          {
            data: [
              loanDetails.totalPayment - loanDetails.totalInterest,
              loanDetails.totalInterest,
            ],
            backgroundColor: ["#4CAF50", "#FF6384"],
          },
        ],
      }
    : null;

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.leftSection}>
        <h2>Loan Calculator</h2>
        <p>Enter your loan details to calculate monthly payments in PKR.</p>
        <input
          type="number"
          placeholder="Loan Amount (PKR)"
          value={amount}
          className={styles.inputField}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          className={styles.inputField}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <input
          type="number"
          placeholder={`Loan Term (${termType})`}
          value={term}
          className={styles.inputField}
          onChange={(e) => setTerm(e.target.value)}
        />
        <div className={styles.radioContainer}>
          <div className={styles.radioItem}>
            <input
              type="radio"
              name="termType"
              value="years"
              className={styles.radioGroup}
              checked={termType === "years"}
              onChange={() => setTermType("years")}
            />{" "}
            Years
          </div>
          <div className={styles.radioItem}>
            <input
              type="radio"
              name="termType"
              value="months"
              className={styles.radioGroup}
              checked={termType === "months"}
              onChange={() => setTermType("months")}
            />{" "}
            Months
          </div>
        </div>
        <button onClick={calculateLoan} className={styles.buttonStyle}>
          Calculate Loan
        </button>
        <button onClick={clearInput} className={styles.buttonStyle}>
          Clear
        </button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
      <div className={styles.rightSection}>
        {loanDetails && chartData && (
          <div className={styles.chartDetailsContainer}>
            <div className={styles.chartContainer}>
              <h3 style={{color: 'white'}}>Loan Breakdown</h3>
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
            <div className={styles.loanDetails} style={{color: 'white'}}>
              <p className={styles["text-bold"]}>
                Monthly Payment:{" "}
                <span>{formatAsPKR(loanDetails.monthlyPayment)}</span>
              </p>
              <p className={styles["text-bold"]}>
                Total Payment:{" "}
                <span>{formatAsPKR(loanDetails.totalPayment)}</span>
              </p>
              <p className={styles["text-bold"]}>
                Total Interest:{" "}
                <span>{formatAsPKR(loanDetails.totalInterest)}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;


