import { useState } from "react";
import styles from "./gpa.module.css";

const GpaCalculator = () => {
  const [courses, setCourses] = useState([{ courseName: "", credits: "", grade: "" }]);
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState(null);

  const gradePoints = {
    "A+": 4.3,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "D-": 0.7,
    "F": 0.0,
  };

  const handleCourseChange = (index, event) => {
    const updatedCourses = [...courses];
    updatedCourses[index][event.target.name] = event.target.value;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { courseName: "", credits: "", grade: "" }]);
  };

  const removeCourse = () => {
    if (courses.length > 1) {
      const updatedCourses = courses.slice(0, -1);
      setCourses(updatedCourses);
      setGpa(null);
    }
  };

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const credits = parseFloat(course.credits);
      const gradePoint = gradePoints[course.grade] || 0;

      totalQualityPoints += gradePoint * credits;
      totalCredits += credits;
    });

    const calculatedGpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : 0;
    setGpa(calculatedGpa);
    setError(null);
  };

  const clearInput = () => {
    setCourses([{ courseName: "", credits: "", grade: "" }]);
    setGpa(null);
    setError(null);
  };

  return (
    <div className={styles.gpaContainer}>
      <div className={styles.gpaText}>
        <h2>GPA Calculator</h2>
        <p>This tool helps you calculate your GPA based on the Grade Points you enter.</p>
      </div>
      <div className={styles.inputContainer}>
        {courses.map((course, index) => (
          <div key={index} className={styles.courseRow}>
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={course.courseName}
              onChange={(e) => handleCourseChange(index, e)}
              required
              className={styles.inputField}
            />
            <input
              type="number"
              name="credits"
              placeholder="Credits"
              step="0.5"
              value={course.credits}
              onChange={(e) => handleCourseChange(index, e)}
              required
              className={styles.inputField}
            />
            <select
              name="grade"
              value={course.grade}
              onChange={(e) => handleCourseChange(index, e)}
              required
              className={styles.gradeSelector}
            >
              <option value="">Select Grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="B-">B-</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="C-">C-</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="D-">D-</option>
              <option value="F">F</option>
            </select>
          </div>
        ))}
        <div className={styles.buttonContainer}>
          {courses.length > 1 && (
            <button type="button" onClick={removeCourse} className={styles.button}>
              Remove Course
            </button>
          )}
          <button type="button" onClick={addCourse} className={styles.button}>
            Add Course
          </button>
          <button type="button" onClick={calculateGPA} className={styles.button}>
            Calculate GPA
          </button>
          <button type="button" onClick={clearInput} className={styles.button}>
            Clear
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {gpa && <div className={styles.gpaResult}>Your GPA: {gpa}</div>}
      </div>
    </div>
  );
};

export default GpaCalculator;