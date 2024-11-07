 
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import styles from "./salary.module.css";

ChartJS.register(...registerables);

const SalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [providentFundRate, setProvidentFundRate] = useState("");
  const [allowances, setAllowances] = useState("");
  const [medicalInsurance, setMedicalInsurance] = useState("");
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [error, setError] = useState("");
  const chartRef = useRef(null);

  const calculateSalary = useCallback(async () => {
    setError("");
    setSalaryDetails(null);

    if (!grossSalary || !taxRate || !providentFundRate || !medicalInsurance) {
      return;
    }

    try {
      const response = await axios.post(
        "https://calculator-back-otm1.vercel.app/api/salary/calculate",
        {
          grossSalary: parseFloat(grossSalary),
          taxRate: parseFloat(taxRate),
          providentFundRate: parseFloat(providentFundRate),
          allowances: parseFloat(allowances) || 0,
          medicalInsurance: parseFloat(medicalInsurance) || 0,
        }
      );

      setSalaryDetails(response.data);
    } catch (error) {
      setError(error.response?.data.error || "Error calculating salary");
    }
  }, [grossSalary, taxRate, providentFundRate, allowances, medicalInsurance]);

  useEffect(() => {
    calculateSalary();
  }, [calculateSalary]);

  useEffect(() => {
    if (salaryDetails && chartRef.current) {
      const chartInstance = chartRef.current;

      chartInstance.data.datasets[0].data = [
        salaryDetails.netSalary || 0,
        salaryDetails.taxAmount || 0,
        salaryDetails.providentFundAmount || 0,
        salaryDetails.medicalInsuranceAmount || 0,
      ];
      chartInstance.update();
    }
  }, [salaryDetails]);

  const clearInput = () => {
    setGrossSalary("");
    setTaxRate("");
    setProvidentFundRate("");
    setAllowances("");
    setMedicalInsurance("");
    setSalaryDetails(null);
    setError("");
  };

  const chartData = salaryDetails
    ? {
        labels: [
          "Net Salary",
          "Tax Amount",
          "Provident Fund Amount",
          "Medical Insurance",
        ],
        datasets: [
          {
            data: [
              salaryDetails.netSalary || 0,
              salaryDetails.taxAmount || 0,
              salaryDetails.providentFundAmount || 0,
              salaryDetails.medicalInsuranceAmount || 0,
            ],
            backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
          },
        ],
      }
    : {};

  return (
    <div className={styles.salaryCalculatorContainer}>
      <div className={styles.leftSection}>
        <h2>Salary Calculator</h2>
        <p>Calculate you Net Salary by entering different values.</p>
        <input
          type="number"
          placeholder="Gross Salary (PKR)"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tax Rate (%)"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Provident Fund Rate (%)"
          value={providentFundRate}
          onChange={(e) => setProvidentFundRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Allowances (PKR)"
          value={allowances}
          onChange={(e) => setAllowances(e.target.value)}
        />
        <input
          type="number"
          placeholder="Medical Insurance (PKR)"
          value={medicalInsurance}
          onChange={(e) => setMedicalInsurance(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <button onClick={clearInput}>Clear</button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {salaryDetails && (
          <div>
            <h4>Net Salary: PKR {salaryDetails.netSalary}</h4>
          </div>
        )}
      </div>

      <div className={styles.rightSection}>
        {salaryDetails && salaryDetails.netSalary && (
          <Pie
            ref={chartRef}
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SalaryCalculator;
