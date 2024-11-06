import { useState } from 'react';
import styles from './cgpa.module.css';

const CgpaCalculator = () => {
  const [semesters, setSemesters] = useState([
    { semesterName: "", gpa: "", credits: "" }
  ]);
  const [cgpa, setCgpa] = useState(null);

  const handleSemesterChange = (index, event) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index][event.target.name] = event.target.value;
    setSemesters(updatedSemesters);
  };

  const addSemester = () => {
    setSemesters([...semesters, { semesterName: "", gpa: "", credits: "" }]);
  };

  const removeSemester = (index) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((_, i) => i !== index));
      setCgpa(null);
    }
  };

  const calculateCGPA = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    const isValidInput = semesters.every(semester => 
      semester.semesterName.trim() !== "" && 
      semester.gpa !== "" && 
      semester.credits !== ""
    );

    if (!isValidInput) {
      alert("Please fill in all fields for each semester");
      return;
    }

    semesters.forEach((semester) => {
      const gpa = parseFloat(semester.gpa);
      const credits = parseFloat(semester.credits);

      if (!isNaN(gpa) && !isNaN(credits)) {
        if (gpa < 0 || gpa > 4.3) {
          alert("GPA must be between 0 and 4.3");
          return;
        }
        if (credits < 0) {
          alert("Credits cannot be negative");
          return;
        }
        totalQualityPoints += gpa * credits;
        totalCredits += credits;
      }
    });

    const calculatedCgpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : 0;
    setCgpa(calculatedCgpa);
  };

  const clearInput = () => {
    setSemesters([{ semesterName: "", gpa: "", credits: "" }]);
    setCgpa(null);
  };

  return (
    <div className={styles.cgpaContainer}>
      <div className={styles.cgpaText}>
        <h2>CGPA Calculator</h2>
        <p>Calculate your CGPA across multiple semesters.</p>
      </div>
      <div className={styles.inputContainer}>
        {semesters.map((semester, index) => (
          <div key={index} className={styles.semesterRow}>
            <input
              type="text"
              name="semesterName"
              placeholder="Semester Number"
              value={semester.semesterName}
              onChange={(e) => handleSemesterChange(index, e)}
              className={styles.inputField}
            />
            <input
              type="number"
              name="gpa"
              placeholder="GPA (0-4.3)"
              step="0.01"
              min="0"
              max="4"
              value={semester.gpa}
              onChange={(e) => handleSemesterChange(index, e)}
              className={styles.inputField}
            />
            <input
              type="number"
              name="credits"
              placeholder="Credits"
              step="1"
              min="0"
              value={semester.credits}
              onChange={(e) => handleSemesterChange(index, e)}
              className={styles.inputField}
            />
            {semesters.length > 1 && (
              <button
                type="button"
                onClick={() => removeSemester(index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className={styles.buttonContainer}>
          <button type="button" onClick={addSemester} className={styles.button}>
            Add Semester
          </button>
          <button type="button" onClick={calculateCGPA} className={styles.button}>
            Calculate CGPA
          </button>
          <button type="button" onClick={clearInput} className={styles.button}>
            Clear
          </button>
        </div>
        {cgpa !== null && (
          <div className={styles.cgpaResult}>
            <span>Your CGPA: {cgpa}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CgpaCalculator;