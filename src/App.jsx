import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';  
import BMICalculator from './components/BMICalculator';
import BasicCal from './components/BasicCal.jsx';
import ExpenseCalculator from './components/ExpenseCalculator';
import LoanCalculator from './components/LoanCalculator';
import SalaryCalculator from './components/SalaryCalculator';
import AgeCalculator from './components/AgeCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import InflationCalculator from './components/InflationCalculator.jsx';
import GpaCalculator from './components/GpaCalculator.jsx';
import CGPACalculator from './components/CgpaCalculator.jsx';
import Footer from './components/Footer.jsx';
import Contact from './components/Contact';
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/basic" element={<BasicCal />} />
              <Route path="/age" element={<AgeCalculator />} />
              <Route path="/bmi" element={<BMICalculator />} />
              <Route path="/loan" element={<LoanCalculator />} />
              <Route path="/salary" element={<SalaryCalculator />} />
              <Route path="/expense" element={<ExpenseCalculator />} />
              <Route path="/scientific" element={<ScientificCalculator />} />
              <Route path="/inflation" element={<InflationCalculator />} />
              <Route path="/gpa" element={<GpaCalculator />} />
              <Route path="/cgpa" element={<CGPACalculator />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;